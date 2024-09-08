<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import Graphic from "$components/article/Graphic.svelte";
	let value;
</script>

<section id="scrolly">
	<!-- <h2>Scrolly <span>{value}</span></h2> -->
	<div class="spacer" />
	<Scrolly bind:value>
		{#each [0, 1, 2, 3, 4] as text, index}
			{@const active = value === index}
			{#if index == 0}
				<p>In</p>
			{:else}
				<div class="step">
					<Graphic class="graphic" {index} {active} />
				</div>
			{/if}
		{/each}
	</Scrolly>
	<div class="spacer" />
</section>

<style>
	h2 {
		position: sticky;
		top: 4em;
	}

	.spacer {
		height: 2rem;
	}

	.step {
		height: 80vh;
		background: var(--color-gray-100);
		text-align: center;
	}
	#scrolly {
		width: 80%;
	}
</style>
