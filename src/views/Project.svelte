<script lang="ts">
  import { blackboxDB } from "../lib/db";
  import AppHeader from "../components/AppHeader.svelte";

  export let props;
  const projectId = parseInt(props.projectId);

  let projectPromise = blackboxDB.getProject(projectId);

  let selectedPattern = 0;
</script>

<div>
  {#await projectPromise}
    <AppHeader projectTitle={""} />
  {:then project}
    <AppHeader projectTitle={project.title} />
    <div class="project">
      <div class="pattern-tab-bar">
        {#each project.patterns as pattern, i}
          <div
            id={`${project.title}-${pattern.id}`}
            class:current-tab={selectedPattern === pattern.index}
            class="tab"
            on:click={() => (selectedPattern = i)}
          >
            {`${pattern.index + 1}`}
          </div>
        {/each}
      </div>
      {#each project["patterns"] as pattern}
        <div
          class="pattern"
          class:hidden={selectedPattern !== pattern.index}
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
  {:catch error}
    {error}
  {/await}
</div>

<style>
  .project {
    padding: 5px;
    margin: auto;
    width: 95vw;
    height: 90vh;
  }
  .pattern-tab-bar {
    display: flex;
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
    margin-top: 15px;
    height: 90%;
    background-color: white;
    overflow-y: auto;
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
