<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { Direction } from '$lib/snake';
	import { Game } from '$lib/snake';

	let {
		gridSquares = 11,
		canvasWidth = 500,
		canvasHeight = 500
	}: { gridSquares?: number; canvasWidth?: number; canvasHeight?: number } = $props();

	let game = $state<Game | null>(null);
	let gameRunning = $state<boolean>(false);
	let canvas: HTMLCanvasElement | null = $state(null);
	let buttonText = $state('Start');

	onMount(() => {
		game = new Game(canvas!, gridSquares);
		const unmountKeyPress = mountKeyPress();
		game.onStop = () => {
			gameRunning = false;
			buttonText = 'Start';
		};

		onDestroy(() => {
			unmountKeyPress();
		});
	});

	function handleChangeDirection(direction: Direction) {
		game!.snake.updateDirection(direction);
	}

	function mountKeyPress() {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (!gameRunning) return;
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

	function startCountdown(n: number, ms: number = 1000, onFinish: () => void) {
		if (n === 0) {
			onFinish?.();
			return;
		}

		buttonText = String(n);

		setTimeout(() => {
			startCountdown(n - 1, ms, onFinish);
		}, ms);
	}

	function startGame() {
		startCountdown(3, 500, () => {
			game?.run();
			gameRunning = true;
		});
	}
</script>

<div class="snake-container">
	{#if !gameRunning}
		<button onclick={startGame} class="start-button">{buttonText}</button>
	{/if}
	<canvas width={canvasWidth} height={canvasHeight} bind:this={canvas}></canvas>
</div>

<style>
	.snake-container {
		position: relative;
	}

	.start-button {
		height: 50px;
		width: 50px;
		border-radius: 50%;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
</style>
