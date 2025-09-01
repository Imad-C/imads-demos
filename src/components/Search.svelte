<script lang="ts">
	let {
		value = $bindable(),
		handler,
		width = '15rem'
	}: { value: string; handler: (event: MouseEvent) => void; width?: string } = $props();
</script>

<div class="search-container" style="width: {width};">
	<input bind:value id="search" placeholder="Search Location" />
	<button onclick={handler} aria-label="search">
		<svg
			version="1.0"
			id="Layer_1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			width="16px"
			height="16px"
			viewBox="0 0 64.00 64.00"
			enable-background="new 0 0 64 64"
			xml:space="preserve"
			fill="#000000"
			stroke="#000000"
			stroke-width="0.00064"
			transform="matrix(1, 0, 0, 1, 0, 0)"
			><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
				id="SVGRepo_tracerCarrier"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke="#CCCCCC"
				stroke-width="1.024"
			></g><g id="SVGRepo_iconCarrier">
				<g>
					<g>
						<path
							fill="#394240"
							d="M62.828,57.172L50.402,44.746C53.902,40.07,56,34.289,56,28C56,12.535,43.465,0,28,0S0,12.535,0,28 s12.535,28,28,28c6.289,0,12.074-2.098,16.75-5.598l12.422,12.426c1.562,1.562,4.094,1.562,5.656,0S64.391,58.734,62.828,57.172z M28,48C16.953,48,8,39.047,8,28S16.953,8,28,8s20,8.953,20,20S39.047,48,28,48z"
						></path>
					</g>
				</g>
			</g></svg
		></button
	>
</div>

<style>
	.search-container {
		display: flex;
	}

	#search {
		border-radius: 8px;
		padding: 0.3rem;
		width: 15rem;
		border: 2px solid black;
	}

	button {
		padding: 0;
		background: none;
		border: none;
		margin-left: -1.5rem;
	}

	button:hover {
		cursor: pointer;
	}
</style>
