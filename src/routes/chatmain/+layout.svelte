<script>
	import Header from './Header.svelte'
//	import InputBox from './InputBox.svelte'

</script>

<div class="container_wrapper" style="display: flex; flex-direction: column; width: 100%; height: 100vh; height: 100svh; justify-content: between;"> <!--  min-height: 100svh; min-height: 100vh; -->

<!-- 2nd flex item -->
<slot />

<footer>
</footer>
</div>