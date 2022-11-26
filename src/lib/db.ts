import Dexie from "dexie";
import type { Table } from "dexie";

import type { Project } from "./types";

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
