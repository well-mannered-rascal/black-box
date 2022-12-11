import type { Step, Pattern, Project } from "./types";
import { v4 as uuid } from "uuid";

export const PATTERN_DEFAULTS = {
  stepCount: 64,
  subdivision: 4,
  scale: "chromatic",
  bpm: 90,
  octaves: 2,
  rootOctave: 3,
};

export const SCALES = {
  chromatic: [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ],
};

interface PatternOptions {
  stepCount?: number;
  // scale?: string;
  subdivision?: number;
  bpm?: number;
  octaves?: number;
  rootOctave?: number;
}
/** Generates a new pattern with provided configuration or global defaults
 * NOTE: Hardcoded to chromatic scale
 */
export const newPattern = (
  index: number,
  options: PatternOptions = {
    stepCount: PATTERN_DEFAULTS.stepCount,
    subdivision: PATTERN_DEFAULTS.subdivision,
    bpm: PATTERN_DEFAULTS.bpm,
    octaves: PATTERN_DEFAULTS.octaves,
    rootOctave: PATTERN_DEFAULTS.rootOctave,
  }
) => {
  let { stepCount, subdivision, bpm, octaves, rootOctave } = options;

  const pattern: Pattern = {
    id: uuid(),
    index,
    stepCount,
    scale: "chromatic",
    subdivision,
    bpm,
    octaves,
    rootOctave,
    state: {},
  };

  for (let octaveIndex = 0; octaveIndex < octaves; octaveIndex++) {
    for (let noteLetter of SCALES.chromatic) {
      const note = `${noteLetter}${rootOctave + octaveIndex}`;
      let noteRow: Step[] = [];
      for (let stepIndex = 0; stepIndex < stepCount; stepIndex++) {
        noteRow[stepIndex] = {
          note,
          index: stepIndex,
          active: false,
        };
      }
      pattern.state[note] = noteRow;
    }
  }

  console.log(pattern);
  return pattern;
};

/** Given a step element, scrolls back to top with an optional offset */
export const focusStep = (
  target: Element,
  container: Element,
  index
) => {
  console.log(target.getBoundingClientRect().width * index);
  container.scrollLeft =
    target.getBoundingClientRect().width * index +
    container.getBoundingClientRect().width -
    30;
};
