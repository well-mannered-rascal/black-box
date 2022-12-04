<script lang="ts">
  import { blackboxDB } from "../lib/db";
  import { PlusIcon } from "svelte-feather-icons";
  import AppHeader from "../components/AppHeader.svelte";
  import ProjectListItem from "../components/ProjectListItem.svelte";
  import page from "page";

  export let props;

  const createNewProject = async () => {
    const title = prompt("New project title:");
    const id = await blackboxDB.createNewProject(title);
    page(`project/${id}`);
  };
</script>

<div>
  <AppHeader />
  <div class="project-item-container">
    <!-- TODO Load project information from state management here, sort alphabetical -->
    {#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] as projectNum}
      <ProjectListItem
        projectTitle={`Project ${projectNum}`}
        projectId={projectNum}
      />
    {/each}
  </div>
  <button
    class="new-project-button"
    on:click={createNewProject}
  >
    <PlusIcon size="2.5x" />
  </button>
</div>

<style>
  .project-item-container {
    padding: 20px;
    width: 100%;
    height: 90vh;
    padding-bottom: 75px;
    overflow: auto;
  }
  .project-item-container::-webkit-scrollbar {
    display: none;
  }

  .new-project-button {
    all: unset;
    cursor: pointer;
    background-color: rgb(255, 255, 255);
    width: 65px;
    height: 65px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 30px;
    right: 20px;
  }
  .new-project-button:active {
    background-color: rgb(200, 200, 200);
  }
</style>
