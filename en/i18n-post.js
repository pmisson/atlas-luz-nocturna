/* English edition: post-render labels for shared regional and project components. */
(()=>{"use strict";
const map={
"España":"Spain","Europa":"Europe","América":"Americas","África":"Africa","Oceanía":"Oceania",
"Buscar región, norma o concepto…":"Search region, statute or topic…",
"Buscar comunidad, norma o tema…":"Search region, law or topic…",
"Buscar proyecto, temática o entidad…":"Search project, subject or organisation…",
"Todos los programas":"All programmes","Todos los estados":"All statuses",
"Todos los países":"All countries","Todas las categorías":"All categories",
"Todos los tipos":"All types","Todos los niveles":"All levels",
"En curso":"Ongoing","Finalizado":"Completed","Finalizados":"Completed",
"Objetivo directo":"Direct focus","Tema secundario":"Related topic",
"Relación con ALAN":"Relationship to ALAN","Proyecto financiado":"Funded project",
"Ficha CORDIS":"CORDIS record","Presupuesto total:":"Total budget:",
"Identificador:":"Identifier:","Estado:":"Status:","Verificada":"Verified",
"Pendiente":"Pending","Revisar":"Review","Sin coincidencias.":"No matches.",
"Documento":"Document","Fuentes":"Sources","Categoría":"Category",
"Selecciona":"Select","Buscar":"Search","Se han encontrado":"Found",
"Investigación científica":"Scientific research",
"Norma vinculante":"Binding instrument","Directrices":"Guidance",
"Fuente oficial":"Official source","Ir al inicio":"Back to top",
"Descargar":"Download","Vigente":"In force","Pendiente de verificar":"Verification pending",
"Todas las referencias":"All references","Todos los ámbitos":"All scopes"
};
const translateText=(root)=>{
 const iter=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
 const nodes=[];while(iter.nextNode())nodes.push(iter.currentNode);
 for(const node of nodes){
  if(node.parentElement?.closest("script,style,code,pre"))continue;
  const t=node.nodeValue,trim=t.trim();
  if(map[trim])node.nodeValue=t.replace(trim,map[trim]);
  else if(/^\d+ entradas$/.test(trim))node.nodeValue=t.replace("entradas","entries");
  else if(/^\d+ de \d+ entradas$/.test(trim))node.nodeValue=t.replace(" de "," of ").replace("entradas","entries");
 }
};
translateText(document.body);
for(const el of document.querySelectorAll("input[placeholder]")){
 const old=el.getAttribute("placeholder");
 for(const [from,to] of Object.entries(map))if(old.includes(from))el.setAttribute("placeholder",old.replace(from,to));
}
const observer=new MutationObserver(mutations=>{
 const roots=new Set();for(const m of mutations){if(m.type==="childList")for(const node of m.addedNodes){if(node.nodeType===1)roots.add(node);else if(node.nodeType===3&&node.parentElement)roots.add(node.parentElement);}}
 for(const node of roots)translateText(node);
});
observer.observe(document.body,{childList:true,subtree:true});
})();