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
			<Circle text={gameScore.toString()} />
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
		/* background: var(--colour-platinum); */
		border-radius: var(--border-radius-medium);
		padding: var(--spacing-small);
		flex: 1;
	}

	.high-current {
		display: flex;
		justify-content: space-between;
	}

	.score {
		text-align: center;
	}
</style>
