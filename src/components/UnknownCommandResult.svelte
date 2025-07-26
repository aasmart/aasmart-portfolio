<script lang="ts">
	import { getContext } from 'svelte';
	import type { Action } from 'svelte/action';

	let { name }: { name: string } = $props();

	let focusCommand = getContext<() => void>('requestFocus');
	let focus: Action = () => {
		focusCommand();
	};
</script>

<p use:focus class="dark:text-gray-50">Unrecognized command '{name}'</p>
