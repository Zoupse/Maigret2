!function(e){var t={};function r(s){if(t[s])return t[s].exports;var n=t[s]={i:s,l:!1,exports:{}};return e[s].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=t,r.d=function(e,t,s){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(s,n,function(t){return e[t]}.bind(null,n));return s},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/",r(r.s=0)}([function(e,t,r){"use strict";r.r(t);r(1);!function(e){let t={};e.keys().map((r,s)=>{t[r.replace("./","")]=e(r)})}(r(2));const s=document.querySelector("#alert"),n=e=>{e.preventDefault();let t=e.target.id;setTimeout(()=>{const r=new FormData(e.target);o(r,t)},800)},o=(e,t)=>{switch(document.querySelectorAll("#"+t+" input:valid").forEach(e=>{e.classList.remove("wrong")}),t){case"loginForm":"password"!==e.get("password")||"user"!==e.get("username")?(s.innerHTML="Wrong username or password",s.classList.add("show")):(s.classList.remove("show"),l=0,a=1,u(0,0));break;case"signup1":e.get("password")!==e.get("password-2")?(s.innerHTML="Password fields are not the same",s.classList.add("show"),document.querySelectorAll("#signup1 input[type=password]").forEach(e=>{e.classList.add("wrong")})):(s.classList.remove("show"),document.querySelectorAll("#signup1 input[type=password]").forEach(e=>{e.classList.remove("wrong")}));break;case"signup3":let t=0;document.querySelectorAll("aside .required").forEach(e=>{e.classList.contains("right")||(e.classList.add("wrong"),t=1)}),t?(document.querySelectorAll(".signup input:invalid").forEach(e=>{e.classList.add("wrong")}),s.innerHTML="Oops. Looks like you forgot something. Please submit each step.",s.classList.add("show")):u(-100,1)}},i=e=>{let t=e.previousElementSibling.previousElementSibling;switch(t.getAttribute("type")){case"password":t.setAttribute("type","text");break;case"text":t.setAttribute("type","password")}},c=e=>{""!==e.value?e.classList.add("filled"):e.classList.remove("filled")};let l=-200,a=3;const u=(e,t)=>{document.querySelector("#alert").classList.remove("show"),l+=e,document.querySelectorAll(".slider > div").forEach(e=>{e.style.transform="translatex("+l+"%)"}),a+=t,document.querySelector(".slider > .current").classList.remove("current");let r=document.querySelector(".slider >div:nth-child("+a+")");if(r.classList.add("current"),r.classList.contains("login")?document.querySelector("nav").classList.remove("show"):document.querySelector("nav").classList.add("show"),r.classList.contains("signup")){document.querySelector("aside").classList.add("show");let e=r.id.match(/\d+/)[0];document.querySelector("aside > .current").classList.remove("current"),document.querySelector("aside > a:nth-child("+e+")").classList.add("current")}else document.querySelector("aside").classList.remove("show")};document.querySelectorAll(".signup").forEach(e=>{if(e.querySelector("input:required")){let t=e.id.match(/\d+/)[0];document.querySelector("aside > a:nth-child("+t+")").classList.add("required")}}),document.querySelectorAll("form").forEach(e=>{e.addEventListener("submit",n)}),document.querySelectorAll(".input-container input, .input-container textarea").forEach(e=>{e.addEventListener("focusout",()=>{c(e)}),c(e)}),document.querySelectorAll(".view-button").forEach(e=>{e.addEventListener("mousedown",()=>{i(e)}),e.addEventListener("mouseup",()=>{i(e)}),e.addEventListener("touchstart",()=>{i(e)},{passive:!0}),e.addEventListener("touchend",()=>{i(e)},{passive:!0})}),document.querySelectorAll(".previous").forEach(e=>{e.addEventListener("click",e=>{e.preventDefault(),u(100,-1)})}),document.querySelectorAll(".next").forEach(e=>{e.addEventListener("click",()=>{"submit"==e.type?setTimeout(()=>{if(s.classList.contains("show")||e.parentElement.parentElement.querySelector("input:invalid")){if(s.classList.contains("show")&&document.querySelector("aside").classList.contains("show")){let e=document.querySelector("aside .current");e.classList.add("wrong"),e.classList.remove("right")}}else{if(document.querySelector("aside").classList.contains("show")){let e=document.querySelector("aside .current");e.classList.remove("wrong"),e.classList.add("right")}u(-100,1)}},900):u(-100,1)})}),document.querySelectorAll("aside > a").forEach(e=>{e.addEventListener("click",()=>{let t=e,r=1;for(;null!=(t=t.previousElementSibling);)r++;(e=>{let t=document.querySelector(".slider >div#step"+e),r=0;for(;null!=(t=t.previousElementSibling);)r++;l=parseInt("-"+r+"00"),a=r+1,u(0,0)})(r)})})},function(e,t,r){},function(e,t,r){var s={"./arrow.svg":3,"./eye.png":4,"./logo.png":5,"./oranges.jpg":6,"./oranges.png":7};function n(e){var t=o(e);return r(t)}function o(e){if(!r.o(s,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return s[e]}n.keys=function(){return Object.keys(s)},n.resolve=o,e.exports=n,n.id=2},function(e,t,r){"use strict";r.r(t),t.default=r.p+"img/arrow.svg"},function(e,t,r){"use strict";r.r(t),t.default=r.p+"img/eye.png"},function(e,t,r){"use strict";r.r(t),t.default=r.p+"img/logo.png"},function(e,t,r){"use strict";r.r(t),t.default=r.p+"img/oranges.jpg"},function(e,t,r){"use strict";r.r(t),t.default=r.p+"img/oranges.png"}]);