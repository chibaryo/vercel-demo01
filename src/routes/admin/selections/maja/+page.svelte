<script>
  import { invalidateAll } from '$app/navigation'
  import { enhance, applyAction } from '$app/forms'

	import { majaChoicesStore } from '../store'

	/** @type {import('./$types').PageData} */
	export let data
	majaChoicesStore.set(JSON.parse(data["majaselections"]))

	console.log("$majaChoicesStore: ", $majaChoicesStore)

</script>

<section>
	{#each $majaChoicesStore as row}
		<li>{row.text}</li>
	{/each}
</section>