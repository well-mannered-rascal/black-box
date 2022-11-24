import type { Project } from "./types";

// Fully chromatic, for stress testing
export const generateArbitraryEmptyProjectState = (
  patterns: number,
  stepSize: number
) => {
  const matrix: Project = {};

  for (
    let patternIndex = 0;
    patternIndex < patterns;
    patternIndex++
  ) {
    matrix[patternIndex] = {
      C4: new Array<number>(),
      "C#4": new Array<number>(),
      D4: new Array<number>(),
      "D#4": new Array<number>(),
      E4: new Array<number>(),
      F4: new Array<number>(),
      "F#4": new Array<number>(),
      G4: new Array<number>(),
      "G#4": new Array<number>(),
      A4: new Array<number>(),
      "A#4": new Array<number>(),
      B4: new Array<number>(),
      C5: new Array<number>(),
      "C#5": new Array<number>(),
      D5: new Array<number>(),
      "D#5": new Array<number>(),
      E5: new Array<number>(),
      F5: new Array<number>(),
      "F#5": new Array<number>(),
      G5: new Array<number>(),
      "G#5": new Array<number>(),
      A5: new Array<number>(),
      "A#5": new Array<number>(),
      B5: new Array<number>(),
    };

    Object.entries(matrix[patternIndex]).forEach(([note]) => {
      for (let stepIndex = 0; stepIndex < stepSize; stepIndex++) {
        matrix[patternIndex][note].push(0);
      }
    });
  }

  return matrix;
};
