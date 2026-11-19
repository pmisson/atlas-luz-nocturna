/* Legal layers: Spain (autonomous communities), international law, academic references. */
(() => {
'use strict';
const D = window.ATLAS_DATA;
if (!D?.spain_regions || !D?.international || !D?.bibliography) return;
const el=id=>document.getElementById(id);
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const byId=new Map(D.sources.map(s=>[s.id,s]));
const label={especifica:'Ley o reglamento espec\u00edfico',sectorial:'Marco legal sectorial',pendiente:'Revisi\u00f3n pendiente'};
let region='IB';
const chip=id=>{const s=byId.get(id);return s?`<a class="reference-chip" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(id)} \u00b7 ${esc(s.official?'Fuente institucional':'Referencia secundaria')} \u2197</a>`:''};
function drawRegions(){
 const q=el('spainSearch').value.trim().toLocaleLowerCase('es'),cat=el('spainLevel').value;
 const matches=D.spain_regions.filter(r=>(cat==='todos'||cat===r.level)&&(!q||[r.name,r.summary,r.caution].some(v=>v.toLocaleLowerCase('es').includes(q))));
 el('spainCount').textContent=matches.length+' territorios';
 el('spainRows').innerHTML=matches.map(r=>`<tr class="${r.id===region?'active-region':''}"><td><b>${esc(r.name)}</b></td><td><span class="region-tag ${esc(r.level)}">${esc(label[r.level]||r.level)}</span></td><td>${esc(r.summary)}</td><td><button class="row-view" data-region="${esc(r.id)}" type="button">Ver normas \u2197</button></td></tr>`).join('')||'<tr><td colspan="4">No hay resultados.</td></tr>';
}
function selectRegion(id){
 const r=D.spain_regions.find(x=>x.id===id);if(!r)return;region=id;drawRegions();
 el('spainDetail').innerHTML=`<div class="tiny">FICHA AUTONOMICA / ${esc(r.id)}</div><h3>${esc(r.name)}</h3><span class="region-tag ${esc(r.level)}">${esc(label[r.level]||r.level)}</span><p>${esc(r.summary)}</p><p class="detail-label">CAUTELAS</p><p class="detail-caution">${esc(r.caution)}</p><p class="detail-label">FUENTES</p><div class="region-refs">${r.source_ids.map(id=>{const s=byId.get(id);return s?`<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer"><b>${esc(id)}</b> ${esc(s.title)}<small>${s.official?'Instituci\u00f3n / bolet\u00edn oficial':'Repertorio secundario / revisar'}</small></a>`:''}).join('')}</div><p class="region-note">Corte: ${esc(r.reviewed)}. Revisar disposiciones transitorias y ordenanzas locales.</p>`;
}
el('spainRows').addEventListener('click',e=>{const b=e.target.closest('button[data-region]');if(b){selectRegion(b.dataset.region);el('spainDetail').scrollIntoView({behavior:'smooth',block:'nearest'});}});
el('spainSearch').addEventListener('input',drawRegions);
el('spainLevel').addEventListener('change',drawRegions);
selectRegion(region);
el('intlGrid').innerHTML=D.international.map((r,i)=>`<article class="legal-research-card"><span class="tiny">DERECHO INTERNACIONAL / ${String(i+1).padStart(2,'0')}</span><h3>${esc(r.title)}</h3><p class="card-subtitle">${esc(r.subtitle)}</p><span class="legality-status">${esc(r.status)}</span><p>${esc(r.detail)}</p><div class="chip-line">${r.source_ids.map(chip).join('')}</div></article>`).join('');
(function renderEssentialBibliography(){
  const core=(D.bibliography||[]).map(r=>{const s=byId.get(r.source_id);return {name:r.name.replace('Bara','Bará'),title:r.title,topic:r.topic,url:s?.url||'',id:r.source_id,category:/F11[4-8]/.test(r.source_id)?'Ciencia':'Recursos',kind:s?.type||'Documento'};});
  const more=[
    ['CIE · 1997','CIE 126-1997 · Guidelines for minimizing sky glow','https://www.cie.co.at/publications/guidelines-minimizing-sky-glow','Recomendaciones para minimizar resplandor celeste.','CIE'],
    ['CIE · 2017','CIE 150:2017 · Guide on the Limitation of the Effects of Obtrusive Light','https://www.cie.co.at/publications/guide-limitation-effects-obtrusive-light-outdoor-lighting-installations-2nd-edition','Luz intrusa y efectos no deseados del alumbrado exterior.','CIE'],
    ['CIE · 2019','CIE 234:2019 (ES) · Guía para un plan director de iluminación urbana','https://www.cie.co.at/publications/gu-para-un-plan-director-de-iluminaci-n-urbana','Guía de planificación de iluminación urbana.','CIE'],
    ['CIE · 2025','CIE PS 003:2025 · Position Statement on Obtrusive Light and Light Pollution','https://cie.co.at/publications/cie-ps-0032025-cie-position-statement-obtrusive-light-and-light-pollution-1st-edition','Declaración de posición CIE sobre contaminación lumínica.','CIE'],
    ['CIE · 2026','CIE 258:2026 · Adaptive Road Lighting','https://www.cie.co.at/publications/adaptive-road-lighting','Iluminación viaria adaptativa y estrategias de reducción.','CIE'],
    ['Salvador Bará y Raul C. Lima · 2018','Photons without borders: quantifying light pollution transfer between territories','https://doi.org/10.26607/ijsl.v20i2.87','Propagación transfronteriza de luz artificial.','Ciencia'],
    ['Fabio Falchi y Salvador Bará · 2020','A linear systems approach to protect the night sky: implications for current and future regulations','https://doi.org/10.1098/rsos.201501','Modelos y límites de emisiones de luz.','Ciencia'],
    ['Salvador Bará et al. · 2021','Can we illuminate our cities and (still) see the stars?','https://doi.org/10.26607/ijsl.v23i2.113','Alternativas para compatibilizar iluminación urbana y cielo oscuro.','Ciencia'],
    ['Martin Morgan-Taylor · 2023','Regulating light pollution: More than just the night sky','https://doi.org/10.1126/science.adh7723','Análisis jurídico de los múltiples efectos de la luz artificial.','Ciencia'],
    ['Convenio de Ginebra · 1979','Convention on Long-range Transboundary Air Pollution','https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:21979A1113(01)','Artículo 1: definición de contaminación atmosférica.','Derecho'],
    ['Naciones Unidas · CDI (2021)','Protection of the atmosphere: draft guidelines and commentaries','https://legal.un.org/ilc/texts/8_8.shtml','Directrices y comentarios sobre protección de la atmósfera.','Derecho'],
    ['Unión Europea · 2024','Reglamento (UE) 2024/1991 sobre restauración de la naturaleza','https://eur-lex.europa.eu/eli/reg/2024/1991/oj','Referencia a mitigación de luz artificial en el anexo VII.','Derecho'],
    ['Comisión Europea · JRC (2019)','Green Public Procurement Criteria for Road Lighting and Traffic Signals','https://publications.jrc.ec.europa.eu/repository/handle/JRC115406','Criterios voluntarios de contratación de alumbrado exterior.','Derecho'],
    ['Comisión Europea · 2023','Light pollution: Mitigation measures for environmental protection','https://data.europa.eu/doi/10.2779/906521','Informe técnico ambiental para la Unión Europea.','Derecho']
  ].map((r,i)=>({name:r[0],title:r[1],url:r[2],topic:r[3],category:r[4],kind:'Referencia',id:'E'+String(i+1).padStart(2,'0')}));
  const entries=more.concat(core),names={CIE:'CIE · Documentos técnicos y posicionamientos',Ciencia:'Artículos científicos y análisis jurídicos',Derecho:'Derecho internacional y políticas públicas',Recursos:'Compilaciones y repertorios'};
  function clean(s){return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('es')}
  function draw(){
    const search=clean(el('referenceSearch').value),cat=el('referenceCategory').value;
    const filtered=entries.filter(r=>(cat==='todos'||r.category===cat)&&(!search||clean(r.name+' '+r.title+' '+r.topic).includes(search)));
    el('referenceCount').textContent=filtered.length+' de '+entries.length+' referencias';
    el('scienceGrid').innerHTML=Object.keys(names).map(group=>{
      const groupItems=filtered.filter(r=>r.category===group);
      if(!groupItems.length)return '';
      return '<section class="bibliography-group"><h3 class="bibliography-group-title">'+esc(names[group])+' <span>'+groupItems.length+'</span></h3><ol class="bibliography-list">'+groupItems.map(r=>
        '<li class="bibliography-entry"><div class="bibliography-detail"><span class="bibliography-author">'+esc(r.name)+'</span><h4><a class="bibliography-title" href="'+esc(r.url)+'" target="_blank" rel="noopener noreferrer">'+esc(r.title)+' ↗</a></h4><p>'+esc(r.topic)+'</p><div class="bibliography-meta">'+esc(r.kind)+' · '+esc(r.id)+'</div></div></li>'
      ).join('')+'</ol></section>';
    }).join('')||'<p class="no-results">No hay referencias que coincidan con la búsqueda.</p>';
  }
  el('referenceSearch').addEventListener('input',draw);
  el('referenceCategory').addEventListener('change',draw);
  draw();
})();
})();
