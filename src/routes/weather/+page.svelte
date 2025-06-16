<script lang="ts">
	import type { WeatherData } from '$lib/weather';
	import WeatherCard from '$components/WeatherCard.svelte';

	let location: string | null = null;
	let loadingLoactionWeather = false;
	let locationWeather: WeatherData | null = null;
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
			locationWeather = data;
		}

		loadingLoactionWeather = false;
	}
</script>

<div>
	<h1>Weather</h1>

	<label for="search-location">Search Location</label>
	<input bind:value={location} id="search-location" />
	<button on:click={() => fetchWeather(location || '')}>Go</button>

	{#if locationWeather}
		<pre>{JSON.stringify(locationWeather, null, 2)}</pre>
	{/if}
</div>

<style>
</style>
