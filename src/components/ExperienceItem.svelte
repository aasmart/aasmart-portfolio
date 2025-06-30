<script lang="ts">
	type ExperienceItem = {
		title: string;
		description: string;
		start_date: string;
		end_date?: string;
		name: string;
	};

	let { item }: { item: ExperienceItem } = $props();

	let formattedStartDate = new Date(Date.parse(item.start_date)).toLocaleDateString('en-US', {
		month: 'short',
		year: 'numeric'
	});
	let formattedEndDate = item.end_date
		? new Date(Date.parse(item.end_date)).toLocaleDateString('en-US', {
				month: 'short',
				year: 'numeric'
			})
		: 'Present';
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
	class="relative scale-0 overflow-hidden rounded-lg bg-neutral-100 p-2 opacity-0 shadow-md transition-opacity duration-300 dark:bg-neutral-800 dark:text-gray-50 {isInView
		? 'animate-grow-fade-in'
		: ''}"
	bind:this={element}
>
	<h3 class="text-xl">
		<span class="font-bold text-amber-500 dark:text-amber-400">{item.title}</span>
	</h3>
	<div>
		<p class="text-lg text-gray-400 dark:text-gray-400">
			<span class="font-bold text-gray-700 dark:text-gray-200"> {item.name}</span>
			- {formattedStartDate} to
			{#if isCurrent}
				<span class="font-medium text-blue-400"> Present</span>
			{:else}
				{formattedEndDate}
			{/if}
		</p>
		<div class="whitespace-pre-line text-lg dark:border-gray-600">
			<p class="text-gray-800 dark:text-gray-200">
				{item.description}
			</p>
		</div>
	</div>
</div>
