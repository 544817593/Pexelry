<template>
    <div class="srarch_main">
            <input 
            type="text" 
            v-model="search_val"
            placeholder="搜索所在的银行机构" 
            >
        <button @click="empty">取消</button>

    <button @click="get_search">Search</button>
	<img src="../assets/trash.png" alt="删除历史记录" @click="empty">
	<div class="title">历史搜索</div>
	<ul>
		<li v-for="(item,index) in historyList" :key="index" @click="goSearchDetail(item)">{{item}}</li>
	</ul>
</div>

</template>

<script>
export default {
    data() {
        return {
            search_val: '', //搜索的内容
            historyList: [] //历史搜索记录，存本地
        }
    },
    mounted() {
        //如果本地存储的数据historyList有值，直接赋值给data中的historyList
        if (JSON.parse(localStorage.getItem("historyList"))) {
            this.historyList = JSON.parse(localStorage.getItem("historyList"));
        }
    },
    methods: {
        // 搜索
        get_search(){
        	if(this.search_val == ''){
        		this.$toast('请输入搜索内容');
        		return false;
        	}else{
                // 没有搜索记录，把搜索值push进数组首位，存入本地
                if (!this.historyList.includes(this.search_val)) {
                  this.historyList.unshift(this.search_val);
                  localStorage.setItem("historyList", JSON.stringify(this.historyList));
                }else{
                    //有搜索记录，删除之前的旧记录，将新搜索值重新push到数组首位
                    let i =this.historyList.indexOf(this.search_val);
                    this.historyList.splice(i,1)
                    this.historyList.unshift(this.search_val);
                    localStorage.setItem("historyList", JSON.stringify(this.historyList));
                }
                //跳转到搜索结果页
        		this.$router.push({
        			path: "/list", 
        			query: { 
        				search_val: this.search_val,
        			},
        		});
        	}
        },
        
        //点击历史搜索，跳转搜索结果页
        goSearchDetail(title){
        	this.$router.push({
        		path: "/list", 
        		query: { 
        			search_val: title,
        		},
        	});
        },
        
        //清空历史搜索记录
        empty(){
        	this.$toast.success('清空历史搜索成功');
            localStorage.removeItem('historyList');
            this.historyList = [];
        }
    },
}

</script>
