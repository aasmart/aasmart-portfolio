<script lang="ts">
	import type { PageProps } from './$types';
	import SvelteMarkdown from '@humanspeak/svelte-markdown';
	import { base } from '$app/paths';
	import classNames from 'classnames';
	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/state';

	let { data }: PageProps = $props();
	let projectDir = $state(`${base}/projects`);
	let allProjectUrls = $derived<String[]>(Array.from(data.projects.keys()));

	let projectData = $derived(data.projects.get(data.markdownFile));

	let menuExpanded = $state<boolean>(false);
	let toggleMenuExpanded = () => {
		menuExpanded = !menuExpanded;
	};

	beforeNavigate(() => {
		const historyJson = page.state.terminalHistory;
		console.log(historyJson);
	});
</script>

<!-- TODO: general theming improvements -->

<main class="flex h-full w-full flex-col dark:text-gray-300 md:flex-row">
	<style>
		h1 {
			font-size: 2rem;
			font-weight: bold;
		}

		h2 {
			font-size: 1.5rem;
			font-weight: bold;
		}

		h3 {
			font-size: 1.2rem;
			font-weight: bold;
		}

		p {
			line-height: 1.7rem;
			padding: 0 0 14px 0;
		}

		.hljs,
		code {
			border-radius: 8px;
			box-shadow: 0px 4px 8px 1px rgba(0, 0, 0, 0.4);
			margin: 8px 0 !important;
		}
	</style>

	<nav
		class="min-w-min overflow-y-visible border-b-4 px-0 py-2 shadow-sm dark:border-neutral-900 md:w-[20rem] md:overflow-y-scroll md:border-b-0 md:border-r-4 md:px-4"
	>
		<!-- TODO: need to extract all of this into components in the future -->
		<!-- TODO: expanded save states between screen size changes -->
		<!-- TODO: bug: has animation when going from expanded to unexpended on window size change-->
		<div class="flex flex-row justify-between px-4 md:px-0">
			<h2 class="text-xl font-bold text-blue-400 md:px-0"><a href="{base}/">aasmart-tree</a></h2>
			<button
				class="flex aspect-square w-8 flex-col justify-center gap-2 md:hidden"
				onclick={toggleMenuExpanded}
				aria-label={menuExpanded ? 'Close menu' : 'Open menu'}
			>
				<span
					class={classNames(
						'left-0 inline-block h-[3px] w-full origin-right rounded-lg bg-gray-900 transition-all dark:bg-slate-200',
						{ '-rotate-45': menuExpanded }
					)}
				></span>
				<span
					class={classNames(
						'left-0 inline-block h-[3px] w-full rounded-lg bg-gray-900 transition-opacity dark:bg-slate-200',
						{ 'opacity-0': menuExpanded }
					)}
				></span>
				<span
					class={classNames(
						'left-0 inline-block h-[3px] w-full origin-right rounded-lg bg-gray-900 transition-all dark:bg-slate-200',
						{ 'rotate-45': menuExpanded }
					)}
				></span>
			</button>
		</div>
		<ul
			class={classNames(
				{ 'rect-clip-full border-b-4 shadow-md dark:border-neutral-900': menuExpanded },
				{ 'rect-clip-y-0 md:rect-clip-full': !menuExpanded },
				'md:static md:block md:overflow-visible md:border-b-0 md:px-0 md:shadow-none md:transition-none ',
				'max-h-2/3 absolute z-30 h-min w-full overflow-scroll bg-light-bg px-4 pb-2 text-lg text-gray-900 shadow-md transition-[clip-path] duration-150 dark:bg-gray-bg dark:text-gray-200'
			)}
		>
			<li>
				<h3 class="text-blue-400">
					<i class="fa-solid fa-folder-open"></i>
					home
				</h3>
				<ul class="w-full border-l-4 border-gray-300 pl-6 dark:border-neutral-600">
					<li class="w-max rounded-md px-1 text-amber-500 dark:text-amber-400">
						<a href="{base}/">
							<i class="fa-solid fa-home"></i>
							<span class="underline">home.sh</span>
						</a>
					</li>
				</ul>
			</li>
			<li>
				<h3 class="text-blue-400">
					<i class="fa-solid fa-folder-open"></i>
					projects
				</h3>
				<ul class="w-full border-l-4 border-gray-300 pl-6 dark:border-neutral-600">
					{#each allProjectUrls as url, i}
						<li
							class="w-max animate-move-up-fade-in rounded-md px-1 opacity-0 {data.markdownFile ==
							url
								? 'bg-neutral-200 dark:bg-neutral-700'
								: ''}"
							style="animation-delay: {50 * i}ms;"
						>
							<a href="{projectDir}/{url}">
								<i class="fa-solid fa-file"></i>
								<span class="underline">{url}.md</span>
							</a>
						</li>
					{/each}
				</ul>
			</li>
		</ul>
	</nav>
	<div
		class="flex w-full flex-col gap-1 overflow-y-auto px-6 text-gray-900 dark:text-gray-200 md:w-[110ch]"
	>
		{#key projectData}
			<div class="animate-move-up-fade-in">
				<header class="text-blue-400 transition-colors hover:text-blue-500">
					{#if projectData?.github_url}
						<a href={projectData.github_url}>
							<h1>
								{projectData?.name}
								<i class="fa-brands fa-github"></i>
							</h1>
						</a>
					{:else}
						<h1>
							{projectData?.name}
						</h1>
					{/if}
				</header>
				<SvelteMarkdown source={data.markdown} />
				<script>
					hljs.highlightAll();
				</script>
			</div>
		{/key}
	</div>
</main>
