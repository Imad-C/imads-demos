<script lang="ts">
	import type { WeatherApiResponse } from '$lib/weather';
	import WeatherCard from '$components/WeatherCard.svelte';
	import Search from '$components/Search.svelte';

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

<h1 class="title">Weather</h1>

<div>
	<Search bind:value={location} handler={() => fetchWeather(location || '')} />

	<div>
		{#if locationWeather?.days}
			<p class="location-name">{locationWeather.resolvedAddress}</p>
			<div class="weather-cards">
				{#each locationWeather.days as day}
					<WeatherCard weatherDay={day} />
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.title {
		text-align: center;
		margin-bottom: 1rem;
	}

	.location-name {
		text-align: start;
		font-size: 2.5rem;
	}

	.weather-cards {
		display: flex;
		justify-content: space-between;
	}
</style>
