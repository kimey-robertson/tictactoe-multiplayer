// import { GridItems, Player } from "./types";

// export function draw(gridItems: GridItems) {
//   return gridItems.every((gridItem) => {
//     return gridItem.player !== null;
//   });
// }

// function playerInPosition(
//   gridItems: GridItems,
//   currentPlayerIsCross: boolean,
//   position: number
// ) {
//   const player: Player = !currentPlayerIsCross ? "Cross" : "Circle";

//   return gridItems[position].player === player;
// }

// const winConditions = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],

//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8],

//   [0, 4, 8],
//   [2, 4, 6],
// ];

// export function checkWinCondition(
//   gridItems: GridItems,
//   currentPlayerIsCross: boolean
// ) {
//   let won = false;
//   winConditions.forEach((winCondition) => {
//     if (
//       playerInPosition(gridItems, currentPlayerIsCross, winCondition[0]) &&
//       playerInPosition(gridItems, currentPlayerIsCross, winCondition[1]) &&
//       playerInPosition(gridItems, currentPlayerIsCross, winCondition[2])
//     ) {
//       won = true;
//       return;
//     }
//   });
//   return won;
// }

// export function checkWinCondition2(
//   gridItems: GridItems,
//   currentPlayerIsCross: boolean,
//   gridSize: number
// ) {
//   const player: Player = !currentPlayerIsCross ? "Cross" : "Circle";

//   const positions: number[] = [];
//   gridItems.forEach((position, index) => {
//     if (position.player === player) positions.push(index);
//   });

//   return (
//     winHorizontally(gridSize, positions) ||
//     winVertically(gridSize, positions) ||
//     winDiagonally(gridSize, positions)
//   );
// }

// function checkIfWon(
//   winConditions: number[][],
//   positions: number[],
//   gridSize: number
// ) {
//   for (let i = 0; i < winConditions.length; i++) {
//     let winTally = 0;
//     for (let j = 0; j < winConditions[i].length; j++) {
//       for (let k = 0; k < positions.length; k++) {
//         if (winConditions[i][j] === positions[k]) {
//           winTally++;
//           if (winTally === gridSize) return true;
//           break;
//         }
//       }
//     }
//   }
// }

// function winHorizontally(gridSize: number, positions: number[]): boolean {
//   if (positions.length < gridSize) return false;
//   const startingPossibilitiesHorizontal = [];
//   for (let i = 0; i < gridSize; i++) {
//     startingPossibilitiesHorizontal.push(i * gridSize);
//   }

//   // startingPossibilities when 3 === [0,3,6]
//   // win conditions: [0, 1, 2], [3, 4, 5], [6, 7, 8]

//   const winConditionsHorizontal: number[][] = [];
//   startingPossibilitiesHorizontal.forEach((s) => {
//     const condition = [];
//     for (let i = 0; i < gridSize; i++) {
//       condition.push(s + i);
//     }
//     winConditionsHorizontal.push(condition);
//   });
//   if (checkIfWon(winConditionsHorizontal, positions, gridSize)) return true;
//   return false;
// }

// function winVertically(gridSize: number, positions: number[]): boolean {
//   if (positions.length < gridSize) return false;
//   const startingPossibilitiesVertical = [];
//   for (let i = 0; i < gridSize; i++) {
//     startingPossibilitiesVertical.push(i);
//   }

//   // startingPossibilities when 3 === [0,1,2]
//   // win conditions: [0, 3, 6], [1, 4, 7], [2, 5, 8]

//   const winConditionsVertical: number[][] = [];
//   startingPossibilitiesVertical.forEach((s) => {
//     const condition = [];
//     for (let i = 0; i < gridSize; i++) {
//       condition.push(s + i * gridSize);
//     }
//     winConditionsVertical.push(condition);
//   });

//   if (checkIfWon(winConditionsVertical, positions, gridSize)) return true;
//   return false;
// }

// function winDiagonally(gridSize: number, positions: number[]): boolean {
//   if (positions.length < gridSize) return false;
//   const startingPossibilitiesDiagonal = [0, gridSize - 1];

//   // startingPossibilities when 3 === [0,2]
//   // win conditions: [0, 4, 8], [2, 4, 6]

//   const winConditionsDiagonal: number[][] = [[], []];
//   for (let i = 0; i < gridSize; i++) {
//     winConditionsDiagonal[0].push(i * (gridSize + 1));
//   }
//   for (let i = 0; i < gridSize; i++) {
//     winConditionsDiagonal[1].push(
//       startingPossibilitiesDiagonal[1] + i * startingPossibilitiesDiagonal[1]
//     );
//   }

//   if (checkIfWon(winConditionsDiagonal, positions, gridSize)) return true;
//   return false;
// }

// // grid size 3 which assumes win condition must be 3 in a row
// // horizontal win condition === any left square (0,3,6) +1 & +2
// // vertical win condition === any top square (0,1,2) +3 & +6
// // diagonal win condtion === first square (0) +4(3+1) & +8. Always only two
// // OR last square of first row (2(3-1)) +2(3-1) & +2
// // THEREFORE:
// // grid size 4 assumes win conditions 4 in a row
// // horizontal win condition === any left square (0,4,8,12) +1 & +2 & +3
// // vertical win conditions == any top square (0,1,2,3) +4 & +8 & +12
// // diagonal win conditions === first square (0) +5(4+1) & +10 & +15
// // OR last square for first row (3(4-1)) +3(4-1) & +3 & +3

// export function getDefaultGridItems(gridSize: number): GridItems {
//   const gridItems = [];
//   for (let i = 0; i < gridSize * gridSize; i++) {
//     gridItems.push({ id: i, player: null });
//   }
//   return gridItems;
// }

// export const defaultGridItems = [
//   {
//     id: 0,
//     player: null,
//   },
//   {
//     id: 1,
//     player: null,
//   },
//   {
//     id: 2,
//     player: null,
//   },
//   {
//     id: 3,
//     player: null,
//   },
//   {
//     id: 4,
//     player: null,
//   },
//   {
//     id: 5,
//     player: null,
//   },
//   {
//     id: 6,
//     player: null,
//   },
//   {
//     id: 7,
//     player: null,
//   },
//   {
//     id: 8,
//     player: null,
//   },
// ];


export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

