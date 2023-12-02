<!-- +page.svelte -->
<script>
  import { enhance, applyAction } from '$app/forms'
	let dialogElement
</script>

<dialog bind:this={dialogElement}>
  <!-- header, content, etc. -->

  <form method="POST" action="?/delete" use:enhance>
    <input type="hidden" name="todoId" value="321" />
    <input type="hidden" name="confirmed" value={true} />

    <button class="primary-button" formmethod="dialog">Cancel</button>
    <button class="danger-button" style="background-color: cyan;">Confirm</button>
  </form>

</dialog>

<form
  method="POST"
  action="?/delete"
  use:enhance={({ cancel }) => {
    dialogElement.show();
    // prevent the unconfirmed form submission
    cancel(); 
  }}
>
  <input type="hidden" name="todoId" value="331" />  
  <input type="hidden" name="confirmed" value={false} />

  <button class="danger-button">Delete</button>
</form>
