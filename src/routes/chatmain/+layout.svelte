<script>
	import Header from './Header.svelte'
//	import InputBox from './InputBox.svelte'

</script>

<div class="container_wrapper" style="display: flex; flex-direction: column; width: 100vw; height: 100vh; height: 100svh; justify-content: between;"> <!--  min-height: 100svh; min-height: 100vh; -->
	<header>
		<Header title="AIに質問" />
	</header>

<!-- 2nd flex item -->
<slot />

<footer>
</footer>
</div>