 <!-- 这里是页面内容区 -->
 <template>
    <div class="article_box" id="home">
		<!--福利-->
		 <div class="card" v-for='item in articles' v-if="item.type=='福利'">
		    <div class="card-content">
		    	<img v-bind:src="item.url+'?imageView2/0/w/100'" @click='openImg(item.url)'/>
		      <div class="card-content-inner">
				 <p>{{item.who}}</p>
		      </div>
		    </div>
		 </div>
		 <!--其他-->
		 <div class="card" v-for='item in articles' v-if="item.type != '福利'">
		    <div class="card-content">
		      <div class="card-content-inner" @click="goToSite(item.url);">
		      	 <h3 class="color-primary">{{item.desc}}</h3>
				 <p>发布人：{{item.who}}</p>
		      </div>
		    </div>
		 </div>
		 <!--点击请求-->
		 <div class="content-block">
		 	  <a href="" v-if="hasMore" class="loadMore" @click='getMore();'>再来一波</a>
		 </div>
	  </div>
</template>
<script>
	import gankData from '../service.js'
	export default{
		props:['type'],  //主页面传值过来
		data(){
			return {
				articles:[],
				hasMore:true,
				count:20,
				page:1
			}
		},
		methods:{
			openImg:function(url){
				  var myPhotoBrowserPopup = $.photoBrowser({
				      photos : [url]
				  });
				  myPhotoBrowserPopup.open();
			},
			getMore:function(){
				var _this = this;
				_this.page++;
				gankData.getGankData(_this.type,20,_this.page,function(data){
					for(var i=0;i<data.length;i++){
						_this.articles.push(data[i]);
					}
				})
			},
			goToSite:function(url){
				window.location.href = url;
			}
		},
		mounted:function(){
			var _this =this;
			//初始化福利数据
			$.showPreloader();
			gankData.getGankData('福利',20,1,function(data){
					_this.articles = data;
					$.hidePreloader();
			});
			//监听类型变化
			this.$watch('type',function(newVal,oldVal){
				gankData.getGankData(newVal,20,1,function(data){
					_this.articles = data;
					$.closePanel();
					console.log(data);
				});
			})
		}
	}
</script>