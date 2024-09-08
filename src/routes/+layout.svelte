<script>
	import "$styles/app.css";
	import Header from "$components/Header.svelte";
</script>

<Header />
<main id="content">
	<slot />
</main>

<style>
	#content {
		width: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}
</style>
