"use client";

import { cn } from "@/lib/cn";
import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type SafeImageProps = ImageProps;

export default function SafeImage({
  src,
  alt,
  fill,
  className,
  ...props
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const srcStr = typeof src === "string" ? src : "";
  const hasSrc = Boolean(srcStr);

  if (!hasSrc || failed) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-slate-200 text-center text-xs font-medium text-slate-400",
          fill && "absolute inset-0 size-full",
          className,
        )}
      >
        No poster
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-slate-200",
        fill ? "absolute inset-0 size-full" : "size-full",
        className,
      )}
    >
      {isLoading && (
        <div className="absolute inset-0 z-10 animate-pulse bg-slate-200">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      )}
      <Image
        {...props}
        fill={fill}
        src={srcStr}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setFailed(true);
          setIsLoading(false);
        }}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          fill && "object-cover",
        )}
      />
    </div>
  );
}
