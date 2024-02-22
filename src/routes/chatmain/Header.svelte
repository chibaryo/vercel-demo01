<script>
	import homeIcon from '$lib/assets/icons/home-outline.svg'
	import resetIcon from '$lib/assets/icons/reload.svg'
	export let title // : string
	import { isVisibleGptAnswerBox, majaSelectedStore, midSelectedStore, minSelectedStore, gptchatStrStore, prevTalks } from './store'

	const resetSelections = () => {
		majaSelectedStore.set({id: 0, text: ''})
		midSelectedStore.set({id: 0, text: ''})
		minSelectedStore.set({id: 0, text: ''})
		gptchatStrStore.set('')
		isVisibleGptAnswerBox.set(false)
		prevTalks.set([])
	}

</script>

<!-- 1st flex item -->
<div class="navbar-wrapper">
	<span style="display: inline-block; grid-column: 6 / span 1; font-size: 1.5rem; line-height: 1.75rem; color: #ffffff; align-self: center; justify-self: center;">{ title }</span>
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