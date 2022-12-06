<script lang="ts">
  import { blackboxDB } from "../lib/db";
  import { PlusIcon } from "svelte-feather-icons";
  import AppHeader from "../components/AppHeader.svelte";
  import ProjectListItem from "../components/ProjectListItem.svelte";
  import page from "page";

  export let props;

  const projectsPromise = blackboxDB.getAllProjects();

  const createNewProject = async () => {
    const title = prompt("New project title:");
    const id = await blackboxDB.createNewProject(title);
    page(`project/${id}`);
  };
</script>

<div>
  <AppHeader />
  <div class="project-item-container">
    {#await projectsPromise}
      Loading...
    {:then projects}
      {#if projects.length}
        {#each projects as { title, id }}
          <ProjectListItem
            projectTitle={title}
            projectId={id}
          />
        {/each}
      {:else}
        <div class="no-projects-alert">No saved projects found!</div>
      {/if}
    {/await}
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
  .no-projects-alert {
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 80%;
    color: rgb(220, 220, 220);
    background-color: rgb(75, 75, 75);
    border: 1px solid rgb(120, 120, 120);
  }
</style>
