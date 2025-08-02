<script lang="ts">
	import type { Action } from 'svelte/action';
	import { getContext } from 'svelte';
	import EducationItem from './EducationItem.svelte';
	import type { Education } from '../routes/proxy+layout.server';

	let { education }: { education: [Education] } = $props();

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
	<!-- before:absolute before:-left-7 before:top-3 before:h-[20px] before:w-[20px] before:rotate-45 before:rounded-md before:bg-blue-400 -->
	<ul class="flex flex-col gap-4">
		{#each education as edu, i}
			<li class="relative">
				<EducationItem index={i} item={edu}></EducationItem>
			</li>
		{/each}
	</ul>
	<span class="text-xl font-bold text-blue-400">fi</span>
</section>
