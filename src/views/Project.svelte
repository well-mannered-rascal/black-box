<script lang="ts">
  import { blackboxDB } from "../lib/db";
  import AppHeader from "../components/AppHeader.svelte";
  import Pattern from "../components/Pattern.svelte";

  export let props;
  const projectId = parseInt(props.projectId);

  let projectPromise = blackboxDB.getProject(projectId);

  let selectedPatternIndex = 0;
</script>

<div>
  {#await projectPromise}
    <AppHeader projectTitle={""} />
  {:then project}
    <AppHeader projectTitle={project.title} />
    <div class="project">
      <Pattern
        {project}
        {selectedPatternIndex}
      />
    </div>
    <div class="media-controls">
      <div class="media-button">Previous</div>
      <div class="media-button">Play/Pause</div>
      <div class="media-button">Next</div>
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
  }
  .media-controls {
    display: flex;
    width: 100%;
    height: 50px;
    justify-content: space-around;
    align-items: center;
  }
  .media-button {
    color: white;
    display: flex;
    align-items: center;
  }
</style>
