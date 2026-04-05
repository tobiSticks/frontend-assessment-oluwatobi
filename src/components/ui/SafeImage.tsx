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
        "bg-slate-200",
        fill ? "absolute inset-0 size-full" : "relative size-full",
      )}
    >
      <Image
        {...props}
        fill={fill}
        src={srcStr}
        alt={alt}
        onError={() => setFailed(true)}
        className={cn(fill && "object-cover", className)}
      />
    </div>
  );
}
