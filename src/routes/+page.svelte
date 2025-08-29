<script lang="ts">
	import Card from '$components/Card.svelte';
</script>

<div class="container">
	<Card title="Weather">
		{#snippet content()}
			<p>
				A <a href="/weather">weather app</a> using the
				<a href="https://www.visualcrossing.com/">Visual Crossing</a> API.
			</p>
		{/snippet}
	</Card>

	<Card title="Snake">
		{#snippet content()}
			<p>
				A <a href="/snake">game of snake</a> using a HTML canvas element.
			</p>
		{/snippet}
	</Card>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--spacing-medium);
	}
</style>
