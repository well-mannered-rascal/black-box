<script lang="ts">
  import type { Project } from "../lib/types";
  import { blackboxDB } from "../lib/db";
  import AppHeader from "../components/AppHeader.svelte";
  import { liveQuery } from "dexie";

  export let props;
  const projectId = parseInt(props.projectId);

  let projectQuery = blackboxDB.project.get(projectId);
  let selectedPattern = 0;
</script>

<div>
  {#await projectQuery then project}
    <AppHeader projectTitle={project.title} />

    <div class="project">
      <div class="pattern-tab-bar">
        {#each project["patterns"] as pattern, i}
          <div
            id={`${project["title"]}-${pattern.id}`}
            class:current-tab={selectedPattern === pattern.index}
            class="tab"
            on:click={() => (selectedPattern = i)}
          >
            {`P${pattern.index}`}
          </div>
        {/each}
      </div>
      {#each project["patterns"] as pattern}
        <div
          class="pattern"
          class:hidden={selectedPattern !== pattern.index}
        >
          {pattern.id}
        </div>
      {/each}
    </div>
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
  }
  .hidden {
    display: none;
  }
</style>
