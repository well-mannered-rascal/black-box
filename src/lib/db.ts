import Dexie from "dexie";
import type { Table } from "dexie";

import type { Project } from "./types";

export class BlackBoxDB extends Dexie {
  project!: Table<Project>;
  constructor() {
    super("blackboxDB");
    this.version(1).stores({
      project: "++id, title, patterns",
    });
  }

  async createNewProject(title: string): Promise<string> {

    const id = await blackboxDB.project.add({
      title,
      patterns: [],
    });

    return id.toString();
  }
}

export const blackboxDB = new BlackBoxDB();
