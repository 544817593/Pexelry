(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{329:function(t,e,r){var content=r(336);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(61).default)("aa1bc2c0",content,!0,{sourceMap:!1})},335:function(t,e,r){"use strict";r(329)},336:function(t,e,r){var n=r(60)(!1);n.push([t.i,".card{margin:20px;box-shadow:0 48px 100px 0 rgba(17,12,46,.15);height:20rem;flex-direction:row;width:100%}.img-rounded{border-radius:50%;width:2.5rem;height:2.5rem;padding:0;margin:0}.card-img-left-gameProfile{margin-top:50px}p{display:inline-block;padding-left:25px}.card-title{padding-bottom:10px}.card-subtitle{padding-bottom:15px}.card-button{text-align:center;cursor:pointer;font-weight:500;padding-left:25px}.button-show-more{width:120px}.download,.link{cursor:pointer;color:#333;font-size:1.1rem;padding-left:2.5rem}.card-content{flec-basis:auto}.card-text{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;word-wrap:break-word;overflow:hidden}.card-img-left-gameProfile{width:29rem;height:13rem}",""]),t.exports=n},353:function(t,e,r){"use strict";r.r(e);r(20),r(45),r(50),r(326),r(232);var n=r(231),o={name:"Photos",props:{img:{},name:{},attrib:{},imgcap:{},id:{},gameid:{}},data:function(){return{loading:!0,dimage:this.$props.img}},methods:{getDownload:function(){n({url:"".concat(this.dimage),method:"GET",responseType:"blob"}).then((function(t){var e=window.URL.createObjectURL(new Blob([t.data])),r=document.createElement("a");r.href=e,r.setAttribute("download","pexelry download.jpeg"),document.body.appendChild(r),r.click()}))},getLink:function(){},addReview:function(){}}},d=(r(335),r(49)),component=Object(d.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container"},[r("div",{staticClass:"row"},[r("div",{staticClass:"card"},[r("img",{staticClass:"card-img-left card-img-left-gameProfile",attrs:{src:t.img,alt:t.attrib}}),t._v(" "),t._m(0),t._v(" "),r("div",{staticClass:"card-footer"},[r("p",[t._v(" Steam link")]),t._v(" "),r("p",{staticClass:"download",on:{click:function(e){return t.getDownload()}}},[r("font-awesome-icon",{attrs:{icon:["fas","link"]}})],1),t._v(" "),r("br"),t._v(" "),r("p",[t._v("Add review")]),t._v(" "),r("p",{staticClass:"add-review",on:{click:function(e){return t.addReview()}}},[r("font-awesome-icon",{attrs:{icon:["fas","pen"]}})],1)])])])])}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"card-body"},[r("h4",{staticClass:"card-title"},[t._v("Game title")]),t._v(" "),r("h5",{staticClass:"card-subtitle"},[t._v(" Description ")]),t._v(" "),r("p",{staticClass:"card-text"},[t._v("description description description description description description description description")]),t._v(" "),r("h6",{staticClass:"card-otherinfo"},[t._v("Other information")]),t._v(" "),r("p",{staticClass:"card-otherinfotext"},[t._v("Recent rating: Very Negative\n            "),r("br"),t._v("Recent posivies: 1% of the 29,180 user reviews in the last 30 days are positive.\n            "),r("br"),t._v("Date published: 21 Dec, 2017\n            "),r("br"),t._v("Publisher: 24 Entertainment")])])}],!1,null,null,null);e.default=component.exports}}]);