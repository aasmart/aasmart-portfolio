<script lang="ts">
	import type { Education } from '../routes/proxy+layout.server';
	import EducationCourseItem from './EducationCourseItem.svelte';

	let { item, index }: { item: Education; index: number } = $props();

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

<h2 class="w-full items-center text-xl">
	<span class="font-bold text-blue-400">if</span>
	<span class=" text-gray-400 dark:text-gray-500">[[</span>
	<span class="font-bold text-amber-500 dark:text-amber-400">{item.name}</span>
	<!-- <span class="font-bold text-blue-400">==</span> -->
	<!-- <span class="text-gray-300 dark:text-gray-300">education</span> -->
	<span class=" text-gray-400 dark:text-gray-500">]];</span>
	<span class="font-bold text-blue-400">then</span>
</h2>
<div class="border-l-2 border-gray-300 pl-4 dark:border-gray-700">
	<div class="flex flex-col gap-1" bind:this={element}>
		<p class="text-xl">
			<span class="font-bold text-blue-400">export</span>
			<span>TIMELINE</span>
			<span class="font-bold text-blue-400">=</span>
			<span class="inline-block font-bold text-gray-700 dark:text-gray-200">
				{item.start_date} - {item.end_date}
			</span>
		</p>
		<p class="text-xl">
			<span class="font-bold text-blue-400">export</span>
			<span>GPA</span>
			<span class="font-lold text-blue-400">=</span>
			<span class="inline-block font-bold text-gray-700 dark:text-gray-200">
				{item.gpa.toFixed(2)} / {item.gpa_max.toFixed(2)}</span
			>
		</p>
		<div>
			<p class="text-xl">
				<span class="font-bold text-blue-400">export</span>
				<span>COURSES</span>
				<span class="font-bold text-blue-400">=</span>
				<span class="font-bold text-gray-400 dark:text-gray-500">(</span>
			</p>
			<ul class="flex flex-col gap-4 border-l-2 border-gray-300 pl-4 dark:border-gray-700">
				{#each item.courses as course}
					<li>
						<EducationCourseItem {course}></EducationCourseItem>
					</li>
				{/each}
			</ul>
			<span class="text-xl font-bold text-gray-400 dark:text-gray-500">)</span>
		</div>
	</div>
</div>
