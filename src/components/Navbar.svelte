<script lang="ts">
	import { page } from '$app/state';

	let { routes }: { routes: Record<string, string> } = $props();
	let currentRouteName = $derived(routes[page.url.pathname]);
</script>

<div class="container">
	<nav class="navbar">
		{#each Object.entries(routes) as [route, routeName]}
			<a
				class="navbar-link"
				class:navbar-link-selected={routeName === currentRouteName}
				href={route}>{routeName}</a
			>
		{/each}
	</nav>
	<h1 class="title">{currentRouteName}</h1>
</div>

<style>
	.container {
		display: flex;
		align-items: center;
		margin-bottom: var(--spacing-medium);
	}

	.title {
		font-size: 1.5rem;
		margin-right: var(--spacing-small);
	}

	.navbar {
		display: flex;
		gap: var(--spacing-small);
		padding: var(--spacing-small);
		margin-right: auto;
		border: solid var(--colour-silver) 1px;
		border-radius: var(--border-radius-medium);
		box-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
	}

	.navbar-link {
		padding: var(--spacing-small) var(--spacing-medium);
		border-radius: var(--border-radius-small);
		color: inherit;
		text-decoration: inherit;
	}

	.navbar-link-selected {
		background: var(--colour-silver);
	}

	.navbar-link:hover {
		position: relative;
		top: -2px;
		background: var(--colour-silver);
	}
</style>
