<script lang="ts">
	import type { WeatherData } from '$lib/weather';

	// export let weatherData: WeatherData | null = null;
</script>

<div class="container">
	<p class="location-name">LocationName</p>
	<p class="today">30</p>
	<p>Very Sunny</p>
	<div class="range-container">
		<p>H:25</p>
		<p>L:35</p>
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
