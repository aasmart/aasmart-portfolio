<script lang="ts">
	import { afterNavigate, beforeNavigate, disableScrollHandling } from '$app/navigation';
	import Command from '../components/Command.svelte';
	import CommandInput from '../components/CommandInput.svelte';
	import NavButton from '../components/NavButton.svelte';
	import AboutCommandResult from '../components/AboutCommandResult.svelte';
	import ProjectCommandResult from '../components/ProjectCommandResult.svelte';
	import ExperienceCommandResult from '../components/ExperienceCommandResult.svelte';
	import ClearTerminalCommandResut from '../components/ClearTerminalCommandResut.svelte';
	import ThemeCommandResult from '../components/ThemeCommandResult.svelte';
	import UnknownCommandResult from '../components/UnknownCommandResult.svelte';
	import { homeScrollTop, terminalCommandHistory } from '$lib/store';
	import { get } from 'svelte/store';
	import { getContext } from 'svelte';
	import type { Theme } from './+layout.svelte';
	import type { PageProps } from './projects/[slug]/$types';
	import type { Action } from 'svelte/action';

	let { data }: PageProps = $props();

	let projects = $derived(data['projects']);
	let experiences = $derived(data['experiencese']);

	let terminalHistory: string[] = $state(tryRestoreHistory());
	let terminalInput = $state('');
	let updatedTerminalHistory = $state(false);
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
		terminalCommandHistory.set(terminalHistory);
		homeScrollTop.set(terminalHistoryElement.scrollTop);
	}

	/**
    Does not consider the history element as a failure to update
    the history
    */
	function tryRestoreScrollPosition(elt: HTMLElement | undefined) {
		if (!elt) return true;
		if (!get(homeScrollTop)) return false;

		elt.scrollTo({
			top: get(homeScrollTop),
			behavior: 'smooth'
		});

		return true;
	}

	let tryRestoreScrollPosAction: Action = (elt: HTMLElement) => {
		tryRestoreScrollPosition(elt);
	};

	function tryRestoreHistory() {
		const historyJson = get(terminalCommandHistory);
		if (historyJson) {
			return historyJson;
		}
		return ['theme', 'about'];
	}

	afterNavigate(() => {
		disableScrollHandling();
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

	const getTheme: () => Theme = getContext('getTheme');
</script>

<!-- <svelte:window onkeydown={checkShortcut} /> -->

<header class="bg-light-bg dark:bg-gray-bg">
	<nav
		class="sticky px-4 {scrolling ? 'border-b-2 shadow-md' : ''} m-0 border-neutral-50 py-2
			transition-shadow duration-300 dark:border-neutral-900"
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

<ul
	bind:this={terminalHistoryElement}
	use:tryRestoreScrollPosAction
	class="h-full overflow-y-scroll pr-[calc(100%-160ch)]"
	onscroll={onScroll}
>
	{#each terminalHistory as name, index}
		<li class="my-2 px-4">
			<Command
				{name}
				updatedHistory={updatedTerminalHistory}
				isLastCommand={index == terminalHistory.length - 1}
				tryRestoreScrollPosition={() => tryRestoreScrollPosition(terminalHistoryElement)}
			>
				{#if name == 'about'}
					<AboutCommandResult />
				{:else if name == 'projects'}
					<ProjectCommandResult {projects} />
				{:else if name == 'experience'}
					<ExperienceCommandResult {experiences} />
				{:else if name == 'clear'}
					<ClearTerminalCommandResut {clearTerminal} />
				{:else if name == 'theme'}
					<ThemeCommandResult theme={getTheme()} setTheme={getContext('setTheme')} />
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
