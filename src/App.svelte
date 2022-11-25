<script lang="ts">
  import page from "page";
  import Home from "./views/Home.svelte";
  import Project from "./views/Project.svelte";

  let currentView = Home;
  let props = {};

  page("/", () => {
    currentView = Home;
  });
  page("/project/:id", (context) => {
    props["projectId"] = context.params.id;
    currentView = Project;
  });
  page.start();
</script>

<main>
  <svelte:component
    this={currentView}
    {props}
  />
</main>

<style>
</style>
