<script>
		export let title
		import { majaSelectedStore, midSelectedStore, minSelectedStore } from './store'

		const resetSelections = () => {
			majaSelectedStore.set({id: 0, text: ''})
			midSelectedStore.set({id: 0, text: ''})
			minSelectedStore.set({id: 0, text: ''})
		}

</script>

<!-- 1st flex item -->
<div class="navbar_wrapper" style="padding: 6px;background-color: #ff5192; border-top-left-radius: 25px; border-top-right-radius: 25px; display: grid; grid-template-columns: repeat (12, 1fr); gap: 4px;">
	<label style="grid-column: 3 / span 1;">
		<input class='toggle-checkbox' type='checkbox' />
		<div class='toggle-slot'>
			<div class='sun-icon-wrapper'>
				<div class="iconify sun-icon" data-icon="feather-sun" data-inline="false"></div>
			</div>
			<div class='toggle-button'></div>
			<div class='moon-icon-wrapper'>
				<div class="iconify moon-icon" data-icon="feather-moon" data-inline="false"></div>
			</div>
		</div>
	</label>

	<span style="display: inline-block; grid-column: 5 / span 2; font-size: 1.125rem; line-height: 1.75rem; color: #ffffff; justify-self: center;">{ title }</span>
	
	<button on:click={() => resetSelections()} style="width: 1.875rem; grid-column: 12 / span 1;">
		<img src="/src/lib/assets/icons/reload.svg" alt="" />
	</button>
</div>

<style>
	/* toggle-checkbox */
.toggle-checkbox {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.toggle-slot {
  position: relative;
  height: 2em;
  width: 4.25em;
  border: 4px solid #e4e7ec;
  border-radius: 2em;
  background-color: white;
  box-shadow: 0px 10px 25px #e4e7ec;
  transition: background-color 250ms;
}

.toggle-checkbox:checked ~ .toggle-slot {
  background-color: #374151;
}

.toggle-button {
  transform: translate(2.25em, 0.25em);
  position: absolute;
	top: -0.125rem; left: -0.125rem;
	height: 1.125em;
  width: 1.125em;
  border-radius: 50%;
  background-color: #ffeccf;
  box-shadow: inset 0px 0px 0px 0.15em #ffbb52;
  transition: background-color 250ms, border-color 250ms, transform 500ms cubic-bezier(.26,2,.46,.71);
}

.toggle-checkbox:checked ~ .toggle-slot .toggle-button {
  background-color: #485367;
  box-shadow: inset 0px 0px 0px 0.15em white;
  transform: translate(0.35em, 0.35em);
}

.sun-icon {
  position: absolute;
  height: 1.125em;
  width: 1.125em;
  color: #ffbb52;
}

.sun-icon-wrapper {
  position: absolute;
	top: -0.25rem; left: -0.15rem;
  height: 1.125em;
  width: 1.125em;
  opacity: 1;
  transform: translate(0.4em, 0.4em) rotate(15deg);
  transform-origin: 50% 50%;
  transition: opacity 150ms, transform 500ms cubic-bezier(.26,2,.46,.71);
}

.toggle-checkbox:checked ~ .toggle-slot .sun-icon-wrapper {
  opacity: 0;
  transform: translate(0.35em, 0.12em) rotate(0deg);
}

.moon-icon {
  position: absolute;
  height: 1.25em;
  width: 1.25em;
  color: white;
}

.moon-icon-wrapper {
  position: absolute;
	top: -0.25rem;
	left: 0.15rem;
  height: 1.25em;
  width: 1.25em;
  opacity: 0;
  transform: translate(2.25em, 0.4em) rotate(0deg);
  transform-origin: 50% 50%;
  transition: opacity 150ms, transform 500ms cubic-bezier(.26,2.5,.46,.71);
}

.toggle-checkbox:checked ~ .toggle-slot .moon-icon-wrapper {
  opacity: 1;
  transform: translate(2em, 0.4em) rotate(-15deg);
}

</style>