<script>
	import { fade } from "svelte/transition";
	export let chunks; //array of strings
	// export let active;
</script>

<!-- {#if active} -->
<section>
	<div class="content">
		{#each chunks as text, i}
			<p>{text}</p>
		{/each}
	</div>
</section>

<!-- {/if} -->

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
	}
	.content p {
		width: 80%;
	}
</style>
