<script lang="ts">
	import type { Action } from 'svelte/action';
	import ProjectCard from './ProjectCard.svelte';
	import { getContext } from 'svelte';
	import type { Project } from '../routes/+layout.server';

	const { projects }: { projects: Map<string, Project> } = $props();

	let projectValues = $derived(projects.values());

	let focusCommand = getContext<() => void>('requestFocus');
	let focus: Action = () => {
		focusCommand();
	};
</script>

<section use:focus class="w-full">
	<p class="my-3 text-xl text-gray-900 dark:text-gray-50">
		Found <span class="font-bold text-blue-400">{projects.size}</span> projects...
	</p>

	<div class="grid grid-cols-1 gap-6 sm:grid-cols-[repeat(auto-fill,clamp(18em,23%,24.5em))]">
		{#each projectValues as project, index}
			<ProjectCard {project} key={index} />
		{/each}
	</div>
</section>
