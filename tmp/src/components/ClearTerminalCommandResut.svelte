<script lang="ts">
	let { clearTerminal }: { clearTerminal: () => void } = $props();

	$effect(clearTerminal);
</script>
