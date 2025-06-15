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
	}

	.navbar {
		border-bottom: 1px solid var(--gray);
		display: flex;
		gap: 0.1rem;
		padding: 0.1rem 0.1rem 0 0.1rem;
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
	}
</style>
