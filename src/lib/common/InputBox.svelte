<script>
	import { enhance, applyAction } from '$app/forms'
	import { invalidateAll } from '$app/navigation'

	import { page } from '$app/stores'
	/** @type {import('./$types').Actions} */
	

	import { gptchatStrStore } from './store'
	let message

</script>

<!-- 3rd flex item: input box -->
<form
	method="POST"
	style="height: 2.25rem; margin-top: 0rem; margin-left: 0.5rem; margin-bottom: 0.5rem; margin-right: 0.5rem; display: flex; flex-wrap: nowrap; flex-direction: row; gap: 4px;"
	action="/chatmain"
	use:enhance={() => {
		return async ({ result }) => {
			invalidateAll()
			await applyAction(result)
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
		<input type="submit" name="submit" value="" class="send_envelope" style="flex: 0;" />
	</div>
</form>

<style>
	.send_envelope {
		width: 2.25rem;
		height: 2.25rem;
		background: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24"><path fill="%23000000" d="M22 5.5H9C7.9 5.5 7 6.4 7 7.5V16.5C7 17.61 7.9 18.5 9 18.5H22C23.11 18.5 24 17.61 24 16.5V7.5C24 6.4 23.11 5.5 22 5.5M22 16.5H9V9.17L15.5 12.5L22 9.17V16.5M15.5 10.81L9 7.5H22L15.5 10.81M5 16.5C5 16.67 5.03 16.83 5.05 17H1C.448 17 0 16.55 0 16S.448 15 1 15H5V16.5M3 7H5.05C5.03 7.17 5 7.33 5 7.5V9H3C2.45 9 2 8.55 2 8S2.45 7 3 7M1 12C1 11.45 1.45 11 2 11H5V13H2C1.45 13 1 12.55 1 12Z" /></svg>') no-repeat center center;
	}
</style>