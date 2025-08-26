<script lang="ts">
	import type { Snippet } from 'svelte';

	let { content }: { content: Snippet } = $props();
</script>

<div class="container">
	{@render content()}
</div>

<style>
	.container {
		border: solid var(--colour-silver) 1px;
		border-radius: var(--border-radius-medium);
		box-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
		padding: var(--spacing-small);
	}
</style>
