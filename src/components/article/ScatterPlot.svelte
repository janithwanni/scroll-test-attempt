<script>
	import { LayerCake, Svg } from "layercake";
	import AxisX from "$components/layercake/AxisX.svg.svelte";
	import AxisY from "$components/layercake/AxisY.svg.svelte";
	import Scatter from "$components/layercake/Scatter.svg.svelte";
	import { fade } from "svelte/transition";
	import { tweened } from "svelte/motion";
	import { derived } from "svelte/store";
	import { scaleOrdinal } from "d3";
	import Wip from "../helpers/WIP.svelte";

	export let data;
	export let margin;
	export let active;

	console.log("In sctrplot", active, margin, data);

	let getX = tweened(
		data.map((d) => +d.x),
		{ duration: 500 }
	);
	let getY = tweened(
		data.map((d) => +d.y),
		{ duration: 500 }
	);

	let colorScale = scaleOrdinal(new Set(data.map((d) => d.class)), [
		"purple",
		"gold"
	]);

	// $: console.log("getX:", $getX, "getY:", $getY);
	// $: if (active) {
	// 	console.log("setting the axis");
	// 	getX.set(data.map((d) => +d.x));
	// 	getY.set(data.map((d) => +d.y));
	// } else {
	// 	console.log("not active");
	// 	getX.set(data.map((d) => +d.x));
	// 	getY.set(data.map((d) => 0));
	// }
	// $: tweenedData = derived([getX, getY], (d) => {
	// 	console.log("tweenedata", d);
	// 	return d[0].map((value, index) => ({
	// 		x: value,
	// 		y: d[1][index],
	// 		color: colorScale(data[index].class)
	// 	}));
	// });
</script>

<div class="chart-container">
	<LayerCake
		padding={{
			right: margin.right,
			bottom: margin.bottom,
			left: margin.left
		}}
		x={(d) => d.x}
		y={(d) => d.y}
		{data}
		debug
	>
		<Svg>
			<AxisX />
			<AxisY />
			<Scatter fillKey="color" r="5" />
		</Svg>
	</LayerCake>
</div>

<style>
	.chart-container {
		width: 80vw;
		height: 50vh;
		margin: 2em;
		padding: 2em;
	}
</style>
