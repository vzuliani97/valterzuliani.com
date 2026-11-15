
(function(){var b=document.body,k="vz-lang",l,$=function(q,r){return [].slice.call((r||document).querySelectorAll(q))};
try{l=localStorage.getItem(k)}catch(e){}
if(!l){l=(navigator.language||"es").toLowerCase().indexOf("es")===0?"es":"en"}
function set(x){l=x;b.setAttribute("data-lang",x);document.documentElement.lang=x;
 $(".langbar button").forEach(function(n){n.setAttribute("aria-pressed",n.value===x)});
 $(".navlinks a").forEach(function(a){a.textContent=a.getAttribute("data-"+x)});
 if(b.hasAttribute("data-home")){document.title=x==="es"?"Valter Zuliani · Ingeniero de Software":"Valter Zuliani · Software Engineer"}
 try{localStorage.setItem(k,x)}catch(e){}}
set(l);
$(".langbar button").forEach(function(n){n.addEventListener("click",function(){set(n.value)})});
$(".navlinks a").forEach(function(a){a.addEventListener("click",function(e){e.preventDefault();
 var t=document.getElementById(a.getAttribute("href").slice(1)+"-"+l);if(t){t.scrollIntoView()}})});
var bar=document.querySelector(".progress i"),top=document.querySelector(".totop");
if(top){top.addEventListener("click",function(){scrollTo({top:0,behavior:"smooth"})})}
var lb=document.querySelector("dialog.lb");
if(lb&&lb.showModal){var set_=[],at=0,li=lb.querySelector("img"),lp=lb.querySelector("p"),pv=lb.querySelector(".pv"),nx=lb.querySelector(".nx");
 function show(i){at=(i+set_.length)%set_.length;var m=set_[at];li.src=m.currentSrc||m.src;li.alt=m.alt;lp.textContent=m.alt+(set_.length>1?"  ·  "+(at+1)+" / "+set_.length:"");pv.hidden=nx.hidden=set_.length<2}
 function open(list,i){set_=list;show(i);lb.showModal()}
 $(".carousel").forEach(function(c){var im=$(".slide img",c);
  im.forEach(function(x,k){x.addEventListener("click",function(){open(im,k)})});
  c.querySelector(".expand").addEventListener("click",function(){var t=c.querySelector(".track");open(im,t.clientWidth?Math.round(t.scrollLeft/t.clientWidth):0)})});
 $(".diagram img").forEach(function(x){x.addEventListener("click",function(){open($(".diagram img",x.closest(".tree")),$(".diagram img",x.closest(".tree")).indexOf(x))})});
 pv.addEventListener("click",function(){show(at-1)});nx.addEventListener("click",function(){show(at+1)});
 lb.querySelector(".x").addEventListener("click",function(){lb.close()});
 lb.addEventListener("click",function(e){if(e.target===lb){lb.close()}});
 lb.addEventListener("keydown",function(e){if(e.key==="ArrowRight"){show(at+1)}if(e.key==="ArrowLeft"){show(at-1)}});
 var sx=null;lb.addEventListener("touchstart",function(e){sx=e.touches[0].clientX},{passive:true});
 lb.addEventListener("touchend",function(e){if(sx===null){return}var dx=e.changedTouches[0].clientX-sx;sx=null;if(Math.abs(dx)>50){show(at+(dx<0?1:-1))}})}
function onScroll(){var h=document.documentElement,m=h.scrollHeight-h.clientHeight;bar.style.width=(m>0?h.scrollTop/m*100:0)+"%";if(top){top.classList.toggle("show",h.scrollTop>700)}
 var cur="";$('.tree[lang="'+l+'"] [data-sec]').forEach(function(s){if(s.getBoundingClientRect().top<140){cur=s.getAttribute("data-sec")}});
 $(".navlinks a").forEach(function(a){a.classList.toggle("on",a.getAttribute("href")==="#"+cur)})}
addEventListener("scroll",onScroll,{passive:true});onScroll();
if(location.hash){var ht=document.getElementById(location.hash.slice(1)+"-"+l);if(ht){var gh=function(){ht.scrollIntoView({behavior:"auto"})};gh();addEventListener("load",gh)}}
else if(!b.hasAttribute("data-home")){try{history.scrollRestoration="manual"}catch(e){}
 var up=function(){document.documentElement.style.scrollBehavior="auto";scrollTo(0,0);document.documentElement.style.scrollBehavior=""};
 up();addEventListener("load",up);addEventListener("pageshow",up)}
$(".carousel").forEach(function(c){var t=c.querySelector(".track"),d=$(".dot",c),p=c.querySelector(".prev"),n=c.querySelector(".next");
 function idx(){return t.clientWidth?Math.round(t.scrollLeft/t.clientWidth):0}
 function go(i){t.scrollTo({left:i*t.clientWidth,behavior:"smooth"})}
 function sync(){var i=idx();d.forEach(function(x,j){if(j===i){x.setAttribute("aria-current","true")}else{x.removeAttribute("aria-current")}});p.disabled=i===0;n.disabled=i===d.length-1}
 p.addEventListener("click",function(){go(idx()-1)});n.addEventListener("click",function(){go(idx()+1)});
 d.forEach(function(x,j){x.addEventListener("click",function(){go(j)})});
 t.addEventListener("keydown",function(e){if(e.key==="ArrowRight"){go(idx()+1)}if(e.key==="ArrowLeft"){go(idx()-1)}});
 t.addEventListener("scroll",function(){clearTimeout(t._s);t._s=setTimeout(sync,60)},{passive:true});addEventListener("resize",sync);sync()});
})();
