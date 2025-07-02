<script lang="ts">
	import { getContext } from 'svelte';
	import type { Action } from 'svelte/action';
	import type { Theme } from '../routes/+page.svelte';

	let { theme, setTheme }: { theme: Theme; setTheme: (theme: Theme) => void } = $props();

	let requestFocus = getContext<() => void>('requestFocus');
	let focus: Action = (_) => {
		requestFocus();
	};

	// const placeholderExperience = {
	//        title: "experience.title",
	//        name: "experience.name",
	//        description: "experience.description",
	//
	//    };

	function toggleTheme() {
		if (theme === 'light') {
			setTheme('dark');
		} else {
			setTheme('light');
		}
	}

	//TODO: case when no experiences
</script>

<section use:focus class="text-gray-900 motion-safe:animate-grow-fade-in dark:text-gray-50">
	<h2 class="w-full items-center text-xl">
		<span class="font-bold text-blue-400">export</span>
		<span>THEME</span>
		<span class="font-bold text-blue-400">=</span>
		<button onclick={toggleTheme}>{theme}</button>
	</h2>
</section>
