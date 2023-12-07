<script>
  import AdminHeader from '../AdminHeader.svelte'
  import AdminFooter from '../AdminFooter.svelte'
  
  let pagetitle="ベクタ管理"
</script>

<AdminHeader pagetitle={pagetitle} />

<slot />

<AdminFooter />
