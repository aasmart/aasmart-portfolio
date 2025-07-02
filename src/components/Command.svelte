<script lang="ts">
	import type { Action } from 'svelte/action';
	import { setContext, type Snippet } from 'svelte';

	let {
		name,
		updatedHistory,
		isLastCommand,
		tryRestoreScrollPosition,
		children
	}: {
		name: string;
		updatedHistory: boolean;
		isLastCommand: boolean;
		tryRestoreScrollPosition: () => boolean;
		children: Snippet;
	} = $props();
	let commandName: HTMLParagraphElement;

	// I'm not sure how to correctly do this, but essentially this is duplicated
	// because awaits happen late, but some elements need to focus when the command is
	// bound.
	let requestFocus = () => {
		focusAction(commandName);
	};

	let focusAction: Action = (node: HTMLElement) => {
		const didRestore = !updatedHistory && tryRestoreScrollPosition();
		if (node && !didRestore && isLastCommand) {
			node.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	};

	setContext('requestFocus', requestFocus);
</script>

<div bind:this={commandName} use:focusAction>
	<h2 class="my-3 text-2xl text-gray-900 dark:text-gray-50">
		<span class="text-blue-400">❯</span>
		{name}
	</h2>
	{@render children?.()}
</div>
