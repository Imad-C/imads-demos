<script lang="ts">
	import Snake from './Snake.svelte';
	import Circle from '$components/Circle.svelte';

	let gameScore = $state<number>(0);
	let highScore = $state<number>(0);

	function useOnScore(score: number) {
		gameScore = score;
	}

	function useOnStop() {
		if (gameScore > highScore) {
			highScore = gameScore;
		}
	}
</script>

<div class="container">
	<Snake {useOnScore} {useOnStop} />

	<div class="menu">
		<div class="high-current">
			<div class="score">
				<p>Current Score</p>
				<p class="score-number">{gameScore}</p>
			</div>

			<div class="score">
				<p>High Score</p>
				<p class="score-number">{highScore}</p>
			</div>
		</div>
	</div>
</div>

<style>
	.container {
		display: flex;
		gap: var(--spacing-medium);
		width: 100%;
	}

	.menu {
		border-radius: var(--border-radius-medium);
		padding: var(--spacing-small);
	}

	.high-current {
		display: flex;
		gap: var(--spacing-large);
	}

	.score {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-small);
	}

	.score-number {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: var(--spacing-medium);
		border: solid lightgreen 5px;
		border-radius: 50%;
		width: 4.5rem;
		height: 4.5rem;
		font-size: 3rem;
		box-shadow: 0px 0px 0px 2px darkgreen;
	}
</style>
