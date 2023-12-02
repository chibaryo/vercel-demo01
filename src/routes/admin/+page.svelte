<script>
	/** @type {import('./$types').PageData} */
	export let data

	let currentMidselRowData

  import homeIcon from '$lib/assets/icons/home-outline.svg'
</script>



<section>
	<div style="display: grid; grid-template-columns: repeat (12, 1fr); gap: 6px; width: 100vw; height: 3.5rem; background-color: #fecca2; border-top-left-radius: 1.5rem; border-top-right-radius: 1.5rem;">
		<div style="grid-column: 1 / span 1; align-self: center; padding-left: 1.25rem;">
			<a href="/">
				<img src={homeIcon} alt="home" style="height: 2.5rem;" />
			</a>
		</div>
		<div style="grid-column: 4 / span 2; align-self: center; text-align: center;">
			<span style="white-space: nowrap; font-size: 1.75rem;">管理画面</span>
		</div>
		<div style="grid-column: 9 / span 4;">
			<span style="white-space: nowrap; background-color: #fecca2;"></span>
		</div>
	</div>


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
			<a href="/admin/vectors" class="btn-114"><span>ベクタDB管理</span></a>
		</div>
	</div>
</section>

<style>
	@keyframes loop {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-100%);
    }
}
.scroll {
    display: flex;
		height: 100vh;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    overflow-x: hidden;
}
.scroll-list {
    display: flex;
		flex-flow: column;
    align-items: center;
    animation: loop infinite linear 10s both;
}

@keyframes bgloop {
	from {
		background-position: center 0;
	}
	to {
		background-position: center 200px;
	}
}

.frame {
  width: 100vw;
	display: grid;
	grid-template-columns: repeat (2, 1fr);
	gap: 0.5rem;
	margin: 2rem auto;
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
	font-size: 1.5rem;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
	margin: auto;
	width: 100%;
	padding-top: 3rem;
	padding-bottom: 3rem;
	place-self: center;
	align-self: center;
	justify-self: center;
}

.btn-112 {
  display: inline-block;
  position: relative;
	border-radius: 5px;
  background: #f0ecfc;
	background-image: linear-gradient(315deg, #f0ecfc 0%, #c797eb 74%);
	color: #fff;
	font-size: 1.5rem;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
	margin: auto;
	width: 100%;
	padding-top: 3rem;
	padding-bottom: 3rem;
	place-self: center;
	align-self: center;
	justify-self: center;
}

.btn-114 {
  display: inline-block;
  position: relative;
	border-radius: 5px;
	background: rgb(251,33,117);
  background: linear-gradient(0deg, rgba(251,33,117,1) 0%, rgba(234,76,137,1) 100%);
  color: #fff;
	font-size: 1.5rem;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
	margin: auto;
	width: 100%;
	padding-top: 3rem;
	padding-bottom: 3rem;
	place-self: center;
	align-self: center;
	justify-self: center;
}

.btn-113 {
  display: inline-block;
  position: relative;
	border-radius: 5px;
	background: linear-gradient(0deg, rgba(255,151,0,1) 0%, rgba(251,75,2,1) 100%);
	color: #fff;
	font-size: 1.5rem;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
	margin: auto;
	width: 100%;
	padding-top: 3rem;
	padding-bottom: 3rem;
	place-self: center;
	align-self: center;
	justify-self: center;
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

/* 13 */
.btn-113:hover {
    text-decoration: none;
    color: #fff;
}
.btn-113:before {
    position: absolute;
    content: '';
    display: inline-block;
    top: -180px;
    left: 0;
    width: 30px;
    height: 100%;
    background-color: #fff;
    animation: shiny-btn1 3s ease-in-out infinite;
}
.btn-113:hover{
  opacity: .7;
}
.btn-113:active{
  box-shadow:  4px 4px 6px 0 rgba(255,255,255,.3),
              -4px -4px 6px 0 rgba(116, 125, 136, .2), 
    inset -4px -4px 6px 0 rgba(255,255,255,.2),
    inset 4px 4px 6px 0 rgba(0, 0, 0, .2);
}


/* 11 */
.btn-111:hover {
    text-decoration: none;
    color: #fff;
}
.btn-111:before {
    position: absolute;
    content: '';
    display: inline-block;
    top: -180px;
    left: 0;
    width: 30px;
    height: 100%;
    background-color: #fff;
    animation: shiny-btn1 3s ease-in-out infinite;
}
.btn-111:hover{
  opacity: .7;
}
.btn-111:active{
  box-shadow:  4px 4px 6px 0 rgba(255,255,255,.3),
              -4px -4px 6px 0 rgba(116, 125, 136, .2), 
    inset -4px -4px 6px 0 rgba(255,255,255,.2),
    inset 4px 4px 6px 0 rgba(0, 0, 0, .2);
}

.btn-112:hover {
    text-decoration: none;
    color: #fff;
}
.btn-112:before {
    position: absolute;
    content: '';
    display: inline-block;
    top: -180px;
    left: 0;
    width: 30px;
    height: 100%;
    background-color: #fff;
    animation: shiny-btn1 3s ease-in-out infinite;
}
.btn-112:hover{
  opacity: .7;
}
.btn-112:active{
  box-shadow:  4px 4px 6px 0 rgba(255,255,255,.3),
              -4px -4px 6px 0 rgba(116, 125, 136, .2), 
    inset -4px -4px 6px 0 rgba(255,255,255,.2),
    inset 4px 4px 6px 0 rgba(0, 0, 0, .2);
}

.btn-114:hover {
    text-decoration: none;
    color: #fff;
}
.btn-114:before {
    position: absolute;
    content: '';
    display: inline-block;
    top: -180px;
    left: 0;
    width: 30px;
    height: 100%;
    background-color: #fff;
    animation: shiny-btn1 3s ease-in-out infinite;
}
.btn-114:hover{
  opacity: .7;
}
.btn-114:active{
  box-shadow:  4px 4px 6px 0 rgba(255,255,255,.3),
              -4px -4px 6px 0 rgba(116, 125, 136, .2), 
    inset -4px -4px 6px 0 rgba(255,255,255,.2),
    inset 4px 4px 6px 0 rgba(0, 0, 0, .2);
}


@keyframes shiny-btn1 {
    0% { -webkit-transform: scale(0) rotate(45deg); opacity: 0; }
    80% { -webkit-transform: scale(0) rotate(45deg); opacity: 0.5; }
    81% { -webkit-transform: scale(4) rotate(45deg); opacity: 1; }
    100% { -webkit-transform: scale(50) rotate(45deg); opacity: 0; }
}
</style>