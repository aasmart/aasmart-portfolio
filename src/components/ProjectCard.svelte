<script lang="ts">
	import { base } from '$app/paths';
	import type { Project } from '../routes/+layout.server';
	import { formatDateStringMMYY } from '../util/date';

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
		class="relative h-full overflow-clip rounded-md border-[1px] border-neutral-400 shadow-md duration-300 hover:-translate-y-2 dark:border-neutral-700 dark:hover:border-blue-400"
	>
		<a href="{base}/projects/{project.id}" class="flex size-full flex-col p-0">
			<div
				class="absolute right-0 m-1 aspect-square rounded-lg border-[1px] border-neutral-950
					bg-neutral-900/60 p-2 shadow-md"
				title="Learn more!"
			>
				<i class="fa-solid fa-arrow-up-right-from-square m-0 aspect-square text-xl text-amber-400"
				></i>
			</div>
			<div></div>

			<div class="h-20 w-full grow p-0">
				<img
					class="h-full w-full overflow-hidden object-cover"
					src="{base}/{project['img_name']}"
					alt="t"
				/>
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
				<p class="text-sm">{project.description}</p>
				<ul class="flex flex-1 flex-row flex-wrap gap-1">
					{#each project['technologies'] as tech}
						{@const techLower = tech.toLowerCase()}
						<li
							class="flex h-min flex-row items-center gap-2 rounded-md border-2 border-neutral-400 p-2 text-sm transition-colors hover:border-blue-400 dark:border-neutral-700 dark:hover:border-blue-400"
						>
							<img
								class="size-6"
								src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/{techLower}/{techLower}-original.svg"
								alt={tech}
								title={tech}
							/>
						</li>
					{/each}
				</ul>
			</div>
		</a>
	</div>
</div>
