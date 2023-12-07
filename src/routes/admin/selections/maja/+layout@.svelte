<script>
  import AdminHeader from '../../AdminHeader.svelte'
  import AdminFooter from '../../AdminFooter.svelte'
  
  let pagetitle="大分類選択肢管理"
</script>

<AdminHeader pagetitle={pagetitle} />

<slot />

<AdminFooter />
