<script lang="ts">
  import { blackboxDB } from "../lib/db";
  import type { Playback } from "../lib/sound";
  import type { Project, Step, Pattern } from "../lib/types";
  import { focusStep, SCALES } from "../lib/util";

  export let project: Project;
  export let selectedPatternIndex = 0;
  export let playback: Playback;

  const toggleStep = (step: Step) => {
    // the step object is still referencing the value stored
    // inside the parent project object, so updates are super easy
    step.active = !step.active;
    if (step.active) {
      playback.playNote(step.note);
    }
    project = project;
    blackboxDB.updateProject(project);
  };
</script>

<div>
  <div class="pattern-tab-bar">
    {#each project.patterns as pattern, i}
      <div
        id={`${project.title}-${pattern.id}`}
        class:current-tab={selectedPatternIndex === pattern.index}
        class="tab"
        on:click={() => (selectedPatternIndex = i)}
      >
        {`${pattern.index + 1}`}
      </div>
    {/each}
  </div>
  <div class="pattern-container">
    {#each project.patterns as pattern}
      <table
        class="pattern"
        class:hidden={selectedPatternIndex !== pattern.index}
      >
        <tr class="cursor-row">
          <th class="cursor-hidden-overlay" />
          <td>
            <div class="cursor-steps">
              {#each { length: pattern.stepCount } as _, i}
                <div
                  class="step cursor-step"
                  on:click={() => {
                    playback.playbackCursor.step = i;

                    focusStep(
                      document
                        .getElementsByClassName("cursor-step")
                        .item(i),
                      document
                        .getElementsByClassName("pattern-container")
                        .item(selectedPatternIndex),
                      playback.playbackCursor.step
                    );
                  }}
                >
                  <div
                    class:cursor-active={playback.playbackCursor
                      .step === i}
                  />
                </div>
              {/each}
            </div>
          </td>
        </tr>
        {#each Object.entries(pattern.state) as [note, steps], i}
          <tr class="note-row">
            {#if note.length < 3}
              <th class="note">{note}</th>
            {:else}
              <th class="note">
                {note[0]}<sup>{note[1]}</sup>{note[2]}
              </th>
            {/if}
            <td>
              <div class="steps">
                {#each steps as step}
                  <div
                    class="step"
                    class:downbeat={step.index %
                      pattern.subdivision ===
                      0}
                    class:cursor-step-active={step.index ===
                      playback.playbackCursor.step}
                    on:click={() => toggleStep(step)}
                  >
                    <div class:active-step={step.active} />
                  </div>
                {/each}
              </div>
            </td>
          </tr>
          {#if (i + 1) % SCALES[pattern.scale].length === 0 && i + 1 < Object.keys(pattern.state).length}
            <tr class="octave-spacer" />
          {/if}
        {/each}
      </table>
    {/each}
  </div>
</div>

<style>
  sup {
    font-size: x-small;
    margin-top: -7px;
  }
  .pattern-container {
    max-height: 80vh;

    overflow-y: auto;
    overflow-x: auto;
  }
  .pattern-tab-bar {
    display: flex;
    margin-bottom: 10px;
  }
  .tab {
    background-color: black;
    color: white;
    width: 50px;
    height: 25px;
    padding: 10px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10%;
    font-weight: bold;
    font-size: larger;
  }
  .current-tab {
    color: black;
    background-color: white;
    width: 50px;
    height: 25px;
  }
  .pattern {
    width: 100%;
    height: 100%;
    margin-left: -10px;
    background-color: rgb(50, 50, 50);
    position: relative;
  }
  .hidden {
    display: none;
  }
  .note-row {
    display: flex;
    align-items: center;
    height: 40px;
  }
  .octave-spacer {
    margin: 10px 10px;
    height: 1px;
    background-color: rgb(75, 75, 75);
    display: block;
    width: 100%;
  }
  .note {
    border: 1px solid rgb(100, 100, 100);
    min-width: 55px;
    height: 35px;
    padding: 10px;
    position: sticky;
    z-index: 1;
    left: -2px;
    display: flex;
    background-color: black;
    color: white;
    align-items: center;
    border-radius: 10%;
  }
  .steps {
    margin-left: 20px;
    display: flex;
    align-items: center;
  }
  .step {
    height: 25px;
    width: 25px;
    margin-right: 5px;
    background-color: rgb(220, 220, 220);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 25%;
  }
  .downbeat {
    background-color: rgb(139, 139, 139);
  }
  .active-step {
    height: 20px;
    width: 20px;
    background-color: rgb(0, 198, 205);
    border-radius: 25%;
    border: 1px solid black;
  }

  .cursor-row {
    display: flex;
    align-items: center;
    height: 50px;
    width: 100%;
    position: sticky;
    background-color: rgb(50, 50, 50);
    top: -2px;
    z-index: 2;
  }
  .cursor-steps {
    margin-left: 20px;
    display: flex;
    align-items: center;
    background-color: rgb(10, 10, 10);
  }
  .cursor-step {
    background-color: rgb(10, 10, 10);
  }
  .cursor-active {
    height: 35px;
    width: 25px;
    background-color: rgb(255, 75, 75);
    border-radius: 25%;
    border: 1px solid black;
  }
  .cursor-step-active {
    height: 40px;
    width: 25px;
    background-color: rgba(255, 0, 0, 0.551);
    border-radius: 0%;
  }
  .cursor-hidden-overlay {
    min-width: 55px;
    height: 30px;
    padding: 20px;
    position: sticky;
    left: -2px;
    display: flex;
    background-color: rgb(50, 50, 50);
    color: white;
    align-items: center;
    border-radius: 10%;
  }
</style>
