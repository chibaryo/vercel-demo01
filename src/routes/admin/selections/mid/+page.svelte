<script>
  import { invalidateAll } from '$app/navigation'
  import { enhance, applyAction } from '$app/forms'

	import mongoose, { Schema, Document, Model, models } from 'mongoose'

	/** @type {import('./$types').PageData} */
	export let data
	
	let newmid_str
	let newmaja_str
	let currentmidItemId
	let currentmajaItemId

	let addNewMidChoice = 999999
	let addNewMajaChoice = 999999

	let currentMidselRowData
	let currentMinselRowData

	import { minselStore, midselStore, majaChoicesStore } from '../store'

	const parent_elems = JSON.parse(data.majaselections).map((obj) => ({ _id: obj._id, itemId: obj.itemId, text: obj.text }))
	majaChoicesStore.set(parent_elems)

	midselStore.set(JSON.parse(data.midselections))

	//
	import AddNewMajaselModal from '../mid/AddNewMajaselModal.svelte'
	import AddMinselModal from './AddMinselModal.svelte'
	import EditMinselModal from './EditMinselModal.svelte'
	import AddNewMidselModal from './AddNewMidselModal.svelte'
	import InsertManyCsvModal from './InsertManyCsvModal.svelte'
	import DeleteManyModal from './DeleteManyModal.svelte'
	import DeleteMinselModal from './DeleteMinselModal.svelte'

	let insertManyFlag = false
	let addMinselModalOpen = false
	let editMinselModalOpen = false
	let deleteMinselModalOpen = false
	let addNewMidselModalOpen = false
	let addNewMajaselModalOpen = false
	let deleteManyModalOpen = false

	// fn
	const onChangeMajaSel = (row) => {
//		console.log("row: ", row)
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
	
	const openMinselEditModal = async (row) => {
		console.log("row to edit: ", row)
		currentMinselRowData = row
//		parent_selected = 
		editMinselModalOpen = true
	}

	const closeEditMinselModal = () => {
		editMinselModalOpen = false
		// Clear store ?
	}

	const closeAddMajaselModal = () => {
		addNewMajaselModalOpen = false
	}

	const closeAddMidselModal = () => {
		addNewMidselModalOpen = false
	}

	const handleDeleteButton = async (row) => {
		currentMinselRowData = row
		console.log("currentMinselRowData", currentMinselRowData)
		deleteMinselModalOpen = true
	}

	const deleteRow = async (_id) => {
		console.log("_id: ", _id)
//		console.log("VERCEL_URL", process.env.VERCEL_URL)

		const resp = await fetch(`/api/selections/min/${_id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		})

		// Remove record from store
		const deldata = await resp.json()
		console.log("deldata.deleted: ", deldata.deleted)
		$minselStore = $minselStore.filter((row) => {
			return row._id != deldata.deleted._id
		})
		console.log("$minselStore", $minselStore)
		deleteMinselModalOpen = false
	}
	const closeDeleteMinselModal = () => {
		deleteMinselModalOpen = false
	}

	const handleAddPost = async () => {
		addMinselModalOpen = true
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
			<th>中分類ジャンル</th>
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
				<td class="btn-action"><button class="btn-edit" on:click={() => openMinselEditModal(row)}>編集</button></td>
				<td class="btn-action"><button class="btn-delete" on:click={() => handleDeleteButton(row)}>削除</button></td>
			</tr>
		{/if}
	{/each}
	</tbody>
</table>
</section>

<!-- Delete Midsel modal -->
<DeleteMinselModal visible={deleteMinselModalOpen}>
	<h2>削除しますか？</h2>
	<div class="background-color: rgb(231 229 228); display: flex; flex-flow: column;">{currentMinselRowData.itemId}</div>
	<p>{currentMinselRowData.text}</p>
	<button on:click={() => deleteRow(currentMinselRowData._id)}>削除</button>
	<button on:click={closeDeleteMinselModal} style="background-color: rgb(254 226 226);">キャンセル</button>
</DeleteMinselModal>

<!-- delete many -->
<DeleteManyModal visible={deleteManyModalOpen}>
	<form method="post" action="?/deletebycsv" enctype="multipart/form-data">
		<div style="background-color: rgb(231 229 228); display: flex; flex-flow: column;">
			<label for="file">File</label>
			<input type="file" name="target" />
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
		<button on:click={() => closeDeleteMany()} style="background-color: rgb(254 226 226);">Cancel</button>
	</form>
</DeleteManyModal>

<!-- insert many -->
<InsertManyCsvModal visible={insertManyFlag}>
	<form method="post" action="?/addbycsv" enctype="multipart/form-data">
		<div style="background-color: rgb(231 229 228); display: flex; flex-flow: column;">
			<label for="file">File</label>
			<input type="file" name="target" />
		</div>
		<button type="submit" style="border: 1px; background-color: rgb(255 237 213);">Submit</button>
		<button on:click={() => closeInsertMany()} style="background-color: rgb(254 226 226);">Cancel</button>
	</form>
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
		<button on:click={closeAddMajaselModal} style="background-color: rgb(254 226 226);">Cancel</button>
	</form>
</AddNewMajaselModal>

<!-- Add New Mid selection modal -->
<AddNewMidselModal visible={addNewMidselModalOpen}>
	<h2>中分類を作成する</h2>
	<form method="post" action="?/addnewmid" use:enhance={() => {
		return async ({ result }) => {
			invalidateAll()
			await applyAction(result)
			// Renew store
			console.log("result: ", result.data)
			// Close modal
			addNewMidselModalOpen = false
			$majaChoicesStore = [...$majaChoicesStore, { _id: result.data.added.inserted._id, itemId: result.data.added.inserted.itemId, text: result.data.added.inserted.text }] //, add_arr]
			console.log("$majaChoicesStore", $majaChoicesStore)
			currentMinselRowData.parentId.itemId = result.data.added.inserted.itemId //  switch to the Action newly created
		}
	}}>
		<div style="background-color: rgb(231 229 228); display: flex; flex-flow: column;">
			<label for="parentId_id">大分類選択</label>
			<select name="parentId_id" bind:value={currentmajaItemId} on:change={() => onChangeMajaSel(currentMidselRowData)}>
					<option selected disabled value="大分類を選択...">大分類を選択...</option>
				{#each $majaChoicesStore as p_elem}
					<option value={p_elem._id}>{p_elem._id}</option>
				{/each}
				<option value={addNewMajaChoice}>大分類作成...</option>
			</select>
		</div>
	
		<div style="background-color: rgb(231 229 228); display: flex; flex-flow: column;">
			<label for="mid_name">中分類の名前</label>
			<input type="text" name="mid_name" bind:value={newmid_str} />
		</div>
		<button type="submit" style="border: 1px; background-color: rgb(255 237 213);">Submit</button>
		<button on:click={closeAddMidselModal} style="background-color: rgb(254 226 226);">Cancel</button>
	</form>
</AddNewMidselModal>

<AddMinselModal visible={addMinselModalOpen}>
	<form method="post" action="?/addminselpost" use:enhance={() => {
		return async ({ result }) => {
			invalidateAll()
			await applyAction(result)
			// Close modal
			addMinselModalOpen = false
			// Renew store
			const { _id, itemId, text, parentId, createdAt, updatedAt } = JSON.parse(result.data.added)
			console.log("parentId", parentId)
			$minselStore = [...$minselStore, { _id: _id, itemId: itemId, text: text, parentId: parentId, createdAt: createdAt, updatedAt: updatedAt }]
			$minselStore = $minselStore
			console.log("now $minselStore", $minselStore)
		}
	}}>
		<div style="background-color: rgb(231 229 228); display: flex; flex-flow: column;">
			<label for="itemId">itemId</label>
			<input type="number" name="itemId" />
		</div>
		<div style="background-color: rgb(231 229 228); display: flex; flex-flow: column;">
			<label for="parentId_id">中分類選択</label>
			<select name="parentId_id" bind:value={currentmidItemId} on:change={() => onChangeMidSel(currentMinselRowData)}>
				{#each $midselStore as p_elem}
					<option value={p_elem._id}>{p_elem.text}</option>
				{/each}
					<option value={addNewMidChoice}>中分類作成...</option>
			</select>
		</div>
		<div style="background-color: rgb(231 229 228); display: flex; flex-flow: column;">
			<label for="text">text</label>
			<input type="text" name="text" />
		</div>
		<button type="submit" style="border: 1px; background-color: rgb(255 237 213);">Submit</button>
	</form>
	<button on:click={() => addMinselModalOpen = false} style="background-color: rgb(254 226 226);">Cancel</button>
</AddMinselModal>

<!-- Edit Midsel Modal -->
<EditMinselModal visible={editMinselModalOpen}>
	<form method="post" action="?/editminselpost" use:enhance={() => {
		return async ({ result }) => {
			invalidateAll()
			await applyAction(result)
			// Renew store
			const { _id, itemId, text, parentId } = JSON.parse(result.data.updated)
			// Close modal
			editMinselModalOpen = false
//			const xloc = $minselStore.findIndex((elem) => elem._id === _id)
//			$minselStore.splice(xloc, 1, { _id: _id, itemId: itemId, text: text, "parentId.text": parentId.text })
			$minselStore = $minselStore
		}
	}}>
		<input type="hidden" name="_id" bind:value={currentMinselRowData._id} />
		<div style="background-color: rgb(231 229 228); display: flex; flex-flow: column;">
			<label for="itemId">itemId</label>
			<input type="number" name="itemId" bind:value={currentMinselRowData.itemId} />
		</div>
		<div style="background-color: rgb(231 229 228); display: flex; flex-flow: column;">
			<label for="parentId_id">中分類選択</label>
			<select name="parentId_id" bind:value={currentmidItemId} on:change={() => onChangeMidSel(currentMinselRowData)}>
				{#each $midselStore as p_elem}
					<option value={p_elem._id}>{p_elem.text}</option>
				{/each}
					<option value={addNewMidChoice}>中分類作成...</option>
			</select>
		</div>
		<div style="background-color: rgb(231 229 228); display: flex; flex-flow: column;">
			<label for="text">テキスト</label>
			<input type="text" name="text" bind:value={currentMinselRowData.text} />
		</div>
		<button type="submit" style="border: 1px; background-color: rgb(255 237 213);">Submit</button>
	</form>
	<button on:click={closeEditMinselModal} style="background-color: rgb(254 226 226);">Cancel</button>
</EditMinselModal>

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