<script>
	import { Clock } from 'svelte-loading-spinners'
	import { enhance, applyAction } from '$app/forms'
	import { invalidateAll } from '$app/navigation'

	// Sub components
	import InputBox from './InputBox.svelte'

	// icons
	import gptIcon from '$lib/assets/icons/icons8-チャットチャット-144.png'
	import chatOperatorIcon from '$lib/assets/icons/8m06nfdad32a2o2pgo3p8kboai.png'

	//	import DarkSwitcher from './DarkSwitcher.svelte'
//	export let isVisibleGptAnswerBox

	import { loading, isVisibleGptAnswerBox, majaArray, midArray, minArray, majaSelectedStore, midSelectedStore, minSelectedStore, gptchatStrStore, message, prevTalks } from './store'

	/** @type {import('./$types').PageData} */
	export let data

	majaArray.set(JSON.parse(data.majaselections))
	midArray.set(JSON.parse(data.midselections))
	minArray.set(JSON.parse(data.minselections))

	const handlemQChange = () => {
		console.log("$majaSelectedStore: ", $majaSelectedStore)
	}

	const handlemidQChange = () => {
		console.log("$midSelectedStore", $midSelectedStore)
	}

	const handleminQChange = () => {
		console.log("$minSelectedStore", $minSelectedStore)
	}

</script>

<!-- <DarkSwitcher /> -->

<section style="flex: 1; overflow-y: scroll;">
	<!-- 大分類 -->
	<div class="chat-message-text original-box-shadow">
		<div style="width: 100%; font-size: 1rem; line-height: 1rem;"><span style="">大分類選択（任意）：</span></div>
		<select bind:value={$majaSelectedStore} on:change={() => handlemQChange()} style="width: 100%;">
			<option selected disabled value="選択...">選択...</option>
			{#each $majaArray as mq}
			<optgroup label="">
				<option value={mq}>
					{mq.text}
				</option>
			</optgroup>
			{/each}
		</select>
	</div>

	<!-- 中分類 -->
	{#if $majaSelectedStore && $majaSelectedStore.itemId >= 1}
	<div class="chat-message-text original-box-shadow">
		<div style="width: 100%; font-size: 1rem; line-height: 1rem;"><span>中分類選択（任意）：</span></div>
		<select bind:value={$midSelectedStore} on:change={() => handlemidQChange()} style="width: 100%;">
			<option selected disabled value="選択...">選択...</option>
			{#each $midArray as midrow}
			{#if midrow.parentId._id === $majaSelectedStore._id}
			<optgroup label="" style="line-height: 0.75rem;">
				<option value={midrow}>
					{midrow.text}
				</option>
			</optgroup>
			{/if}
		{/each}
		</select>
	</div>
	{/if}

<!-- 小分類 -->
	{#if $midSelectedStore && $midSelectedStore.itemId >= 1}
	<div class="chat-message-text original-box-shadow">
		<div style="width: 100%; font-size: 1rem; line-height: 1rem;"><span>小分類選択（任意）：</span></div>
		<select bind:value={$minSelectedStore} on:change={() => handleminQChange()} style="width: 100%;">
			<option selected disabled value="選択...">選択...</option>
			{#each $minArray as minq}
			{#if minq.parentId._id === $midSelectedStore._id}
			<optgroup label="" style="line-height: 0.75rem;">
				<option value={minq}>
					{minq.text}
				</option>
			</optgroup>
			{/if}
			{/each}
		</select>
	</div>
	{/if}

		<!-- user Question -->
		{#if $prevTalks}
		{#each $prevTalks as prevEntry}
		<div class="talk_wrapper" style="display: grid; grid-template-columns: repeat(12, 1fr); grid-template-rows: 2fr; gap: 6px; margin-right: 0.75rem; margin-bottom: 0rem;">
			<div class="message original-box-shadow" style="grid-column: 5 / span 8; grid-row: 1/2; margin-left: 6px;">
				<p class="chat-message-text" style="font-size: 1rem; line-height: 1rem; padding: 0.5rem;">
					{#if prevEntry.majaSelectedStore}
						大分類:{prevEntry.majaSelectedStore.text}<br>
					{/if}
					{#if prevEntry.midSelectedStore != null | prevEntry.midSelectedStore != undefined}
						中分類:{prevEntry.midSelectedStore.text}<br>
					{/if}
					{#if prevEntry.minSelectedStore != null || prevEntry.minSelectedStore != undefined}
					小分類:{prevEntry.minSelectedStore.text || ''}<br>
					{/if}
					{#if prevEntry.message}
						{prevEntry.message}
					{/if}
					<!-- GPT回答: {prevEntry.gptchatStrStore} -->
				</p>
			</div>
		</div>

		<div class="talk_wrapper" style="display: grid; grid-template-columns: repeat(12, 1fr); grid-template-rows: 2fr; gap: 6px; margin-bottom: 0rem;">
			<div class="prof_thumbnail" style="padding-top: 4px; padding-left: 2px; grid-column: 1/2; grid-row: 1/2; width: 4rem; display: flex; flex-flow: column; justify-content: start;">
				<img src={chatOperatorIcon} alt="" style="padding: 0; margin: 0; display:inline-block; border-radius: 25%"/>
				<span class="prof_name" style="white-space: nowrap; text-align: center; font-size: 0.75rem; line-height: 0.85rem;">ChatGPT</span>
			</div>
			<div class="message original-box-shadow" style="grid-column: 2/ span 8; grid-row: 1/2; margin-left: 6px; display: flex; flex-direction: column;">
				<span class="chat-message-text" style="display: inline-block; font-size: 1rem; line-height: 1rem; padding: 0.5rem;">
					{prevEntry.gptchatStrStore}
				</span>
			</div>
			<div style="grid-column: 5/8; grid-row: 2/3;">
			</div>
		</div>

		{/each}
		{/if}

		<!-- GPT answer -->
		{#if $isVisibleGptAnswerBox}
		<div class="talk_wrapper" style="display: grid; grid-template-columns: repeat(12, 1fr); grid-template-rows: 2fr; gap: 6px; margin-bottom: 0rem;">
			<div class="prof_thumbnail" style="padding-top: 4px; padding-left: 2px; grid-column: 1/2; grid-row: 1/2; width: 4rem; display: flex; flex-flow: column; justify-content: start;">
				<img src={chatOperatorIcon} alt="" style="padding: 0; margin: 0; display:inline-block; border-radius: 25%"/>
				<span class="prof_name" style="white-space: nowrap; text-align: center; font-size: 0.75rem; line-height: 0.85rem;">ChatGPT</span>
			</div>
			<div class="message original-box-shadow" style="grid-column: 2/ span 8; grid-row: 1/2; margin-left: 6px; display: flex; flex-direction: column;">
				<span class="chat-message-text" style="display: inline-block; font-size: 1rem; line-height: 1rem; padding: 0.5rem;">
					{#if $loading}
						<Clock size="32" color="#0080ff" unit="px" />
						<span>お待ちください...</span>
					{/if}
					<!-- {$gptchatStrStore.slice(-1)[0]} -->
				</span>
			</div>
			<div style="grid-column: 5/8; grid-row: 2/3;">
			</div>
		</div>
		{/if}
</section>

<InputBox />

<style>
@import url('https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Sawarabi+Mincho&display=swap');

.chat-message-text {
	font-family: 'M PLUS 1p', sans-serif;
}

.original-box-shadow {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	color: #595959;
	padding: 6px 6px 6px 0px;
	margin-bottom: 1.125rem;
	align-self: flex-end;
	background-color: #fff0f5;
	border-radius: 9px 9px;
	box-shadow: 0px 10px 10px -6px rgba(0, 0, 0, 0.3);
}

select {
	padding: 0.75rem;
	font-family: 'Sawarabi Mincho', serif;
	font-size: 1rem;
}
</style>

<svelte:head>
    <script async src="https://code.iconify.design/1/1.0.4/iconify.min.js"></script>
</svelte:head>