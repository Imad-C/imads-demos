<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { WeatherApiResponse } from '$lib/weather';
	import WeatherCard from '$components/WeatherCard.svelte';
	import Search from '$components/Search.svelte';

	let location: string | null = null;
	let loadingLocationWeather = false;
	let locationWeather: WeatherApiResponse | null = null;
	let locationWeatherError: string | null = null;

	async function fetchWeather(location: string) {
		loadingLocationWeather = true;
		locationWeatherError = null;

		try {
			const res = await fetch('/api/weather', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ location })
			});
			const data = await res.json();

			if (data.error) {
				locationWeatherError = data.error;
				locationWeather = null;
			} else {
				locationWeather = data;
			}
		} catch (error) {
			locationWeatherError = 'Failed to fetch weather data.';
			locationWeather = null;
		} finally {
			loadingLocationWeather = false;
		}
	}
</script>

<div class="search">
	<Search bind:value={location} handler={() => fetchWeather(location || '')} />
</div>

{#if locationWeatherError}
	<p>Error: {locationWeatherError}</p>
{:else if loadingLocationWeather}
	<p>Loading...</p>
{:else if locationWeather?.days}
	<div>
		<p class="location-name" transition:fly={{ x: -500, duration: 500 }}>
			{locationWeather.resolvedAddress}
		</p>
		<div class="weather-cards">
			{#each locationWeather.days as day, index}
				<div in:fly|global={{ x: 500, duration: 400, delay: index * 50 }}>
					<WeatherCard weatherDay={day} />
				</div>
			{/each}
		</div>
	</div>
{/if}

<style>
	.search {
		margin-bottom: 1.5rem;
	}

	.location-name {
		text-align: start;
		font-size: 2.5rem;
		margin-bottom: 2rem;
	}

	.weather-cards {
		display: flex;
		flex-wrap: wrap;
		gap: 3rem;
	}
</style>
