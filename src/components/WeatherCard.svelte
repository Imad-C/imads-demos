<script lang="ts">
	import type { WeatherDay } from '$lib/weather';

	export let location: string = '';
	export let weatherDay: WeatherDay;
</script>

<div class="container">
	{#if location}
		<p class="location-name">{location}</p>
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
		font-family: 'SairaCondensed', sans-serif;
		line-height: 1;
	}

	.location-name {
		font-size: 1.4rem;
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
