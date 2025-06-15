<script lang="ts">
	let location: string | null = null;
	let locationWeather: WeatherData | null = null;

	interface WeatherData {
		location: string;
		fullLocation: string;
		temp: string;
		max: string;
		min: string;
		tomTemp: string;
	}

	async function fetchWeather(location: string) {
		const res = await fetch('/api/weather', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ location })
		});
		const data = await res.json();

		locationWeather = data;
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
				<h2>{locationWeather?.location}</h2>
				<p>Min: {locationWeather?.min}</p>
				<p>Max: {locationWeather?.max}</p>
				<p>Tomorrow: {locationWeather?.tomTemp}</p>
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
	}

	.panel-container {
		display: flex;
		justify-content: space-around;
	}

	.left-panel,
	.right-panel {
		flex: 1;
	}
</style>
