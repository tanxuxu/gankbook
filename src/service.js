import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource);



export default {
	//获取gank数据
	getGankData:function(keyword,count,page,callback){
		var url = 'http://gank.io/api/data/'+keyword+'/'+count+'/'+page+'';
		Vue.http.get(url).
	    then((response) => response.json()).
	    then((responseText)=>{
	    	callback(responseText.results);
	    },(error)=>{
	    	console.log(error);
	    });
	},
	getJoke:function(){
		
	}
}
