<script lang="ts">
	import type { WeatherApiResponse } from '$lib/weather';
	import WeatherCard from '$components/WeatherCard.svelte';

	let location: string | null = null;
	let loadingLoactionWeather = false;
	let locationWeather: WeatherApiResponse | null = null;
	let loactionWeatherError: string | null = null;

	async function fetchWeather(location: string) {
		loadingLoactionWeather = true;
		loactionWeatherError = null;

		const res = await fetch('/api/weather', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ location })
		});
		const data = await res.json();

		if (data.error) {
			loactionWeatherError = data.error;
			locationWeather = null;
		} else {
			data.days = data.days.slice(0, 5);
			locationWeather = data;
		}

		loadingLoactionWeather = false;
	}
</script>

<h1>Weather</h1>

<div class="layout-container">
	<div class="search-panel">
		<label for="search-location">Search Location</label>
		<input bind:value={location} id="search-location" />
		<button on:click={() => fetchWeather(location || '')}>Go</button>
	</div>

	<div class="weather-panel">
		{#if locationWeather?.days}
			{#each locationWeather.days as day}
				<WeatherCard weatherDay={day} />
			{/each}
		{/if}
	</div>
</div>

<style>
	.layout-container {
		display: grid;
		grid-template-columns: 1fr 5fr;
	}

	.weather-panel {
		display: flex;
		justify-content: space-around;
	}
</style>
