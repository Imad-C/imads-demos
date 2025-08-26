<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { Direction } from '$lib/snake';
	import { Game } from '$lib/snake';

	let game: Game | null = $state(null);
	let canvas: HTMLCanvasElement | null = $state(null);

	onMount(() => {
		game = new Game(canvas!, 11);
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

{#if game}
	<div>
		<div>
			<button onclick={() => game!.run()}>start</button>
		</div>
	</div>
{:else}
	<p>Loading...</p>
{/if}

<div class="snake-container">
	<canvas width="500" height="500" bind:this={canvas}></canvas>
</div>

<style>
	h1 {
		text-align: center;
	}

	.snake-container {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
