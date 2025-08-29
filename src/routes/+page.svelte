<script lang="ts">
	import Card from '$components/Card.svelte';
	import Search from '$components/Search.svelte';
</script>

<div class="container">
	<Card title="Weather" top="300px" left="300px">
		{#snippet content()}
			<p>
				A <a href="/weather">weather app</a> using the
				<a href="https://www.visualcrossing.com/">Visual Crossing</a> API.
			</p>
			<Search value="null" handler={() => {}} />
		{/snippet}
	</Card>

	<Card title="Snake" top="100px" left="700px">
		{#snippet content()}
			<p>
				A <a href="/snake">game of snake</a> using a HTML canvas element.
			</p>
		{/snippet}
	</Card>
</div>

<style>
	.container {
		/* display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--spacing-medium); */
		position: relative;
	}
</style>
