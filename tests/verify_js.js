/* Comprobación ligera en Node: ejecuta la lógica básica sin acceso a navegador. */
const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.resolve(__dirname,'..');
const context={};
context.window={};
context.location={search:''};
context.setTimeout=setTimeout;
context.URLSearchParams=URLSearchParams;
const items=new Map();
const el=()=>({innerHTML:'',textContent:'',value:'',hidden:false,style:{},clientWidth:900,clientHeight:500,
  classList:{toggle(){},add(){},remove(){}},setAttribute(){},getAttribute(){},addEventListener(){},
  appendChild(){},scrollIntoView(){},getBoundingClientRect(){return {width:1000,height:550,left:0,top:0};}});
context.document={getElementById(id){if(!items.has(id)){const e=el();if(['regionFilter','levelFilter','starForce','sourceType'].includes(id))e.value='todos';items.set(id,e)}return items.get(id);},createElementNS(){return el();},body:{insertAdjacentHTML(){throw Error('missing data')}}};
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root,'assets/atlas-data.js'),'utf8'),context);
vm.runInContext(fs.readFileSync(path.join(root,'assets/world-data.js'),'utf8'),context);
vm.runInContext(fs.readFileSync(path.join(root,'assets/app.js'),'utf8'),context);
if(!items.get('countryDetail').innerHTML.includes('España'))throw Error('Spain detail not rendered');
if((items.get('starRows').innerHTML.match(/<tr>/g)||[]).length!==40)throw Error('Star table missing entries');
if((items.get('countryRows').innerHTML.match(/<tr>/g)||[]).length!==51)throw Error('Country rows missing');
if((items.get('sourceList').innerHTML.match(/source-item/g)||[]).length!==12)throw Error('Source listing failed');
console.log('PASS: aplicación JS inicializada, 40 filas de medidas, 51 filas país, panel España, 12 fuentes iniciales.');
