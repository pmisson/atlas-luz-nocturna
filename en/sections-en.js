(()=>{"use strict";
const D=window.ATLAS_DATA;if(!D)return;
const E=x=>String(x??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const sourceMap=new Map(D.sources.map(s=>[s.id,s]));
const linked=ids=>(ids||[]).map(id=>sourceMap.get(id)).filter(Boolean).map(s=>'<li><a href="'+E(s.url)+'" target="_blank" rel="noopener noreferrer">'+E(s.title)+'</a></li>').join("");
const sources=ids=>'<details><summary>Original references ('+(ids||[]).length+')</summary><ul>'+linked(ids)+'</ul></details>';
const box=(heading,body,ids,meta="")=>'<article class="en-card"><div class="en-section-meta">'+E(meta)+'</div><h3>'+E(heading)+'</h3>'+body+sources(ids)+'</article>';
function show(container,items,render,limit=0){const el=document.getElementById(container);if(!el)return;const data=limit?items.slice(0,limit):items;el.innerHTML=data.map(render).join("");}
const regionName={"Andalucía":"Andalusia","Cataluña":"Catalonia","Illes Balears":"Balearic Islands","Cantabria":"Cantabria","Castilla y León":"Castile and León","Castilla-La Mancha":"Castile-La Mancha","Comunidad de Madrid":"Community of Madrid","Comunitat Valenciana":"Valencian Community","Galicia":"Galicia","Canarias":"Canary Islands","Extremadura":"Extremadura","País Vasco":"Basque Country","Navarra":"Navarre","Aragón":"Aragon","Asturias":"Asturias","La Rioja":"La Rioja","Región de Murcia":"Region of Murcia","Ceuta":"Ceuta","Melilla":"Melilla","Lombardía":"Lombardy","Véneto":"Veneto","Emilia-Romaña":"Emilia-Romagna","Toscana":"Tuscany","Piamonte":"Piedmont","Alta Austria (Oberösterreich)":"Upper Austria","Baja Austria (Niederösterreich)":"Lower Austria","Viena (Wien)":"Vienna","Estiria (Steiermark)":"Styria","Carintia (Kärnten)":"Carinthia","Tirol":"Tyrol","Salzburgo":"Salzburg","Burgenland":"Burgenland","Vorarlberg":"Vorarlberg"};
const N=n=>regionName[n]||n;
const st={verificada:"Source verified in inventory",pendiente:"Review pending",parcial:"Partial legal verification"};
show("en-spain",D.spain_regions,r=>box(N(r.name),'<p>Legal category: '+E(r.level)+'. Consult the linked regional legislation and confirm its current consolidated wording.</p><details><summary>Original Spanish research note</summary><p>'+E(r.summary)+'</p><p>'+E(r.caution)+'</p></details>',r.source_ids,"Spain · Regional framework"));
show("en-italy",D.italy_regions,r=>box(N(r.name),'<p><strong>Instrument:</strong> '+E(r.instrument)+'</p><p>'+E(st[r.status]||"Legal status requires confirmation")+'</p><details><summary>Original research detail (Spanish)</summary><p>'+E(r.detail)+'</p></details>',r.source_ids,"Italy · Regional regulation"));
show("en-austria",D.austria_regions,r=>box(N(r.name),'<p><strong>Instrument:</strong> '+E(r.instrument)+'</p><p>'+E(st[r.status]||"Legal status requires confirmation")+'</p><details><summary>Original research detail (Spanish)</summary><p>'+E(r.detail)+'</p></details>',r.source_ids,"Austria · Länder regulation"));
const euGroups={vinculante:"EU legal framework",jurisprudencia:"Case law",sectorial:"Sector-specific instrument",no_vinculante:"Non-binding guidance",politica:"Policy",investigacion:"Research / implementation"};
show("en-eu",D.eu_framework,r=>box(r.title,'<p>Instrument category: '+E(euGroups[r.group]||r.group)+'.</p><details><summary>Original legal assessment (Spanish)</summary><p>'+E(r.effect)+'</p><p>Legal caution: '+E(r.caution)+'</p></details>',r.source_ids,"European Union"));
show("en-international",D.international,r=>box(r.title,'<p>'+E(r.subtitle)+'</p><details><summary>Original analysis (Spanish)</summary><p>'+E(r.detail)+'</p><p>'+E(r.status)+'</p></details>',r.source_ids,"International legal instruments"));
show("en-iucn",D.iucn_documents,r=>box(r.title,'<p>Year: '+E(r.year)+'. '+E(r.kind)+'. An IUCN recommendation is not, by itself, a binding lighting law.</p><details><summary>Original overview (Spanish)</summary><p>'+E(r.summary)+'</p><p>'+E(r.legal)+'</p></details>',r.source_ids,"IUCN / conservation"));
show("en-transversal",D.transversal_law,r=>box(r.instrument,'<p>Jurisdiction: '+E(r.jurisdiction)+' · Legal field: '+E(r.domain)+'</p><details><summary>Original assessment (Spanish)</summary><p>'+E(r.application)+'</p><p>'+E(r.caution)+'</p></details>',r.source_ids,"Indirectly relevant law"));
show("en-bibliography",D.bibliography,r=>box(r.title,'<p>Publisher/author: '+E(r.name)+'</p><details><summary>Original research topic</summary><p>'+E(r.topic)+'</p></details>',[r.source_id],"Scientific and legal literature"));
const starNames=window.NOCTIS_EN?.names||{};
const kinds={PER:"Peru",CHL:"Chile",ESP:"Spain"};
const starCard=r=>{
const c=D.countries.find(c=>c.iso===r.country);
const n=starNames[r.country]||(c?.name)||r.country;
return box(r.title,'<p><strong>'+E(n)+'</strong> · Applicability: '+E(r.scope)+'</p><details><summary>Legal measure as recorded in Spanish</summary><p>'+E(r.description)+'</p><p>Legal force: '+E(r.force)+'</p><p>Parameter: '+E(r.param)+'</p><p>Caution: '+E(r.caution)+'</p></details>',r.sources,"Selected legal measure");
};
const starSelect=document.getElementById("en-star-country"),starSearch=document.getElementById("en-star-search");
for(const c of D.countries.filter(c=>c.star_ids?.length).sort((a,b)=>a.name.localeCompare(b.name))){const op=document.createElement("option");op.value=c.iso;op.textContent=starNames[c.iso]||c.name;starSelect.appendChild(op);}
function renderStars(){const q=starSearch.value.toLocaleLowerCase(),iso=starSelect.value;const selected=D.stars.filter(r=>(!iso||r.country===iso)&&(!q||[r.title,r.description,r.force,r.scope].some(x=>String(x||"").toLocaleLowerCase().includes(q))));document.getElementById("en-star-count").textContent=selected.length+" of "+D.stars.length+" measures";show("en-stars",selected,starCard);}
starSelect.addEventListener("change",renderStars);starSearch.addEventListener("input",renderStars);renderStars();
})();