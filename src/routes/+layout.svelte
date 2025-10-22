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

		<footer class="footer">
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
	}

	.container {
		display: flex;
		flex-direction: column;
		width: min(100%, 900px);
		min-height: 100vh;
		background: white;
	}

	.content {
		flex: 1;
		padding: var(--spacing-small);
		display: flex;
		flex-direction: column;
		align-items: start;
		font-family: 'Slabo', sans-serif;
	}

	.footer {
		padding: var(--spacing-small) 0;
		border-top: solid var(--colour-silver) 1px;
	}
</style>
