<script>
  import { invalidateAll } from '$app/navigation'
  import { enhance, applyAction } from '$app/forms'

	/** @type {import('./$types').PageData} */
	export let data

	const aryMax = (a, b) => {return Math.max(a, b)}
	const aryMin = (a, b) => {return Math.min(a, b)}
	let upperlimit
	$: upperlimit = $vectStore.map((obj) => obj.itemId).reduce(aryMax, 1)
	let lowerlimit
	$: lowerlimit = $vectStore.map((obj) => obj.itemId).reduce(aryMin, 1)
	
	import { vectStore } from '../../chatmain/store'
	vectStore.set(JSON.parse(data.vectors))

	// components
	import DeleteselModal from './DeleteselModal.svelte'
	import DeleteManyModal from './DeleteselModal.svelte'
	import InsertManyModal from './DeleteselModal.svelte'

	import arrowLeftIcon from '$lib/assets/icons/arrow-left.svg'
	import pencilIcon from '$lib/assets/icons/pencil-alt.svg'
	import trashIcon from '$lib/assets/icons/trash-o.svg'
	//
	let currentRowData
	let editselModalOpen = false
	let deleteselModalOpen = false
	let deleteManyModalOpen = false
	let insertManyFlag = false

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

	const handleAddPost = async () => {

	}

	const handleInsertXlsx = async () => {
		insertManyFlag = true
	}
	const closeInsertMany = async () => {
		insertManyFlag = false
	}

	const handleMultiRowDelete = async () => {
		deleteManyModalOpen = true
	}
	const closeDeleteMany = () => {
		deleteManyModalOpen = false
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

	<button style="border: 1px solid;" on:click={() => handleAddPost()}>新規登録</button>
	<button style="border: 1px solid;" on:click={() => handleInsertXlsx()}>Excel一括登録</button>
	<button style="border: 1px solid;" on:click={() => handleMultiRowDelete()}>範囲指定削除</button>

	<table>
		<thead>
			<tr>
				<th>itemId</th>
				<th>text1</th>
				<th>vect_t1</th>
				<th colspan="1">操作</th>
			</tr>
		</thead>
		<tbody>
			{#each $vectStore as row}
			<tr>
				<td>{row.itemId}</td>
				<td>{row.text1}</td>
				<td>{row.vect_t1}</td>
				<td on:click={() => handleDeleteButton(row)}><img src={trashIcon} alt="delete" /></td>
			</tr>
			{/each}
		</tbody>
	</table>
</section>

<!-- insert many -->
<InsertManyModal visible={insertManyFlag}>
	<form method="post" action="?/addbycsv" enctype="multipart/form-data" use:enhance={() => {
		return async ({ result }) => {
			invalidateAll()
			await applyAction(result)
			if (result.data) {
				const tmp_arr = JSON.parse(result.data.added).map(obj => {
					return {
						_id: obj._id,
						itemId: obj.itemId,
						text: obj.text,
					}
				})
				// Renew store
				$vectStore = [...$vectStore, ...tmp_arr]
				console.log("$vectStore", $vectStore)
				insertManyFlag = false
			}
		}
	}}>
		<div style="background-color: rgb(231 229 228); display: flex; flex-flow: column;">
			<label for="sourcefile">Excelファイルでベクタ登録</label>
			<input type="file" name="sourcefile" accept=".xlsx" />
		</div>
		<button type="submit" style="border: 1px; background-color: rgb(255 237 213);">Submit</button>
	</form>
	<button on:click={() => closeInsertMany()} style="background-color: rgb(254 226 226);">Cancel</button>
</InsertManyModal>

<!-- Delete modal -->
<DeleteselModal visible={deleteselModalOpen}>
	<h2>削除しますか？</h2>
	<div class="background-color: rgb(231 229 228); display: flex; flex-flow: column;">{currentRowData.text1}</div>
	<button on:click={() => deleteRow(currentRowData._id)}>削除</button>
	<button on:click={() => closeDeleteModal()} style="background-color: rgb(254 226 226);">キャンセル</button>
</DeleteselModal>

<!-- delete many -->
<DeleteManyModal visible={deleteManyModalOpen}>
	<form method="post" action="?/deletebycsv" enctype="multipart/form-data" use:enhance={({ formData }) => {
		return async ({ result }) => {
			invalidateAll()
			await applyAction(result)
			if (result.data) {
				// Do something
				$vectStore = $vectStore.filter((row) => {
					return (
						row.itemId < Number(JSON.parse(result.data.range)["lowerlimit"]) ||
						row.itemId > Number(JSON.parse(result.data.range)["upperlimit"])
					)})
				console.log("$majaChoicesStore", $vectStore)
				deleteManyModalOpen = false
			}
		}
	}}>
		<div style="background-color: rgb(231 229 228); display: flex; flex-flow: column;">
			<label for="sourcefile">File</label>
			<input type="file" name="sourcefile" accept=".csv" />
		</div>
		<div style="background-color: rgb(231 229 228); display: flex; flex-flow: column;">
			<label for="lowerlimit">範囲(from)</label>
			<input type="number" name="lowerlimit" min={lowerlimit} max={upperlimit} />
		</div>
		<div style="background-color: rgb(231 229 228); display: flex; flex-flow: column;">
			<label for="upperlimit">範囲(to)</label>
			<input type="number" name="upperlimit" min={lowerlimit} max={upperlimit} />
		</div>
		<button type="submit" style="border: 1px; background-color: rgb(255 237 213);">Submit</button>
	</form>
	<button on:click={() => closeDeleteMany()} style="background-color: rgb(254 226 226);">Cancel</button>
</DeleteManyModal>

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