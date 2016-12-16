import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource);



export default {
	//获取gank数据
	getGankData:function(keyword,count,page,callback){
		var url = 'http://gank.io/api/search/query/listview/category/'+keyword+'/count/'+count+'/page/'+page+'';
		$.showIndicator();
		Vue.http.get(url).
	    then((response) => response.json()).
	    then((responseText)=>{
	    	$.hideIndicator();
	    	callback(responseText.results);
	    	
	    });
	},
	//获取某一天的数据
	getNews:function(date,callback){
		//格式化日期
		var formatDate = function(date){
			var year = date.getFullYear();
			var month = date.getMonth()+1;
			var date =  date.getDate();
			var myDate = {};
			if(month<10){
				month = '0'+month;
			}
			if(date<10){
				date = '0'+date;
			}
			return myDate = {
				year : year,
				month :month,
				date : date
			}
		}
		//获取当日数据
		var myDate = formatDate(date);
		var url = 'http://gank.io/api/day/'+myDate.year+'/'+myDate.month+'/'+myDate.date+'';
		$.showIndicator();
		Vue.http.get(url).
	    then((response) => response.json()).
	    then((responseText)=>{
	    	$.hideIndicator();
	    	var oldData = responseText.results;
	    	$.hideIndicator();
	    	//重新组装
	    	var newData = [];
	    	for(var item in oldData){
	    		for(var i in oldData[item]){
	    			newData.push(oldData[item][i]);
	    		}
	    	}
	    	
	    	callback(newData);
	    });
	}
}
