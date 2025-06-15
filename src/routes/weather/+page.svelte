<script lang="ts">
	interface WeatherData {
		location: string;
		fullLocation: string;
		temp: number;
		max: number;
		min: number;
		tomTemp: number;
	}

	let location: string | null = null;
	let loadingLoactionWeather = false;
	let locationWeather: WeatherData | null = null;

	async function fetchWeather(location: string) {
		loadingLoactionWeather = true;

		const res = await fetch('/api/weather', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ location })
		});
		const data = await res.json();

		locationWeather = data;
		loadingLoactionWeather = false;
	}
</script>

<div class="container">
	<h1 class="title">Weather</h1>
	<div class="panel-container">
		<div class="left-panel">
			<input bind:value={location} />
			<button on:click={() => fetchWeather(location || '')}>Go</button>
		</div>
		<div class="right-panel">
			{#if locationWeather}
				<h2 class="location-heading">{locationWeather?.location}</h2>
				<div class="today-panel">
					<p class="temperature">{locationWeather?.temp}°C</p>
					<div>
						<p>Min: {locationWeather?.min}°C</p>
						<p>Max: {locationWeather?.max}°C</p>
					</div>
				</div>

				<p class="tomorrow">Tomorrow: {locationWeather?.tomTemp}°C</p>
			{:else if loadingLoactionWeather}
				<p>Loading...</p>
			{:else}
				<p>Search for Somewhere!</p>
			{/if}
		</div>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		max-width: 900px;
		margin: 0 auto;
	}

	.title {
		text-align: center;
		margin-bottom: 3rem;
	}

	.panel-container {
		display: flex;
		justify-content: space-around;
		text-align: center;
		align-items: center;
	}

	.left-panel,
	.right-panel {
		flex: 1;
	}

	.right-panel {
		padding: 1rem;
		background: var(--gray-highlight);
		border-radius: 8px;
	}

	.today-panel {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}

	.temperature {
		font-size: 4rem;
	}
</style>
