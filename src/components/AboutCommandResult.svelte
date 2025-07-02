<script lang="ts">
	import { base } from '$app/paths';
	import { getContext } from 'svelte';
	import type { Action } from 'svelte/action';

	let focusCommand = getContext<() => void>('requestFocus');

	let focus: Action = (_) => {
		focusCommand();
	};
</script>

<section
	use:focus
	class="flex max-w-[100rem] animate-grow-fade-in flex-col items-center gap-4 rounded-md border-2 border-blue-400 p-2 sm:w-3/4 lg:flex-row"
>
	<img
		class="aspect-square max-h-[18em] rounded-full shadow-lg sm:w-auto"
		src={`${base}/me.png`}
		alt="Me"
	/>
	<div class="flex h-auto flex-col dark:text-gray-50">
		<h2 class="text-center text-xl font-bold lg:text-start">Alexander Smart</h2>
		<h3 class="text-center text-lg dark:text-gray-100 lg:text-start">Student and Developer</h3>
		<hr class="border-1 my-1 rounded-full" />
		<p class="h-max w-full text-center lg:text-start">
			Hi! <span>👋</span> I'm currently an undergraduate student at the University of Michigan
			&mdash; Ann Arbor. I'm pretty interested in most things computer science, but I've discovered
			that I especially enjoy programming languages, systems, and building useful software.

			<br /><br />
			This site is still in its early days, so if it seems a little empty here, it's because it is. However,
			I invite you to have a look around with either the nav buttons, or with the actual command line.
		</p>
		<ul
			class="mt-auto flex flex-row items-center justify-center gap-3 pt-2 text-4xl lg:justify-start"
		>
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
			<li class="h-full align-text-bottom text-lg text-blue-400">aasmart[at]umich[dot].edu</li>
		</ul>
	</div>
</section>
