import { render, screen } from "@testing-library/react";
import GridItem from "./GridItem";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";

describe("GridItem", () => {
  const mockGridItem = { id: 0, player: null };
  const mockSelectGridItem = vi.fn();

  it("renders with correct class name", () => {
    render(
      <GridItem gridItem={mockGridItem} selectGridItem={mockSelectGridItem} />
    );
    const gridItem = screen.getByTestId("grid-item");
    expect(gridItem).toBeInTheDocument();
    expect(gridItem).toHaveClass("grid-item");
  });

  it("renders nothing when no player is set", () => {
    render(
      <GridItem gridItem={mockGridItem} selectGridItem={mockSelectGridItem} />
    );
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("renders an X when Cross player is set", () => {
    render(
      <GridItem
        gridItem={{ id: 0, player: "Cross" }}
        selectGridItem={mockSelectGridItem}
      />
    );
    expect(screen.queryByRole("heading")).toBeInTheDocument();
    expect(screen.getByText("X")).toBeInTheDocument();
  });

  it("renders an O when Cross player is set", () => {
    render(
      <GridItem
        gridItem={{ id: 0, player: "Circle" }}
        selectGridItem={mockSelectGridItem}
      />
    );
    expect(screen.queryByRole("heading")).toBeInTheDocument();
    expect(screen.getByText("O")).toBeInTheDocument();
  });

  it("calls selectGridItem when clicking an empty grid item", () => {
    render(
      <GridItem
        gridItem={{ id: 42, player: null }}
        selectGridItem={mockSelectGridItem}
      />
    );
    screen.getByTestId("grid-item").click();
    expect(mockSelectGridItem).toHaveBeenCalledOnce();
    expect(mockSelectGridItem).toHaveBeenCalledWith(42);
  });

  it("does not call selectGridItem when clicking an occupied grid item", () => {
    render(
      <GridItem
        gridItem={{ id: 30, player: "Cross" }}
        selectGridItem={mockSelectGridItem}
      />
    );
    screen.getByTestId("grid-item").click();
    expect(mockSelectGridItem).not.toHaveBeenCalled();
  });
});
