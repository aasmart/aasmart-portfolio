<script lang="ts">
	import type { PersonalExperience } from '../routes/proxy+layout.server';
	import { formatDateStringMMYY } from '../util/date';
	import TechnologyList from './TechnologyList.svelte';

	let { item }: { item: PersonalExperience } = $props();

	let formattedStartDate = formatDateStringMMYY(item.start_date);
	let formattedEndDate = item.end_date ? formatDateStringMMYY(item.end_date) : 'Present';
	let isCurrent = !item.end_date;

	let isInView = $state(false);
	let element: HTMLElement | undefined = $state();
	const onChangeVisibility = (e: IntersectionObserverEntry[]) => {
		isInView = e[0].isIntersecting || isInView;
	};

	$effect(() => {
		let options = {
			threshold: 0.75
		};
		let observer = new IntersectionObserver(onChangeVisibility, options);
		if (element) {
			observer.observe(element);
		}

		return () => {
			observer.disconnect();
		};
	});
</script>

<div
	class="relative scale-0 overflow-hidden rounded-lg border-[1px] border-neutral-400 bg-neutral-100 p-2 opacity-0 shadow-md
            transition-opacity duration-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-50 {isInView
		? 'animate-grow-fade-in'
		: ''}"
	bind:this={element}
>
	<h3 class="text-xl">
		<span class="font-bold text-amber-500 dark:text-amber-400">{item.title}</span>
	</h3>
	<div>
		<p>
			<span class="inline-block font-bold text-gray-700 dark:text-gray-200"> {item.name}</span>
			<span class="inline-block text-gray-400 dark:text-gray-400">
				({formattedStartDate} -
				{#if isCurrent}
					<span class="font-bold text-blue-400"> Present</span>
				{:else}
					{formattedEndDate}
				{/if})
			</span>
		</p>
		<div class="mb-2 whitespace-pre-line dark:border-gray-600">
			<p class="text-gray-800 dark:text-gray-200">
				{item.description}
			</p>
		</div>
		<TechnologyList technologies={item.technologies}></TechnologyList>
	</div>
</div>
