<script lang="ts">
	import { fly } from 'svelte/transition';
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

<div class="search">
	<Search bind:value={location} handler={() => fetchWeather(location || '')} />
</div>

{#if loadingLoactionWeather}
	<p>Loading...</p>
{:else if loactionWeatherError}
	<p>Error: {loactionWeatherError}</p>
{:else if locationWeather?.days}
	<div class="weather-panel">
		<p class="location-name">{locationWeather.resolvedAddress}</p>
		<div class="weather-cards">
			{#each locationWeather.days as day}
				<div>
					<WeatherCard weatherDay={day} />
				</div>
			{/each}
		</div>
	</div>
{/if}

<style>
	.title {
		text-align: center;
		padding-bottom: 0.25rem;
		margin-bottom: 1rem;
		border-bottom: 1px solid var(--gray);
	}

	.search {
		margin-bottom: 1.5rem;
	}

	.weather-panel {
		padding: 1rem;

		background: linear-gradient(
			180deg,
			var(--light-gray) 0%,
			var(--gray) 50%,
			var(--light-gray) 100%
		);
	}

	.location-name {
		text-align: start;
		font-size: 2.5rem;
		margin-bottom: 2rem;
	}

	.weather-cards {
		display: flex;
		justify-content: space-between;
	}
</style>
