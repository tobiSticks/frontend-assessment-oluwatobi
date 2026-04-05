import { render, screen, fireEvent } from "@testing-library/react";
import { expect, it, describe, vi } from "vitest";
import SafeImage from "../SafeImage";

// Mock next/image as a standard img for tests
vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe("SafeImage", () => {
  it("renders the image element when a valid source is provided", () => {
    render(<SafeImage src="https://example.com/poster.jpg" alt="Test Poster" />);
    
    const img = screen.getByAltText("Test Poster");
    expect(img).toBeInTheDocument();
  });

  it("renders a fallback placeholder when the image fails to load", () => {
    render(<SafeImage src="https://example.com/bad-poster.jpg" alt="Test Poster" />);
    
    const img = screen.getByAltText("Test Poster");
    
    // Simulate image loading error
    fireEvent.error(img);

    // Verify that the fallback UI is rendered
    expect(screen.getByText(/No poster/i)).toBeInTheDocument();
    expect(screen.queryByAltText("Test Poster")).not.toBeInTheDocument();
  });

  it("shows the fallback text immediately if no source is provided", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - testing missing src
    render(<SafeImage src={null} alt="No src Image" />);
    
    expect(screen.getByText(/No poster/i)).toBeInTheDocument();
  });
});
