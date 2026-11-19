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
el('scienceGrid').innerHTML=D.bibliography.map(r=>`<article class="publication-row"><div><span class="tiny">${esc(r.name)}</span><h3>${esc(r.title)}</h3><p>${esc(r.topic)}</p></div><div>${chip(r.source_id)}</div></article>`).join('');
})();
