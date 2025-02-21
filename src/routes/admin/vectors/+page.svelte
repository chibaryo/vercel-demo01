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
	import AddNewVectModal from './DeleteselModal.svelte'

	import arrowLeftIcon from '$lib/assets/icons/arrow-left.svg'
	import pencilIcon from '$lib/assets/icons/pencil-alt.svg'
	import trashIcon from '$lib/assets/icons/trash-o.svg'
	//
	let currentRowData
	let editselModalOpen = false
	let deleteselModalOpen = false
	let deleteManyModalOpen = false
	let insertManyFlag = false
	let addVectModalFlag = false

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

	const handleDownload = async () => {
                const resp = await fetch(`/api/vectors`, {
                        method: 'GET',
                        headers: {
                                'Content-Type': 'application/json'
                        }
                })

                if (resp.ok) {
                        const blob = await resp.blob()
                        const url = window.URL.createObjectURL(blob)

                        const a = document.createElement('a')
                        a.href = url
                        a.download = 'vectors.xlsx'
                        document.body.appendChild(a)
                        a.click()

                        // Clean up
                        document.body.removeChild(a)
                        window.URL.revokeObjectURL(url)
                } else {
                        console.error('Failed to download file')
                }
    }	
	
	const closeDeleteModal = () => {
		deleteselModalOpen = false
	}

	const handleAddPost = async () => {
		addVectModalFlag = true
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
	const closeAddVectModal = () => {
		addVectModalFlag = false
	}
</script>

<section>
	<button style="border: 1px solid;" on:click={() => handleAddPost()}>新規登録</button>
	<button style="border: 1px solid;" on:click={() => handleInsertXlsx()}>Excel一括登録</button>
	<button style="border: 1px solid;" on:click={() => handleMultiRowDelete()}>範囲指定削除</button>
  <button style="border: 1px solid;" on:click={() => handleDownload()}>Excel一括ダウンロード</button>

  <table>
		<thead>
			<tr>
				<th>Id</th>
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

<!-- Add New Major selection modal -->
<AddNewVectModal visible={addVectModalFlag}>
	<h2>ベクタ登録する</h2>
	<form method="post" action="?/addvect" use:enhance={() => {
		return async ({ result }) => {
			invalidateAll()
			await applyAction(result)
			// Renew store
			const { _id, itemId, text1, vect_t1 } = JSON.parse(result.data.added)["resp"]
			// Close modal
			addVectModalFlag = false
			$vectStore = [...$vectStore, { _id: _id, itemId: itemId, text1: text1, vect_t1: vect_t1 }]
		}
	}}>
		<div style="background-color: rgb(231 229 228); display: flex; flex-flow: column;">
			<label for="text1">登録するテキスト</label>
			<input type="text" name="text1" />
		</div>
		<button type="submit" style="border: 1px; background-color: rgb(255 237 213);">登録</button>
		<button on:click={closeAddVectModal} style="background-color: rgb(254 226 226);">キャンセル</button>
	</form>
</AddNewVectModal>

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
						text1: obj.text1,
						vect_t1: obj.vect_t1
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
	div {
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
	thead > tr > th:nth-child(1) {
		width: 6vw;
	}
	thead > tr > th:nth-child(2) {
		width: 20vw;
	}
	thead > tr > th:nth-child(3) {
		width: 16vw;
	}
	thead > tr > th:nth-child(4) {
		width: 5vw;
	}
	td {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>