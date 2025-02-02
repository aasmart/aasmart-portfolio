<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

{@render children()}

<style>
	:global(html) {
		background-color: #202229;
	}
	:global(body) {
		padding: 8px;
		height: 100dvh;
	}
	:global(*, *::after, *::before) {
		box-sizing: border-box;
	}
</style>