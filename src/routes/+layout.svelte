<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../reset.css';
	import '../app.css';

	import Navbar from '$components/Navbar.svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="background">
	<div class="container">
		<Navbar routes={{ '/': 'Home', '/weather': 'Weather', '/snake': 'Snake' }} />

		<main class="content">
			{@render children()}
		</main>

		<footer>
			<a href="https://github.com/Imad-C/imads-demos">GitHub</a>
		</footer>
	</div>
</div>

<style>
	.background {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		background: var(--colour-black);
	}

	.container {
		padding: var(--spacing-small);
		width: min(100%, 900px);
		min-height: 100vh;
		background: white;
		box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-content: center;
	}
</style>
