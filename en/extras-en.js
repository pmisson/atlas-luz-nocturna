/* Legal layers: Spain (autonomous communities), international law, academic references. */
(() => {
'use strict';
const D = window.ATLAS_DATA;
if (!D?.spain_regions || !D?.international || !D?.bibliography) return;
const el=id=>document.getElementById(id);
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const byId=new Map(D.sources.map(s=>[s.id,s]));
const label={especifica:'Dedicated law or regulation',sectorial:'Sector-specific legal framework',pendiente:'Review pending'};
let region='IB';
const chip=id=>{const s=byId.get(id);return s?`<a class="reference-chip" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(id)} \u00b7 ${esc(s.official?'Institutional source':'Secondary reference')} \u2197</a>`:''};
function drawRegions(){
 const q=el('spainSearch').value.trim().toLocaleLowerCase('en'),cat=el('spainLevel').value;
 const matches=D.spain_regions.filter(r=>(cat==='todos'||cat===r.level)&&(!q||[r.name,r.summary,r.caution].some(v=>v.toLocaleLowerCase('en').includes(q))));
 el('spainCount').textContent=matches.length+' territories';
 el('spainRows').innerHTML=matches.map(r=>`<tr class="${r.id===region?'active-region':''}"><td><b>${esc(r.name)}</b></td><td><span class="region-tag ${esc(r.level)}">${esc(label[r.level]||r.level)}</span></td><td>${esc(r.summary)}</td><td><button class="row-view" data-region="${esc(r.id)}" type="button">View laws \u2197</button></td></tr>`).join('')||'<tr><td colspan="4">No results.</td></tr>';
}
function selectRegion(id){
 const r=D.spain_regions.find(x=>x.id===id);if(!r)return;region=id;drawRegions();
 el('spainDetail').innerHTML=`<div class="tiny">REGIONAL LEGAL RECORD / ${esc(r.id)}</div><h3>${esc(r.name)}</h3><span class="region-tag ${esc(r.level)}">${esc(label[r.level]||r.level)}</span><p>${esc(r.summary)}</p><p class="detail-label">LEGAL CAVEATS</p><p class="detail-caution">${esc(r.caution)}</p><p class="detail-label">SOURCES</p><div class="region-refs">${r.source_ids.map(id=>{const s=byId.get(id);return s?`<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer"><b>${esc(id)}</b> ${esc(s.title)}<small>${s.official?'Institution / official gazette':'Secondary catalogue / verify'}</small></a>`:''}).join('')}</div><p class="region-note">Cut-off: ${esc(r.reviewed)}. Check transitional provisions and local ordinances.</p>`;
}
el('spainRows').addEventListener('click',e=>{const b=e.target.closest('button[data-region]');if(b){selectRegion(b.dataset.region);el('spainDetail').scrollIntoView({behavior:'smooth',block:'nearest'});}});
el('spainSearch').addEventListener('input',drawRegions);
el('spainLevel').addEventListener('change',drawRegions);
selectRegion(region);
el('intlGrid').innerHTML=D.international.map((r,i)=>`<article class="legal-research-card"><span class="tiny">INTERNATIONAL LAW / ${String(i+1).padStart(2,'0')}</span><h3>${esc(r.title)}</h3><p class="card-subtitle">${esc(r.subtitle)}</p><span class="legality-status">${esc(r.status)}</span><p>${esc(r.detail)}</p><div class="chip-line">${r.source_ids.map(chip).join('')}</div></article>`).join('');
(function renderEssentialBibliography(){
  const core=(D.bibliography||[]).map(r=>{const s=byId.get(r.source_id);return {name:r.name.replace('Bara','Bará'),title:r.title,topic:r.topic,url:s?.url||'',id:r.source_id,category:r.category||(/F11[4-8]/.test(r.source_id)?'Ciencia':'Recursos'),kind:s?.type||'Document'};});
  const more=[
    ['CIE · 1997','CIE 126-1997 · Guidelines for minimizing sky glow','https://www.cie.co.at/publications/guidelines-minimizing-sky-glow','Recommendations for minimising skyglow.','CIE'],
    ['CIE · 2017','CIE 150:2017 · Guide on the Limitation of the Effects of Obtrusive Light','https://www.cie.co.at/publications/guide-limitation-effects-obtrusive-light-outdoor-lighting-installations-2nd-edition','Light trespass and adverse effects of outdoor lighting.','CIE'],
    ['CIE · 2019','CIE 234:2019 (ES) · Guía para un plan director de iluminación urbana','https://www.cie.co.at/publications/gu-para-un-plan-director-de-iluminaci-n-urbana','Urban lighting planning guidance.','CIE'],
    ['CIE · 2025','CIE PS 003:2025 · Position Statement on Obtrusive Light and Light Pollution','https://cie.co.at/publications/cie-ps-0032025-cie-position-statement-obtrusive-light-and-light-pollution-1st-edition','CIE position statement on light pollution.','CIE'],
    ['CIE · 2026','CIE 258:2026 · Adaptive Road Lighting','https://www.cie.co.at/publications/adaptive-road-lighting','Adaptive road lighting and reduction strategies.','CIE'],
    ['Salvador Bará y Raul C. Lima · 2018','Photons without borders: quantifying light pollution transfer between territories','https://doi.org/10.26607/ijsl.v20i2.87','Cross-border propagation of artificial light.','Ciencia'],
    ['Fabio Falchi y Salvador Bará · 2020','A linear systems approach to protect the night sky: implications for current and future regulations','https://doi.org/10.1098/rsos.201501','Models and limits for light emissions.','Ciencia'],
    ['Salvador Bará et al. · 2021','Can we illuminate our cities and (still) see the stars?','https://doi.org/10.26607/ijsl.v23i2.113','Options for reconciling urban lighting with dark skies.','Ciencia'],
    ['Martin Morgan-Taylor · 2023','Regulating light pollution: More than just the night sky','https://doi.org/10.1126/science.adh7723','Legal analysis of the multiple effects of artificial light.','Ciencia'],
    ['Convenio de Ginebra · 1979','Convention on Long-range Transboundary Air Pollution','https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:21979A1113(01)','Article 1: definition of air pollution.','Derecho'],
    ['Naciones Unidas · CDI (2021)','Protection of the atmosphere: draft guidelines and commentaries','https://legal.un.org/ilc/texts/8_8.shtml','Draft guidelines and commentaries on atmospheric protection.','Derecho'],
    ['Unión Europea · 2024','Reglamento (UE) 2024/1991 sobre restauración de la naturaleza','https://eur-lex.europa.eu/eli/reg/2024/1991/oj','Reference to artificial-light mitigation in Annex VII.','Derecho'],
    ['Comisión Europea · JRC (2019)','Green Public Procurement Criteria for Road Lighting and Traffic Signals','https://publications.jrc.ec.europa.eu/repository/handle/JRC115406','Voluntary procurement criteria for outdoor lighting.','Derecho'],
    ['Comisión Europea · 2023','Light pollution: Mitigation measures for environmental protection','https://data.europa.eu/doi/10.2779/906521','Environmental technical report for the European Union.','Derecho']
  ].map((r,i)=>({name:r[0],title:r[1],url:r[2],topic:r[3],category:r[4],kind:'Reference',id:'E'+String(i+1).padStart(2,'0')}));
  const entries=more.concat(core),names={CIE:'CIE · Technical documents and position statements',Ciencia:'Scientific and legal articles',Derecho:'International law and public policy',Recursos:'Compilations and catalogues'};
  function clean(s){return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('en')}
  function draw(){
    const search=clean(el('referenceSearch').value),cat=el('referenceCategory').value;
    const filtered=entries.filter(r=>(cat==='todos'||r.category===cat)&&(!search||clean(r.name+' '+r.title+' '+r.topic).includes(search)));
    el('referenceCount').textContent=filtered.length+' of '+entries.length+' references';
    el('scienceGrid').innerHTML=Object.keys(names).map(group=>{
      const groupItems=filtered.filter(r=>r.category===group);
      if(!groupItems.length)return '';
      return '<section class="bibliography-group"><h3 class="bibliography-group-title">'+esc(names[group])+' <span>'+groupItems.length+'</span></h3><ol class="bibliography-list">'+groupItems.map(r=>
        '<li class="bibliography-entry"><div class="bibliography-detail"><span class="bibliography-author">'+esc(r.name)+'</span><h4><a class="bibliography-title" href="'+esc(r.url)+'" target="_blank" rel="noopener noreferrer">'+esc(r.title)+' ↗</a></h4><p>'+esc(r.topic)+'</p><div class="bibliography-meta">'+esc(r.kind)+' · '+esc(r.id)+'</div></div></li>'
      ).join('')+'</ol></section>';
    }).join('')||'<p class="no-results">No references match your search.</p>';
  }
  el('referenceSearch').addEventListener('input',draw);
  el('referenceCategory').addEventListener('change',draw);
  draw();
})();
})();


// Capas jurídicas territoriales y transversales: fuentes vinculadas y rangos diferenciados.
(() => {
  const D=window.ATLAS_DATA; if(!D?.italy_regions||!D?.austria_regions||!D?.transversal_law||!D?.iucn_documents)return;
  const g=id=>document.getElementById(id);
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'" :'&#39;'}[c]));
  const source=new Map(D.sources.map(s=>[s.id,s]));
  const links=ids=>(ids||[]).map(id=>{const s=source.get(id);return s&&/^https?:\/\//.test(s.url)?'<a href="'+esc(s.url)+'" target="_blank" rel="noopener noreferrer" title="'+esc(s.title)+'">'+esc(id)+' ↗</a>':'';}).filter(Boolean).join(' ');
  const rows=[...D.italy_regions.map(x=>({...x,country:'ITA'})),...D.austria_regions.map(x=>({...x,country:'AUT'}))];
  const norm=v=>String(v??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const types={verificada:'Legal text identified',historica:'Historical version / verify current force',sectorial:'Sector-specific instrument or guidance',pendiente:'Verification pending'};
  const drawRegions=()=>{const filter=g('europeRegionCountry').value,q=norm(g('europeRegionSearch').value);
    const filtered=rows.filter(r=>(filter==='todos'||r.country===filter)&&(!q||norm([r.name,r.instrument,r.detail].join(' ')).includes(q)));
    g('europeRegionCount').textContent=filtered.length+' of '+rows.length+' territories';
    g('europeRegionRows').innerHTML=filtered.map(r=>'<tr><td><strong>'+esc(r.name)+'</strong><small>'+esc(r.country==='ITA'?'Italy':'Austria')+'</small></td><td>'+esc(r.instrument)+'<small>'+esc(types[r.status]||r.status)+'</small></td><td>'+esc(r.detail)+'</td><td class="euro-ref-links">'+(links(r.source_ids)||'<span>Not yet documented</span>')+'</td></tr>').join('')||'<tr><td colspan="4">No results found.</td></tr>';
  };
  g('europeRegionCountry').addEventListener('change',drawRegions);g('europeRegionSearch').addEventListener('input',drawRegions);drawRegions();
  g('uicnGrid').innerHTML=D.iucn_documents.map(r=>'<article class="legal-research-card"><span class="tiny">UICN · '+esc(r.year)+' · '+esc(r.kind)+'</span><h3>'+esc(r.title)+'</h3><p>'+esc(r.summary)+'</p><p class="small-caution">'+esc(r.legal)+'</p><div class="euro-ref-links">'+links(r.source_ids)+'</div></article>').join('');
  g('transversalRows').innerHTML=D.transversal_law.map(r=>'<tr><td><strong>'+esc(r.jurisdiction)+'</strong><small>'+esc(r.domain)+'</small></td><td>'+esc(r.instrument)+'</td><td>'+esc(r.application)+'</td><td class="caution-cell">'+esc(r.caution)+'</td><td class="euro-ref-links">'+links(r.source_ids)+'</td></tr>').join('');
})();

/* Inventario de la Unión Europea, clasificado por fuerza jurídica. */
(() => {
  const d=window.ATLAS_DATA;if(!d?.eu_framework)return;
  const e=id=>document.getElementById(id),byId=new Map(d.sources.map(s=>[s.id,s]));
  const esc=v=>String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const n=v=>String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const labels={vinculante:'Binding law / precedent',facultativo:'Optional measure',internacional:'Convention / guidance',tecnico:'Technical standard / GPP',investigacion:'Research and networks'};
  function draw() {
    const q=n(e('euSearch').value),cat=e('euCategory').value;
    const rows=d.eu_framework.filter(x=>(cat==='todos'||x.group===cat)&&(!q||n([x.title,x.effect,x.caution,x.group].join(' ')).includes(q)));
    e('euCount').textContent=rows.length+' of '+d.eu_framework.length+' instruments';
    e('euRows').innerHTML=rows.map(r=>'<tr><td><strong>'+esc(r.title)+'</strong><small>'+esc(labels[r.group]||r.group)+'</small></td><td>'+esc(r.effect)+'</td><td class="caution-cell">'+esc(r.caution)+'</td><td class="euro-ref-links">'+r.source_ids.map(id=>{const s=byId.get(id);return s?'<a href="'+esc(s.url)+'" rel="noopener noreferrer" target="_blank" title="'+esc(s.title)+'">'+esc(s.title)+' ↗</a>':'';}).join('<div class="eu-ref-break"></div>')+'</td></tr>').join('')||'<tr><td colspan="4">No matches.</td></tr>';
  }
  e('euSearch').addEventListener('input',draw);e('euCategory').addEventListener('change',draw);draw();
})();
