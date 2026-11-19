#!/usr/bin/env python3
"""Exporta catálogos legales a RIS y CSL-JSON para Zotero, Mendeley o BibTeX."""
import json,pathlib,re
root=pathlib.Path(__file__).parent
data=json.loads((root/'data/atlas.json').read_text('utf8'))
cs=[];ris=[];bib=[]
for s in data['sources']:
    country=next(c['name'] for c in data['countries'] if c['iso']==s['country'])
    typ=('legislation' if any(w in s['type'].lower() for w in ('ley','reglamento','decreto','código','ordenanza','norma oficial')) else 'webpage')
    r={'id':s['id'],'type':typ,'title':s['title'],'URL':s['url'],'note':f"País: {country}; alcance: {s['effect']}; naturaleza: {s['type']}; {s['note']}",'language':'es'}
    if s['year'] and re.fullmatch(r'\d{4}',s['year']): r['issued']={'date-parts':[[int(s['year'])]]}
    cs.append(r)
    ris+=['TY  - '+('STAT' if typ=='legislation' else 'ELEC'),f'ID  - {s["id"]}',f'T1  - {s["title"]}',f'UR  - {s["url"]}',f'CY  - {country}',f'N1  - {s["type"]}. {s["effect"]}. {s["note"]}']
    if 'issued' in r:ris.append('PY  - '+s['year'])
    ris+=['ER  - ','']
    clean=lambda t:t.replace('\\','\\textbackslash ').replace('{','\\{').replace('}','\\}').replace('%','\\%').replace('&','\\&')
    yr=s['year'] or 'n.d.'
    bib.append('@misc{'+s['id']+',\n  title = {'+clean(s['title'])+'},\n  howpublished = {\\url{'+s['url']+'}},\n  year = {'+yr+'},\n  note = {'+clean(country+'. '+s['type']+'. '+s['effect'])+'}\n}\n')
(root/'data'/'referencias.csl.json').write_text(json.dumps(cs,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
(root/'data'/'referencias.ris').write_text('\n'.join(ris)+'\n',encoding='utf8')
(root/'data'/'referencias.bib').write_text('\n'.join(bib)+'\n',encoding='utf8')
print('CSL, RIS, BibTeX',len(cs))
