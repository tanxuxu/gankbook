 <!-- 这里是页面内容区 -->
 <template>
    <div class="article_box" id="home">
		<!--福利-->
		 <div class="card" v-for='item in articles'>
		    <div class="card-content">
		      <img v-bind:src="item.url+'?imageView2/0/w/100'" v-if="item.type=='福利'" @click='openImg(item.url)'/>
		      <div class="card-content-inner" @click="item.type=='福利'?'':goToSite(item.url)">
		      	 <h3 class="color-primary" v-if="item.type != '福利'">{{item.desc}}</h3>
				 <p>发布人：{{item.who}}</p>
				 <p v-if="type != item.type">分类：{{item.type}}</p>
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
				hasMore:false,
				count:20,
				page:1,
				day:0  //当天，1是昨天 2前天
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
				this.day++;
				if(this.type =='最新'){
					//加载上一日的数据
					var nowDate = new Date();
					nowDate.setDate(nowDate.getDate()-this.day);
					gankData.getNews(nowDate,function(data){
						if(data.length>0){
							_this.hasMore = true;
							for(var i=0;i<data.length;i++){
								_this.articles.push(data[i]);
							}
						}else{
							_this.hasMore = false;
						}
					});
				}else{
					_this.page++;
					gankData.getGankData(_this.type,20,_this.page,function(data){
						if(data.length>0){
							_this.hasMore = true;
							for(var i=0;i<data.length;i++){
								_this.articles.push(data[i]);
							}
						}else{
							_this.hasMore = false;
						}
					})
				}
			},
			goToSite:function(url){
				window.location.href = url;
			}
		},
		mounted:function(){
			var _this =this;
			//今天的数据
			var nowDate = new Date();
			gankData.getNews(nowDate,function(data){
				if(data.length>0){
					_this.hasMore=true;
					_this.articles = data;
				}else{
					_this.hasMore=false;
				}
			});
			//监听类型变化
			this.$watch('type',function(newVal,oldVal){
				gankData.getGankData(newVal,20,1,function(data){
					if(data.length>0){
						_this.hasMore=true;
						_this.articles = data;
						$.closePanel();
					}else{
						_this.hasMore=false;
						$.closePanel();
					}
					
				});
			})
		}
	}
</script>