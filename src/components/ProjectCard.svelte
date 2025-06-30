<script lang="ts">
	import { json } from '@sveltejs/kit';

	type Project = {
		name: string;
		url_name: string;
		img_name: string;
		technologies: string[];
	};

	let { project }: { project: Project; key: number } = $props();

	let isInView = $state(false);
	let element: HTMLElement | undefined = $state();
	const onChangeVisibility = (e: IntersectionObserverEntry[]) => {
		isInView = e[0].isIntersecting || isInView;
	};

	$effect(() => {
		let options = {
			threshold: 0.5
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
	class="hover:border-3 h-64 {isInView
		? 'animate-grow-fade-in'
		: ''} rounded-md border-2 border-blue-400 p-2 opacity-0 duration-300 hover:scale-105 hover:p-0"
>
	<div
		class="h-full overflow-clip rounded-md bg-gray-300 p-0 shadow-md duration-300 hover:shadow-blue-400 dark:bg-gray-600"
	>
		<a href="/projects/{project['url_name']}" class="flex size-full flex-col p-0">
			<div class="h-20 w-full grow p-0">
				<img class="w-full overflow-hidden object-contain" src="/{project['img_name']}" alt="t" />
			</div>
			<div class="flex flex-col items-center gap-1 bg-gray-100 p-1 text-xl dark:bg-[#292929]">
				<h3 class="text-center dark:text-gray-50">{project['name']}</h3>
				<ul class="flex flex-row gap-2">
					{#each project['technologies'] as tech}
						<li class="size-8">
							<img
								src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/{tech}/{tech}-original.svg"
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
