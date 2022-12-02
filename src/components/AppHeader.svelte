<script lang="ts">
  import page from "page";
  import { SettingsIcon } from "svelte-feather-icons";

  export let projectTitle: String = "";
</script>

<div class="app-header">
  {#if projectTitle}
    <span
      class="app-icon"
      on:click={() => page("/")}>Bb</span
    >
    <span class="app-title">{projectTitle}</span>
  {:else}
    <span class="app-title">Blackbox</span>
  {/if}

  <SettingsIcon
    size="1.25x"
    class="feather-icon"
  />
</div>

<style>
  .app-header {
    width: 100vw;
    height: 50px;
    background-color: rgb(20, 20, 20);
    padding: 10px 15px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(146, 146, 146);
    color: white;
    font-size: larger;
    justify-content: space-between;
    margin-bottom: 10px;
    font-weight: bold;
    letter-spacing: 10px;
  }
  .app-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 55vw;
  }
</style>
