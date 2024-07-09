<script>
	import cmBanner from '$lib/assets/pictures/cmbanner/キャリアサポートガイド_banner.jpg'

</script>

<section class="flex flex-col w-screen h-screen bg-gray-200 overflow-hidden">
    <div class="flex items-center justify-center bg-lime-400 h-12">Header</div>
    <div class="flex-1">
        <h1 class="text-3xl font-bold underline">Hello world!</h1>
    </div>
    <div class="mx-2 my-2 border-gray-600 border-2 p-1">
        <form
            class="flex flex-nowrap flex-row w-full outline-none gap-2">
            <input type="text" class="w-11/12" />
            <div style="">
                <input type="hidden" name="majsel" />
                <input type="hidden" name="midsel" />
                <input type="hidden" name="minsel" />
                <input
                    type="submit"
                    name="submit"
                    value=""
                    class="send_envelope bg-no-repeat w-10 h-10"
                />
            </div>
        </form>
    </div>
    <img
        src={cmBanner}
        alt="cmbanner"
        class="flex items-center justify-center bg-purple-200 text-center" />
</section>

<style>
  .send_envelope {
		background: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24"><path fill="%23000000" d="M22 5.5H9C7.9 5.5 7 6.4 7 7.5V16.5C7 17.61 7.9 18.5 9 18.5H22C23.11 18.5 24 17.61 24 16.5V7.5C24 6.4 23.11 5.5 22 5.5M22 16.5H9V9.17L15.5 12.5L22 9.17V16.5M15.5 10.81L9 7.5H22L15.5 10.81M5 16.5C5 16.67 5.03 16.83 5.05 17H1C.448 17 0 16.55 0 16S.448 15 1 15H5V16.5M3 7H5.05C5.03 7.17 5 7.33 5 7.5V9H3C2.45 9 2 8.55 2 8S2.45 7 3 7M1 12C1 11.45 1.45 11 2 11H5V13H2C1.45 13 1 12.55 1 12Z" /></svg>') no-repeat center center;
	}
</style>
