import Dexie from "dexie";
import type { Table } from "dexie";

import type { Project } from "./types";
import { newPattern } from "./util";

export class BlackBoxDB extends Dexie {
  project!: Table<Project, number>;
  constructor() {
    super("blackboxDB");
    this.version(1).stores({
      project: "++id, title, patterns",
    });
  }

  async createNewProject(title: string): Promise<string> {
    const id = await blackboxDB.project.add({
      title,
      patterns: [newPattern(0)],
    });

    return id.toString();
  }

  async getProject(projectId: number) {
    return await this.project.get(projectId);
  }

  async getAllProjects() {
    return await this.project.toArray();
  }
}

export const blackboxDB = new BlackBoxDB();
