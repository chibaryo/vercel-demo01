<script>
	import { fly, fade } from 'svelte/transition'
	export let visible = false
</script>

{#if visible}
<div class="modal" transition:fly= {{ y: -200, duration: 300 }}>
	<slot />
</div>
<div class="overlay" transition:fade={{ duration: 200 }}></div>
{/if}

<style>
	.modal {
		width: 62vw;
		min-height: 38vh;
		padding: 24px;
		background-color: rgb(45 212 191);
		z-index: 10;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 6px;
	}
	.overlay {
		position: fixed;
		top :0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0,0,0,0.5);
		z-index: 2;
	}
</style>