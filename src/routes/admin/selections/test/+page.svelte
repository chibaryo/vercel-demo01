<script>
	/** @type {import('./$types').PageData} */
	export let data

	</script>

<section>
	{#if data.minselections}
	{#each data.minselections as row}
		<li>{row.itemId}</li>
		<li>{row.parentId.text}</li>
		<li>{row.text}</li>
	{/each}
	{/if}
</section>