<script>
  import homeIcon from '$lib/assets/icons/home-outline.svg'
//  let pagetitle = "管理画面"
  export let pagetitle
</script>

<header>
	<div style="display: grid; grid-template-columns: repeat (12, 1fr); gap: 6px; width: 100%; height: 2.5rem; background-color: #fecca2; border-top-left-radius: 1.5rem; border-top-right-radius: 1.5rem;">
		<div style="grid-column: 1 / span 1; align-self: center; padding-left: 1.25rem;">
			<a href="/">
				<img src={homeIcon} alt="home" style="height: 2rem;" />
			</a>
		</div>
		<div style="grid-column: 4 / span 2; align-self: center; text-align: center;">
			<span style="white-space: nowrap; font-size: 1.5rem;">{pagetitle}</span>
		</div>
		<div style="grid-column: 9 / span 4;">
			<span style="white-space: nowrap; background-color: #fecca2;"></span>
		</div>
	</div>
</header>