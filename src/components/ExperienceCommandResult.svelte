<script lang="ts">
	import type { Action } from 'svelte/action';
	import ExperienceItem from './ExperienceItem.svelte';
	import { deserialize } from '$app/forms';

	let { requestFocus }: { requestFocus: () => void } = $props();

	let experiencePromise = fetch('/experiences/experiences.json')
		.then((response) => response.json())
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error('Error fetching experience data:', error);
			return null;
		});

	let focus: Action = (_) => {
		requestFocus();
	};

	let expandedIndex = $state(0);
	let cycleExpandedIndex = (experiences: [ExperienceItem]) => {
		expandedIndex += 1;
		console.log(expandedIndex, experiences.length);
		if (expandedIndex >= experiences.length) {
			expandedIndex = 0;
		}
	};

	// const placeholderExperience = {
	//        title: "experience.title",
	//        name: "experience.name",
	//        description: "experience.description",
	//
	//    };

	//TODO: case when no experiences
</script>

{#await experiencePromise}
	<p>Loading...</p>
{:then experience}
	<section use:focus class="flex w-min min-w-max flex-col text-gray-900 dark:text-gray-50">
		<h2 class="flex w-full items-center gap-4 text-xl">
			<span class="font-bold text-blue-400">for</span>
			<span>experience</span>
			<span class="font-bold text-blue-400">in</span>
			(<span class="text-gray-400">... {experience['experiences'].length} experiences ...</span>);
			<span class="font-bold text-blue-400">do</span>
		</h2>

		<ul class="flex flex-col gap-4 border-l-4 border-gray-300 pl-4 dark:border-gray-600">
			{#each experience['experiences'] as exp, index}
				<li
					class="relative before:absolute before:-left-7 before:top-3 before:h-[20px] before:w-[20px] before:rotate-45 before:rounded-md before:bg-blue-400"
				>
					<ExperienceItem item={exp}></ExperienceItem>
				</li>
			{/each}
		</ul>
		<span class="text-xl font-bold text-blue-400">done</span>
	</section>
{/await}
