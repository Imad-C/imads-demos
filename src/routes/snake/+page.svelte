<script lang="ts">
	import { onMount } from 'svelte';
	import type { Direction } from '$lib/snake';
	import { Game } from '$lib/snake';

	let game: Game;
	let canvas: HTMLCanvasElement;

	onMount(() => {
		game = new Game(canvas, 10);
	});

	function handleMove(direction: Direction) {
		game.snake.direction = direction;
		game.update();
		game.draw();
	}
</script>

<h1>Snake</h1>

<div class="snake-container">
	<canvas width="500" height="500" bind:this={canvas}></canvas>
</div>

<div>
	<button onclick={() => handleMove({ x: 0, y: -1 })}>up</button>
	<button onclick={() => handleMove({ x: 1, y: 0 })}>right</button>
	<button onclick={() => handleMove({ x: 0, y: 1 })}>down</button>
	<button onclick={() => handleMove({ x: -1, y: 0 })}>left</button>
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
