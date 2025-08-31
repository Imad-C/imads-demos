<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { Direction } from '$lib/snake';
	import { Game } from '$lib/snake';

	let {
		gridSquares = 11,
		canvasWidth = 500,
		canvasHeight = 500
	}: { gridSquares?: number; canvasWidth?: number; canvasHeight?: number } = $props();

	let game: Game | null = $state(null);
	let canvas: HTMLCanvasElement | null = $state(null);

	onMount(() => {
		game = new Game(canvas!, gridSquares);
		const unmountKeyPress = mountKeyPress();

		onDestroy(() => {
			unmountKeyPress();
		});
	});

	function handleChangeDirection(direction: Direction) {
		game!.snake.updateDirection(direction);
	}

	function mountKeyPress() {
		const handleKeyDown = (event: KeyboardEvent) => {
			switch (event.key) {
				case 'ArrowUp':
				case 'w':
					handleChangeDirection({ x: 0, y: -1 });
					break;
				case 'ArrowRight':
				case 'd':
					handleChangeDirection({ x: 1, y: 0 });
					break;
				case 'ArrowDown':
				case 's':
					handleChangeDirection({ x: 0, y: 1 });
					break;
				case 'ArrowLeft':
				case 'a':
					handleChangeDirection({ x: -1, y: 0 });
					break;
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}
</script>

<div class="snake-container">
	{#if game}
		<button onclick={() => game!.run()} class="start-button">start</button>
	{:else}
		<p>Loading...</p>
	{/if}
	<canvas width={canvasWidth} height={canvasHeight} bind:this={canvas}></canvas>
</div>

<style>
	.snake-container {
		position: relative;
	}

	.start-button {
		position: absolute;
		left: 46.3%;
		top: 48%;
	}
</style>
