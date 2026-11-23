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

const additionalTranslations={
  "FICHA AUTONOMICA": "REGIONAL RECORD",
  "CAUTELAS": "CAVEATS",
  "FUENTES": "SOURCES",
  "DERECHO INTERNACIONAL": "INTERNATIONAL LAW",
  "Ley o reglamento específico": "Dedicated law or regulation",
  "Marco legal sectorial": "Sector-specific legal framework",
  "Revisión pendiente": "Review pending",
  "Fuente institucional": "Institutional source",
  "Referencia secundaria": "Secondary reference",
  "Ver normas ↗": "View laws ↗",
  "Ver normas": "View laws",
  "No hay resultados.": "No results.",
  "Institución / boletín oficial": "Institution / official gazette",
  "Repertorio secundario / revisar": "Secondary catalogue / verify",
  "Texto normativo identificado": "Legal text identified",
  "Versión histórica / cotejar vigencia": "Historical version / verify current validity",
  "Instrumento sectorial o guía": "Sector-specific instrument or guidance",
  "Verificación pendiente": "Verification pending",
  "Por documentar": "Not yet documented",
  "No se han encontrado resultados.": "No results found.",
  "Sin coincidencias.": "No matches.",
  "Norma/precedente vinculante": "Binding law / precedent",
  "Medida facultativa": "Optional measure",
  "Convenio / orientación": "Convention / guidance",
  "Norma técnica / GPP": "Technical standard / GPP",
  "Investigación y redes": "Research and networks",
  "Documentos técnicos y posicionamientos": "Technical documents and position statements",
  "Artículos científicos y análisis jurídicos": "Scientific articles and legal analysis",
  "Derecho internacional y políticas públicas": "International law and public policy",
  "Compilaciones y repertorios": "Compilations and catalogues",
  "Recomendaciones para minimizar resplandor celeste.": "Recommendations for minimising skyglow.",
  "Luz intrusa y efectos no deseados del alumbrado exterior.": "Light trespass and adverse effects of outdoor lighting.",
  "Guía de planificación de iluminación urbana.": "Guidance on urban lighting planning.",
  "Declaración de posición CIE sobre contaminación lumínica.": "CIE position statement on light pollution.",
  "Iluminación viaria adaptativa y estrategias de reducción.": "Adaptive road lighting and reduction strategies.",
  "Propagación transfronteriza de luz artificial.": "Cross-border propagation of artificial light.",
  "Modelos y límites de emisiones de luz.": "Models and limits for light emissions.",
  "Alternativas para compatibilizar iluminación urbana y cielo oscuro.": "Options for reconciling urban lighting with dark skies.",
  "Análisis jurídico de los múltiples efectos de la luz artificial.": "Legal analysis of the multiple impacts of artificial light.",
  "Artículo 1: definición de contaminación atmosférica.": "Article 1: definition of air pollution.",
  "Directrices y comentarios sobre protección de la atmósfera.": "Draft guidelines and commentaries on atmospheric protection.",
  "Referencia a mitigación de luz artificial en el anexo VII.": "Reference to artificial-light mitigation in Annex VII.",
  "Criterios voluntarios de contratación de alumbrado exterior.": "Voluntary procurement criteria for outdoor lighting.",
  "Informe técnico ambiental para la Unión Europea.": "Environmental technical report for the European Union.",
  "Convenio de Ginebra": "Geneva Convention",
  "Naciones Unidas": "United Nations",
  "Comisión Europea": "European Commission",
  "Unión Europea": "European Union",
  "Revisar disposiciones transitorias y ordenanzas locales.": "Check transitional provisions and local ordinances.",
  "No hay referencias que coincidan con la búsqueda.": "No references match the search.",
  "No se han encontrado proyectos para estos filtros.": "No projects match these filters.",
  "Proyecto financiado · Direct focus": "Funded project · Direct focus",
  "Proyecto financiado · Related": "Funded project · Related",
  "Presupuesto UE:": "EU funding:",
  "Aportación UE:": "EU contribution:",
  "Financiación UE:": "EU funding:",
  "Financiación:": "Funding:",
  "Duración:": "Duration:",
  "Período:": "Period:",
  "Coordinador:": "Coordinator:",
  "País coordinador:": "Coordinating country:",
  "No disponible": "Not available",
  "Sin datos": "No data",
  "Proyecto financiado": "Funded project",
  "Red institucional": "Institutional network",
  "Piloto asociado": "Associated pilot",
  "Ficha oficial": "Official record",
  "Ficha histórica": "Historical record",
  "Total de proyectos": "Total projects",
  "Proyectos financiados": "Funded projects",
  "Punto de partida": "Starting point",
  "Resultados": "Results",
  "España": "Spain",
  "Italia": "Italy",
  "Austria": "Austria",
  "País": "Country",
  "Región": "Region",
  "Territorio": "Territory",
  "Resumen": "Summary",
  "Revisión": "Review",
  "Vigencia": "Legal validity",
  "Fuentes oficiales": "Official sources",
  "Fuentes secundarias": "Secondary sources",
  "Fuente secundaria": "Secondary source",
  "Referencias": "References",
  "Corte:": "Cut-off:",
  "En curso": "Ongoing",
  "Finalizado anticipadamente": "Terminated early",
  "Finalizado": "Completed",
  "Estado pendiente": "Status pending",
  "Por verificar": "To verify",
  "Histórica": "Historical",
  "Regulación específica": "Dedicated regulation",
  "Regulación sectorial": "Sector-specific regulation",
  "Marco general": "General framework",
  "Sin norma identificada": "No identified law",
  "Protección expresa": "Express protection",
  "Uso de luz": "Use of light",
  "Contexto": "Context"
};
Object.assign(map,additionalTranslations);
const translateText=(root)=>{
 const iter=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
 const nodes=[];while(iter.nextNode())nodes.push(iter.currentNode);
 for(const node of nodes){
  if(node.parentElement?.closest("script,style,code,pre"))continue;
  const t=node.nodeValue,trim=t.trim();
  if(map[trim])node.nodeValue=t.replace(trim,map[trim]);
  else if(/^\d+ territorios$/.test(trim))node.nodeValue=t.replace("territorios","territories");
  else if(/^\d+ de \d+ (territorios|instrumentos|referencias)$/.test(trim))node.nodeValue=t.replace(" de "," of ").replace("territorios","territories").replace("instrumentos","instruments").replace("referencias","references");
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