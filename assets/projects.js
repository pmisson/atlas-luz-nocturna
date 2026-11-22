/* Progressive enhancement: HTML contains all the content by default. */
(()=>{"use strict";
const get=id=>document.getElementById(id);
function normalize(s){return String(s??"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();}
const rows=[...document.querySelectorAll("#euProjectGrid .eu-project-card")];
function filter(){
 const q=normalize(get("projectSearch").value.trim()),program=get("projectProgramme").value,status=get("projectStatus").value,relevance=get("projectRelevance").value;
 let n=0;
 for(const node of rows){const match=(!q||node.dataset.projectSearch.includes(q))&&(program==="todos"||node.dataset.projectProgramme===program)&&(status==="todos"||node.dataset.projectStatus===status)&&(relevance==="todos"||node.dataset.projectRelevance===relevance);
 node.hidden=!match;if(match)n++;}
 get("projectCount").textContent=n+" de "+rows.length+" entradas";get("projectNoResults").hidden=n>0;
}
for(const [id,event] of [["projectSearch","input"],["projectProgramme","change"],["projectStatus","change"],["projectRelevance","change"]])get(id)?.addEventListener(event,filter);
filter();
})();
