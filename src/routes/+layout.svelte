<script module lang="ts">
	export type Theme = 'light' | 'dark';
</script>

<script lang="ts">
	import { onMount, setContext } from 'svelte';

	import '../app.css';
	import { afterNavigate } from '$app/navigation';
	import { base } from '$app/paths';
	let { children } = $props();

	// theme handling
	// ========================
	let theme = $state<Theme>('light');
	function getStoredOrPreferredTheme(): Theme {
		if ('theme' in window.localStorage) {
			const theme = window.localStorage.getItem('theme');
			if (theme) {
				return theme as Theme;
			}
		}
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			return 'dark';
		}
		return 'light';
	}

	function setTheme(newTheme: Theme) {
		theme = newTheme;
	}

	function getTheme() {
		return theme;
	}

	afterNavigate(() => {
		setTheme(getStoredOrPreferredTheme());
	});

	onMount(() => {
		setTheme(getStoredOrPreferredTheme());
	});

	$effect(() => {
		if (theme === 'light') {
			document.documentElement.classList.add('light');
			document.documentElement.classList.remove('dark');
		} else {
			document.documentElement.classList.add('dark');
			document.documentElement.classList.remove('light');
		}
		window.localStorage.setItem('theme', theme);
	});

	setContext('getTheme', getTheme);
	setContext('setTheme', setTheme);
</script>

{@render children()}

<style>
	:global(body) {
		height: 100dvh;
		display: flex;
		flex-direction: column;
	}
	:global(*, *::after, *::before) {
		box-sizing: border-box;
	}
	:global(*:not(i), *:not(i)::after, *:not(i)::before) {
		font-family: 'JetBrains Mono', monospace;
	}
</style>
