<script lang="ts">
	import type { WeatherDay } from '$lib/weather';

	export let location: string = '';
	export let weatherDay: WeatherDay;

	function formatDate(datetime: string): string {
		const date = new Date(datetime);
		const day = date.toLocaleDateString('en-UK', { weekday: 'short' });
		const dayNumber = date.getDate();
		return `${day} ${dayNumber}`;
	}
</script>

<div class="container">
	<p class="datetime">{formatDate(weatherDay.datetime)}</p>
	{#if location}
		<p>{location}</p>
	{/if}
	<p class="today">{Math.round(weatherDay.temp)}</p>
	<img
		class="weather-icon"
		src="/weather-icons/{weatherDay.icon}.png"
		alt="An illustration of the sun."
		height="64"
		width="64"
	/>
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
		position: relative;
		text-align: center;

		/* border: 3px solid var(--gray); */
		border-radius: 5px;
		padding: 1rem;

		min-width: 6rem;
		max-width: 7rem;

		font-family: 'SairaCondensed', sans-serif;
		line-height: 1;
	}

	.datetime {
		position: absolute;
		top: -0.3rem;
	}

	.weather-icon {
		position: absolute;
		opacity: 0.5;
		top: -0.2rem;
		right: 0;
	}

	.today {
		z-index: 1;
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
