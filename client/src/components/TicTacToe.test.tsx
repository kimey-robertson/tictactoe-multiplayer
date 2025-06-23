import { render, screen } from "@testing-library/react";
import TicTacToe from "./TicTacToe";
import { describe, it, expect, vi } from "vitest";
import * as SideBarModule from "./SideBar";
import * as GameBoardModule from "./GameBoard";
import "@testing-library/jest-dom/vitest";

vi.mock("./SideBar", () => ({
  default: vi.fn(() => null),
}));

vi.mock("./GameBoard", () => ({
  default: vi.fn(() => null),
}));

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

describe("TicTacToe", () => {
  it("renders the correct jsx and child components", () => {
    const mockedSideBar = SideBarModule.default;
    const mockedGameBoard = GameBoardModule.default;

    render(<TicTacToe />);
    screen.debug();

    expect(screen.getByTestId("game-container")).toHaveClass(
      "flex game-container"
    );

    expect(mockedSideBar).toHaveBeenCalledExactlyOnceWith(
      {
        currentPlayerIsCross: true,
        setCurrentPlayerIsCross: expect.any(Function),
        handleResetGridItems: expect.any(Function),
      },
      undefined
    );

    expect(mockedGameBoard).toHaveBeenCalledExactlyOnceWith(
      {
        gridItems: mockGridItems,
        selectGridItem: expect.any(Function),
      },
      undefined
    );
  });
});
