import { render, screen } from "@testing-library/react";
import SideBar from "./SideBar";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";

describe("SideBar", () => {
  const mockSetCurrentPlayerIsCross = vi.fn();
  const mockHandleResetGridItems = vi.fn();
  it("renders non conditional components with correct class names and content and shows Cross's turn", () => {
    render(
      <SideBar
        currentPlayerIsCross={true}
        setCurrentPlayerIsCross={mockSetCurrentPlayerIsCross}
        handleResetGridItems={mockHandleResetGridItems}
      />
    );
    expect(screen.getByTestId("sidebar-container")).toHaveClass("m-auto");

    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
    );
    expect(button).toHaveTextContent("Reset");

    expect(screen.getByRole("heading")).toHaveTextContent("Cross's turn");
  });

  it("shows Circle's turn when currentPlayerIsCross is false", () => {
    render(
      <SideBar
        currentPlayerIsCross={false}
        setCurrentPlayerIsCross={mockSetCurrentPlayerIsCross}
        handleResetGridItems={mockHandleResetGridItems}
      />
    );
    expect(screen.getByRole("heading")).toHaveTextContent("Circle's turn");
  });
  it("executes both functions button is clicked", () => {
    render(
      <SideBar
        currentPlayerIsCross={false}
        setCurrentPlayerIsCross={mockSetCurrentPlayerIsCross}
        handleResetGridItems={mockHandleResetGridItems}
      />
    );
    screen.getByRole("button").click();
    expect(mockHandleResetGridItems).toHaveBeenCalledOnce();

    expect(mockSetCurrentPlayerIsCross).toHaveBeenCalledOnce();
    expect(mockSetCurrentPlayerIsCross).toHaveBeenCalledWith(true);
  });
});
