import Dexie from "dexie";
import type { Table } from "dexie";

export interface Step {
  active: boolean;
  accent?: boolean;
}

export interface PatternState {
  [note: string]: Step[];
}

export interface Pattern {
  readonly id: number;
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

export class DexieDB extends Dexie {
  project!: Table<Project>;
  constructor() {
    super("blackboxDB");
    this.version(1).stores({
      project: "++id, title, patterns",
    });
  }
}

export const blackboxDB = new DexieDB();
