
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

(function(){var d=document,$=function(q,r){return [].slice.call((r||d).querySelectorAll(q))};
var calm=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
function shown(n){return !!(n.offsetWidth||n.offsetHeight)}
/* hero deck */
var names={yamesi:"Yamesi Core",nekobet:"NekoBet",opscircuit:"OpsCircuit"};
$(".hero-shots").forEach(function(h){var im=$("img",h);if(im.length<2){return}
 var order=im.map(function(x,i){return i}).reverse(),cap=d.createElement("div"),nm=d.createElement("span"),tk=d.createElement("span"),hold=false;
 cap.className="deck-cap";tk.className="deck-ticks";im.forEach(function(){tk.appendChild(d.createElement("i"))});cap.appendChild(nm);cap.appendChild(tk);
 function paint(){order.forEach(function(ix,pos){im[ix].className="p"+Math.min(pos,2)});
  var f=im[order[0]],key=(f.getAttribute("src").split("/").pop().split("-")[0]);nm.textContent=names[key]||"";
  $("i",tk).forEach(function(t,i){t.className=i===im.length-1-order[0]?"on":""})}
 function turn(){order.push(order.shift());paint()}
 h.classList.add("deck");h.appendChild(cap);paint();
 h.addEventListener("click",turn);
 h.addEventListener("mouseenter",function(){hold=true});h.addEventListener("mouseleave",function(){hold=false});
 if(!calm){setInterval(function(){if(!hold&&!d.hidden&&shown(h)){turn()}},3800)}});
if(!("IntersectionObserver" in window)){return}
/* reveal on scroll */
if(!calm){d.documentElement.classList.add("js");
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{rootMargin:"0px 0px -8% 0px",threshold:.08});
 $(".proof li,.case,.job,.two>div,.csec,.cards li,.nextcase,.foot .wrap").forEach(function(n){n.classList.add("rv");io.observe(n)})}
/* count up */
if(!calm){var co=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting){return}co.unobserve(e.target);
  var n=e.target,to=+n.textContent,t0=null;function step(t){if(t0===null){t0=t}var k=Math.min(1,(t-t0)/1300);n.textContent=Math.round(to*(1-Math.pow(1-k,3)));if(k<1){requestAnimationFrame(step)}}
  requestAnimationFrame(step)})},{threshold:.6});
 $(".proof b").forEach(function(n){var v=n.textContent;if(/^\d+$/.test(v)&&+v<1000){co.observe(n)}})}
/* carousel autoplay, with a pause button */
if(calm){return}
var GAP=4800;
$(".carousel").forEach(function(c){var t=c.querySelector(".track"),n=$(".slide",c).length,bar=c.querySelector(".cbar"),nx=c.querySelector(".next");
 if(!t||n<2||!bar){return}
 var on=true,vis=false,hov=false,timer=null,btn=d.createElement("button");
 btn.type="button";btn.className="auto";bar.insertBefore(btn,nx);c.style.setProperty("--auto",GAP+"ms");
 function idx(){return t.clientWidth?Math.round(t.scrollLeft/t.clientWidth):0}
 function label(){btn.textContent=on?"❚❚":"▶";btn.setAttribute("aria-label",on?"Pausar / Pause":"Reproducir / Play");btn.setAttribute("aria-pressed",String(!on))}
 function run(){clearTimeout(timer);var go=on&&vis&&!hov&&!d.hidden&&!d.querySelector("dialog.lb[open]");
  c.classList.remove("playing");if(!go){return}void c.offsetWidth;c.classList.add("playing");
  timer=setTimeout(function(){var i=idx()+1;t.scrollTo({left:(i>=n?0:i)*t.clientWidth,behavior:"smooth"});run()},GAP)}
 function stop(){if(on){on=false;label();run()}}
 btn.addEventListener("click",function(){on=!on;label();run()});
 $(".arrow,.dot,.expand",c).forEach(function(x){x.addEventListener("click",stop)});
 ["pointerdown","touchstart","keydown","wheel"].forEach(function(ev){t.addEventListener(ev,stop,{passive:true})});
 c.addEventListener("mouseenter",function(){hov=true;run()});c.addEventListener("mouseleave",function(){hov=false;run()});
 d.addEventListener("visibilitychange",run);
 new IntersectionObserver(function(es){vis=es[0].isIntersecting;run()},{threshold:.6}).observe(t);
 label()});
})();
