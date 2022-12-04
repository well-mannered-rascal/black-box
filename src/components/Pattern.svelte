<script lang="ts">
  import type { Project, Pattern } from "../lib/types";

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
      <div
        class="pattern"
        class:hidden={selectedPatternIndex !== pattern.index}
      >
        {#each Object.entries(pattern.state) as [note, steps]}
          <div class="note-row">
            <span class="note">{note}</span>
            <div class="steps">
              {#each steps as step}
                <input
                  class="step"
                  type="checkbox"
                  default={step.active}
                />
              {/each}
            </div>
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>

<style>
  .pattern-container {
    max-height: 80vh;
    overflow-y: scroll;
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
    /* width: 100%; */
    background-color: white;
    overflow-y: scroll;
    overflow-x: auto;
    position: relative;
  }
  .hidden {
    display: none;
  }
  .note-row {
    display: flex;
    height: 30px;
  }
  .note {
    min-width: 50px;
    height: 30px;
    padding: 10px;
    position: absolute;
    background-color: black;
    color: white;
    display: flex;
    align-items: center;
    justify-content: end;
  }
  .steps {
    margin-left: 60px;
    display: flex;
  }
  .step {
    margin-right: 5px;
    height: 30px;
  }
</style>
