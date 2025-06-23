import { render, screen } from "@testing-library/react";
import GameBoard from "./GameBoard";
import * as GridItemModule from "./GridItem";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom/vitest";

vi.mock("./GridItem", () => ({
  default: vi.fn(() => <div data-testid="mock-grid-item" />),
}));

describe("GameBoard", () => {
  const mockGridItems = [
    {
      id: 0,
      player: null,
    },
    {
      id: 1,
      player: null,
    },
    {
      id: 2,
      player: null,
    },
    {
      id: 3,
      player: null,
    },
    {
      id: 4,
      player: null,
    },
    {
      id: 5,
      player: null,
    },
    {
      id: 6,
      player: null,
    },
    {
      id: 7,
      player: null,
    },
    {
      id: 8,
      player: null,
    },
  ];
  const mockSelectGridItem = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders 9 GridItem components", () => {
    render(<GameBoard gridItems={mockGridItems} selectGridItem={() => {}} />);

    const gridItems = screen.getAllByTestId("mock-grid-item");
    expect(gridItems).toHaveLength(9);
  });

  it("render with the correct class names", () => {
    const { container } = render(
      <GameBoard gridItems={[]} selectGridItem={() => {}} />
    );
    expect(container.querySelector(".game-board")).toBeInTheDocument();

    const gridContainer = container.querySelector(".grid");
    expect(gridContainer).toHaveClass("grid", "grid-cols-3", "h-[600px]");
  });

  it("renders the child component with the correct props", () => {
    render(
      <GameBoard
        gridItems={mockGridItems}
        selectGridItem={mockSelectGridItem}
      />
    );

    const mockedGridItem = GridItemModule.default;

    expect(mockedGridItem).toHaveBeenCalledTimes(9);
    expect(mockedGridItem).toHaveBeenLastCalledWith(
      {
        gridItem: { id: 8, player: null },
        selectGridItem: mockSelectGridItem,
      },
      undefined
    );
  });
});
