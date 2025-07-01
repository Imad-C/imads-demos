<script lang="ts">
	import { onMount } from 'svelte';
	import type { Direction } from '$lib/snake';
	import { Snake } from '$lib/snake';

	let HTMLboard: HTMLElement;
	let snake: Snake;

	onMount(() => {
		snake = new Snake();
		snake.draw(HTMLboard);
	});

	function handleChangeDirection(direction: Direction) {
		snake.changeDirection(direction);
	}

	function handleMove() {
		snake.move();
		snake.draw(HTMLboard);
	}
</script>

<h1>Snake</h1>

<div class="snake-container">
	<div class="snake-board" bind:this={HTMLboard}></div>
</div>

<div>
	<button onclick={() => handleChangeDirection({ x: 0, y: -1 })}>up</button>
	<button onclick={() => handleChangeDirection({ x: 1, y: 0 })}>right</button>
	<button onclick={() => handleChangeDirection({ x: 0, y: 1 })}>down</button>
	<button onclick={() => handleChangeDirection({ x: -1, y: 0 })}>left</button>
	<button onclick={handleMove}>move</button>
</div>

<style>
	h1 {
		text-align: center;
	}

	.snake-container {
		border: 1px solid black;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.snake-board {
		border: 1px solid black;
		height: 80vmin;
		width: 80vmin;
		display: grid;
		grid-template-columns: repeat(21, 1fr);
		grid-template-rows: repeat(21, 1fr);
	}

	:global(.snake) {
		background: var(--black);
		border: 0.25vmin solid var(--gray);
	}

	:global(.snake-head) {
		background: var(--blue);
		border: 0.25vmin solid var(--gray);
	}

	:global(.food) {
		background: var(--white);
		border: 0.25vmin solid var(--gray);
	}
</style>
