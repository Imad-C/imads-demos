<script lang="ts">
	import { page } from '$app/state';
	import '../app.css';

	const routes = { '/': 'Home', '/weather': 'Weather' };
</script>

<div class="layout-container">
	<nav class="navbar">
		{#each Object.entries(routes) as [route, routeName]}
			<a class="navbar-link" class:navbar-link-selected={page.url.pathname === route} href={route}
				>{routeName}</a
			>
		{/each}
	</nav>

	<main class="layout-main">
		<slot />
	</main>

	<footer class="footer">
		<p>Made by Imad</p>
	</footer>
</div>

<style>
	.layout-container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.layout-main {
		flex: 1;
		box-sizing: border-box;
		padding: 1rem 2rem 1.2rem 2rem;
		display: flex;
		flex-direction: column;
		max-width: 1200px;
		margin: 0 auto;
		background: var(--light-gray);
		width: 100%;
	}

	.navbar {
		position: sticky;
		top: 0;
		border-bottom: 1px solid var(--gray);
		display: flex;
		justify-content: center;
		gap: 0.1rem;
		padding: 0.1rem 0.1rem 0 0.1rem;
		background: white;
	}

	.navbar-link {
		text-decoration: none;
		color: var(--black);
		padding: 0 0.5rem;
		border-radius: 3px 3px 0px 0px;
	}

	.navbar-link-selected {
		background: var(--gray-highlight);
	}

	.navbar-link:hover {
		background: var(--gray-highlight);
	}

	.footer {
		border-top: 1px solid var(--gray);
		text-align: center;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		background: white;
	}
</style>
