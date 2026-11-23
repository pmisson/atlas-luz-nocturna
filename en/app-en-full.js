/* Atlas jurídico de la noche — app 100 % estática, sin dependencias ni telemetría. */
(() => {
'use strict';
const D = window.ATLAS_DATA;
const GEO = window.WORLD_GEO;
const measureTranslations = window.NOCTIS_EN_MEASURES || {};
if (D?.stars) for(const measure of D.stars) { const translated=measureTranslations[measure.id]; if(translated) Object.assign(measure,translated); }
if (!D || !GEO) { document.body.insertAdjacentHTML('afterbegin','<p role="alert">Error: faltan los archivos locales de datos.</p>'); return; }
const palette = {
  especifica: { fill:'#59ceb1', name:'Dedicated law' },
  sectorial: { fill:'#d5b57a', name:'Sector-specific rule' },
  subnacional: { fill:'#7e9fcd', name:'Subnational regulation' },
  general: { fill:'#987eaa', name:'General legal framework' },
  guia: { fill:'#5d9da5', name:'Guidance / standard' },
  pendiente: { fill:'#6a788a', name:'Not yet documented' }
};
const el=id=>document.getElementById(id);
const englishSummaries=window.NOCTIS_EN_SUMMARIES||{};
const countryIndex=new Map(D.countries.map(x=>[x.iso,x]));
const sourceIndex=new Map(D.sources.map(x=>[x.id,x]));
const starsByCountry=new Map(D.countries.map(c=>[c.iso,D.stars.filter(x=>x.country===c.iso)]));
const sourceByCountry=new Map(D.countries.map(c=>[c.iso,D.sources.filter(x=>x.country===c.iso)]));
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const slug=s=>String(s).normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const allMatches=(country,q)=>[country.name,country.region,country.summary,country.keywords,D.levels[country.level],country.scope,legalClassName(country)].some(s=>String(s||'').toLowerCase().includes(q));
const englishName=c=>window.NOCTIS_NAMES_EN?.[c.iso]||c.name;
const englishRegion=r=>({'Europa':'Europe','América':'Americas','Asia':'Asia','África':'Africa','Oceanía':'Oceania'})[r]||r;
const kindName=(c)=>palette[c.level]?.name||D.levels[c.level];
const alanLabels={proteccion:'Express lighting protection',uso:'Lighting use / sectoral instrument',contexto:'No express protection established'};
const alanName=c=>alanLabels[c.alan_scope]||alanLabels.contexto;
const legalClassLabels={"dedicada":"Dedicated light-pollution legislation","integrada":"Lighting duty in another instrument","no_vinculante":"Guidance or policy, not proven binding","indirecta":"Indirect regulation / lighting use","pendiente":"Binding status or scope still to verify"};
const legalClassName=c=>legalClassLabels[c.alan_legal_class]||legalClassLabels.pendiente;
const bindingName=c=>c.alan_binding_review==='documentada'?'Documented duty (commencement to verify)':'Binding duty not established by the reviewed evidence';
const sourceHref=src=>src?.url&&/^https?:\/\//.test(src.url)?src.url:'#fuentes';
let selected='ESP'; let region='todos'; let level='todos'; let legalClass='todos'; let zoom=1,tx=0,ty=0,showAllStars=false,sourceShown=12,starMode='table';

// Counters and legend
el('metric-countries').textContent=D.countries.length;
el('metric-sources').textContent=D.sources.length;
el('metric-stars').textContent=D.stars.length;
const stateMetric=el('metric-states');if(stateMetric)stateMetric.textContent=D.countries.filter(c=>c.political_status==='miembro_onu').length;
const territoryMetric=el('metric-territories');if(territoryMetric)territoryMetric.textContent=D.countries.filter(c=>c.political_status==='territorio_no_soberano').length;
const bindingCount=D.countries.filter(c=>c.alan_binding_review==='documentada').length;
const bindingMetric=el('metric-binding');if(bindingMetric)bindingMetric.textContent=bindingCount;
el('legendItems').innerHTML=Object.entries(palette).map(([key,v])=>`<span class="legend-item"><span class="legend-swatch" style="background:${v.fill}"></span>${escape(v.name)}</span>`).join('');
el('legendItems').insertAdjacentHTML('beforeend',`<span class="legend-item"><span class="legend-swatch" style="background:repeating-linear-gradient(135deg,#718092,#718092 3px,#162435 3px,#162435 7px);border:1px solid #9eb0c4"></span>Hatched: no enforceable ALAN duty established (includes guidance and indirect frameworks)</span><span class="legend-item">Colour = instrument type · Hatching = legal evidence</span>`);

const ns='http://www.w3.org/2000/svg',world=el('worldCountries'),markers=el('mapMarkers'),groups=el('worldGroup');
const shapes=new Map();
// Patrones SVG conservan el color de cada categoría y añaden rayado donde la protección ALAN no está acreditada.
const svgDefs=el('worldMap').querySelector('defs');
for(const [key,v] of Object.entries(palette)){
  const pattern=document.createElementNS(ns,'pattern');pattern.setAttribute('id','hatch-'+key);pattern.setAttribute('width','8');pattern.setAttribute('height','8');pattern.setAttribute('patternUnits','userSpaceOnUse');
  const bg=document.createElementNS(ns,'rect');bg.setAttribute('width','8');bg.setAttribute('height','8');bg.setAttribute('fill',v.fill);pattern.appendChild(bg);
  const stroke=document.createElementNS(ns,'path');stroke.setAttribute('d','M-2,2 L2,-2 M0,8 L8,0 M6,10 L10,6');stroke.setAttribute('stroke','#152536');stroke.setAttribute('stroke-width','2.6');stroke.setAttribute('fill','none');pattern.appendChild(stroke);svgDefs.appendChild(pattern);
}
const mapFill=c=>c.alan_binding_review!=='documentada'?`url(#hatch-${c.level})`:palette[c.level].fill;
let tip=el('mapTooltip');
const matchFilters=c=>!!c&&(region==='todos'||c.region===region)&&(level==='todos'||c.level===level)&&(legalClass==='todos'||c.alan_legal_class===legalClass);
for (const g of GEO) {
  const p=document.createElementNS(ns,'path'); p.setAttribute('d',g.d);p.setAttribute('data-iso',g.iso);
  const c=countryIndex.get(g.iso);
  p.setAttribute('fill',c?mapFill(c):'#1d3042');
  p.setAttribute('class','country-shape'+(c?' in-atlas':''));
  p.setAttribute('aria-label',c?`${englishName(c)}: ${kindName(c)}. ${alanName(c)}`:g.name);
  if(c){p.setAttribute('tabindex','0');p.setAttribute('role','button');}
  else {p.setAttribute('aria-hidden','true');}
  world.appendChild(p);
  if(c){shapes.set(g.iso,p);
    p.addEventListener('mouseenter',e=>showTip(e,c));p.addEventListener('mousemove',e=>moveTip(e));p.addEventListener('mouseleave',hideTip);
    p.addEventListener('click',e=>{if(!hasDragged)selectCountry(c.iso);});
    p.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();selectCountry(c.iso);}});
  }
}
// Countries absent from low-resolution Natural Earth are represented by true-location dots.
const localDots=[{iso:'MLT',lon:14.375,lat:35.937},{iso:'SGP',lon:103.82,lat:1.35},{iso:'AND',lon:1.5218,lat:42.5063},{iso:'LIE',lon:9.5554,lat:47.1660},{iso:'SYC',lon:55.45,lat:-4.62},{iso:'COM',lon:43.34,lat:-11.7},{iso:'STP',lon:6.61,lat:0.23},{iso:'GUF',lon:-53.13,lat:3.93},{iso:'TON',lon:-175.2,lat:-21.1},{iso:'KIR',lon:173,lat:1.4},{iso:'TUV',lon:179.2,lat:-8.5},{iso:'NRU',lon:166.93,lat:-0.53},{iso:'PLW',lon:134.48,lat:7.5},{iso:'FSM',lon:158.2,lat:6.9},{iso:'MHL',lon:171.38,lat:7.1},{iso:'DMA',lon:-61.37,lat:15.41},{iso:'GRD',lon:-61.68,lat:12.11},{iso:'VCT',lon:-61.2,lat:13.25},{iso:'MCO',lon:7.42,lat:43.73},{iso:'SMR',lon:12.46,lat:43.94},{iso:'VAT',lon:12.453,lat:41.902},{iso:'MKD',lon:21.75,lat:41.6},{iso:'CYM',lon:-81.25,lat:19.3},{iso:'PYF',lon:-149.57,lat:-17.54},{iso:'HKG',lon:114.17,lat:22.3}];
for(const {iso,lon,lat} of localDots){
  const c=countryIndex.get(iso);if(!c)continue;
  const dot=document.createElementNS(ns,'circle');
  dot.setAttribute('cx',((lon+180)*1200/360).toFixed(2));dot.setAttribute('cy',((85-lat)*3.55).toFixed(2));dot.setAttribute('r','5.8');dot.setAttribute('fill',mapFill(c));dot.setAttribute('class','country-dot in-atlas');dot.setAttribute('data-iso',iso);dot.setAttribute('tabindex','0');dot.setAttribute('role','button');dot.setAttribute('aria-label',englishName(c));
  dot.addEventListener('mouseenter',e=>showTip(e,c));dot.addEventListener('mousemove',moveTip);dot.addEventListener('mouseleave',hideTip);dot.addEventListener('click',()=>{if(!hasDragged)selectCountry(iso)});dot.addEventListener('keydown',e=>{if(e.key==='Enter'){selectCountry(iso)}});
  markers.appendChild(dot);shapes.set(iso,dot);
}
function showTip(e,c){tip.innerHTML=`<strong>${escape(window.NOCTIS_NAMES_EN?.[c.iso]||c.name)}</strong><br><span style="color:#9fb5bb">${escape(kindName(c))}</span><br><span>${escape(legalClassName(c))}</span>`;tip.style.display='block';moveTip(e);}
function moveTip(e){const rec=el('mapCanvas').getBoundingClientRect();let x=e.clientX-rec.left+13,y=e.clientY-rec.top-10; if(x>rec.width-200)x-=205;if(y>rec.height-65)y-=54;tip.style.left=Math.max(0,x)+'px';tip.style.top=Math.max(0,y)+'px';}
function hideTip(){tip.style.display='none';}
function updateMapStyles(){for(const c of D.countries){const p=shapes.get(c.iso);if(!p)continue;p.classList.toggle('filtered',!matchFilters(c));p.classList.toggle('is-selected',c.iso===selected);p.setAttribute('opacity',matchFilters(c)?'1':'.55');}}
function updateTransform(){groups.setAttribute('transform',`translate(${tx.toFixed(3)} ${ty.toFixed(3)}) scale(${zoom.toFixed(3)})`);}
function zoomMap(factor,originX=600,originY=270){const newZ=Math.min(7.5,Math.max(1,zoom*factor));const k=newZ/zoom;tx=originX-(originX-tx)*k;ty=originY-(originY-ty)*k;zoom=newZ; if(zoom===1){tx=0;ty=0;} updateTransform();}
function resetZoom(){zoom=1;tx=0;ty=0;updateTransform();}
el('zoomIn').addEventListener('click',()=>zoomMap(1.5));el('zoomOut').addEventListener('click',()=>zoomMap(1/1.5));el('zoomReset').addEventListener('click',resetZoom);
const canvas=el('mapCanvas');let start=null,hasDragged=false;
canvas.addEventListener('pointerdown',e=>{if(e.button!==0)return;start={x:e.clientX,y:e.clientY,tx,ty};hasDragged=false;});
canvas.addEventListener('pointermove',e=>{if(!start)return;const dx=e.clientX-start.x,dy=e.clientY-start.y;if(Math.abs(dx)+Math.abs(dy)>7){if(!hasDragged) canvas.setPointerCapture?.(e.pointerId);hasDragged=true;canvas.classList.add('dragging');tx=start.tx+dx*1200/canvas.clientWidth;ty=start.ty+dy*550/canvas.clientHeight;updateTransform();}});
canvas.addEventListener('pointerup',()=>{start=null;canvas.classList.remove('dragging');setTimeout(()=>{hasDragged=false;},0);});
canvas.addEventListener('pointercancel',()=>{start=null;canvas.classList.remove('dragging');});
canvas.addEventListener('wheel',e=>{e.preventDefault();const box=canvas.getBoundingClientRect();const x=(e.clientX-box.left)*1200/box.width,y=(e.clientY-box.top)*550/box.height;zoomMap(e.deltaY<0?1.18:1/1.18,x,y);},{passive:false});
function viewDoc(c){return '../?pais='+encodeURIComponent(c.iso)+'#paises';}
function selectCountry(iso,scroll=false){const c=countryIndex.get(iso);if(!c)return;selected=c.iso;updateMapStyles();
  const refs=sourceByCountry.get(iso)||[];const star=starsByCountry.get(iso)||[];
  el('countryDetail').innerHTML=`<div class="detail-top"><div class="tiny">EXPEDIENTE / ${escape(englishRegion(c.region).toUpperCase())} / ${escape(c.iso)}</div><h3>${escape(englishName(c))}</h3><span class="detail-status"><i style="background:${palette[c.level].fill}"></i>${escape(kindName(c))}</span></div><div class="detail-body"><p class="detail-label">LEGAL OVERVIEW</p><p class="detail-claim">${escape(englishSummaries[c.iso]||'English legal summary pending; consult the original-language sources and Spanish dossier.')}</p><p class="detail-label">RELATION TO LIGHT POLLUTION</p><p class="detail-small"><strong>${escape(alanName(c))}</strong>. ${escape('Original supporting explanation in the Spanish dossier')}</p><p class="detail-label">ALAN LEGAL CLASSIFICATION</p><p class="detail-small"><strong>${escape(legalClassName(c))}</strong> · ${escape(bindingName(c))}</p><p class="detail-small">${escape('Check the source text for scope, exceptions and commencement')}</p><p class="detail-label">SCOPE</p><p class="detail-small">${escape('See original territorial scope in the Spanish record')}</p><p class="detail-label">REVIEW STATUS</p><p class="detail-small">${escape(c.alan_binding_review==='documentada'?'Lighting-related duty documented; enforceability subject to verification':'Scope or binding force pending verification')}</p>${c.note?`<div class="detail-caution">${escape('See original Spanish dossier for the detailed caution and exceptions.')}</div>`:''}${star.length?`<p class="detail-label">SELECTED MEASURES (${star.length})</p><p class="detail-small">${star.map(m=>escape(m.title)).join(' · ')}</p>`:''}<p class="detail-label">REFERENCES (${refs.length})</p><div class="detail-sources">${refs.map(s=>`<a class="detail-source" href="${escape(sourceHref(s))}" target="_blank" rel="noopener noreferrer"><b>${escape(s.id)}</b>${escape(s.title)} ↗</a>`).join('')}</div><a class="detail-link" href="${escape(viewDoc(c))}" >↓ Open original Spanish legal file</a></div>`;
  if(scroll){el('mapa').scrollIntoView({behavior:'smooth',block:'start'});}
}
function updateFilters(){region=el('regionFilter').value;level=el('levelFilter').value;legalClass=el('legalClassFilter').value;updateMapStyles();renderCountries();}
el('regionFilter').addEventListener('change',updateFilters);el('levelFilter').addEventListener('change',updateFilters);el('legalClassFilter').addEventListener('change',updateFilters);
el('resetMap').addEventListener('click',()=>{region='todos';level='todos';el('regionFilter').value='todos';el('levelFilter').value='todos';el('legalClassFilter').value='todos';resetZoom();updateFilters();});

function badgeKind(c){return `<span class="row-dot" style="background:${palette[c.level].fill}"></span>${escape(kindName(c))}<small class="alan-meta">${escape(legalClassName(c))} · ${c.alan_binding_review==='documentada'?'Documented duty':'Verification pending'}</small>`;}
function renderCountries(){const q=el('countrySearch').value.trim().toLowerCase();const found=D.countries.filter(c=>matchFilters(c)&&(!q||allMatches(c,q))).sort((a,b)=>englishName(a).localeCompare(englishName(b),'en'));
  el('countryRows').innerHTML=found.map(c=>`<tr><td>${escape(englishName(c))}</td><td>${escape(englishRegion(c.region))}</td><td>${badgeKind(c)}</td><td>${c.source_ids.length}</td><td><button type="button" class="row-view" data-country="${escape(c.iso)}">View file ↗</button></td></tr>`).join('');el('countryEmpty').hidden=found.length>0;
}
el('countryRows').addEventListener('click',e=>{const btn=e.target.closest('button[data-country]');if(btn)selectCountry(btn.dataset.country,true);});
el('countrySearch').addEventListener('input',renderCountries);

function forceCat(m){const f=m.force.toLowerCase();if(/guía|recomendaci|proyecto|mandato|pendiente|no necesariamente|orientación/.test(f))return 'otra';return /(ley|reglamento|decreto|ordenanza|obligatoria|vinculante|plan de distrito)/.test(f)?'obligatoria':'otra';}
function renderStars(){const q=el('starSearch').value.trim().toLowerCase(),cat=el('starForce').value;
  const found=D.stars.filter(m=>{const c=countryIndex.get(m.country)||{name:'European Union / international'};return(cat==='todos'||forceCat(m)===cat)&&(!q||[m.title,m.description,m.param,m.force,m.scope,c.name].some(v=>String(v).toLowerCase().includes(q)));});
  el('starCounter').textContent=found.length+' measures';
  el('starRows').innerHTML=found.map(m=>{const c=countryIndex.get(m.country)||{name:'European Union / international'};const links=m.sources.map(sid=>sourceIndex.get(sid)).filter(Boolean);
    return `<tr><td class="star-row-country">${escape(c.iso?englishName(c):c.name)}</td><td><b>${escape(m.title)}</b><small>${escape(m.description)}</small></td><td>${escape(m.param)}</td><td><span class="star-tag ${forceCat(m)==='obligatoria'?'strong':''}">${escape(m.force)}</span><small class="star-row-warning">${escape(m.caution||'')}</small></td><td class="table-source">${links.map(s=>`<a href="${escape(sourceHref(s))}" target="_blank" rel="noopener noreferrer">↗ ${escape(s.id)}</a>`).join(' ')}</td></tr>`;
  }).join('');
  if(!found.length)el('starRows').innerHTML='<tr><td colspan="5">No matching measures.</td></tr>';
  const limited=(q||cat!=='todos'||showAllStars)?found:found.slice(0,9);
  el('starsGrid').innerHTML=limited.map(m=>{const c=countryIndex.get(m.country)||{name:'European Union / international'};const links=m.sources.map(sid=>sourceIndex.get(sid)).filter(Boolean);
    return `<article class="star-card"><div class="star-top"><span class="star-n">✦ <span style="font-size:13px;letter-spacing:.04em">${escape(m.id)}</span></span><span class="star-country">${escape((c.iso?englishName(c):c.name).toUpperCase())}</span></div><h3>${escape(m.title)}</h3><p>${escape(m.description)}</p><div class="star-param"><b>PARAMETER:</b> ${escape(m.param)}</div><div class="star-tags"><span class="star-tag ${forceCat(m)==='obligatoria'?'strong':''}">${escape(m.force)}</span><span class="star-tag">${escape(m.scope)}</span></div>${m.caution?`<p class="star-warning">⚠ ${escape(m.caution)}</p>`:''}<div class="star-links">${links.map(s=>`<a href="${escape(sourceHref(s))}" target="_blank" rel="noopener noreferrer">↗ ${escape(s.id)} · Source</a>`).join('')}</div></article>`;
  }).join('');
  el('starTableWrap').hidden=starMode!=='table';
  el('starsGrid').hidden=starMode!=='cards';
  el('starViewTable').classList.toggle('active',starMode==='table');
  el('starViewCards').classList.toggle('active',starMode==='cards');
  el('starViewTable').setAttribute('aria-pressed',starMode==='table'?'true':'false');
  el('starViewCards').setAttribute('aria-pressed',starMode==='cards'?'true':'false');
  el('showAllStars').hidden=starMode!=='cards'||q!==''||cat!=='todos'||showAllStars||found.length<=9;
  if(!found.length)el('starsGrid').innerHTML='<p class="no-results">No matching legal measures.</p>';
}
el('starViewTable').addEventListener('click',()=>{starMode='table';renderStars();});
el('starViewCards').addEventListener('click',()=>{starMode='cards';renderStars();});
el('showAllStars').addEventListener('click',()=>{showAllStars=true;renderStars();});
el('starSearch').addEventListener('input',renderStars);el('starForce').addEventListener('change',renderStars);
function renderSources(){const q=el('sourceSearch').value.trim().toLowerCase(),ft=el('sourceType').value;
  const found=D.sources.filter(s=>(ft==='todos'||(ft==='oficial'&&s.official)||(ft==='pendiente'&&!s.official))&&(!q||[s.id,s.title,s.type,s.effect,s.note,countryIndex.get(s.country)?.name].some(v=>String(v||'').toLowerCase().includes(q))));
  const n=q||ft!=='todos'?Math.max(sourceShown,40):sourceShown;
  el('sourceList').innerHTML=found.slice(0,n).map(s=>`<article class="source-item"><span class="source-id">${escape(s.id)}</span><div><a class="source-title" href="${escape(sourceHref(s))}" target="_blank" rel="noopener noreferrer">${escape(s.title)} ↗</a><div class="source-desc">${escape(s.effect)}${s.note?' · '+escape(s.note):''}</div><div class="source-meta"><span>${escape((countryIndex.get(s.country)?englishName(countryIndex.get(s.country)):null)||({'INT':'International','REF':'Scientific research'})[s.country]||s.country)}</span><span>${escape(s.type)}</span><span>${s.official?'Official / primary source':'Secondary source / verify'}</span></div></div><span class="source-visit">↗ Open</span></article>`).join('');
  if(!found.length)el('sourceList').innerHTML='<p class="no-results">No documents match the search.</p>';
  const more=el('showMoreSources');more.hidden=found.length<=n;more.textContent='Show more references ('+Math.min(20,found.length-n)+') ↘';
}
el('showMoreSources').addEventListener('click',()=>{sourceShown+=20;renderSources();});
el('sourceSearch').addEventListener('input',renderSources);el('sourceType').addEventListener('change',renderSources);

function init(){const params=new URLSearchParams(location.search);const c=params.get('pais')?.toUpperCase();if(c&&countryIndex.has(c))selected=c;updateMapStyles();selectCountry(selected);renderCountries();renderStars();renderSources();}
init();
})();
