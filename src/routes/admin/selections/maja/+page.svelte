<script>
  import { invalidateAll } from '$app/navigation'
  import { enhance, applyAction } from '$app/forms'

	import { majaChoicesStore } from '../store'

	/** @type {import('./$types').PageData} */
	export let data
	majaChoicesStore.set(JSON.parse(data["majaselections"]))

	/** @type {import('./$types').ActionData} */
	export let form

	const aryMax = (a, b) => {return Math.max(a, b)}
	const aryMin = (a, b) => {return Math.min(a, b)}
	let upperlimit
	$: upperlimit = $majaChoicesStore.map((obj) => obj.itemId).reduce(aryMax, 1)
	let lowerlimit
	$: lowerlimit = $majaChoicesStore.map((obj) => obj.itemId).reduce(aryMin, 1)

	//
	import InsertManyCsvModal from '../mid/InsertManyCsvModal.svelte'
	import DeleteManyModal from '../mid/DeleteManyModal.svelte'
	import DeleteMajaselModal from './DeleteMajaselModal.svelte'
	import EditMajaselModal from '../mid/AddNewMajaselModal.svelte'

	//
	let addNewMajaselFlag = false
	let insertManyFlag = false
	let deleteMajaselModalOpen = false
	let editMajaselModalOpen = false
	let deleteManyModalOpen = false

	//
	let currentMajaselRowData
	let childCounts

	const handleAddPost = async () => {
		addNewMajaselFlag = true
		editMajaselModalOpen = true
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

	const openEditModal = async (row) => {
		currentMajaselRowData = row
//		parent_selected = 
		editMajaselModalOpen = true
	}
	const closeMajaselModal = async () => {
		editMajaselModalOpen = false
		addNewMajaselFlag = false
		form = null
	}

	const handleDeleteButton = async (row) => {
		currentMajaselRowData = row
		console.log("currentMajaselRowData", currentMajaselRowData)
		deleteMajaselModalOpen = true
	}
	const deleteRow = async (_id) => {
		console.log("_id: ", _id)
		{
			// Check if this post has any child(ren)?
			const resp = await fetch(`/api/getchildren/maja/${_id}`, {
				method: 'GET',
			})
			const childdata = await resp.json()
			childCounts = childdata.children.length
			console.log("child_rength: ", childCounts)
			if (childCounts > 0) {
				console.log("have children.")
				return
			}
		}

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

	const closeDeleteModal = async () => {
		deleteMajaselModalOpen = false
		childCounts = undefined
	}
</script>

<section>
<!--	<h2 style="width: 100%; display: inline-block; text-align: center; background-color: #fecca2;">大分類選択肢管理</h2> -->

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
				<td class="btn-action"><button class="btn-edit" on:click={() => openEditModal(row)}>編集</button></td>
				<td class="btn-action"><button class="btn-delete" on:click={() => handleDeleteButton(row)}>削除</button></td>
			</tr>
		{/each}
	</tbody>
</table>
</section>

<!-- Delete Midsel modal -->
<DeleteMajaselModal visible={deleteMajaselModalOpen}>
	{#if childCounts > 0}
		<span style="color: red;">子要素が空ではありません</span>
	{/if}
	<h2>削除しますか？</h2>
	<div class="background-color: rgb(231 229 228); display: flex; flex-flow: column;">{currentMajaselRowData.itemId}</div>
	<p>{currentMajaselRowData.text}</p>
	<button on:click={() => deleteRow(currentMajaselRowData._id)}>削除</button>
	<button on:click={() => closeDeleteModal()} style="background-color: rgb(254 226 226);">キャンセル</button>
</DeleteMajaselModal>

<!-- delete many -->
<DeleteManyModal visible={deleteManyModalOpen}>
	<form method="post" action="?/deletebycsv" enctype="multipart/form-data" use:enhance={({ formData }) => {
		return async ({ result }) => {
			invalidateAll()
			await applyAction(result)
			if (result.data) {
				// Do something
				$majaChoicesStore = $majaChoicesStore.filter((row) => {
					return (
						row.itemId < Number(JSON.parse(result.data.range)["lowerlimit"]) ||
						row.itemId > Number(JSON.parse(result.data.range)["upperlimit"])
					)})
				console.log("$majaChoicesStore", $majaChoicesStore)
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

<!-- insert many -->
<InsertManyCsvModal visible={insertManyFlag}>
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
				$majaChoicesStore = [...$majaChoicesStore, ...tmp_arr]
				console.log("$majaChoicesStore", $majaChoicesStore)
				insertManyFlag = false
			}
		}
	}}>
		<div style="background-color: rgb(231 229 228); display: flex; flex-flow: column;">
			<label for="sourcefile">File</label>
			<input type="file" name="sourcefile" accept=".csv" />
		</div>
		<button type="submit" style="border: 1px; background-color: rgb(255 237 213);">Submit</button>
	</form>
	<button on:click={() => closeInsertMany()} style="background-color: rgb(254 226 226);">Cancel</button>
</InsertManyCsvModal>

<!-- Edit / Add Midsel Modal -->
{#if addNewMajaselFlag === false} <!-- Edit existing post -->
<EditMajaselModal visible={editMajaselModalOpen}>
	<form method="post" action="?/editmajaselpost" use:enhance={() => {
		return async ({ result }) => {
			invalidateAll()
			await applyAction(result)
			if (result.data) {
				// Renew store
				const { _id, itemId, text, createdAt, updatedAt } = JSON.parse(result.data.updated)
				// Close modal
				editMajaselModalOpen = false
				// locate: Modified _id = JSON.parse(result.data.updated)["_id"]
				const xloc = $majaChoicesStore.findIndex((elem) => elem._id === _id)
				$majaChoicesStore.splice(xloc, 1, { _id: _id, itemId: itemId, text: text, createdAt: createdAt, updatedAt: updatedAt })
				$majaChoicesStore = $majaChoicesStore
				form = null
	//			currentMinselRowData.parentId.itemId = result.data.added.inserted.itemId //  switch to the Action newly created
			}
		}
	}}>
	{#if form?.dupval}<p class="error" style="background-color: #fefefe; color: red;">itemIdが重複しています</p>{/if}
		<input type="hidden" name="_id" bind:value={currentMajaselRowData._id} />
		<div style="background-color: rgb(231 229 228); display: flex; flex-flow: column;">
			<label for="id">itemId</label>
			<input type="number" name="itemId" value={currentMajaselRowData.itemId} required />
		</div>
		<div style="background-color: rgb(231 229 228); display: flex; flex-flow: column;">
			<label for="text">テキスト</label>
			<input type="text" name="text" value={currentMajaselRowData.text} required />
		</div>
		<button type="submit" style="border: 1px; background-color: rgb(255 237 213);">Submit</button>
	</form>
	<button on:click={() => closeMajaselModal()} style="background-color: rgb(254 226 226);">Cancel</button>
</EditMajaselModal>
{:else if addNewMajaselFlag} <!-- Add new post -->
<EditMajaselModal visible={editMajaselModalOpen}>
	<form method="post" action="?/addmajaselpost" use:enhance={() => {
		return async ({ result }) => {
			invalidateAll()
			await applyAction(result)
			if (result.data) {
			// Renew store
			const { _id, itemId, text, createdAt, updatedAt } = JSON.parse(result.data.added)
			// Close modal
			editMajaselModalOpen = false
			$majaChoicesStore = [...$majaChoicesStore, { _id: _id, itemId: itemId, text: text, createdAt: createdAt, updatedAt: updatedAt }]
			form = null
			}
		}
	}}>
	{#if form?.dupval}<p class="error" style="background-color: #fefefe; color: red;">itemIdが重複しています</p>{/if}
		<div style="background-color: rgb(231 229 228); display: flex; flex-flow: column;">
			<label for="itemId">itemId</label>
			<input type="number" name="itemId" required />
		</div>
		<div style="background-color: rgb(231 229 228); display: flex; flex-flow: column;">
			<label for="text">テキスト</label>
			<input type="text" name="text" required />
		</div>
		<button type="submit" style="border: 1px; background-color: rgb(255 237 213);">Submit</button>
	</form>
	<button on:click={() => closeMajaselModal()} style="background-color: rgb(254 226 226);">Cancel</button>
</EditMajaselModal>
{/if}

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