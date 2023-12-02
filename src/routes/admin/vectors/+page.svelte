<script>
  import { invalidateAll } from '$app/navigation'
  import { enhance, applyAction } from '$app/forms'

	/** @type {import('./$types').PageData} */
	export let data
	
	import { vectStore } from '../../chatmain/store'
	vectStore.set(JSON.parse(data.vectors))

</script>

<section>
	<h2 style="width: 100vw; display: inline-block; text-align: center; background-color: #fecca2;">ベクタDB管理</h2>

	{#each $vectStore as row}
	<li>{row.text1}</li>
	<li>{row.vect_t1}</li>
	{/each}
</section>


<style>
	form > input, div {
		margin: 12px;
	}
	.btn-action {
		width: 14vw;
		padding: 0.5rem;
		text-align: center;
	}
	.btn-edit {
		background-color: blue;
		color: #fff;
	}
	.btn-delete {
		background-color: red;
		color: #fff;
	}

	table, tr, th, td {
		border: solid 1px;
	}
	tbody > tr > td {
		padding: 2px;
	}
	tbody > tr > td:nth-child(1) {
		text-align: center;
	}

</style>