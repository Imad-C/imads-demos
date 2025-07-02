<script lang="ts">
	import { onMount } from 'svelte';
	import { Game } from '$lib/snake';

	let game: Game;
	let canvas: HTMLCanvasElement;

	onMount(() => {
		game = new Game(canvas, 10);
	});
</script>

<h1>Snake</h1>

<div class="snake-container">
	<canvas width="500" height="500" bind:this={canvas}></canvas>
</div>

<style>
	h1 {
		text-align: center;
	}

	.snake-container {
		/* border: 1px solid black; */
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
