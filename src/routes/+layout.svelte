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
		<a href="https://github.com/Imad-C/imads-demos" class="github-link">GitHub</a>
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
		border-bottom: 2px solid var(--black);
		display: flex;
		justify-content: center;
		gap: 0.1rem;
		padding: 0.1rem 0.1rem 0 0.1rem;
		background: var(--dark-gray);
		z-index: 2;
	}

	.navbar-link {
		text-decoration: none;
		color: var(--white);
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
		display: flex;
		justify-content: center;
		gap: 1rem;
		border-top: 2px solid var(--black);
		text-align: center;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		background: var(--dark-gray);
		color: var(--white);
		z-index: 2;
	}

	.github-link {
		text-decoration: underline;
		color: var(--white);
	}

	.footer > *:not(:first-child)::before {
		content: '';
		display: inline-block;
		width: 0.2em;
		height: 0.2em;
		margin: 0 1.2rem 0 0;
		vertical-align: middle;
		border-radius: 50%;
		background: #fff;
	}
</style>
