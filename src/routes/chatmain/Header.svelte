<script>
	import homeIcon from '$lib/assets/icons/home-outline.svg'
	import resetIcon from '$lib/assets/icons/reload.svg'
	export let title // : string
	import { isVisibleGptAnswerBox, majaSelectedStore, midSelectedStore, minSelectedStore, gptchatStrStore, prevTalks } from './store'

	const resetSelections = () => {
		majaSelectedStore.set({id: 0, text: ''})
		midSelectedStore.set({id: 0, text: ''})
		minSelectedStore.set({id: 0, text: ''})
		gptchatStrStore.set([])
		isVisibleGptAnswerBox.set(false)
		prevTalks.set([])
	}

</script>

<!-- 1st flex item -->
<div>
	<div class="navbar-wrapper">
		<span style="display: inline-block; grid-column: 6 / span 1; font-size: 1.5rem; line-height: 1.75rem; color: #ffffff; align-self: center; justify-self: center;">{ title }</span>
		<button on:click={() => resetSelections()} class="reset-btn">
			<img src={resetIcon} alt="reset" />
		</button>
	</div>
	<div style="background-color: #ff5192; color: #fff;">
		<span>GPTSWINTs（以下「本サービス」といいます。）において出力される内容は、ChatGPTにより自動生成されるものであり、その正確性及び最新性等を保証するものではございません。また、本サービスにおいて出力される内容により生じた本サービス利用者の損害について一切の責任を負いません。</span>
	</div>
</div>

<style>
	.navbar-wrapper {
		padding: 6px;
		background-color: #ff5192;
		border-top-left-radius: 25px;
		border-top-right-radius: 25px;
		display: grid;
		grid-template-columns: repeat (12, 1fr);
		gap: 4px;
	}
	.reset-btn {
		width: 1.875rem;
		grid-column: 12 / span 1;
	}
</style>