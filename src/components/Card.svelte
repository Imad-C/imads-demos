<script lang="ts">
	import { onMount, type Snippet } from 'svelte';

	let {
		content,
		title,
		top = '0px',
		left = '0px'
	}: { content: Snippet; title?: string; top?: string; left?: string } = $props();

	let container: HTMLDivElement;
	let dragger: HTMLImageElement;
	let pos1 = 0;
	let pos2 = 0;
	let pos3 = 0;
	let pos4 = 0;

	onMount(() => {
		dragger.onmousedown = dragMouseDown;
	});

	function dragMouseDown(e: MouseEvent) {
		e.preventDefault();
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		document.onmousemove = elementDrag;
		console.log('dragMouseDown');
	}

	function elementDrag(e: MouseEvent) {
		e.preventDefault();
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		container.style.top = container.offsetTop - pos2 + 'px';
		container.style.left = container.offsetLeft - pos1 + 'px';
		console.log('elementDrag');
	}

	function closeDragElement() {
		document.onmouseup = null;
		document.onmousemove = null;
		console.log('closeDragElement');
	}
</script>

<div class="container" bind:this={container} style={`top: ${top}; left: ${left};`}>
	<img
		src="/drag.svg"
		alt="An icon to indicate a draggable UI element."
		class="dragger"
		bind:this={dragger}
	/>
	<p class="title">{title}</p>
	<div class="content">
		{@render content()}
	</div>
</div>

<style>
	.container {
		position: absolute;
		border: solid var(--colour-silver) 3px;
		border-radius: var(--border-radius-medium);
		box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
		min-width: 300px;
		background: white;
	}

	.container > * {
		padding: var(--spacing-small);
	}

	.dragger {
		width: 20px;
		height: 20px;
		position: absolute;
		top: -15px;
		left: -15px;
		transition: transform 0.2s ease-in-out;
	}

	.dragger:hover {
		cursor: grab;
		transform: rotate(90deg);
	}

	.title {
		font-size: 1.2rem;
		border-bottom: solid 1px var(--colour-silver);
	}

	.content {
		border-radius: 0 var(--border-radius-small);
	}
</style>
