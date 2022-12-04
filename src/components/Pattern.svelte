<script lang="ts">
  import type { Project, Pattern } from "../lib/types";
  import { SCALES } from "../lib/util";

  export let project: Project;
  export let selectedPatternIndex = 0;
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
                  <input
                    class="step"
                    type="checkbox"
                    default={step.active}
                  />
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
    height: 30px;
    padding: 10px;
    position: sticky;
    left: 0;
    z-index: 100;
    display: flex;
    background-color: black;
    color: white;
    align-items: center;
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
  }
</style>
