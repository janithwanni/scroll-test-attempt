<script>
export let chunks; //array of strings
</script>

{#each chunks as text,i}
<p>{text}<p>
{/each}

