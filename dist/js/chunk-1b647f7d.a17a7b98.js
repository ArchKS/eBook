(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1b647f7d"],{"0a0e":function(t,e,r){"use strict";r("ae9e")},"0e4b":function(t,e,r){"use strict";r("3fd4")},"2cf43":function(t,e,r){"use strict";var i=r("7a23"),a=Object(i["J"])("data-v-3dfa55ee"),o=a((function(t,e,r,a,o,n){return Object(i["q"])(),Object(i["e"])("div",{class:["scroll",{noScroll:r.ifNoScroll}],ref:"scrollWrapper",onScrollPassive:e[1]||(e[1]=function(){return n.handleScroll&&n.handleScroll.apply(n,arguments)})},[Object(i["x"])(t.$slots,"default")],34)})),n=(r("a9e3"),{props:{top:{type:Number,default:0},bottom:{type:Number,default:0},ifNoScroll:{type:Boolean,default:!1}},methods:{handleScroll:function(t){var e=t.target.scrollTop||window.pageYOffset||document.body.scrollTop;this.setHomeOffSetY(e)},refresh:function(){if(this.$refs.scrollWrapper){var t=window.innerHeight-(this.top+this.bottom)*parseInt(this.htmlFontSize)+"px";this.$refs.scrollWrapper.style.height=t,this.$refs.scrollWrapper.addEventListener("scroll",this.handleScroll)}}},mounted:function(){this.getHTMLFontSize(),this.refresh()},watch:{top:function(t){this.refresh()}}});r("0e4b");n.render=o,n.__scopeId="data-v-3dfa55ee";e["a"]=n},"2d30":function(t,e,r){},"3fd4":function(t,e,r){},5370:function(t,e,r){"use strict";r("2d30")},7156:function(t,e,r){var i=r("861d"),a=r("d2bb");t.exports=function(t,e,r){var o,n;return a&&"function"==typeof(o=e.constructor)&&o!==r&&i(n=o.prototype)&&n!==r.prototype&&a(t,n),t}},a434:function(t,e,r){"use strict";var i=r("23e7"),a=r("23cb"),o=r("a691"),n=r("50c4"),c=r("7b0b"),s=r("65f0"),l=r("8418"),f=r("1dde"),u=r("ae40"),d=f("splice"),p=u("splice",{ACCESSORS:!0,0:0,1:2}),b=Math.max,h=Math.min,g=9007199254740991,y="Maximum allowed length exceeded";i({target:"Array",proto:!0,forced:!d||!p},{splice:function(t,e){var r,i,f,u,d,p,v=c(this),O=n(v.length),m=a(t,O),j=arguments.length;if(0===j?r=i=0:1===j?(r=0,i=O-m):(r=j-2,i=h(b(o(e),0),O-m)),O+r-i>g)throw TypeError(y);for(f=s(v,i),u=0;u<i;u++)d=m+u,d in v&&l(f,u,v[d]);if(f.length=i,r<i){for(u=m;u<O-i;u++)d=u+i,p=u+r,d in v?v[p]=v[d]:delete v[p];for(u=O;u>O-i+r;u--)delete v[u-1]}else if(r>i)for(u=O-i;u>m;u--)d=u+i-1,p=u+r-1,d in v?v[p]=v[d]:delete v[p];for(u=0;u<r;u++)v[u+m]=arguments[u+2];return v.length=O-i+r,f}})},a623:function(t,e,r){"use strict";var i=r("23e7"),a=r("b727").every,o=r("a640"),n=r("ae40"),c=o("every"),s=n("every");i({target:"Array",proto:!0,forced:!c||!s},{every:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}})},a9e3:function(t,e,r){"use strict";var i=r("83ab"),a=r("da84"),o=r("94ca"),n=r("6eeb"),c=r("5135"),s=r("c6b6"),l=r("7156"),f=r("c04e"),u=r("d039"),d=r("7c73"),p=r("241c").f,b=r("06cf").f,h=r("9bf2").f,g=r("58a8").trim,y="Number",v=a[y],O=v.prototype,m=s(d(O))==y,j=function(t){var e,r,i,a,o,n,c,s,l=f(t,!1);if("string"==typeof l&&l.length>2)if(l=g(l),e=l.charCodeAt(0),43===e||45===e){if(r=l.charCodeAt(2),88===r||120===r)return NaN}else if(48===e){switch(l.charCodeAt(1)){case 66:case 98:i=2,a=49;break;case 79:case 111:i=8,a=55;break;default:return+l}for(o=l.slice(2),n=o.length,c=0;c<n;c++)if(s=o.charCodeAt(c),s<48||s>a)return NaN;return parseInt(o,i)}return+l};if(o(y,!v(" 0o1")||!v("0b1")||v("+0x1"))){for(var I,S=function(t){var e=arguments.length<1?0:t,r=this;return r instanceof S&&(m?u((function(){O.valueOf.call(r)})):s(r)!=y)?l(new v(j(e)),r,S):j(e)},D=i?p(v):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,fromString,range".split(","),C=0;D.length>C;C++)c(v,I=D[C])&&!c(S,I)&&h(S,I,b(v,I));S.prototype=O,O.constructor=S,n(a,y,S)}},ae3e:function(t,e,r){"use strict";r.r(e);var i=r("7a23"),a=Object(i["J"])("data-v-9e80fa7c"),o=a((function(t,e,r,a,o,n){var c=Object(i["y"])("category-list");return Object(i["q"])(),Object(i["e"])("div",null,[Object(i["g"])(c)])})),n=Object(i["J"])("data-v-7913b6ab");Object(i["t"])("data-v-7913b6ab");var c={key:1,class:"show-title"},s={class:"scroll-wrapper"},l={class:"title-wrapper"},f={class:"title"};Object(i["r"])();var u=n((function(t,e,r,a,o,n){return Object(i["q"])(),Object(i["e"])("div",null,[t.ifCategoryVisible?(Object(i["q"])(),Object(i["e"])("div",{key:0,class:"blur-bg-wrapper",onClick:e[4]||(e[4]=function(){return n.hideCategory&&n.hideCategory.apply(n,arguments)}),onDragover:e[5]||(e[5]=function(){return n.bgDragOver&&n.bgDragOver.apply(n,arguments)}),onDrop:e[6]||(e[6]=function(){return n.bgDrop&&n.bgDrop.apply(n,arguments)})},[Object(i["g"])("div",{class:"category-title-wrapper",onClick:e[2]||(e[2]=function(){return n.editCategoryTitle&&n.editCategoryTitle.apply(n,arguments)})},[t.ifCategoryTitleEdit?Object(i["G"])((Object(i["q"])(),Object(i["e"])("input",{key:0,type:"text",class:"edit-title","onUpdate:modelValue":e[1]||(e[1]=function(t){return o.cTitle=t})},null,512)),[[i["D"],o.cTitle]]):(Object(i["q"])(),Object(i["e"])("div",c,Object(i["B"])(o.cTitle),1))]),Object(i["g"])("div",{class:"category-list-wrapper",onClick:e[3]||(e[3]=function(){return n.visibleArea&&n.visibleArea.apply(n,arguments)})},[Object(i["g"])("div",s,[(Object(i["q"])(!0),Object(i["e"])(i["a"],null,Object(i["w"])(n.itemList,(function(e,r){return Object(i["q"])(),Object(i["e"])("div",{class:"book-item",key:r,style:{height:t.Height}},[Object(i["g"])("div",{class:"cover-wrapper",onClick:function(r){return t.showBookDetail(e.fileName,e.categoryText)}},[Object(i["g"])("img",{src:e.cover,class:"cover-item",onDragstart:function(t){return n.imgDragStart(r)},draggable:"true"},null,40,["src","onDragstart"])],8,["onClick"]),Object(i["g"])("div",l,[Object(i["g"])("div",f,Object(i["B"])(e.title),1)])],4)})),128))])])],32)):Object(i["f"])("",!0)])}));r("a623"),r("4de4"),r("4160"),r("a434"),r("159b"),r("a4d3"),r("e01a"),r("d28b"),r("d3b7"),r("3ca3"),r("ddb0");function d(t){return d="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},d(t)}r("2cf43");var p=r("e8ec"),b={data:function(){return{cTitle:"新建分组",cData:-1,localIndex:-1,dragItemIndex:-1}},computed:{itemList:function(){return this.cData.itemList&&this.cData.itemList.length>0?this.cData.itemList:[]}},methods:{initData:function(){var t=this,e=Object(p["a"])();e.forEach((function(e,r){e.title===t.categoryData.title&&2===e.type&&(t.cData=e,t.cTitle=e.title,t.localIndex=r)}))},hideCategory:function(){if(!0===this.ifCategoryTitleEdit){this.setIfCategoryTitleEdit(!1);var t=Object(p["a"])();t[this.localIndex]["title"]=this.cTitle,this.refreshLocalStorage(t)}else{this.setIfCategoryVisible(!1),this.setCategoryData(-1),this.$router.push({path:"/store/shelf"});this.ifAddIsExit("",!0)}},visibleArea:function(t){t.preventDefault(),t.stopPropagation()},editCategoryTitle:function(t){t.preventDefault(),t.stopPropagation(),!1===this.ifCategoryTitleEdit&&this.setIfCategoryTitleEdit(!0)},bgDragOver:function(t){t.preventDefault(),t.stopPropagation()},bgDrop:function(t){if(t.preventDefault(),t.path.every((function(t){return"scroll-wrapper"!==t.className}))){var e=Object(p["a"])(),r=e[this.localIndex].itemList[this.dragItemIndex];e.push(r),e[this.localIndex].itemList.splice(this.dragItemIndex,1),this.refreshLocalStorage(e),this.initData()}},imgDragStart:function(t){this.dragItemIndex=t}},created:function(){"object"!==d(this.categoryData)?this.$router.push({path:"/store/shelf"}):this.initData()},unmounted:function(){var t=Object(p["a"])();t=t.filter((function(t){return 2!==t.type||t.itemList.length>0?t:void 0})),this.refreshLocalStorage(t)}};r("5370");b.render=u,b.__scopeId="data-v-7913b6ab";var h=b,g={components:{CategoryList:h}};r("0a0e");g.render=o,g.__scopeId="data-v-9e80fa7c";e["default"]=g},ae9e:function(t,e,r){}}]);
//# sourceMappingURL=chunk-1b647f7d.a17a7b98.js.map