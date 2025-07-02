<script lang="ts">
	import type { Action } from 'svelte/action';
	import ProjectCard from './ProjectCard.svelte';
	import { getContext } from 'svelte';
	import { base } from '$app/paths';

	let projectsPromise = fetch(`${base}/projects/project_cards.json`).then((res) => res.json());

	let focusCommand = getContext<() => void>('requestFocus');
	let focus: Action = (_) => {
		focusCommand();
	};
</script>

{#await projectsPromise}
	<p class="text-gray-900 dark:text-gray-50">Loading...</p>
{:then projects}
	<section use:focus class="min-w-max">
		<p class="my-3 text-xl text-gray-900 dark:text-gray-50">
			Found <span class="font-bold text-blue-400">{projects['projects'].length}</span> projects...
		</p>

		<div class="grid grid-cols-1 gap-6 sm:grid-cols-[repeat(auto-fill,clamp(18em,23%,24.5em))]">
			{#each projects['projects'] as project, index}
				<ProjectCard {project} key={index} />
			{/each}
		</div>
	</section>
{/await}
