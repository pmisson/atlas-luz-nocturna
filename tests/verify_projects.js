const fs=require('fs'),path=require('path'),assert=require('assert');
const root=path.resolve(__dirname,'..');
const json=JSON.parse(fs.readFileSync(path.join(root,'data/proyectos_europeos.json'),'utf8'));
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const page=fs.readFileSync(path.join(root,'assets/projects.js'),'utf8');
assert.equal(json.projects.length,33);
assert.equal(json.projects.filter(p=>p.type==='financiado').length,31);
assert.equal(json.audit_cordis.new_projects,10);
assert.equal(new Set(json.projects.map(x=>x.identifier)).size,json.projects.length);
assert.equal((html.match(/data-project-type=/g)||[]).length,33);
assert.equal((html.match(/data-project-relevance=/g)||[]).length,33);
assert(html.includes('id="projectRelevance"'));
assert(page.includes('node.dataset.projectRelevance===relevance'));
for(const project of json.projects){assert(html.includes('id="proyecto-'+project.id.toLowerCase()+'"'),project.id);assert(/^https:\/\//.test(project.url));}
console.log('PASS: 33 projects / 31 financed / 10 new CORDIS projects / no duplicate identifiers');
