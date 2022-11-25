<script lang="ts">
  import page from "page";
  import { MenuIcon } from "svelte-feather-icons";

  export let projectTitle: String;
  export let projectId: String | Number;

  const navigateToProject = () => {
    page(`project/${projectId}`);
  };
</script>

<div
  class="project-list-item"
  on:click={navigateToProject}
>
  <span>{projectTitle}</span>
  <!-- TODO: Open some sort of menu to allow user to delete, rename, and any additional actions -->
  <MenuIcon />
</div>

<style>
  .project-list-item {
    background-color: rgb(30, 30, 30);
    color: rgb(223, 223, 223);
    border: 1px solid rgb(146, 146, 146);
    padding: 10px;
    margin-bottom: 10px;
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 500;
    font-size: 12pt;
    letter-spacing: 2px;
  }
</style>
