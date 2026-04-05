import { render, screen, fireEvent, act } from "@testing-library/react";
import { expect, it, describe, vi, beforeEach } from "vitest";
import SearchInput from "../SearchInput";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

// Mock next/navigation specifically for the test
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
  usePathname: vi.fn(),
}));

describe("SearchInput", () => {
  const mockReplace = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue({
      replace: mockReplace,
    });
    (usePathname as any).mockReturnValue("/");
    (useSearchParams as any).mockReturnValue(new URLSearchParams());
  });

  it("captures input and updates the URL with a search query", async () => {
    render(<SearchInput />);
    
    const input = screen.getByRole("searchbox");
    
    // Simulate user typing
    await act(async () => {
      fireEvent.change(input, { target: { value: "Inception" } });
    });

    // Verify that router.replace was called with the correct search parameters
    expect(mockReplace).toHaveBeenCalledWith("/?query=Inception");
  });

  it("removes the query parameter when the input is cleared", async () => {
    (useSearchParams as any).mockReturnValue(new URLSearchParams("query=Inception"));
    
    render(<SearchInput />);
    
    const input = screen.getByRole("searchbox");
    expect(input).toHaveValue("Inception");

    // Clear input
    await act(async () => {
      fireEvent.change(input, { target: { value: "" } });
    });

    // Verify that the query parameter is removed
    expect(mockReplace).toHaveBeenCalledWith("/?");
  });
});
