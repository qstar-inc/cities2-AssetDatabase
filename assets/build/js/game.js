/*! For license information please see game.js.LICENSE.txt */
(()=>{var e={188:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.setDelay=t.pushState=t.replaceState=void 0;let n=null,r=null,a=null,o=-1/0,i=!1;t.replaceState=(e,t,n)=>{a=[e,n],s()};function s(){if(i)return;null===n&&(n="Apple Computer, Inc."===navigator.vendor?310:52);let e=performance.now()-o;e>=n?c():(setTimeout(c,n-e),i=!0)}function c(){i=!1,o=performance.now(),null!==r?(history.pushState(r[0],"",r[1]),r=null,null!==a&&s()):(history.replaceState(a[0],"",a[1]),a=null)}t.pushState=(e,t,n)=>{r=[e,n],a=null,s()},t.setDelay=function(e){n=e}}},t={};function n(e){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(e)}function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,o,i,s=[],c=!0,l=!1;try{if(o=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=o.call(n)).done)&&(s.push(r.value),s.length!==t);c=!0);}catch(e){l=!0,a=e}finally{try{if(!c&&null!=n.return&&(i=n.return(),Object(i)!==i))return}finally{if(l)throw a}}return s}}(e,t)||function(e,t){if(e){if("string"==typeof e)return a(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function o(){"use strict";o=function(){return t};var e,t={},r=Object.prototype,a=r.hasOwnProperty,i=Object.defineProperty||function(e,t,n){e[t]=n.value},s="function"==typeof Symbol?Symbol:{},c=s.iterator||"@@iterator",l=s.asyncIterator||"@@asyncIterator",u=s.toStringTag||"@@toStringTag";function d(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{d({},"")}catch(e){d=function(e,t,n){return e[t]=n}}function f(e,t,n,r){var a=t&&t.prototype instanceof b?t:b,o=Object.create(a.prototype),s=new H(r||[]);return i(o,"_invoke",{value:A(e,n,s)}),o}function p(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(e){return{type:"throw",arg:e}}}t.wrap=f;var h="suspendedStart",m="suspendedYield",v="executing",y="completed",g={};function b(){}function L(){}function w(){}var E={};d(E,c,(function(){return this}));var x=Object.getPrototypeOf,I=x&&x(x(_([])));I&&I!==r&&a.call(I,c)&&(E=I);var P=w.prototype=b.prototype=Object.create(E);function T(e){["next","throw","return"].forEach((function(t){d(e,t,(function(e){return this._invoke(t,e)}))}))}function S(e,t){function r(o,i,s,c){var l=p(e[o],e,i);if("throw"!==l.type){var u=l.arg,d=u.value;return d&&"object"==n(d)&&a.call(d,"__await")?t.resolve(d.__await).then((function(e){r("next",e,s,c)}),(function(e){r("throw",e,s,c)})):t.resolve(d).then((function(e){u.value=e,s(u)}),(function(e){return r("throw",e,s,c)}))}c(l.arg)}var o;i(this,"_invoke",{value:function(e,n){function a(){return new t((function(t,a){r(e,n,t,a)}))}return o=o?o.then(a,a):a()}})}function A(t,n,r){var a=h;return function(o,i){if(a===v)throw Error("Generator is already running");if(a===y){if("throw"===o)throw i;return{value:e,done:!0}}for(r.method=o,r.arg=i;;){var s=r.delegate;if(s){var c=k(s,r);if(c){if(c===g)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(a===h)throw a=y,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);a=v;var l=p(t,n,r);if("normal"===l.type){if(a=r.done?y:m,l.arg===g)continue;return{value:l.arg,done:r.done}}"throw"===l.type&&(a=y,r.method="throw",r.arg=l.arg)}}}function k(t,n){var r=n.method,a=t.iterator[r];if(a===e)return n.delegate=null,"throw"===r&&t.iterator.return&&(n.method="return",n.arg=e,k(t,n),"throw"===n.method)||"return"!==r&&(n.method="throw",n.arg=new TypeError("The iterator does not provide a '"+r+"' method")),g;var o=p(a,t.iterator,n.arg);if("throw"===o.type)return n.method="throw",n.arg=o.arg,n.delegate=null,g;var i=o.arg;return i?i.done?(n[t.resultName]=i.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,g):i:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,g)}function D(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function M(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function H(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(D,this),this.reset(!0)}function _(t){if(t||""===t){var r=t[c];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,i=function n(){for(;++o<t.length;)if(a.call(t,o))return n.value=t[o],n.done=!1,n;return n.value=e,n.done=!0,n};return i.next=i}}throw new TypeError(n(t)+" is not iterable")}return L.prototype=w,i(P,"constructor",{value:w,configurable:!0}),i(w,"constructor",{value:L,configurable:!0}),L.displayName=d(w,u,"GeneratorFunction"),t.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===L||"GeneratorFunction"===(t.displayName||t.name))},t.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,w):(e.__proto__=w,d(e,u,"GeneratorFunction")),e.prototype=Object.create(P),e},t.awrap=function(e){return{__await:e}},T(S.prototype),d(S.prototype,l,(function(){return this})),t.AsyncIterator=S,t.async=function(e,n,r,a,o){void 0===o&&(o=Promise);var i=new S(f(e,n,r,a),o);return t.isGeneratorFunction(n)?i:i.next().then((function(e){return e.done?e.value:i.next()}))},T(P),d(P,u,"Generator"),d(P,c,(function(){return this})),d(P,"toString",(function(){return"[object Generator]"})),t.keys=function(e){var t=Object(e),n=[];for(var r in t)n.push(r);return n.reverse(),function e(){for(;n.length;){var r=n.pop();if(r in t)return e.value=r,e.done=!1,e}return e.done=!0,e}},t.values=_,H.prototype={constructor:H,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(M),!t)for(var n in this)"t"===n.charAt(0)&&a.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function r(r,a){return s.type="throw",s.arg=t,n.next=r,a&&(n.method="next",n.arg=e),!!a}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],s=i.completion;if("root"===i.tryLoc)return r("end");if(i.tryLoc<=this.prev){var c=a.call(i,"catchLoc"),l=a.call(i,"finallyLoc");if(c&&l){if(this.prev<i.catchLoc)return r(i.catchLoc,!0);if(this.prev<i.finallyLoc)return r(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return r(i.catchLoc,!0)}else{if(!l)throw Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return r(i.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&a.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var o=r;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=e,i.arg=t,o?(this.method="next",this.next=o.finallyLoc,g):this.complete(i)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),g},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),M(n),g}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var a=r.arg;M(n)}return a}}throw Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:_(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),g}},t}function i(e,t,n,r,a,o,i){try{var s=e[o](i),c=s.value}catch(e){return void n(e)}s.done?t(c):Promise.resolve(c).then(r,a)}function s(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var o=e.apply(t,n);function s(e){i(o,r,a,s,c,"next",e)}function c(e){i(o,r,a,s,c,"throw",e)}s(void 0)}))}}var c,l,u,d=function n(r){var a=t[r];if(void 0!==a)return a.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,n),o.exports}(188),f=d.pushState,p={"asset-group-1":"Zones Toolbar Group","asset-group-2":"Services Toolbar Group"},h=document.querySelector(".asset-bar"),m=document.querySelector(".bottom-bar"),v=document.querySelector(".details-pane"),y=document.getElementById("asset-details-pane"),g=document.querySelector(".top-icons"),b=document.getElementById("details-pane-x"),L=document.getElementById("asset-panel-items"),w=document.getElementById("asset-panel-header-tabs"),E=document.getElementById("asset-panel"),x=document.getElementById("asset-details-pane-header-title"),I=document.getElementById("asset-details-pane-image"),P=document.getElementById("asset-details-pane-desc-text"),T=document.getElementById("tag-container"),S=document.getElementById("notif-container"),A=document.getElementById("asset-quick-info"),k=document.getElementById("asset-quick-info-header-title"),D=document.getElementById("asset-quick-info-body-image"),M=document.getElementById("asset-quick-info-body-desc"),H=document.getElementById("game-bg");function _(e,t,n){var r=0,a=0,o=!1,i=JSON.parse(localStorage.getItem(n));function s(e){o&&l(e)}function c(){o=!1,l(),document.removeEventListener("mousemove",s),document.removeEventListener("mouseup",c)}function l(){var t,o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,i=e.offsetLeft,s=e.offsetTop,c=window.innerHeight;o&&(i=o.clientX-r,s=o.clientY-a),i=Math.max(0,i),s=Math.max(0,s),u&&(c=E.offsetTop,e.style.maxHeight="".concat(E.offsetTop,"px")),e.offsetWidth+i>window.innerWidth&&(i=window.innerWidth-e.offsetWidth),e.offsetHeight+s>c&&(s=c-e.offsetHeight),e.style.left="".concat(i,"px"),e.style.top="".concat(s,"px"),t={left:e.offsetLeft,top:e.offsetTop,width:e.offsetWidth,height:e.offsetHeight},localStorage.setItem(n,JSON.stringify(t))}i&&(e.style.left="".concat(i.left,"px"),e.style.top="".concat(i.top,"px"),e.style.width="".concat(i.width,"px"),e.style.height="".concat(i.height,"px")),t.addEventListener("mousedown",(function(t){o=!0,r=t.clientX-e.offsetLeft,a=t.clientY-e.offsetTop,document.addEventListener("mousemove",s),document.addEventListener("mouseup",c)})),e.addEventListener("mousemove",(function(t){l();var n=window.innerWidth,r=window.innerHeight;e.offsetWidth<200?e.style.width="".concat(200,"px"):e.offsetWidth>n&&(e.style.width="".concat(n,"px")),e.offsetHeight<150?e.style.height="".concat(150,"px"):e.offsetHeight>r&&(e.style.height="".concat(r,"px"))})),window.addEventListener("resize",(function(){l()}))}function C(){return U.apply(this,arguments)}function U(){return(U=s(o().mark((function e(){var t;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t=document.getElementById("city_name"))){e.next=5;break}return e.next=4,getLangDataRandomly("Assets.CITY_NAME");case 4:t.innerText=e.sent;case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function N(e){var t=document.createElement("button");t.className="asset-menu-icon",t.setAttribute("data-name",e.PrefabID);var n=K(e.PrefabID.split(":")[1],e.UI_Icon,e.PrefabID);return t.innerHTML='<img src="'.concat(n,'"/>'),t}function O(){return O=s(o().mark((function e(){var t,n;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,updateLangGame();case 2:return e.next=4,getAssetGroupData();case 4:return(t=e.sent).forEach((function(e){"UIAssetMenuPrefab:Zones"===e.PrefabID&&(e.UI_Priority=10)})),t.sort((function(e,t){return e.UI_Priority-t.UI_Priority})),Object.entries(p).forEach((function(e){var n=r(e,2),a=n[0],i=n[1],c=document.getElementById(a);c.innerHTML="",t.forEach(function(){var e=s(o().mark((function e(t){var n,a,s,l,u,d,f,p,h,m;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.UI_Group!=="UIToolbarGroupPrefab:".concat(i)){e.next=25;break}return n=N(t),(a=document.createElement("div")).className="asset-group-tooltip",e.next=6,Q(t);case 6:u=e.sent,d=r(u,2),s=d[0],l=d[1],(f=document.createElement("div")).className="asset-group-tooltip-header",f.textContent=s,a.appendChild(f),(p=document.createElement("div")).className="asset-group-tooltip-body",p.textContent=l,a.appendChild(p),(h=document.createElement("div")).className="asset-group-tooltip-arrow",a.appendChild(h),n.appendChild(a),n.addEventListener("mouseover",(function(){m=setTimeout((function(){a.style.visibility="visible"}),100)})),n.addEventListener("mouseout",(function(){clearTimeout(m),a.style.visibility="hidden"})),c.appendChild(n);case 25:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())})),document.querySelectorAll("[id^=asset-group-]").forEach((function(e){e.addEventListener("click",function(){var e=s(o().mark((function e(t){var n,r,a;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(allIcons=document.querySelectorAll(".asset-menu-icon"),allIcons.forEach((function(e){e.classList.remove("active")})),n=t.target.closest(".asset-menu-icon"),l){e.next=16;break}if(!n){e.next=14;break}return z(!0),n.classList.add("active"),r=n.dataset.name,w.innerHTML="",L.innerHTML="",F(),W(L),e.next=14,j(r);case 14:e.next=30;break;case 16:if(!n){e.next=30;break}if(!n.classList.contains("active")){e.next=22;break}Y(),n.classList.remove("active"),e.next=30;break;case 22:return n.classList.add("active"),a=n.dataset.name,w.innerHTML="",L.innerHTML="",F(),W(L),e.next=30,j(a);case 30:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())})),e.next=11,C();case 11:if(!(n=re("prefab"))){e.next=15;break}return e.next=15,B(n);case 15:case"end":return e.stop()}}),e)}))),O.apply(this,arguments)}function j(e){return G.apply(this,arguments)}function G(){return G=s(o().mark((function e(t){var n,a,i,c=arguments;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=c.length>1&&void 0!==c[1]?c[1]:null,e.next=3,getAssetTabData(t);case 3:a=e.sent,w.innerHTML="",a.sort((function(e,t){return e.UI_Priority-t.UI_Priority})),a.forEach(function(){var e=s(o().mark((function e(t){var i,c,l,d,f,p;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(i="multiple",c="",1==a.length&&(i="single"),t!=a[0]||n?t.PrefabID==n&&(c=" active"):c=" active",(l=document.createElement("div")).className="asset-panel-header-tab ".concat(i," round-border-top").concat(c),u&&l.classList.add("flexed"),d=t.PrefabID.split(":")[1],f=K(d,t.UI_Icon,t.PrefabID),p='<img src="'.concat(f,'"/>'),l.setAttribute("data-id",t.PrefabID),l.innerHTML=p,l.addEventListener("mouseover",s(o().mark((function e(){var n,a,i,s;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return u?A.classList.add("flexed"):A.classList.remove("flexed"),e.next=3,Q(t);case 3:i=e.sent,s=r(i,2),langTitle=s[0],langDescription=s[1],k.innerHTML=null!==(n=langTitle)&&void 0!==n?n:"",D.innerHTML=p,M.innerHTML=null!==(a=langDescription)&&void 0!==a?a:"",M.innerHTML=M.innerHTML.replace(/ \n/g,"<br>").replace(/\n/g,"<br>"),V(A,"block"),l.classList.add("hover");case 13:case"end":return e.stop()}}),e)})))),l.addEventListener("mouseout",(function(){V(A,"none"),l.classList.remove("hover")})),w.appendChild(l),t!=a[0]||n){e.next=20;break}return e.next=18,getAssetPanelData(t.PrefabID);case 18:q(e.sent);case 20:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),(i=document.querySelectorAll(".asset-panel-header-tab.multiple")).forEach((function(e){e.addEventListener("click",s(o().mark((function e(){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i.forEach((function(e){return e.classList.remove("active")})),this.classList.add("active"),L.innerHTML="",W(L),e.next=6,getAssetPanelData(this.dataset.id);case 6:q(e.sent);case 8:case"end":return e.stop()}}),e,this)}))))}));case 9:case"end":return e.stop()}}),e)}))),G.apply(this,arguments)}function q(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(e.sort((function(e,t){return e.UI_Priority-t.UI_Priority})),L.innerHTML="",e.forEach((function(e){var t=function(e){var t=document.createElement("div");t.className="asset-panel-item round-border",u&&t.classList.add("flexed"),t.dataset.prefab=e.PrefabID;var n=document.createElement("div");n.className="asset-panel-item-inner";var a=K(e.PrefabID.split(":")[1],e.UI_Icon,e.PrefabID);return n.innerHTML='<img src="'.concat(a,'" loading="lazy"/>'),t.appendChild(n),t.addEventListener("mouseover",s(o().mark((function t(){var n,i,s,c;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return u?A.classList.add("flexed"):A.classList.remove("flexed"),t.next=3,Q(e);case 3:s=t.sent,c=r(s,2),langTitle=c[0],langDescription=c[1],k.innerHTML=null!==(n=langTitle)&&void 0!==n?n:"",D.innerHTML='<img src="'.concat(a,'"/>'),M.innerHTML=null!==(i=langDescription)&&void 0!==i?i:"",M.innerHTML=M.innerHTML.replace(/ \n/g,"<br>").replace(/\n/g,"<br>"),V(A,"block");case 12:case"end":return t.stop()}}),t)})))),t.addEventListener("mouseout",(function(){V(A,"none")})),t.addEventListener("click",(function(){B(this.dataset.prefab)})),t}(e);L.appendChild(t)})),t){var n=document.querySelector('.asset-panel-item[data-prefab="'.concat(t,'"]'));n&&n.classList.add("selected");var a=0,i=setInterval((function(){++a>10&&clearInterval(i),n.classList.contains("flexed")&&L.scrollWidth>L.clientWidth&&(elementPosition=Math.max(n.offsetLeft-L.clientWidth/2,0),L.scrollTo({left:elementPosition,behavior:"smooth"}),clearInterval(i))}),500)}else L.scrollTo({top:0,behavior:"smooth"})}function B(e,t){return R.apply(this,arguments)}function R(){return(R=s(o().mark((function e(t,n){var a,i,s,u,d,p,h,m,L,w,E,A,k,D;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,getAssetDataSingle(t);case 2:return u=e.sent,v.style.display="block",re("prefab")!=t&&(d="".concat(t," - Cities: Skylines II Asset Database"),document.title=d,f(null,d,"?prefab=".concat(encodeURIComponent(t)))),g.classList.add("behind"),"type2"==n&&(y.style.left="52vw"),p=null!==(a=u.PrefabID.split(":")[1])&&void 0!==a?a:"",h=K(p,u.UI_Icon,t),e.next=12,Q(u);case 12:return m=e.sent,L=r(m,2),langTitle=L[0],langDescription=L[1],x.innerHTML=null!==(i=langTitle)&&void 0!==i?i:"",I.innerHTML='<img src="'.concat(h,'"/>'),P.innerHTML=null!==(s=langDescription)&&void 0!==s?s:"".replace(/ \n/g,"<br>").replace(/\n/g,"<br>"),(w=document.getElementById("temp")).innerHTML="",(E=document.getElementById("asset-details-pane-body-bottom-boxes")).innerHTML="",T.innerHTML="",S.innerHTML="",E.classList.add("visible"),e.prev=26,e.next=29,processAssetPanelUIData(u,[E,T,S,w]);case 29:e.next=33;break;case 31:e.prev=31,e.t0=e.catch(26);case 33:if(c=!0,y.classList.add("open"),window.addEventListener("keydown",(function(e){"Escape"===e.key&&c&&X(e)})),b.addEventListener("click",(function(e){c&&X(e)})),J(),z(!0),Z(),!u.UI_Group){e.next=54;break}return e.next=43,getAssetPanelData(u.UI_Group);case 43:return A=e.sent,e.next=46,getPrefabUIMenu(u.UI_Group);case 46:if(!(k=e.sent)){e.next=54;break}return e.next=50,j(k,u.UI_Group);case 50:F(),q(A,t),(D=document.querySelector('.asset-menu-icon[data-name="'.concat(k,'"]')))&&D.classList.add("active");case 54:return y.style.bottom=l?"10vw":"6vh",e.next=57,distributeDivsToColumnsByHeight();case 57:case"end":return e.stop()}}),e,null,[[26,31]])})))).apply(this,arguments)}function W(e){var t=document.createElement("div");t.classList.add("lds-ripple");var n=document.createElement("div"),r=document.createElement("div");t.appendChild(n),t.appendChild(r),e.appendChild(t)}function z(e){H.style.filter="blur(".concat(e?"1vh":"0vh",")"),hof.style.filter="blur(".concat(e?"1vh":"0vh",")")}function F(){l=!0,y.style.bottom="10vw",E.classList.add("opened"),window.removeEventListener("keydown",Y),c||window.addEventListener("keydown",(function(e){console.log("Trigger added to closeAssetPanel"),"Escape"===e.key&&l&&!c&&Y()}))}function Y(){l=!1,y.style.bottom="6vh",E.classList.remove("opened"),window.removeEventListener("keydown",Y),document.querySelectorAll(".asset-menu-icon").forEach((function(e){return e.classList.remove("active")})),z(!1)}function J(){var e=document.querySelectorAll(".asset-panel-item"),t=document.querySelectorAll(".asset-panel-items"),n=document.querySelectorAll(".asset-panel-header-tab");document.querySelectorAll(".asset-panel-header-close").forEach((function(e){V(e,"none")})),V(A,"none"),E.classList.add("flexed"),e.forEach((function(e){e.classList.add("flexed")})),t.forEach((function(e){e.classList.add("flexed")})),n.forEach((function(e){e.classList.add("flexed")})),u=!0,m.classList.add("minimized"),h.classList.add("minimized"),z(!1),document.querySelectorAll(".asset-bar.minimized > *").forEach((function(e){e.id.startsWith("asset-group-")||V(e,"none")}))}function V(e,t){e&&(e.style.display=t)}function X(e){if(e.target===h||e.target===m||e.target===b||"Escape"===e.key){c=!1,document.getElementById("asset-details-pane").classList.remove("open"),g.classList.remove("behind"),z(!1),Z(),l&&(n=document.querySelectorAll(".asset-panel-item"),r=document.querySelectorAll(".asset-panel-items"),a=document.querySelectorAll(".asset-panel-header-tab"),o=document.querySelectorAll(".asset-panel-header-close"),document.querySelectorAll(".asset-bar.minimized > *").forEach((function(e){e.id.startsWith("asset-group-")||V(e,"unset")})),o.forEach((function(e){V(e,"flex")})),E.classList.remove("flexed"),n.forEach((function(e){e.classList.remove("flexed")})),r.forEach((function(e){e.classList.remove("flexed")})),a.forEach((function(e){e.classList.remove("flexed")})),u=!1,m.classList.remove("minimized"),h.classList.remove("minimized"),z(!0),window.removeEventListener("keydown",Y),c||window.addEventListener("keydown",(function(e){console.log("Trigger added to closeAssetPanel"),"Escape"===e.key&&l&&!c&&Y()})));var t="Cities: Skylines II Asset Database";document.title=t,f(null,t,window.location.pathname),v.style.display="none"}var n,r,a,o}function Z(){window.removeEventListener("keydown",(function(e){"Escape"===e.key&&Z()})),l?(window.removeEventListener("keydown",Y),v.addEventListener("click",X),b.removeEventListener("click",X)):v.removeEventListener("click",X)}function K(e,t,n){var r=n.replace(":","."),a=findValueInLinesCail(e);if(null!=a)return a="".concat(imageRepoPath,"/thumbs/").concat(a);var o=findValueInLines(e);if(null!=o)return a=0==o[1]?"https://raw.githubusercontent.com/JadHajjar/AssetIconLibrary-CSII/master/AssetIconLibrary/Thumbnails/".concat(o[0]):"".concat(imageRepoPath,"/thumbs/.ail/").concat(o[0]);if(null!=findValueInLinesCail(r))return a="".concat(imageRepoPath,"/thumbs/").concat(a);var i=findValueInLines(r);return null!=i?a=0==i[1]?"https://raw.githubusercontent.com/JadHajjar/AssetIconLibrary-CSII/master/AssetIconLibrary/Thumbnails/".concat(i[0]):"".concat(imageRepoPath,"/thumbs/.ail/").concat(i[0]):(null==a&&null!=t&&""!=t?t.startsWith("coui://")?t.startsWith("coui://uil/")?a="https://raw.githubusercontent.com/algernon-A/UnifiedIconLibrary/refs/heads/master/Icons/".concat(t.replace("coui://uil/","")):t.startsWith("coui://ail/")?a="https://raw.githubusercontent.com/JadHajjar/AssetIconLibrary-CSII/master/AssetIconLibrary/Thumbnails/".concat(t.replace("coui://ail/","")):t.startsWith("coui://customassets/")?a=imageRepoPath+"/thumbs/".concat(t.replace("coui://","")):(console.log("Unsupported UI protocol: ".concat(t)),a="".concat(imageRepoPath,"/cities2/Media/Placeholder.svg")):a=t.startsWith("assetdb://global")?"".concat(imageRepoPath,"/thumbs/assetdb/").concat(t.replace("assetdb://global",""),".png"):t.startsWith("assetdb://Global")?"".concat(imageRepoPath,"/thumbs/assetdb/").concat(t.replace("assetdb://Global",""),".png"):t.startsWith("thumbnail://")?"".concat(imageRepoPath,"/cities2/Media/Placeholder.svg"):"".concat(imageRepoPath,"/cities2/").concat(decodeURIComponent(t)):a=n.startsWith("ContentPrefab")?"".concat(imageRepoPath,"/cities2/Media/DLC/").concat(e,".svg"):"".concat(imageRepoPath,"/cities2/Media/Placeholder.svg"),a=a.replace("Media/Game/Icons/Highways.svg","Media/Game/Icons/HIghways.svg"))}function Q(e){return ee.apply(this,arguments)}function ee(){return(ee=s(o().mark((function e(t){var n,a,i,s,c,l,u;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.PrefabID,a="",!t.ServiceUpgrade_Buildings){e.next=12;break}return i=t.PrefabID.split(":"),s=r(i,2),s[0],c=s[1],e.next=6,getLangData("Assets.UPGRADE_NAME[".concat(c,"]"));case 6:return n=e.sent,e.next=9,getLangData("Assets.UPGRADE_DESCRIPTION[".concat(c,"]"));case 9:a=e.sent,e.next=18;break;case 12:return e.next=14,te(t.PrefabID);case 14:l=e.sent,u=r(l,2),n=u[0],a=u[1];case 18:return e.abrupt("return",[n,a]);case 19:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function te(e){return ne.apply(this,arguments)}function ne(){return(ne=s(o().mark((function e(t){var n,a,i,s,c,l,u,d,f,p,h,m;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.split(":"),a=r(n,2),i=a[0],s=a[1],"UIAssetMenuPrefab"==i||"ServicePrefab"==i?(c=getLangData("Services.NAME[".concat(s,"]")),l=getLangData("Services.DESCRIPTION[".concat(s,"]"))):"UIAssetCategoryPrefab"==i?(c=getLangData("SubServices.NAME[".concat(s,"]")),l=getLangData("Assets.SUB_SERVICE_DESCRIPTION[".concat(s,"]"))):"ContentPrefab"==i?(c=getLangData("Common.DLC_TITLE[".concat(s,"]")),l=Promise.resolve("")):(c=getLangData("Assets.NAME[".concat(s,"]")),l=getLangData("Assets.DESCRIPTION[".concat(s,"]"))),e.next=4,Promise.all([c,l]);case 4:return u=e.sent,d=r(u,2),f=d[0],p=d[1],h=f.includes(".NAME[")||f.includes(".DLC_TITLE")?s:f,m=p.includes(".DESCRIPTION[")?"":p,e.abrupt("return",[h,m]);case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function re(e){return new URLSearchParams(window.location.search).get(e)}function ae(e){L.classList.contains("flexed")&&(e.preventDefault(),L.scrollLeft+=e.deltaY)}$(document).ready(s(o().mark((function e(){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,initDB(!1);case 2:loadFile(),_(y,x,"assetDetailState"),E.addEventListener("wheel",ae);case 5:case"end":return e.stop()}}),e)})))),window.closeAssetPanel=Y,window.toggleDetailsPane=Z,window.processAssetGroup=function(){return O.apply(this,arguments)},window.processAssetTab=j,window.processAssetPanel=q,window.processAssetData=B,window.getTitleAndDescription=Q,window.getTitleAndDescriptionFromPrefab=te,window.iconDecider=K})();