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

	let barPlotData = valueCounts(cross.map((x) => x.class));
	const width = 600;
	const height = 600;

	const margin = { top: 20, right: 20, bottom: 20, left: 180 };

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	let value;
	let editorialPlaces = [0, 2, 4, 6];
</script>

<div class="title">{copy.title}</div>
<div class="description">{copy.description}</div>
<article>
	{#each copy.sections as section, index}
		<div class="step">
			{#if section.type === "block"}
				<Editorial chunks={section.chunks} />
			{:else if section.type === "scatterplot"}
				<ScatterPlot data={cross} {margin} chunks={section.chunks} />
				<!-- <p>Scatterplot</p> -->
			{:else if section.type === "barplot"}
				<BarPlot data={cross} {margin} chunks={section.chunks} />
			{:else if section.type === "lineplot"}
				<LinePlot data={cross} {margin} chunks={section.chunks} />
			{:else}
				<div class="spacer"></div>
			{/if}
			<!-- <p>{section.type}</p> -->
		</div>
	{/each}
</article>

<!-- <Footer /> -->

<style>
	.step {
		text-align: center;
		width: 100%;
		border: 1px solid black;
	}
	.spacer {
		height: 20vh;
	}
	p {
		border: 5px solid black;
		width: 100%;
	}
	article {
		width: 80%;
	}
	#scrolly {
		width: 80vw;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
