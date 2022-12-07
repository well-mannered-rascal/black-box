import * as Tone from "tone";
import type { TransportTime } from "tone/build/esm/core/type/Units";
import type { Pattern, Project } from "./types";

export class Playback {
  readonly project: Project;
  readonly loop;
  readonly SYNTH: Tone.PolySynth;
  playbackCursor: { pattern: number; step: number };
  transportId: number;
  isPlaying: boolean;

  constructor(project: Project) {
    this.SYNTH = new Tone.PolySynth();
    this.SYNTH.toDestination();
    this.SYNTH.set({ oscillator: { type: "square" } });

    this.isPlaying = false;

    this.project = project;
    this.playbackCursor = { pattern: 0, step: 0 };

    this.loop = (time: number) => {
      let notes: string[] = [];
      // For every step in the cursor.pattern and on the cursor.step
      // push step.note to notes if step.active == true
      Object.entries(
        this.project.patterns[this.playbackCursor.pattern].state
      ).forEach(([note, stepRow]) => {
        stepRow[this.playbackCursor.step].active && notes.push(note);
      });

      let offset = 0;
      if (notes.length >= 3) {
        notes.forEach((note) => {
          this.SYNTH.triggerAttackRelease(note, "16n", time + offset);
          offset += 0.03;
        });
      } else {
        this.SYNTH.triggerAttackRelease(notes, "16n", time);
      }

      if (
        this.playbackCursor.step ===
        project.patterns[this.playbackCursor.pattern].stepCount - 1
      ) {
        if (
          this.playbackCursor.pattern ===
          project.patterns.length - 1
        ) {
          this.stop();
        } else {
          this.playbackCursor.pattern++;
          this.playbackCursor.step = 0;
        }
      } else {
        this.playbackCursor.step++;
      }
    };
  }

  async start(
    patternIndexOffset: number = 0,
    stepIndexOffset: number = 0
  ) {
    console.log("playback");
    this.isPlaying = true;
    this.playbackCursor.pattern = patternIndexOffset;
    this.playbackCursor.step = stepIndexOffset;

    await Tone.start();
    this.transportId = Tone.Transport.scheduleRepeat(
      this.loop,
      "16n"
    );
    Tone.Transport.start();
  }

  stop() {
    this.isPlaying = false;
    Tone.Transport.stop();
    Tone.Transport.clear(this.transportId);
  }

  playNote(note: string) {
    this.SYNTH.triggerAttackRelease(note, "16n");
  }
}
