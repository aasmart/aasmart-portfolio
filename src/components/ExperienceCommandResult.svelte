<script lang="ts">
	import type { Action } from 'svelte/action';
	import { getContext } from 'svelte';
	import ExperienceItem from './ExperienceItem.svelte';
	import type { PersonalExperience } from '../routes/+layout.server';

	let { experiences }: { experiences: [PersonalExperience] } = $props();

	let requestFocus = getContext<() => void>('requestFocus');

	let focus: Action = () => {
		requestFocus();
	};

	// const placeholderExperience = {
	//        title: "experience.title",
	//        name: "experience.name",
	//        description: "experience.description",
	//
	//    };

	//TODO: case when no experiences
</script>

<section use:focus class="flex w-max max-w-full flex-col text-gray-900 dark:text-gray-50">
	<h2 class="w-full items-center text-xl">
		<span class="font-bold text-blue-400">for</span>
		<span>exp</span>
		<span class="font-bold text-blue-400">in</span>
		(<span class="whitespace-nowrap text-gray-400">...{experiences.length} experiences...</span>);
		<span class="inline-block font-bold text-blue-400">do</span>
	</h2>

	<ul class="flex flex-col gap-4 border-l-2 border-gray-300 pl-4 dark:border-gray-700">
		{#each experiences as exp}
			<li
				class="relative before:absolute before:-left-[1.7em] before:top-3 before:h-[20px] before:w-[20px] before:rotate-45 before:rounded-md before:bg-blue-400"
			>
				<ExperienceItem item={exp}></ExperienceItem>
			</li>
		{/each}
	</ul>
	<span class="text-xl font-bold text-blue-400">done</span>
</section>
