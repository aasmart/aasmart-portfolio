<script lang="ts">
	import type { Action } from 'svelte/action';

	import ProjectCard from './ProjectCard.svelte';

	let { focusCommand }: { focusCommand: () => void } = $props();

	let projectsPromise = fetch('/projects/project_cards.json').then((res) => res.json());

	let focus: Action = (_) => {
		focusCommand();
	};
</script>

{#await projectsPromise}
	<p>Loading...</p>
{:then projects}
	<section use:focus class="min-w-max">
		<p class="my-3 text-xl text-gray-900 dark:text-gray-50">
			Found <span class="font-bold text-blue-400">{projects['projects'].length}</span> projects...
		</p>

		<div class="grid grid-cols-[repeat(auto-fill,clamp(18em,23%,24.5em))] gap-6">
			{#each projects['projects'] as project, index}
				<ProjectCard {project} key={index} />
			{/each}
		</div>
	</section>
{/await}
