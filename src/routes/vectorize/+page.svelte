<script>
</script>

<section>
	<form method="POST" enctype="multipart/form-data">
		<div style="width: 90vw; display: grid; grid-template-columns: repeat(12, 1fr); gap: 6px; text-align: center; justify-content: center; margin: auto;">
			<div style="grid-column: 1 / span 12; background-color: #66cc99; display: flex; flex-flow: column;">
				<label for="text1">テキスト1</label>
				<textarea name="text1" class="textbox" cols="20" rows="5" />
			</div>
			<div style="grid-column: 1 / span 12; background-color: #faaa99; display: flex; flex-flow: column; border-radius: 15%;">
				<button type="submit" class="btn-submit">ベクタ登録</button>
			</div>
	</div>
</form>

</section>

<style>
	.btn-submit, .textbox {
		border: 2px solid #ccc;
	}
</style>