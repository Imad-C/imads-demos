<script lang="ts">
	import Snake from './Snake.svelte';

	let gameScore = $state<number>(0);
	let highScore = $state<number>(0);

	function useOnScore(score: number) {
		gameScore = score;
	}

	function useOnStop() {
		console.log('on stop triggered');
		console.log('gameScore:', gameScore, ' highScore:', highScore);
		if (gameScore > highScore) {
			highScore = gameScore;
			console.log('new high score');
		}
	}
</script>

<div class="container">
	<Snake {useOnScore} {useOnStop} />

	<div class="menu">
		<p class="score">Current Score: {gameScore}</p>
		<p class="score">High score: {highScore}</p>
	</div>
</div>

<style>
	.container {
		display: flex;
		gap: var(--spacing-medium);
		width: 100%;
	}

	.menu {
		background: var(--colour-platinum);
		border-radius: var(--border-radius-medium);
		padding: var(--spacing-small);
		flex: 1;
	}

	.score {
		text-align: center;
		font-size: 32px;
	}
</style>
