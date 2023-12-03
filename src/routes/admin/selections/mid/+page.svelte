<script>
  import { invalidateAll } from '$app/navigation'
  import { enhance, applyAction } from '$app/forms'

	import mongoose, { Schema, Document, Model, models } from 'mongoose'

	/** @type {import('./$types').PageData} */
	export let data

	/** @type {import('./$types').ActionData} */
	export let form

	let newmid_str
	let newmaja_str
	let currentmidItemId
	let currentmajaItemId
	console.log("currentmajaItemId", currentmajaItemId)

	let addNewMidChoice = 999999
	let addNewMajaChoice = 999999

	let currentMidselRowData

	import { minselStore, midselStore, majaChoicesStore } from '../store'

//	const parent_elems = JSON.parse(data.majaselections).map((obj) => ({ _id: obj._id, itemId: obj.itemId, text: obj.text }))
	majaChoicesStore.set(JSON.parse(data["majaselections"]))

	midselStore.set(JSON.parse(data["midselections"]))

	//
	import AddNewMajaselModal from '../mid/AddNewMajaselModal.svelte'
	import AddMidselModal from './AddMinselModal.svelte'
	import EditMidselModal from './EditMinselModal.svelte'
	import AddNewMidselModal from './AddNewMidselModal.svelte'
	import InsertManyCsvModal from './InsertManyCsvModal.svelte'
	import DeleteManyModal from './DeleteManyModal.svelte'
	import DeleteMidselModal from './DeleteMidselModal.svelte'

	let addNewMidselFlag = false
	let insertManyFlag = false
	let addMidselModalOpen = false
	let editMidselModalOpen = false
	let deleteMidselModalOpen = false
	let addNewMidselModalOpen = false
	let addNewMajaselModalOpen = false
	let deleteManyModalOpen = false

	// fn
	const onChangeMajaSel = (row) => {
		console.log("row: ", row)
		console.log("currentItemId: ", currentmajaItemId)

		if (currentmajaItemId == 999999) {
			console.log("current: ", currentMidselRowData)
			console.log("大分類作る!")
			addNewMajaselModalOpen = true
		}
	}

	const onChangeMidSel = (row) => {
		if (currentmidItemId == 999999) {
			console.log("中分類作る!")
			addNewMidselModalOpen = true
		}
	}
	
	const openMidselEditModal = async (row) => {
		console.log("row to edit: ", row)
		currentMidselRowData = row
		currentmajaItemId = currentMidselRowData.parentId._id
		console.log("currentMidselRowData.parentId.text", currentMidselRowData.parentId.text)
		editMidselModalOpen = true
	}

	const closeEditMidselModal = () => {
		editMidselModalOpen = false
		addNewMidselFlag = false
		// Clear store ?
		currentmajaItemId = undefined
		form = null
	}

	const closeAddMajaselModal = () => {
		addNewMajaselModalOpen = false
	}

	const closeAddMidselModal = () => {
		addMidselModalOpen = false
		currentmajaItemId = undefined
	}

	const handleDeleteButton = async (row) => {
		currentMidselRowData = row
		console.log("currentMidselRowData", currentMidselRowData)
		deleteMidselModalOpen = true
	}

	const deleteRow = async (_id) => {
		console.log("_id: ", _id)
//		console.log("VERCEL_URL", process.env.VERCEL_URL)

		const resp = await fetch(`/api/selections/mid/${_id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		})

		// Remove record from store
		const deldata = await resp.json()
		console.log("deldata.deleted: ", deldata.deleted)
		$midselStore = $midselStore.filter((row) => {
			return row._id != deldata.deleted._id
		})
		console.log("$midselStore", $midselStore)
		deleteMidselModalOpen = false
	}
	const closeDeleteMinselModal = () => {
		deleteMidselModalOpen = false
	}

	const handleAddPost = async () => {
		addNewMidselFlag = true
//		addMidselModalOpen = true
		editMidselModalOpen = true
	}

	const handleInsertCsv = async () => {
		insertManyFlag = true
	}
	const closeInsertMany = () => {
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
	<h2 style="width: 100vw; display: inline-block; text-align: center; background-color: #fecca2;">中分類選択肢管理</h2>

	<button style="border: 1px solid;" on:click={() => handleAddPost()}>新規登録</button>
	<button style="border: 1px solid;" on:click={() => handleInsertCsv()}>CSV一括登録</button>
	<button style="border: 1px solid;" on:click={() => handleMultiRowDelete()}>範囲指定削除</button>
	<table>
	<thead>
		<tr>
			<th>itemId</th>
			<th>大分類ジャンル</th>
			<th>テキスト</th>
			<th colspan="2">操作</th>
		</tr>
	</thead>
	<tbody>
	{#each $midselStore as row}
		{#if row.itemId && row.parentId }
			<tr>
				<td>{row.itemId}</td>
				<td>{row.parentId.text}</td>
				<td>{row.text}</td>
				<td class="btn-action"><button class="btn-edit" on:click={() => openMidselEditModal(row)}>編集</button></td>
				<td class="btn-action"><button class="btn-delete" on:click={() => handleDeleteButton(row)}>削除</button></td>
			</tr>
		{/if}
	{/each}
	</tbody>
</table>
</section>

<!-- Delete Midsel modal -->
<DeleteMidselModal visible={deleteMidselModalOpen}>
	<h2>削除しますか？</h2>
	<div class="background-color: rgb(231 229 228); display: flex; flex-flow: column;">{currentMidselRowData.itemId}</div>
	<p>{currentMidselRowData.text}</p>
	<button on:click={() => deleteRow(currentMidselRowData._id)}>削除</button>
	<button on:click={closeDeleteMinselModal} style="background-color: rgb(254 226 226);">キャンセル</button>
</DeleteMidselModal>

<!-- delete many -->
<DeleteManyModal visible={deleteManyModalOpen}>
	<form method="post" action="?/deletebycsv" enctype="multipart/form-data" use:enhance={() => {
		return async ({ result }) => {
			invalidateAll()
			await applyAction(result)
			// Do something
		}
	}}>
		<div style="background-color: rgb(231 229 228); display: flex; flex-flow: column;">
			<label for="sourcefile">File</label>
			<input type="file" name="sourcefile" />
		</div>
		<div style="background-color: rgb(231 229 228); display: flex; flex-flow: column;">
			<label for="lowerlimit">範囲(from)</label>
			<input type="number" name="lowerlimit" />
		</div>
		<div style="background-color: rgb(231 229 228); display: flex; flex-flow: column;">
			<label for="upperlimit">範囲(to)</label>
			<input type="number" name="upperlimit" />
		</div>
		<button type="submit" style="border: 1px; background-color: rgb(255 237 213);">Submit</button>
	</form>
	<button on:click={() => closeDeleteMany()} style="background-color: rgb(254 226 226);">Cancel</button>
</DeleteManyModal>

<!-- insert many -->
<InsertManyCsvModal visible={insertManyFlag}>
	<form method="post" action="?/addbycsv" enctype="multipart/form-data" use:enhance={() => {
		return async ({ result }) => {
			invalidateAll()
			await applyAction(result)
			if (result.data) {
				const tmp_arr = JSON.parse(result.data.added).map(obj => { return { _id: obj._id, itemId: obj.itemId, text: obj.text, parentId: obj.parentId } })
				console.log("tmp_arr", tmp_arr)
				// Do something
				$midselStore = [...$midselStore, ...tmp_arr]
//				$midselStore = $midselStore
				console.log("$midselStore", $midselStore)
				insertManyFlag = false
			}
		}
	}}>
		<div style="background-color: rgb(231 229 228); display: flex; flex-flow: column;">
			<label for="sourcefile">File</label>
			<input type="file" name="sourcefile" />
		</div>
		<button type="submit" style="border: 1px; background-color: rgb(255 237 213);">Submit</button>
	</form>
	<button on:click={() => closeInsertMany()} style="background-color: rgb(254 226 226);">Cancel</button>
</InsertManyCsvModal>

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
			currentMidselRowData.parentId.itemId = result.data.added.inserted.itemId //  switch to the Action newly created
		}
	}}>
		<div style="background-color: rgb(231 229 228); display: flex; flex-flow: column;">
			<label for="maja_name">大分類の名前</label>
			<input type="text" name="maja_name" bind:value={newmaja_str} />
		</div>
		<button type="submit" style="border: 1px; background-color: rgb(255 237 213);">Submit</button>
	</form>
	<button on:click={closeAddMajaselModal} style="background-color: rgb(254 226 226);">Cancel</button>
</AddNewMajaselModal>

<!-- Edit / Add Midsel Modal -->
{#if addNewMidselFlag === false}
<EditMidselModal visible={editMidselModalOpen}>
	<form method="post" action="?/editmidselpost" use:enhance={() => {
		return async ({ result }) => {
			invalidateAll()
			await applyAction(result)
			// Renew store
			const { _id, itemId, text, parentId } = JSON.parse(result.data.updated)
			console.log("_id, itemId, text, parentId ", _id + itemId + text + parentId)
			// Close modal
			editMidselModalOpen = false
			const xloc = $midselStore.findIndex((elem) => elem._id === _id)
			$midselStore.splice(xloc, 1, { _id: _id, itemId: itemId, text: text, parentId: parentId })
			$midselStore = $midselStore
			form = null
		}
	}}>
	{#if form?.dupval}<p class="error" style="background-color: #fefefe; color: red;">itemIdが重複しています</p>{/if}
		<input type="hidden" name="_id" value={currentMidselRowData._id} />
		<div style="background-color: rgb(231 229 228); display: flex; flex-flow: column;">
			<label for="itemId">itemId</label>
			<input type="number" name="itemId" value={currentMidselRowData.itemId} />
		</div>
		<div style="background-color: rgb(231 229 228); display: flex; flex-flow: column;">
			<label for="parentId_id">大分類選択:</label>
			<select name="parentId_id" bind:value={currentmajaItemId} on:change={() => onChangeMidSel()}>
				<option selected disabled value="大分類選択...">大分類選択...</option>
				{#each $majaChoicesStore as p_elem}
					<option value={p_elem._id}>{p_elem.text}</option>
				{/each}
					<option value={addNewMidChoice}>大分類作成...</option>
			</select>
		</div>
		<div style="background-color: rgb(231 229 228); display: flex; flex-flow: column;">
			<label for="text">テキスト</label>
			<input type="text" name="text" value={currentMidselRowData.text} />
		</div>
		<button type="submit" style="border: 1px; background-color: rgb(255 237 213);">Submit</button>
	</form>
	<button on:click={closeEditMidselModal} style="background-color: rgb(254 226 226);">Cancel</button>
</EditMidselModal>
{:else if addNewMidselFlag === true} <!-- Add new post -->
<EditMidselModal visible={editMidselModalOpen}>
	<form method="post" action="?/addmidselpost" use:enhance={() => {
		return async ({ result }) => {
			invalidateAll()
			await applyAction(result)
			// Renew store
			const { _id, itemId, text, parentId } = JSON.parse(result.data.added)
			console.log("_id, itemId, text, parentId ", _id + itemId + text + parentId)
			// Close modal
			editMidselModalOpen = false
			addNewMidselFlag = false
			const xloc = $midselStore.findIndex((elem) => elem._id === _id)
			$midselStore.splice(xloc, 1, { _id: _id, itemId: itemId, text: text, parentId: parentId })
			$midselStore = $midselStore
			form = null
		}
	}}>
	{#if form?.dupval}<p class="error" style="background-color: #fefefe; color: red;">itemIdが重複しています</p>{/if}
		<div style="background-color: rgb(231 229 228); display: flex; flex-flow: column;">
			<label for="itemId">itemId</label>
			<input type="number" name="itemId" required />
		</div>
		<div style="background-color: rgb(231 229 228); display: flex; flex-flow: column;">
			<label for="parentId_id">大分類選択:</label>
			<select name="parentId_id" bind:value={currentmajaItemId} on:change={() => onChangeMidSel()}>
				<option selected disabled value="大分類選択...">大分類選択...</option>
				{#each $majaChoicesStore as p_elem}
					<option value={p_elem._id}>{p_elem.text}</option>
				{/each}
					<option value={addNewMidChoice}>大分類作成...</option>
			</select>
		</div>
		<div style="background-color: rgb(231 229 228); display: flex; flex-flow: column;">
			<label for="text">テキスト</label>
			<input type="text" name="text" required />
		</div>
		<button type="submit" style="border: 1px; background-color: rgb(255 237 213);">Submit</button>
	</form>
	<button on:click={closeEditMidselModal} style="background-color: rgb(254 226 226);">Cancel</button>
</EditMidselModal>
{/if}

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
	tbody > tr > td:nth-child(2) {
		text-align: center;
	}

</style>