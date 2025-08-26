<script lang="ts">
	import Card from '$components/Card.svelte';
</script>

<div class="container">
	<Card>
		{#snippet content()}
			<h2 class="demo-title">Weather</h2>
			<p>
				A <a href="/weather">weather app</a> using the
				<a href="https://www.visualcrossing.com/">Visual Crossing</a> API.
			</p>
		{/snippet}
	</Card>

	<Card>
		{#snippet content()}
			<h2 class="demo-title">Snake</h2>
			<p>
				A <a href="/snake">game of snake</a> using a HTML canvas element.
			</p>
		{/snippet}
	</Card>
</div>

<button>click</button>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-medium);
	}
</style>
