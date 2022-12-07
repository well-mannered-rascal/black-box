<script lang="ts">
  import * as Tone from "tone";
  import { blackboxDB } from "../lib/db";
  import AppHeader from "../components/AppHeader.svelte";
  import Pattern from "../components/Pattern.svelte";
  import { Playback } from "../lib/sound";

  export let props;
  const projectId = parseInt(props.projectId);
  let playback: Playback;

  let projectPromise = blackboxDB.getProject(projectId);
  projectPromise.then(
    (project) => (playback = new Playback(project))
  );
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
        {playback}
      />
    </div>
    <div class="media-controls">
      <div class="media-button">Previous</div>
      <div
        class="media-button"
        on:click={() =>
          playback.isPlaying ? playback.stop() : playback.start()}
      >
        Play/Pause
      </div>
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
