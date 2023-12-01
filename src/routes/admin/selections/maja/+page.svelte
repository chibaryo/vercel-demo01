<script>
  import { invalidateAll } from '$app/navigation'
  import { enhance, applyAction } from '$app/forms'

	import { majaChoicesStore } from '../store'

	/** @type {import('./$types').PageData} */
	export let data
	majaChoicesStore.set(JSON.parse(data["majaselections"]))


	//
	import AddNewMajaselModal from  '../mid/AddNewMajaselModal.svelte'
	import DeleteMajaselModal from './DeleteMajaselModal.svelte'
	import EditMajaselModal from '../mid/AddNewMajaselModal.svelte'

	//
	let addNewMajaselModalOpen = false
	let deleteMajaselModalOpen = false
	let editMajaselModalOpen = false

	//
	let currentMajaselRowData

	const handleAddPost = async () => {
		addNewMajaselModalOpen = true
	}
	const handleInsertCsv = async () => {

	}
	const handleMultiRowDelete = async () => {

	}
	const openMajaselEditModal = async (row) => {
		currentMajaselRowData = row
//		parent_selected = 
		editMajaselModalOpen = true
	}

	const handleDeleteButton = async (row) => {
		currentMajaselRowData = row
		console.log("currentMajaselRowData", currentMajaselRowData)
		deleteMajaselModalOpen = true
	}
	const deleteRow = async (_id) => {
		console.log("_id: ", _id)

		const resp = await fetch(`/api/selections/maja/${_id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		})

		// Remove record from store
		const deldata = await resp.json()
		console.log("deldata.deleted: ", deldata.deleted)
		$majaChoicesStore = $majaChoicesStore.filter((row) => {
			return row._id != deldata.deleted._id
		})
		console.log("$majaChoicesStore", $majaChoicesStore)
		deleteMajaselModalOpen = false

	}
</script>

<section>
	<h2 style="width: 100vw; display: inline-block; text-align: center; background-color: #fecca2;">大分類選択肢管理</h2>

	<button style="border: 1px solid;" on:click={() => handleAddPost()}>新規登録</button>
	<button style="border: 1px solid;" on:click={() => handleInsertCsv()}>CSV一括登録</button>
	<button style="border: 1px solid;" on:click={() => handleMultiRowDelete()}>範囲指定削除</button>
	<table>
	<thead>
		<tr>
			<th>itemId</th>
			<th>テキスト</th>
			<th colspan="2">操作</th>
		</tr>
	</thead>
	<tbody>
		{#each $majaChoicesStore as row}
			<tr>
				<td>{row.itemId}</td>
				<td>{row.text}</td>
				<td class="btn-action"><button class="btn-edit" on:click={() => openMajaselEditModal(row)}>編集</button></td>
				<td class="btn-action"><button class="btn-delete" on:click={() => handleDeleteButton(row)}>削除</button></td>
			</tr>
		{/each}
	</tbody>
</table>
</section>

<!-- Add New Major selection modal -->
<AddNewMajaselModal visible={addNewMajaselModalOpen}>
	<h2>大分類を作成する</h2>
	<form method="post" action="?/addnewmaja" use:enhance={() => {
		return async ({ result }) => {
			invalidateAll()
			await applyAction(result)
			// Renew store
			console.log("result: ", result.data)
			// Close modal
			addNewMajaselModalOpen = false
			$majaChoicesStore = [...$majaChoicesStore, { _id: result.data.added.inserted._id, itemId: result.data.added.inserted.itemId, text: result.data.added.inserted.text }] //, add_arr]
			console.log("$majaChoicesStore", $majaChoicesStore)
		}
	}}>
		<div style="background-color: rgb(231 229 228); display: flex; flex-flow: column;">
			<label for="maja_name">大分類の名前</label>
			<input type="text" name="maja_name" />
		</div>
		<button type="submit" style="border: 1px; background-color: rgb(255 237 213);">Submit</button>
	</form>
	<button on:click={() => addNewMajaselModalOpen = false} style="background-color: rgb(254 226 226);">Cancel</button>
</AddNewMajaselModal>

<!-- Delete Midsel modal -->
<DeleteMajaselModal visible={deleteMajaselModalOpen}>
	<h2>削除しますか？</h2>
	<div class="background-color: rgb(231 229 228); display: flex; flex-flow: column;">{currentMajaselRowData.itemId}</div>
	<p>{currentMajaselRowData.text}</p>
	<button on:click={() => deleteRow(currentMajaselRowData._id)}>削除</button>
	<button on:click={() => deleteMajaselModalOpen = false} style="background-color: rgb(254 226 226);">キャンセル</button>
</DeleteMajaselModal>

<!-- Edit Midsel Modal -->
<EditMajaselModal visible={editMajaselModalOpen}>
	<form method="post" action="?/editmajaselpost" use:enhance={() => {
		return async ({ result }) => {
			invalidateAll()
			await applyAction(result)
			// Renew store
			console.log("result: ", JSON.parse(result.data))
			// Close modal
			editMajaselModalOpen = false
//			$majaChoicesStore = [...$majaChoicesStore, { _id: result.data.added.inserted._id, itemId: result.data.added.inserted.itemId, text: result.data.added.inserted.text }] //, add_arr]
//			console.log("$majaChoicesStore", $majaChoicesStore)
//			currentMinselRowData.parentId.itemId = result.data.added.inserted.itemId //  switch to the Action newly created
		}
	}}>
		<input type="hidden" name="_id" bind:value={currentMajaselRowData._id} />
		<div style="background-color: rgb(231 229 228); display: flex; flex-flow: column;">
			<label for="id">itemId</label>
			<input type="number" name="itemId" bind:value={currentMajaselRowData.itemId} />
		</div>
		<div style="background-color: rgb(231 229 228); display: flex; flex-flow: column;">
			<label for="text">テキスト</label>
			<input type="text" name="text" bind:value={currentMajaselRowData.text} />
		</div>
		<button type="submit" style="border: 1px; background-color: rgb(255 237 213);">Submit</button>
	</form>
	<button on:click={() => editMajaselModalOpen = false} style="background-color: rgb(254 226 226);">Cancel</button>
</EditMajaselModal>

<style>
	form > div {
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