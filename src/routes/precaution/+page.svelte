<script>
	import { Clock } from 'svelte-loading-spinners'
	import { enhance, applyAction } from '$app/forms'
	import { invalidateAll } from '$app/navigation'
	import Linkify from "linkify-react";

	// Sub components
//	import InputBox from './InputBox.svelte'

	// icons
	import gptIcon from '$lib/assets/icons/icons8-チャットチャット-144.png'
	import chatOperatorIcon from '$lib/assets/icons/8m06nfdad32a2o2pgo3p8kboai.png'
	import cmBanner from '$lib/assets/pictures/cmbanner/キャリアサポートガイド_banner.jpg'

	//	import DarkSwitcher from './DarkSwitcher.svelte'
//	export let isVisibleGptAnswerBox

	import { loading, isVisibleGptAnswerBox, majaArray, midArray, minArray, majaSelectedStore, midSelectedStore, minSelectedStore, gptchatStrStore, message, prevTalks } from './store'

	/** @type {import('./$types').PageData} */
	export let data


</script>

<section class="flex-1 overflow-y-scroll">
    <div class="flex flex-col items-center my-12">
        <!-- Main Text -->
        <div class="bg-gray-300 mx-6 px-10 py-14 my-8">
            <span class="text-2xl">
                回答結果には更新がかかる可能性があるため、最新の情報は進路支援センターに確認してください。
            </span>
        </div>

    </div>
</section>

<!-- Bottom button -->
<div class="flex justify-center my-6">
    <a class="bg-sky-500 p-6" href="./chatmain">
        <span class="text-xl text-white px-8">確認しました</span>
    </a>
</div>
