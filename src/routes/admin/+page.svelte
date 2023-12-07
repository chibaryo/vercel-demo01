<script>
	/** @type {import('./$types').PageData} */
	export let data

	let currentMidselRowData
</script>



<section>
	<div class="frame">
		<div style="grid-column: 1 / 2; width: 46vw; height: 8rem; display: flex; align-items: center; justify-content: center;">
			<a href="/admin/selections/maja" class="btn-111"><span>大分類管理</span></a>
		</div>
		<div style="grid-column: 2 / 3; width: 46vw; height: 8rem; display: flex; align-items: center; justify-content: center;">
			<a href="/admin/selections/mid" class="btn-112"><span>中分類管理</span></a>
		</div>
		<div style="grid-column: 1 / 2; width: 46vw; height: 8rem; display: flex; align-items: center; justify-content: center;">
			<a href="/admin/selections/min" class="btn-113"><span>小分類管理</span></a>
		</div>
		<div style="grid-column: 2 / 3; width: 46vw; height: 8rem; display: flex; align-items: center; justify-content: center;">
			<a href="/admin/vectors" class="btn-114"><span>ベクタ管理</span></a>
		</div>
	</div>
</section>

<style>
.frame {
  width: 100%;
  display: grid;
	grid-template-columns: repeat (2, 1fr);
	gap: 0.5rem;
  text-align: center;
	justify-content: center;
	padding: auto;
	align-items: center;
	place-content: center;
}
.btn-111 {
  display: inline-block;
  position: relative;
	border-radius: 5px;
	background-color: #89d8d3;
	background-image: linear-gradient(315deg, #89d8d3 0%, #03c8a8 74%);
  color: #fff;
	font-size: 1.25rem;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
	margin: auto;
  padding: 10px 30px;
}

.btn-112 {
  display: inline-block;
  position: relative;
	border-radius: 5px;
  background: #f0ecfc;
	background-image: linear-gradient(315deg, #f0ecfc 0%, #c797eb 74%);
	color: #fff;
	font-size: 1.25rem;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
	margin: auto;
  padding: 10px 30px;
}

.btn-114 {
  display: inline-block;
  position: relative;
	border-radius: 5px;
	background: rgb(251,33,117);
  background: linear-gradient(0deg, rgba(251,33,117,1) 0%, rgba(234,76,137,1) 100%);
  color: #fff;
	font-size: 1.25rem;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
	margin: auto;
  padding: 10px 30px;
/*	place-self: center;
	align-self: center;
	justify-self: center; */
}

.btn-113 {
  display: inline-block;
  position: relative;
	border-radius: 5px;
	background: linear-gradient(0deg, rgba(255,151,0,1) 0%, rgba(251,75,2,1) 100%);
	color: #fff;
	font-size: 1.25rem;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
	margin: auto;
  padding: 10px 30px;
/*	width: 100%; */
/*	place-self: center;
	align-self: center;
	justify-self: center; */
}

.custom-btn {
  display: inline-block;
  position: relative;
	width: 100%;
	height: 100%;
  border-radius: 5px;
  color: #222; /* fff */
	font-size: 1.5rem;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
	background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
	box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
   7px 7px 20px 0px rgba(0,0,0,.1),
   4px 4px 5px 0px rgba(0,0,0,.1);
  outline: none;
}

</style>