<script>
	import { Clock } from 'svelte-loading-spinners'
	import { enhance, applyAction } from '$app/forms'
	import { invalidateAll } from '$app/navigation'

	// icons
	import gptIcon from '$lib/assets/icons/icons8-チャットチャット-144.png'

	//	import DarkSwitcher from './DarkSwitcher.svelte'
	let message
	let loading = false
	let isVisibleGptAnswerBox = false

	import { majaArray, midArray, minArray, majaSelectedStore, midSelectedStore, minSelectedStore, gptchatStrStore } from './store'

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
		<div style="width: 100vw; font-size: 1rem; line-height: 1rem;"><span style="">大分類選択（任意）：</span></div>
		<select bind:value={$majaSelectedStore} on:change={() => handlemQChange()} style="width: 100vw;">
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
		<div style="width: 100vw; font-size: 1rem; line-height: 1rem;"><span>中分類選択（任意）：</span></div>
		<select bind:value={$midSelectedStore} on:change={() => handlemidQChange()} style="width: 100vw;">
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
		<div style="width: 100vw; font-size: 1rem; line-height: 1rem;"><span>小分類選択（任意）：</span></div>
		<select bind:value={$minSelectedStore} on:change={() => handleminQChange()} style="width: 100vw;">
			<option selected disabled value="選択...">選択...</option>
			{#each $minArray as minq}
			{#if minq.parentId._id === $midSelectedStore._id}
			<optgroup label="" style="line-height: 1rem;">
				<option value={minq}>
					{minq.text}
				</option>
			</optgroup>
			{/if}
			{/each}
		</select>
	</div>
	{/if}

<!-- if message sender is target -->
<!--		<div class="talk_wrapper" style="display: grid; grid-template-columns: repeat(12, 1fr); grid-template-rows: 2fr; gap: 6px; margin-bottom: 0rem;">
			<div class="prof_thumbnail" style="padding-top: 4px; padding-left: 2px; grid-column: 1/2; grid-row: 1/2; width: 3.25rem; display: flex; flex-flow: column; justify-content: start;">
				<img src="/src/lib/assets/icons/icons8-チャットチャット-144.png" alt="" style="padding: 0; margin: 0; display:inline-block; border-radius: 50%"/>
				<span class="prof_name" style="white-space: nowrap; text-align: center; font-size: 0.75rem; line-height: 0.85rem;">ChatGPT</span>
			</div>
			<div class="message original-box-shadow" style="grid-column: 2/ span 8; grid-row: 1/2; margin-left: 6px; display: flex; flex-direction: column;">
				<span class="chat-message-text" style="display: inline-block; font-size: 1rem; line-height: 1rem; padding: 0.5rem;">大分類を選択してください</span>
				<select bind:value={selected} on:change={() => handlemQChange()}>
					{#each major_questions as mq}
						<option value={mq}>
							{mq.text}
						</option>
					{/each}
					</select>
				</div>
			<div style="grid-column: 5/8; grid-row: 2/3;"> 
				<span style="white-space: nowrap;">{getJpnTime(row.createdAt)}</span>
			</div>
		</div>
-->
<!--		{#if selected && selected.id >= 1}
		<div class="talk_wrapper" style="display: grid; grid-template-columns: repeat(12, 1fr); grid-template-rows: 2fr; gap: 6px; margin-right: 0.75rem; margin-bottom: 0rem;">
			<div class="message original-box-shadow" style="grid-column: 5 / span 8; grid-row: 1/2; margin-left: 6px;">
				<p class="chat-message-text" style="font-size: 1rem; line-height: 1rem; padding: 0.5rem;">
					{selected && selected.id >= 1 ? selected.text : '[waiting...]'}
				</p>
			</div>
			<div style="grid-column: 5/ span 2; grid-row: 2/3;">
				<button type="button">削除</button>
			</div>
		</div>
		{/if}
-->
		<!-- 中分類 -->
<!--		{#if selected && selected.id >= 1}
		<div class="talk_wrapper" style="display: grid; grid-template-columns: repeat(12, 1fr); grid-template-rows: 2fr; gap: 6px; margin-bottom: 0rem;">
			<div class="prof_thumbnail" style="padding-top: 4px; padding-left: 2px; grid-column: 1/2; grid-row: 1/2; width: 3.25rem; display: flex; flex-flow: column; justify-content: start;">
				<img src="/src/lib/assets/icons/icons8-チャットチャット-144.png" alt="" style="padding: 0; margin: 0; display:inline-block; border-radius: 50%"/>
				<span class="prof_name" style="white-space: nowrap; text-align: center; font-size: 0.75rem; line-height: 0.85rem;">ChatGPT</span>
			</div>
			<div class="message original-box-shadow" style="grid-column: 2/ span 8; grid-row: 1/2; margin-left: 6px; display: flex; flex-direction: column;">
				<span class="chat-message-text" style="display: inline-block; font-size: 1rem; line-height: 1rem; padding: 0.5rem;">中分類を選択してください</span>
				<select bind:value={min_selected} on:change={() => handleminQChange()}>
					{#each minor_questions[selected.id - 1] as minq}
						<option value={minq}>
							{minq.text}
						</option>
					{/each}
					</select>
				</div>
			<div style="grid-column: 5/8; grid-row: 2/3;">
				<span style="white-space: nowrap;">{getJpnTime(row.createdAt)}</span>
			</div>
		</div>
		{/if}
-->

		<!-- user Question -->
		{#if message}
		<div class="talk_wrapper" style="display: grid; grid-template-columns: repeat(12, 1fr); grid-template-rows: 2fr; gap: 6px; margin-right: 0.75rem; margin-bottom: 0rem;">
			<div class="message original-box-shadow" style="grid-column: 5 / span 8; grid-row: 1/2; margin-left: 6px;">
				<p class="chat-message-text" style="font-size: 1rem; line-height: 1rem; padding: 0.5rem;">
					{message}
				</p>
			</div>
			<div style="grid-column: 5/ span 2; grid-row: 2/3;">
				<button type="button">削除</button>
			</div>
		</div>
		{/if}

		<!-- GPT answer -->
		{#if isVisibleGptAnswerBox}
		<div class="talk_wrapper" style="display: grid; grid-template-columns: repeat(12, 1fr); grid-template-rows: 2fr; gap: 6px; margin-bottom: 0rem;">
			<div class="prof_thumbnail" style="padding-top: 4px; padding-left: 2px; grid-column: 1/2; grid-row: 1/2; width: 3.25rem; display: flex; flex-flow: column; justify-content: start;">
				<img src={gptIcon} alt="" style="padding: 0; margin: 0; display:inline-block; border-radius: 50%"/>
				<span class="prof_name" style="white-space: nowrap; text-align: center; font-size: 0.75rem; line-height: 0.85rem;">ChatGPT</span>
			</div>
			<div class="message original-box-shadow" style="grid-column: 2/ span 8; grid-row: 1/2; margin-left: 6px; display: flex; flex-direction: column;">
				<span class="chat-message-text" style="display: inline-block; font-size: 1rem; line-height: 1rem; padding: 0.5rem;">
					{#if loading}
						<Clock size="32" color="#0080ff" unit="px" />
					{/if}
					{$gptchatStrStore}
				</span>
			</div>
			<div style="grid-column: 5/8; grid-row: 2/3;">
<!--				<span style="white-space: nowrap;">{getJpnTime(row.createdAt)}</span> -->
			</div>
		</div>
		{/if}
</section>

<section>
	<form
	method="POST"
	style="height: 2.25rem; margin-top: 0rem; margin-left: 0.5rem; margin-bottom: 0.5rem; margin-right: 0.5rem; display: flex; flex-wrap: nowrap; flex-direction: row; gap: 4px;"
	action="/chatmain"
	use:enhance={() => {
		loading = true
		isVisibleGptAnswerBox = true
		$gptchatStrStore = ''

		return async ({ result }) => {
			invalidateAll()
			await applyAction(result)
			loading = false
			// Renew store
			if ('data' in result) {
				if (result.data !== undefined) {
					$gptchatStrStore = result.data.newpost
					console.log("result.data.newpost", $gptchatStrStore)
					message = ''
				}
			}
		}
	}}>
	<input type="text" bind:value={message} name="yourstr" style="width: 100%; box-shadow: 0 0 5px 0 rgba(255,153,0,1); border: 2px solid #fff !important; outline: 0; flex: 1;" />
	<div style="">
		<input type="hidden" name="majsel" value={$majaSelectedStore?.text || ''} />
		<input type="hidden" name="midsel" value={$midSelectedStore?.text || ''} />
		<input type="hidden" name="minsel" value={$minSelectedStore?.text || ''} />
		<input type="submit" name="submit" value="" class="send_envelope" style="flex: 0;" />
	</div>
	</form>
</section>

<style>
@import url('https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@500&display=swap');

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
.send_envelope {
		width: 2.25rem;
		height: 2.25rem;
		background: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24"><path fill="%23000000" d="M22 5.5H9C7.9 5.5 7 6.4 7 7.5V16.5C7 17.61 7.9 18.5 9 18.5H22C23.11 18.5 24 17.61 24 16.5V7.5C24 6.4 23.11 5.5 22 5.5M22 16.5H9V9.17L15.5 12.5L22 9.17V16.5M15.5 10.81L9 7.5H22L15.5 10.81M5 16.5C5 16.67 5.03 16.83 5.05 17H1C.448 17 0 16.55 0 16S.448 15 1 15H5V16.5M3 7H5.05C5.03 7.17 5 7.33 5 7.5V9H3C2.45 9 2 8.55 2 8S2.45 7 3 7M1 12C1 11.45 1.45 11 2 11H5V13H2C1.45 13 1 12.55 1 12Z" /></svg>') no-repeat center center;
	}

</style>

<svelte:head>
    <script async src="https://code.iconify.design/1/1.0.4/iconify.min.js"></script>
</svelte:head>