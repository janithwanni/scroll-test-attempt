<script>
	import { getContext } from "svelte";

	const { data, xGet, yGet, xScale, yScale } = getContext("LayerCake");

	export let r = 4;
	export let fill = "#ccc";
	export let stroke = "#000";
	export let strokeWidth = 0;
	export let fillKey = undefined;
</script>

<g>
	{#each $data as d}
		{@const cx = $xGet(d)}
		{@const cy = $yGet(d)}
		<circle
			{cx}
			{cy}
			{r}
			fill={fillKey !== undefined ? d[fillKey] : fill}
			{stroke}
			stroke-width={strokeWidth}
		/>
	{/each}
</g>
