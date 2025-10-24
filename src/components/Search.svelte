<script lang="ts">
	let {
		value = $bindable(),
		handler,
		width = '100%'
	}: { value: string; handler: (event: MouseEvent) => void; width?: string } = $props();
</script>

<div class="search-container">
	<input
		bind:value
		id="search"
		class="search"
		style="width: {width};"
		placeholder="Search Location"
	/>
	<button onclick={handler} aria-label="search" class="button">
		<img src="/search.svg" alt="A magnifying glass indicating a search button." width="20" />
	</button>
</div>

<style>
	.search-container {
		display: flex;
		position: relative;
	}

	.search {
		border-radius: 8px;
		padding: 0.3rem;
		border: 2px solid black;
	}

	.button {
		position: absolute;
		right: 2%;
		top: 15%;
		padding: 0;
		background: none;
		border: none;
	}

	.button:hover {
		cursor: pointer;
	}
</style>
