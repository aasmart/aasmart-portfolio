<script lang="ts">
	import type { Action } from 'svelte/action';
	import AboutCommandResult from './AboutCommandResult.svelte';
	import ProjectCommandResult from './ProjectCommandResult.svelte';
	import UnknownCommandResult from './UnknownCommandResult.svelte';
	import ExperienceCommandResult from './ExperienceCommandResult.svelte';

	let { name, isLastCommand }: { name: string; isLastCommand: boolean } = $props();
	let commandName: HTMLParagraphElement;

	// I'm not sure how to correctly do this, but essentially this is duplicated
	// because awaits happen late, but some elements need to focus when the command is
	// bound.
	let requestFocus = () => {
		focusAction(commandName);
	};

	let focusAction: Action = (node: HTMLElement) => {
		if (node && isLastCommand) {
			node.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	};
</script>

<div bind:this={commandName} use:focusAction>
	<h2 class="my-3 text-2xl text-gray-900 dark:text-gray-50">
		<span class="text-blue-400">❯</span>
		{name}
	</h2>
	{#if name.toLocaleLowerCase() == 'about'}
		<AboutCommandResult focusCommand={requestFocus} />
	{:else if name.toLocaleLowerCase() == 'projects'}
		<ProjectCommandResult focusCommand={requestFocus} />
	{:else if name.toLocaleLowerCase() == 'experience'}
		<ExperienceCommandResult {requestFocus} />
	{:else}
		<UnknownCommandResult {name} focusCommand={requestFocus} />
	{/if}
</div>

