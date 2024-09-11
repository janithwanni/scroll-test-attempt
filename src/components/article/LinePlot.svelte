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
	import Scrolly from "../helpers/Scrolly.svelte";

	export let data;
	export let margin;
	export let chunks;
	// export let active;

	// console.log("In sctrplot", active, margin, data);

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
	let value;
</script>

<div class="scroll-section">
	<div class="sticky">
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
	</div>

	<div class="steps">
		<section id="scrolly">
			<Scrolly bind:value>
				{#each chunks as chunk, i}
					{@const active = value === i}
					{@const last = i == chunks.length - 1 ? true : false}
					{@const first = i == 0 ? true : false}
					<div class="step" class:active class:last class:first>
						<p class="step-content">{@html chunk}</p>
					</div>
				{/each}
			</Scrolly>
		</section>
	</div>
</div>

<style>
	.chart-container {
		width: 80vw;
		height: 50vh;
		margin: 2em;
		padding: 2em;
		border: 1px solid black;
	}
	.sticky {
		position: sticky;
		z-index: 1;
		display: flex;
		justify-content: center;
		top: 0;
		/* display: none; */
	}
	.steps {
		position: relative;
		z-index: 2;
		max-width: 2000px;
		padding: 16px;
		margin: 0 auto;
		pointer-events: none;
	}
	.step {
		height: 60vh;
		opacity: 0.3;
		transition: opacity 300ms ease;
		display: flex;
		place-items: center;
		justify-content: center;
		max-width: 400px;
		border: 1px solid black;
	}
	.step-marker {
		position: absolute;
		bottom: 0px;
		left: 10px;
	}
	.first {
		margin-top: -50vh;
	}

	.step-content {
		background-color: gray;
		border-radius: 5px;
		font-size: 16px;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-rendering: optimizeLegibility;
		line-height: 1.5;
		letter-spacing: -0.2px;
		margin-top: 0;
		margin-bottom: 25px;
		pointer-events: auto;
	}

	.last {
		margin-bottom: 50vh;
	}

	.step p {
		padding: 15px 20px;
	}

	.step.active {
		opacity: 1;
	}
</style>
