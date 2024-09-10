<script>
	import { getContext } from "svelte";
	import Editorial from "$components/article/Editorial.svelte";
	import Footer from "$components/Footer.svelte";
	import ScatterPlot from "$components/article/ScatterPlot.svelte";
	import BarPlot from "$components/article/BarPlot.svelte";
	import LinePlot from "$components/article/LinePlot.svelte";
	import valueCounts from "$utils/arrayUtils";
	import Scrolly from "$components/helpers/Scrolly.svelte";

	const copy = getContext("copy");
	const data = getContext("data");

	let cross = data.cross;
	let time = data.time;

	// console.log(copy);
	// console.log(cross);
	let barPlotData = valueCounts(cross.map((x) => x.class));
	// console.log("barPlotData", barPlotData);
	const width = 600;
	const height = 600;

	const margin = { top: 20, right: 20, bottom: 20, left: 180 };

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	let value;
	let editorialPlaces = [0, 2, 4, 6];
</script>

<div class="title">A simple scrollytelling experiment</div>

<section id="scrolly">
	<Scrolly bind:value>
		{#each Array(7)
			.fill(0)
			.map((_, i) => i) as text, index}
			{@const active = value === index}
			{@const editorialIndex = editorialPlaces.indexOf(index)}
			<div class="step">
				<!-- {editorialIndex} -->
				{#if editorialIndex !== -1}
					<Editorial
						id={copy.sections[editorialIndex].id}
						chunks={copy.sections[editorialIndex].chunks}
						{active}
					/>
					<!-- <p>A {active} {editorialIndex} {value} {index}</p> -->
				{:else if value == 1}
					<ScatterPlot data={cross} {active} {margin} />
					<!-- <p>Scatterplot {active}</p> -->
				{:else if value == 3}
					<!-- <BarPlot data={cross} /> -->
					<p>Barplot {active}</p>
				{:else if value == 5}
					<!-- <LinePlot data={time} /> -->
					<p>Lineplot {active}</p>
				{/if}
			</div>
			<div class="spacer"></div>
		{/each}
	</Scrolly>
</section>

<!-- <Footer /> -->

<style>
	.step {
		text-align: center;
		height: 80vh;
		width: 100%;
	}
	.spacer {
		height: 20vh;
	}
	p {
		border: 5px solid black;
		width: 100%;
	}
	#scrolly {
		width: 80vw;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
