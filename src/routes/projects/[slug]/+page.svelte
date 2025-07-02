<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';
	import SvelteMarkdown from '@humanspeak/svelte-markdown';
	import { error } from '@sveltejs/kit';
	import { base } from '$app/paths';

	let { data }: PageProps = $props();
	let markdown: Promise<string> | undefined = $state();
	onMount(() => {
		markdown = fetch(`${base}/projects/${data.markdownFile}.md`)
			.then((res) => res.text())
			.catch(() => error(404, 'Not found'));
	});
</script>

<main class="flex w-full flex-row justify-center p-4 dark:text-gray-50">
	<style>
		h1 {
			font-size: 2rem;
		}

		pre {
			padding: 8px 0;
		}

		.hljs,
		code {
			background: #222222;
			border-radius: 8px;
			padding: 4px;
		}
	</style>

	<div class="w-2/3 rounded-lg p-4 shadow-lg dark:bg-zinc-700">
		{#await markdown}
			<p>Loading content</p>
		{:then source}
			{#if source}
				<SvelteMarkdown {source} />
				<script>
					hljs.highlightAll();
				</script>
			{/if}
		{/await}
	</div>
</main>
