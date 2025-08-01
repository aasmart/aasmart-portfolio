<script lang="ts">
	import { base } from '$app/paths';
	import type { Project } from '../routes/+layout.server';
	import { formatDateStringMMYY } from '../util/date';
	import TechnologyList from './TechnologyList.svelte';

	let { project }: { project: Project; key: number } = $props();

	let isInView = $state(false);
	let element: HTMLElement | undefined = $state();
	const onChangeVisibility = (e: IntersectionObserverEntry[]) => {
		isInView = e[0].isIntersecting || isInView;
	};

	const formattedStartDate = formatDateStringMMYY(project.start_date);
	const formattedEndDate = project.end_date ? formatDateStringMMYY(project.end_date) : 'Present';
	const isCurrent = !project.end_date;

	$effect(() => {
		let options = {
			threshold: 0.25
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
	bind:this={element}
	class="h-[28rem] {isInView ? 'animate-grow-fade-in' : ''}
		rounded-md opacity-0 duration-300"
>
	<div
		class="relative h-full overflow-clip rounded-md border-[1px] border-neutral-400 shadow-md duration-300 ease-out hover:-translate-y-4 hover:border-blue-400 hover:shadow-lg dark:border-neutral-700 dark:hover:border-blue-400"
	>
		<a href="{base}/projects/{project.id}" class="flex size-full flex-col p-0">
			<div class="absolute right-0 m-1 flex h-12 flex-row gap-1 text-2xl">
				<div
					class="aspect-square rounded-lg border-[1px] border-neutral-950
                        bg-neutral-900/60 p-2 shadow-md"
					title="Learn more!"
				>
					<i
						class="fa-solid fa-arrow-up-right-from-square aspect-square w-full text-center text-amber-400"
					></i>
				</div>
			</div>

			<div class="flex h-20 w-full grow flex-row gap-[1px] p-0">
				{#each project.images as image}
					<img class="h-full w-full overflow-hidden object-cover" src="{base}/{image}" alt="t" />
				{/each}
			</div>

			<div
				class="flex min-h-32 flex-col gap-1 rounded-b-md bg-gray-100 p-4 dark:bg-neutral-800 dark:text-gray-50"
			>
				<div class="flex justify-between gap-2">
					<h3 class="text-2xl">{project.name}</h3>
					<span class="inline text-lg text-gray-400 dark:text-gray-400">
						{formattedStartDate} -
						{#if isCurrent}
							<span class="font-bold text-blue-400"> Present</span>
						{:else}
							{formattedEndDate}
						{/if}
					</span>
				</div>
				<p>{project.description}</p>
				<TechnologyList technologies={project.technologies} />
			</div>
		</a>
	</div>
</div>
