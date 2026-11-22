#!/usr/bin/env python3
import json,pathlib,re,csv
from html.parser import HTMLParser
root=pathlib.Path(__file__).parents[1]
a=json.loads((root/'data'/'atlas.json').read_text('utf8'))
assert len(a['countries'])==51
assert len(a['sources'])==213
assert len(a['stars'])==61
assert len({c['iso'] for c in a['countries']})==51
assert len({s['id'] for s in a['sources']})==len(a['sources'])
assert len({m['id'] for m in a['stars']})==len(a['stars'])
assert all(len(c['source_ids'])>0 for c in a['countries'])
source_ids={s['id'] for s in a['sources']}; country_ids={c['iso'] for c in a['countries']}
assert all(s['country'] in country_ids | {'INT','REF'} for s in a['sources'])
assert all(m['country'] in country_ids | {'INT'} and set(m['sources'])<=source_ids for m in a['stars'])
assert all(set(c['source_ids'])<=source_ids for c in a['countries'])
assert len(list((root/'docs').glob('*.md')))==60
assert len(a['spain_regions'])==19
assert len({r['id'] for r in a['spain_regions']})==19
assert all(set(r['source_ids'])<=source_ids for r in a['spain_regions'])
assert len(a['international'])==7
assert all(set(r['source_ids'])<=source_ids for r in a['international'])
assert len(a['bibliography'])==13
assert len(a['italy_regions'])==22
assert len(a['austria_regions'])==9
assert len(next(c for c in a['countries'] if c['iso']=='AUT')['star_ids'])==5
assert any('Luftfahrtgesetz §123a' in s['title'] for s in a['sources'])
assert len(a['iucn_documents'])==4
assert len(a['eu_framework'])==22
assert all(set(x['source_ids'])<=source_ids for x in a['eu_framework'])
assert len(a['transversal_law'])==20
assert all(set(x['source_ids'])<=source_ids for field in ('italy_regions','austria_regions','iucn_documents','transversal_law') for x in a[field])
assert len(next(c for c in a['countries'] if c['iso']=='VEN')['star_ids'])==3
assert all(any(s['id']==x for s in a['sources']) for x in next(c for c in a['countries'] if c['iso']=='VEN')['source_ids'])
assert all(r['source_id'] in source_ids for r in a['bibliography'])
world=json.loads((root/'data'/'world_simplified.geojson').read_text())
assert world['type']=='FeatureCollection'
assert len(world['features'])>=170
iso_map={x['properties']['iso'] for x in world['features']}
assert country_ids-iso_map=={'SGP','MLT'}
for f in ['index.html','assets/styles.css','assets/app.js','assets/world-data.js','assets/atlas-data.js','assets/extras.js','INFORME_MAESTRO.md','data/paises.csv','data/fuentes.csv','data/medidas_estrella.csv','data/autonomias_espana.csv','data/bibliografia_cientifica.csv','data/marco_internacional.csv','docs/ESP_COMUNIDADES.md','docs/DERECHO_INTERNACIONAL.md','docs/BIBLIOGRAFIA_JURIDICA_Y_CIENTIFICA.md','docs/ITA_REGIONES.md','docs/AUT_LANDER.md','docs/UICN_DECLARACIONES.md','docs/MARCO_TRANSVERSAL.md','docs/UE_MARCO_NORMATIVO.md','docs/UE_NORMAS_TECNICAS.md','data/marco_europeo.csv','data/regiones_italia.csv','data/lander_austria.csv','data/uicn_declaraciones.csv','data/marco_transversal.csv']:
    assert (root/f).is_file(), f
# HTML sources and assets, relative link targets; exclude external and section links.
class P(HTMLParser):
 def __init__(self):super().__init__();self.urls=[]
 def handle_starttag(self,tag,attrs):
  if tag in ('a','script','link'):
   d=dict(attrs); u=d.get('href') or d.get('src')
   if u and not re.match(r'^(https?:|#|mailto:|data:)',u):self.urls.append(u)
p=P();p.feed((root/'index.html').read_text())
for u in p.urls: assert (root/u).exists(), u
assert 'window.WORLD_GEO=' in (root/'assets/world-data.js').read_text()
assert 'window.ATLAS_DATA=' in (root/'assets/atlas-data.js').read_text()
print(f"OK: {len(a['countries'])} países · {len(a['sources'])} referencias · {len(a['stars'])} medidas · 19 territorios espanoles · 58 fichas · {len(world['features'])} polígonos · {len(p.urls)} recursos HTML locales")
