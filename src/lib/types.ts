export interface Step {
  active: boolean;
  accent?: boolean;
  index: number;
}

export interface PatternState {
  [note: string]: Step[];
}

export interface Pattern {
  readonly id: number;
  index: number;
  bpm?: number;
  scale: string; // i.e. 'chromatic, 'c major', 'c# minor', etc
  stepCount: number;
  /**(optional) How many steps per beat */
  subdivision?: number;
  state: PatternState;
}

export interface Project {
  readonly id: number;
  title: string;
  patterns: Pattern[];
}
