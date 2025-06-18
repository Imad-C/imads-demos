<script lang="ts">
	import type { WeatherDay } from '$lib/weather';

	export let location: string = '';
	export let weatherDay: WeatherDay;
</script>

<div class="container">
	<p class="datetime">{weatherDay.datetime}</p>
	{#if location}
		<p>{location}</p>
	{/if}
	<p class="today">{Math.round(weatherDay.temp)}</p>
	<p>{weatherDay.conditions}</p>
	<div class="range-container">
		<p>H:{Math.round(weatherDay.tempmax)}</p>
		<p>L:{Math.round(weatherDay.tempmin)}</p>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative; /* Add this */

		border: 3px solid rgb(86, 86, 152, 0.2);
		border-radius: 5px;
		background-color: var(--light-gray);
		padding: 1rem;
		min-width: 6rem;

		font-family: 'SairaCondensed', sans-serif;
		line-height: 1;
	}

	.datetime {
		position: absolute;
		top: -1.2em;
	}

	.today {
		font-size: 4rem;
		padding: 0;
		margin: 0;
	}

	.range-container {
		display: flex;
		gap: 0.5rem;
		padding-top: 0.3rem;
	}
</style>
