export interface Step {
  active: boolean;
  note: string;
  accent?: boolean;
  index: number;
}

export interface PatternState {
  [note: string]: Array<Step>;
}

export interface Pattern {
  id: number;
  index: number;
  bpm?: number;
  scale?: string; // i.e. 'chromatic, 'c major', 'c# minor', etc
  stepCount?: number;
  /**(optional) How many steps per beat */
  subdivision?: number;
  octaves?: number;
  rootOctave?: number;
  state: PatternState;
}

export interface Project {
  id?: number;
  title: string;
  patterns: Pattern[];
}
