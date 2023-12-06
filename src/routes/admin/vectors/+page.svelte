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

	<table>
		<thead>
			<tr>
				<th>text1</th>
				<th>vect_t1</th>
			</tr>
		</thead>
		<tbody>
			{#each $vectStore as row}
			<tr>
				<td>{row.text1}</td>
				<td>{row.vect_t1}</td>
			</tr>
			{/each}
		</tbody>
	</table>
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

	table {
		table-layout: fixed;
		width: 90vw;
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
	td {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>