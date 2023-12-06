<script>
  import { invalidateAll } from '$app/navigation'
  import { enhance, applyAction } from '$app/forms'

	let text1 = ''

	/** @type {import('./$types').PageData} */
	export let data

	/** @type {import('./$types').ActionData} */
	export let form

	/** @type {import('./$types').Snapshot<string>} */
	export const snapshot = {
		capture: () => text1,
		restore: (value) => text1 = value
	}
</script>

<section>
	<h3>フォームから登録</h3>
	<form method="POST" action="?/registervect" enctype="multipart/form-data">
		<div style="width: 90vw; display: grid; grid-template-columns: repeat(12, 1fr); gap: 6px; text-align: center; justify-content: center; margin: auto;">
			<div style="grid-column: 1 / span 12; background-color: #66cc99; display: flex; flex-flow: column;">
				<label for="text1">テキスト1</label>
				<textarea name="text1" class="textbox" cols="20" rows="5" bind:value={text1} />
			</div>
			<div style="grid-column: 1 / span 12; background-color: #faaa99; display: flex; flex-flow: column; border-radius: 15%;">
				<button type="submit" class="btn-submit">ベクタ登録</button>
			</div>
		</div>
	</form>

	<h3>Excelファイルから登録</h3>
	<form method="POST" action="?/addcsvvect" enctype="multipart/form-data" use:enhance>
		<div style="width: 90vw; display: grid; grid-template-columns: repeat(12, 1fr); gap: 6px; text-align: center; justify-content: center; margin: auto;">
			<label for="sourcefile" style="grid-column: 1 / span 12;">Excel登録</label>
			<span style="white-space: nowrap;">(A列のテキストがベクタ登録されます)</span>
			<input type="file" name="sourcefile" accept=".xlsx" style="grid-column: 1 / span 12;" />
			<button type="submit" class="btn-submit" style="grid-column: 1 / span 12;">アップロード</button>
		</div>
	</form>
</section>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Sawarabi+Mincho&display=swap');
	h3 {
		font-family: 'Sawarabi Mincho', serif;
	}
	.btn-submit, .textbox {
		border: 2px solid #ccc;
	}
</style>