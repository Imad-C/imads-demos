<script lang="ts">
	import type { Snippet } from 'svelte';

	let { content, title }: { content: Snippet; title?: string } = $props();
</script>

<div class="container">
	<p class="title">{title}</p>
	<div class="content">
		{@render content()}
	</div>
</div>

<style>
	.container {
		border: solid var(--colour-silver) 3px;
		border-radius: var(--border-radius-medium);
		box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
	}

	.container > * {
		padding: var(--spacing-small);
	}

	.title {
		font-size: 1.2rem;
		border-bottom: solid 1px var(--colour-silver);
	}

	.content {
		border-radius: 0 var(--border-radius-small);
	}
</style>
