<script lang="ts">
	import { goto } from '$app/navigation';
	import Card from '$components/Card.svelte';
	import Search from '$components/Search.svelte';
	import Snake from './snake/Snake.svelte';

	let weatherSearchValue = '';

	function weatherRedirect() {
		goto(`/weather?location=${weatherSearchValue}`);
	}
</script>

<div class="container">
	<Card title="Weather" top="0" left="0">
		{#snippet content()}
			<p class="card-text">
				A <a href="/weather">weather app</a> using the
				<a href="https://www.visualcrossing.com/">Visual Crossing</a> API.
			</p>
			<Search bind:value={weatherSearchValue} handler={weatherRedirect} />
		{/snippet}
	</Card>

	<Card title="Snake" top="0" left="0">
		{#snippet content()}
			<p class="card-text">
				A <a href="/snake">game of snake</a> using a HTML canvas element.
			</p>

			<Snake gridSquares={5} canvasWidth={200} canvasHeight={200} />
		{/snippet}
	</Card>
</div>

<style>
	.container {
		position: relative;
	}

	.card-text {
		margin-bottom: var(--spacing-small);
	}
</style>
