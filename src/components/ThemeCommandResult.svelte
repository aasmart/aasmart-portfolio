<script lang="ts">
	import { getContext } from 'svelte';
	import type { Action } from 'svelte/action';
	import type { Theme } from '../routes/+layout.svelte';

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
</script>

<section use:focus class="text-gray-900 motion-safe:animate-grow-fade-in dark:text-gray-50">
	<h2 class="flex w-full flex-row items-center gap-2 text-xl">
		<span class="font-bold text-blue-400">export</span>
		<span>THEME</span>
		<span class="font-bold text-blue-400">=</span>
		<button
			class="group relative aspect-square overflow-hidden rounded-md border-2 border-blue-400 p-2"
			onclick={toggleTheme}
			aria-label="Toggle theme"
		>
			<span
				class="inline-block aspect-square h-8 w-8 rounded-full bg-amber-400 shadow-[0_0_2px_2px]
					shadow-amber-400 transition-all group-hover:bg-blue-200 group-hover:shadow-blue-200
					dark:bg-blue-200 dark:shadow-blue-200 dark:group-hover:bg-amber-400
					dark:group-hover:shadow-amber-400"
			></span>
			<span
				class="absolute -right-7 -top-3 aspect-square h-8 w-8 rounded-full bg-light-bg
					shadow-[0_0_2px_2px] shadow-light-bg/30 transition-[top,right] group-hover:-right-[2px]
					group-hover:top-[3px] dark:-right-[2px] dark:top-[3px] dark:bg-gray-bg
					dark:shadow-gray-bg/30 dark:group-hover:-right-7 dark:group-hover:-top-3"
			></span>
		</button>
	</h2>
</section>
