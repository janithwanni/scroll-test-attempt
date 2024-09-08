<script>
	import { getContext } from "svelte";
	import { tweened } from "svelte/motion";
	import { LayerCake, Svg } from "layercake";
	import AxisX from "$components/layercake/AxisX.svg.svelte";
	import AxisY from "$components/layercake/AxisY.svg.svelte";
	import Scatter from "$components/layercake/Scatter.svg.svelte";
	import { derived } from "svelte/store";
	import { scaleOrdinal } from "d3";
	export let index;
	export let active;
	let contextData = getContext("data");
	let data = contextData.cross;

	const width = 600;
	const height = 600;

	const margin = { top: 20, right: 20, bottom: 20, left: 180 };

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	let colorScale = scaleOrdinal(new Set(data.map((d) => d.class)), [
		"purple",
		"gold"
	]);

	let getX = tweened(
		data.map((d) => +d.x),
		{ duration: 500 }
	);
	let getY = tweened(
		data.map((d) => +d.y),
		{ duration: 500 }
	);
	// $: console.log("getX:", $getX, "getY:", $getY);
	$: tweenedData = derived([getX, getY], (d) => {
		return d[0].map((value, index) => ({
			x: value,
			y: d[1][index],
			color: colorScale(data[index].class)
		}));
	});
	$: if (active) {
		if (index != 1) {
			getX.set(data.map((d) => +d.x));
			getY.set(data.map((d) => +d.y + Math.random()));
		} else {
			getX.set(data.map((d) => +d.x));
			getY.set(data.map((d) => +d.y));
		}
	}
</script>

<div class="chart-container">
	<!-- {#if index == 1} -->
	<LayerCake
		padding={{ right: margin.right, bottom: margin.bottom, left: margin.left }}
		x={(d) => d.x}
		y={(d) => d.y}
		data={$tweenedData}
		debug
	>
		<Svg>
			<AxisX />
			<AxisY />
			<Scatter fillKey="color" r="5" />
			<!-- <text x="10" y="10">{index}</text> -->
		</Svg>
	</LayerCake>
	<!-- {:else if index == 2} -->
	<!-- 	<p>TBD {index} {active}</p> -->
	<!-- {:else if index == 3} -->
	<!-- 	<p>TBD {index} {active}</p> -->
	<!-- {:else if index == 4} -->
	<!-- 	<p>TBD {index} {active}</p> -->
	<!-- {/if} -->
</div>

<style>
	.chart-container {
		width: 80%;
		height: 100%;
		margin: 2em;
		padding: 2em;
	}

	.chart-container.active {
		opacity: 1;
	}
</style>
