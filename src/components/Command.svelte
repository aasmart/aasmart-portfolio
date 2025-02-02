<script lang="ts">
	import AboutCommandResult from "./AboutCommandResult.svelte";
	import UnknownCommandResult from "./UnknownCommandResult.svelte";

    let { name }: { name: string } = $props();
</script>

<p class="text-gray-900 dark:text-gray-50 text-2xl"><span class="text-sky-400">❯</span> { name }</p>
{#if name.toLocaleLowerCase() == "about"}
    <AboutCommandResult />
{:else}
    <UnknownCommandResult name={name} />
{/if}