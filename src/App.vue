<template>
  <div id="app">
  	 <div class="page-group">
        <div class="page page-current">
        	<!--头部-->
        	 <header class="bar bar-nav">
				   <!-- <a class="icon icon-menu open-panel"  data-panel='#panel-left-demo'></a>-->
				    <button class="button pull-left">
					    <a class="icon icon-menu open-panel"  data-panel='#panel-left-demo'></a>
					  </button>
				    <h1 class="title">我的生活</h1>
				  </header>
				  <!--底部菜单栏-->
				   <nav class="bar bar-tab">
				    <a class="tab-item active" href="#">
				      <span class="icon icon-home"></span>
				      <span class="tab-label">首页</span>
				    </a>
				    <a class="tab-item" href="#">
				      <span class="icon icon-me"></span>
				      <span class="tab-label">我</span>
				    </a>
				    <a class="tab-item" href="#">
				      <span class="icon icon-star"></span>
				      <span class="tab-label">收藏</span>
				    </a>
				    <a class="tab-item" href="#">
				      <span class="icon icon-settings"></span>
				      <span class="tab-label">设置</span>
				    </a>
				  </nav>
				   <!--内容-->
				   <div class="content">
						<router-view class="view" v-bind:type="type"></router-view>
				  </div>
        </div>
    </div>

 <!--侧栏-->
 <div class="panel-overlay"></div>
<!-- Left Panel with Reveal effect -->
<div class="panel panel-left panel-reveal slidebar_box" id="panel-left-demo">
  <div class="content-block ">
				 <h2>休息时刻</h2>
		     <div class="list_box" style="padding-left: 20px;">
		     	<ul>
		     		<li @click="filterData('休息视频')">休息视频</li>
		     		<li @click="filterData('前端')">前端</li>
		     		<li @click="filterData('Android')">安卓</li>
		     		<li @click="filterData('拓展资源')">拓展资源</li>
		     		<li @click="filterData('App')">App</li>
		     		<li @click="filterData('瞎推荐')">瞎推荐</li>
		     	</ul>
		     </div>
  </div>
</div>
 </div> 
</template>
<script>
import home from './component/home.vue'

export default {
  name: 'app',
  data () {
    return {
      type: '福利'
    }
  },
  methods:{
  	filterData:function(type){
  		this.type = type;
  	}
  },
  components:{'home':home},
  
}
</script>
<style>
	img{
		width: 100%;
	}
	.article_box .card-content{
		overflow: hidden;
	}
	.infinite-scroll-preloader {
	  margin-top:-20px;
	}
	.slidebar_box{
		background: #99CC66;
	}
	.slidebar_box h2{
		color: #fff;
		text-align: center;
	}
	.slidebar_box .search_box input{
		width: 90%;
		height: 34px;
		line-height: 34px;
		background: #fff;
		border: none;
		border-radius: 25px;
		padding: 0px 15px;
		color: #333;
		font-size: 14px;
		margin: 0 auto;
		display: block;
		opacity: 0.8;
	}
	.slidebar_box .list_box ul li{
		height: 40px;
		line-height: 40px;
		color: #fff;
	}
	.loadMore{
		display: block;
		text-align: center;
	}
</style>

