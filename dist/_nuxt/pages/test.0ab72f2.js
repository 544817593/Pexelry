(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{319:function(t,e,r){t.exports=r.p+"img/trash.6f993d4.png"},356:function(t,e,r){"use strict";r.r(e);r(68),r(80),r(160);var o={data:function(){return{search_val:"",historyList:[]}},mounted:function(){JSON.parse(localStorage.getItem("historyList"))&&(this.historyList=JSON.parse(localStorage.getItem("historyList")))},methods:{get_search:function(){if(""==this.search_val)return this.$toast("请输入搜索内容"),!1;if(this.historyList.includes(this.search_val)){var i=this.historyList.indexOf(this.search_val);this.historyList.splice(i,1),this.historyList.unshift(this.search_val),localStorage.setItem("historyList",JSON.stringify(this.historyList))}else this.historyList.unshift(this.search_val),localStorage.setItem("historyList",JSON.stringify(this.historyList));this.$router.push({path:"/list",query:{search_val:this.search_val}})},goSearchDetail:function(title){this.$router.push({path:"/list",query:{search_val:title}})},empty:function(){this.$toast.success("清空历史搜索成功"),localStorage.removeItem("historyList"),this.historyList=[]}}},h=r(49),component=Object(h.a)(o,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"srarch_main"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.search_val,expression:"search_val"}],attrs:{type:"text",placeholder:"搜索所在的银行机构"},domProps:{value:t.search_val},on:{input:function(e){e.target.composing||(t.search_val=e.target.value)}}}),t._v(" "),o("button",{on:{click:t.empty}},[t._v("取消")]),t._v(" "),o("button",{on:{click:t.get_search}},[t._v("Search")]),t._v(" "),o("img",{attrs:{src:r(319),alt:"删除历史记录"},on:{click:t.empty}}),t._v(" "),o("div",{staticClass:"title"},[t._v("历史搜索")]),t._v(" "),o("ul",t._l(t.historyList,(function(e,r){return o("li",{key:r,on:{click:function(r){return t.goSearchDetail(e)}}},[t._v(t._s(e))])})),0)])}),[],!1,null,null,null);e.default=component.exports}}]);