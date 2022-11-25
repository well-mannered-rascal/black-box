<script lang="ts">
  import AppHeader from "../components/AppHeader.svelte";

  export let props;

  const { projectId } = props;

  console.log(projectId);
</script>

<div>
  <AppHeader projectTitle={`project ${projectId}`} />
</div>

<style></style>
