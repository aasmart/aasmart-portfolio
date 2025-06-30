<script lang="ts">
	import type { Action } from 'svelte/action';
	import AboutCommandResult from './AboutCommandResult.svelte';
	import ProjectCommandResult from './ProjectCommandResult.svelte';
	import UnknownCommandResult from './UnknownCommandResult.svelte';
	import ExperienceCommandResult from './ExperienceCommandResult.svelte';
	import ClearTerminalCommandResut from './ClearTerminalCommandResut.svelte';

	let {
		name,
		isLastCommand,
		tryRestoreScrollPosition,
		clearTerminal
	}: {
		name: string;
		isLastCommand: boolean;
		tryRestoreScrollPosition: () => boolean;
		clearTerminal: () => void;
	} = $props();
	let commandName: HTMLParagraphElement;
	let nameLower = $state(name.toLocaleLowerCase());

	// I'm not sure how to correctly do this, but essentially this is duplicated
	// because awaits happen late, but some elements need to focus when the command is
	// bound.
	let requestFocus = () => {
		focusAction(commandName);
	};

	let focusAction: Action = (node: HTMLElement) => {
		if (node && isLastCommand) {
			if (!tryRestoreScrollPosition()) {
				node.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			}
		}
	};
</script>

<div bind:this={commandName} use:focusAction>
	<h2 class="my-3 text-2xl text-gray-900 dark:text-gray-50">
		<span class="text-blue-400">❯</span>
		{name}
	</h2>
	{#if nameLower == 'about'}
		<AboutCommandResult focusCommand={requestFocus} />
	{:else if nameLower == 'projects'}
		<ProjectCommandResult focusCommand={requestFocus} />
	{:else if nameLower == 'experience'}
		<ExperienceCommandResult {requestFocus} />
	{:else if nameLower == 'clear'}
		<ClearTerminalCommandResut {clearTerminal} />
	{:else}
		<UnknownCommandResult {name} focusCommand={requestFocus} />
	{/if}
</div>
