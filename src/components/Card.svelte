<script lang="ts">
	import { type Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	interface Props {
		content: Snippet;
		title?: string;
		minWidth?: string;
	}

	let { content, title, ...rest }: Props & SvelteHTMLElements['div'] = $props();

	let container: HTMLDivElement;
</script>

<div class="container" bind:this={container} {...rest}>
	<p class="title">{title}</p>
	<div class="content">
		{@render content()}
	</div>
</div>

<style>
	.container {
		border: solid var(--colour-silver) 3px;
		border-radius: var(--border-radius-medium);
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
		background: white;
		padding: var(--spacing-small);
	}

	.title {
		text-align: center;
		font-size: 1.2rem;
		margin-bottom: var(--spacing-small);
	}

	.content {
		border-radius: 0 var(--border-radius-small);
	}
</style>
