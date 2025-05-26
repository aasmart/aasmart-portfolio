<script lang="ts">
	import type { Action } from "svelte/action";

    let { name, focusCommand }: { name: string, focusCommand: () => void } = $props();

    let focus: Action = (_) => {
        focusCommand();
    }
</script>

<p use:focus class="dark:text-gray-50">Unrecognized command '{name}'</p>