<script lang="ts">
	let { text, size = '50px' }: { text: string; size?: string } = $props();
</script>

<div class="container">
	<img src="/circle.svg" alt="Snow" style="width:{size};" />
	<div class="centered">{text}</div>
</div>

<style>
	.container {
		position: relative;
		text-align: center;
		color: black;
		font-size: 2rem;
	}

	.centered {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -60%);
	}
</style>
