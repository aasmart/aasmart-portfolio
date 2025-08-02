<script lang="ts">
	import type { Course } from '../routes/proxy+layout.server';
	import TechnologyList from './TechnologyList.svelte';

	let { course }: { course: Course } = $props();

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
	<h3 class="text-lg font-bold text-amber-500 dark:text-amber-400">
		{course.name}
		<span class="text-gray-500">({course.number})</span>
	</h3>
	<p class="mb-2">
		{course.description}
	</p>
	<TechnologyList technologies={course.technologies}></TechnologyList>
</div>
