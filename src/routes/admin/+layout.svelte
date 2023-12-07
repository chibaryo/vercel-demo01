<script>
  import AdminHeader from './AdminHeader.svelte'
  import AdminFooter from './AdminFooter.svelte'
  let pagetitle="管理画面"
</script>

<AdminHeader pagetitle={pagetitle} />

<slot />

<AdminFooter />
