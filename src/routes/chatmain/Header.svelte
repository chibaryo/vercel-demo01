<script>
	import resetIcon from '$lib/assets/icons/reload.svg'
	export let title // : string
	import { isVisibleGptAnswerBox, majaSelectedStore, midSelectedStore, minSelectedStore, gptchatStrStore } from './store'

	const resetSelections = () => {
		majaSelectedStore.set({id: 0, text: ''})
		midSelectedStore.set({id: 0, text: ''})
		minSelectedStore.set({id: 0, text: ''})
		gptchatStrStore.set('')
		isVisibleGptAnswerBox.set(false)
	}
</script>

<!-- 1st flex item -->
<div class="navbar-wrapper">
	<span style="display: inline-block; grid-column: 7 / span 1; font-size: 1.125rem; line-height: 1.75rem; color: #ffffff; justify-self: center;">{ title }</span>
	<button on:click={() => resetSelections()} class="reset-btn">
		<img src={resetIcon} alt="reset" />
	</button>
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