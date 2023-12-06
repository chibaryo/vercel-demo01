<script>
  import { invalidateAll } from '$app/navigation'
  import { enhance, applyAction } from '$app/forms'

	/** @type {import('./$types').PageData} */
	export let data
	
	import { vectStore } from '../../chatmain/store'
	vectStore.set(JSON.parse(data.vectors))

	// components
	import DeleteselModal from './DeleteselModal.svelte'

	import arrowLeftIcon from '$lib/assets/icons/arrow-left.svg'
	import pencilIcon from '$lib/assets/icons/pencil-alt.svg'
	import trashIcon from '$lib/assets/icons/trash-o.svg'
	//
	let currentRowData
	let editselModalOpen = false
	let deleteselModalOpen = false

	// fn
	const openEditModal = async (row) => {
		currentRowData = row
//		editselModalOpen = true
	}
	const handleDeleteButton = async (row) => {
		currentRowData = row
		console.log("currentMajaselRowData", currentRowData)
		deleteselModalOpen = true
	}
	const deleteRow = async (_id) => {
		const resp = await fetch(`/api/vectors/${_id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		// Remove record from store
		const deldata = await resp.json()
		$vectStore = $vectStore.filter((row) => {
			return row._id != deldata.deleted._id
		})
		deleteselModalOpen = false
	}
	const closeDeleteModal = () => {
		deleteselModalOpen = false
	}
</script>

<section>
	<div style="background-color: #fecca2; display: grid; grid-template-columns: repeat (12, 1fr); gap: 4px; height: 2.5rem;">
		<div style="grid-column: 1 / span 1; align-self: center; ">
			<img src={arrowLeftIcon} alt="goback" style="height: 1.5rem; padding: auto;" />
		</div>
		<span style="display: inline-block; grid-column: 5 / span 1; align-self: center; white-space: nowrap;">ベクタDB管理</span>
		<div style="grid-column: 7 / span 6;">
		</div>
	</div>

	<table>
		<thead>
			<tr>
				<th>text1</th>
				<th>vect_t1</th>
				<th colspan="2">操作</th>
			</tr>
		</thead>
		<tbody>
			{#each $vectStore as row}
			<tr>
				<td>{row.text1}</td>
				<td>{row.vect_t1}</td>
				<td on:click={() => openEditModal(row)}><img src={pencilIcon} alt="edit" /></td>
				<td on:click={() => handleDeleteButton(row)}><img src={trashIcon} alt="delete" /></td>
			</tr>
			{/each}
		</tbody>
	</table>
</section>


<!-- Delete modal -->
<DeleteselModal visible={deleteselModalOpen}>
	<h2>削除しますか？</h2>
	<div class="background-color: rgb(231 229 228); display: flex; flex-flow: column;">{currentRowData.text1}</div>
	<button on:click={() => deleteRow(currentRowData._id)}>削除</button>
	<button on:click={() => closeDeleteModal()} style="background-color: rgb(254 226 226);">キャンセル</button>
</DeleteselModal>


<style>
	form > input, div {
		margin: 12px;
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
		word-break: break-word;
	}
	thead > tr > th:nth-child(2) {
		width: 20vw;
	}
	thead > tr > th:nth-child(3) {
		width: 16vw;
	}
	td {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>