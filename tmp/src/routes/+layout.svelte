<script lang="ts">
	import '../app.css';
	let { children } = $props();
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
