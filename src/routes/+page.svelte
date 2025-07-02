<script module lang="ts">
	export type Theme = 'light' | 'dark';
</script>

<script lang="ts">
	import {
		afterNavigate,
		beforeNavigate,
		disableScrollHandling,
		replaceState
	} from '$app/navigation';
	import { page } from '$app/state';
	import Command from '../components/Command.svelte';
	import CommandInput from '../components/CommandInput.svelte';
	import NavButton from '../components/NavButton.svelte';
	import AboutCommandResult from '../components/AboutCommandResult.svelte';
	import ProjectCommandResult from '../components/ProjectCommandResult.svelte';
	import ExperienceCommandResult from '../components/ExperienceCommandResult.svelte';
	import ClearTerminalCommandResut from '../components/ClearTerminalCommandResut.svelte';
	import ThemeCommandResult from '../components/ThemeCommandResult.svelte';
	import UnknownCommandResult from '../components/UnknownCommandResult.svelte';
	import { onMount } from 'svelte';

	let terminalHistory: string[] = $state(tryRestoreHistory());
	let terminalInput = $state('');
	let updatedTerminalHistory = $state(false);
	// svelte-ignore non_reactive_update
	let terminalHistoryElement: HTMLElement;

	function addToHistory(command: string) {
		terminalHistory.push(command);
		updatedTerminalHistory = true;
	}

	function clearTerminal() {
		terminalHistory = [];
	}

	function submitTerminalInput(e: KeyboardEvent) {
		const key = e.code || e.key;
		if (key == 'Enter') {
			addToHistory(terminalInput);
			terminalInput = '';
		}
	}

	function storeStateInHistory() {
		const newState = {
			lastScrollPosition: terminalHistoryElement.scrollTop,
			terminalHistory: JSON.stringify(terminalHistory)
		};
		replaceState('', newState);
	}

	/**
    Does not consider the history element as a failure to update
    the history
    */
	function tryRestoreScrollPosition() {
		if (!terminalHistoryElement) return true;
		if (!page.state.lastScrollPosition) return false;

		terminalHistoryElement.scrollTo({
			top: page.state.lastScrollPosition,
			behavior: 'smooth'
		});

		return true;
	}

	function tryRestoreHistory() {
		const historyJson = page.state.terminalHistory;
		if (historyJson) {
			return JSON.parse(historyJson);
		}
		return ['theme', 'about'];
	}

	afterNavigate(() => {
		disableScrollHandling();
		tryRestoreHistory();
		setTheme(getTheme());
	});

	beforeNavigate(() => {
		storeStateInHistory();
	});

	$effect.pre(() => {
		if ('scrollRestoration' in window.history) {
			window.history.scrollRestoration = 'manual';
		}
	});

	let scrolling = $state(false);
	let onScroll = function () {
		if (!terminalHistoryElement) return false;
		scrolling = terminalHistoryElement.scrollTop > 0;
	};

	// theme handling
	// ========================
	let theme = $state<Theme>('light');
	function getTheme(): Theme {
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

	onMount(() => {
		setTheme(getTheme());
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
</script>

<!-- <svelte:window onkeydown={checkShortcut} /> -->

<header class="bg-light-bg dark:bg-gray-bg">
	<nav
		class="sticky px-4 {scrolling
			? 'border-b-2 shadow-md'
			: ''} m-0 border-neutral-50 py-2 transition-shadow duration-300 dark:border-neutral-900"
	>
		<h1 class="flex h-12 flex-row items-center gap-2 text-4xl text-gray-900 dark:text-gray-50">
			<span class="h-min text-center text-blue-400">❯</span>
			<span class="h-min text-center">aasmart</span>
		</h1>
		<ul class="flex flex-row flex-wrap gap-2">
			<NavButton command={'about'} {addToHistory} />
			<NavButton command={'projects'} {addToHistory} />
			<NavButton command={'experience'} {addToHistory} />
			<NavButton command={'theme'} {addToHistory} />
			<NavButton command={'clear'} {addToHistory} />
		</ul>
	</nav>
</header>

<ul bind:this={terminalHistoryElement} class="h-full overflow-y-scroll" onscroll={onScroll}>
	{#each terminalHistory as name, index}
		<li class="my-2 px-4">
			<Command
				{name}
				updatedHistory={updatedTerminalHistory}
				isLastCommand={index == terminalHistory.length - 1}
				{tryRestoreScrollPosition}
			>
				{#if name == 'about'}
					<AboutCommandResult />
				{:else if name == 'projects'}
					<ProjectCommandResult />
				{:else if name == 'experience'}
					<ExperienceCommandResult />
				{:else if name == 'clear'}
					<ClearTerminalCommandResut {clearTerminal} />
				{:else if name == 'theme'}
					<ThemeCommandResult {theme} {setTheme} />
				{:else}
					<UnknownCommandResult {name} />
				{/if}
			</Command>
		</li>
	{/each}
	<li class="command-prompt sticky bottom-0 my-2 bg-light-bg dark:bg-gray-bg">
		<CommandInput
			class="px-4 text-2xl dark:text-gray-50"
			bind:commandText={terminalInput}
			submitCommand={submitTerminalInput}
		/>
	</li>
</ul>

<style>
</style>
