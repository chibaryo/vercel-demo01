<script>
  import { invalidateAll } from '$app/navigation'
  import { enhance, applyAction } from '$app/forms'

	import { majaChoicesStore } from '../store'

	/** @type {import('./$types').PageData} */
	export let data
	majaChoicesStore.set(JSON.parse(data["majaselections"]))

	const handleAddPost = async () => {

	}
	const handleInsertCsv = async () => {

	}
	const handleMultiRowDelete = async () => {
		
	}
	const openMajaselEditModal = async (row) => {

	}

	const handleDeleteButton = async (row) => {

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
