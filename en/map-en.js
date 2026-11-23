(()=>{"use strict";
const D=window.ATLAS_DATA,G=window.WORLD_GEO,EN=window.NOCTIS_EN;if(!D||!G||!EN)return;
const ns="http://www.w3.org/2000/svg",map=document.getElementById("en-map"),group=document.getElementById("en-map-group"),land=document.getElementById("en-map-land"),dots=document.getElementById("en-map-dots"),tip=document.getElementById("en-map-tip");
if(!map||!group||!land||!dots)return;
const palette={especifica:"#59ceb1",sectorial:"#d5b57a",subnacional:"#7e9fcd",general:"#987eaa",guia:"#5d9da5",pendiente:"#6a788a"};
const name=c=>EN.names[c.iso]||c.name;
const index=new Map(D.countries.map(c=>[c.iso,c]));
const shapes=new Map();
const defs=map.querySelector("defs");
for(const [type,color] of Object.entries(palette)){
 const pattern=document.createElementNS(ns,"pattern");pattern.setAttribute("id","en-hatch-"+type);pattern.setAttribute("width","8");pattern.setAttribute("height","8");pattern.setAttribute("patternUnits","userSpaceOnUse");
 const bg=document.createElementNS(ns,"rect");bg.setAttribute("width","8");bg.setAttribute("height","8");bg.setAttribute("fill",color);pattern.appendChild(bg);
 const hatch=document.createElementNS(ns,"path");hatch.setAttribute("d","M-2,2 L2,-2 M0,8 L8,0 M6,10 L10,6");hatch.setAttribute("stroke","#142737");hatch.setAttribute("stroke-width","2.8");pattern.appendChild(hatch);defs.appendChild(pattern);
}
const fill=c=>c.alan_binding_review==="documentada"?palette[c.level]:"url(#en-hatch-"+c.level+")";
let z=1,dx=0,dy=0,down=null,moved=false,hoverTimer=0;
function transform(){group.setAttribute("transform","translate("+dx+" "+dy+") scale("+z+")");}
function zoom(f,px=600,py=275){const nz=Math.max(1,Math.min(8,z*f)),ratio=nz/z;dx=px-(px-dx)*ratio;dy=py-(py-dy)*ratio;z=nz;if(z===1){dx=0;dy=0;}transform();}
function choose(c){if(!moved){window.NOCTIS_EN.select(c.iso);}}
function hover(event,c){const rect=map.getBoundingClientRect();tip.textContent=name(c)+" — "+(EN.kinds[c.level]||c.level);tip.style.display="block";tip.style.left=Math.max(3,Math.min(rect.width-230,event.clientX-rect.left+12))+"px";tip.style.top=Math.max(3,Math.min(rect.height-75,event.clientY-rect.top-25))+"px";}
function attach(shape,c){
 shape.setAttribute("tabindex","0");shape.setAttribute("role","button");shape.setAttribute("aria-label","Open legal profile for "+name(c));shape.setAttribute("fill",fill(c));
 shape.addEventListener("click",()=>choose(c));shape.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();moved=false;choose(c);}});
 shape.addEventListener("pointermove",e=>hover(e,c));shape.addEventListener("pointerleave",()=>tip.style.display="none");
 shapes.set(c.iso,shape);
}
for(const g of G){
 const shape=document.createElementNS(ns,"path");shape.setAttribute("d",g.d);shape.setAttribute("stroke","#09202a");shape.setAttribute("stroke-width",".45");
 const c=index.get(g.iso);if(c)attach(shape,c);else{shape.setAttribute("fill","#1f3441");shape.setAttribute("aria-hidden","true");}
 land.appendChild(shape);
}
// Small territories absent from Natural Earth are represented as selectable location dots.
const points={MLT:[14.38,35.94],SGP:[103.82,1.35],AND:[1.52,42.5],LIE:[9.55,47.17],SYC:[55.45,-4.62],COM:[43.34,-11.7],STP:[6.61,.23],GUF:[-53.13,3.93],TON:[-175.2,-21.1],KIR:[173,1.4],TUV:[179.2,-8.5],NRU:[166.93,-.53],PLW:[134.48,7.5],FSM:[158.2,6.9],MHL:[171.38,7.1],DMA:[-61.37,15.41],GRD:[-61.68,12.11],VCT:[-61.2,13.25],MCO:[7.42,43.73],SMR:[12.46,43.94],VAT:[12.453,41.9],MKD:[21.75,41.6],CYM:[-81.25,19.3],PYF:[-149.57,-17.54],HKG:[114.17,22.3],FRO:[-6.9,62],BMU:[-64.75,32.3],GUM:[144.79,13.44],COK:[-159.78,-21.22],IMN:[-4.55,54.23],JEY:[-2.13,49.2],ABW:[-69.97,12.52],GGY:[-2.59,49.46],SXM:[-63.05,18.04],CUW:[-68.98,12.17],VGB:[-64.63,18.42],TCA:[-71.8,21.75],AIA:[-63.05,18.22],MSR:[-62.2,16.74],GIB:[-5.35,36.14],PCN:[-130.1,-25.07],SHN:[-5.72,-15.95],ASC:[-14.35,-7.94],FLK:[-59,-51.8],TAA:[-12.3,-37.1],IOT:[72.4,-7.3],SJM:[15.63,78.22],NIU:[-169.87,-19.05],TKL:[-171.86,-9.2],WLF:[-176.19,-13.28],SPM:[-56.17,46.78]};
for(const [iso,xy] of Object.entries(points)){const c=index.get(iso);if(!c||shapes.has(iso))continue;const [lon,lat]=xy;const dot=document.createElementNS(ns,"circle");dot.setAttribute("cx",((lon+180)*1200/360).toFixed(2));dot.setAttribute("cy",((85-lat)*3.55).toFixed(2));dot.setAttribute("r","4.8");dot.setAttribute("stroke","#071620");dot.setAttribute("stroke-width","1");attach(dot,c);dots.appendChild(dot);}
function apply(){const r=document.getElementById("en-map-region").value,t=document.getElementById("en-map-type").value,e=document.getElementById("en-map-evidence").value;for(const c of D.countries){const el=shapes.get(c.iso);if(el){const ok=(!r||c.region===r)&&(!t||c.level===t)&&(!e||c.alan_binding_review===e);el.setAttribute("opacity",ok?"1":".12");el.style.pointerEvents=ok?"auto":"none";}}}
for(const [id,fn] of [["en-map-in",()=>zoom(1.5)],["en-map-out",()=>zoom(1/1.5)],["en-map-reset",()=>{z=1;dx=dy=0;transform();for(const id of ["en-map-region","en-map-type","en-map-evidence"])document.getElementById(id).value="";apply();}]])document.getElementById(id).addEventListener("click",fn);
const canvas=document.getElementById("en-map-canvas");
canvas.addEventListener("pointerdown",e=>{if(e.button!==0)return;down={x:e.clientX,y:e.clientY,dx,dy};moved=false;});
canvas.addEventListener("pointermove",e=>{if(!down)return;const rect=canvas.getBoundingClientRect(),x=(e.clientX-down.x)*1200/rect.width,y=(e.clientY-down.y)*550/rect.height;if(Math.abs(e.clientX-down.x)+Math.abs(e.clientY-down.y)>6){moved=true;dx=down.dx+x;dy=down.dy+y;transform();}});
canvas.addEventListener("pointerup",()=>{down=null;setTimeout(()=>moved=false,30);});canvas.addEventListener("pointercancel",()=>down=null);
canvas.addEventListener("wheel",e=>{e.preventDefault();const rect=canvas.getBoundingClientRect(),x=(e.clientX-rect.left)*1200/rect.width,y=(e.clientY-rect.top)*550/rect.height;zoom(e.deltaY<0?1.15:1/1.15,x,y);},{passive:false});
for(const id of ["en-map-region","en-map-type","en-map-evidence"])document.getElementById(id).addEventListener("change",apply);
document.getElementById("en-map-legend").innerHTML=Object.entries(palette).map(([k,v])=>'<span><i style="background:'+v+'"></i>'+(EN.kinds[k]||k)+'</span>').join("")+'<span><i style="background:repeating-linear-gradient(135deg,#718092,#718092 3px,#162435 3px,#162435 7px)"></i>Hatched: no documented enforceable lighting duty</span>';
apply();
})();