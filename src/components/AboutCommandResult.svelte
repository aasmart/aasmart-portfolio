<script lang="ts">
	import type { Action } from 'svelte/action';

	let { focusCommand }: { focusCommand: () => void } = $props();
	$effect(() => {
		focusCommand();
	});
	let focus: Action = (_) => {
		focusCommand();
	};
</script>

<section
	use:focus
	class="flex w-max max-w-full animate-grow-fade-in flex-col gap-4 rounded-md border-2 border-blue-400 p-2 sm:flex-row"
>
	{focusCommand()}
	<img class="aspect-square max-w-[16em] rounded-md shadow-lg" src={'/me.png'} alt="Me" />
	<div class="flex h-auto flex-col dark:text-gray-50">
		<h2 class="text-xl font-bold">Alexander Smart</h2>
		<h3 class="text-lg dark:text-gray-100">Software Engineer</h3>
		<hr class="border-1 my-1 rounded-full" />
		<p>
			Hi! <span>👋</span> I'm currently an undergraduate student at the University of Michigan -- Ann
			Arbor.
		</p>
		<ul class="mt-auto flex flex-row gap-3 pt-2 text-4xl">
			<li>
				<a
					class="text-blue-400 transition-colors duration-200 hover:text-blue-500 focus:text-blue-500"
					href="https://github.com/aasmart"
					aria-label="LinkedIn"
				>
					<i class="fa-brands fa-github"></i>
				</a>
			</li>
			<li>
				<a
					class="text-blue-400 transition-colors duration-200 hover:text-blue-500 focus:text-blue-500"
					href="https://linkedin.com/in/aasmart"
					aria-label="Github"
				>
					<i class="fa-brands fa-linkedin"></i>
				</a>
			</li>
		</ul>
	</div>
</section>
