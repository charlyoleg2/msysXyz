<script lang="ts">
	import { resolve, asset } from '$app/paths';
	import type { Snippet } from 'svelte';

	// props
	interface Props {
		children?: Snippet;
	}
	let { children }: Props = $props();
</script>

<header>
	<a href={resolve('/')} style="text-decoration:none;color:navy;">
		<h1>
			<img src={asset('/systemix_logo.svg')} alt="Feli's logo" width="42" height="42" />
			sysXyz pages
		</h1>
	</a>
</header>

<main>
	{@render children?.()}
</main>

<footer>
	<h3>Links around Feli</h3>
	<ol>
		<li><a href="https://www.npmjs.com/package/systemix">npm package</a></li>
		<li><a href="https://www.npmjs.com/package/create-systemix">npm package create</a></li>
		<li><a href="https://github.com/charlyoleg2/msysXyz">Github</a></li>
		<li><a href="https://charlyoleg2.github.io/msysXyz">Github pages</a></li>
	</ol>
</footer>

<style>
	:global(body) {
		font-family: 'Courier New', 'Helvetica', 'Arial', 'Verdana';
		margin: 0;
		background-color: mediumAquamarine;
	}
	main {
		background-color: lightCyan;
		min-height: 70vh;
	}
</style>
