#!/usr/bin/env python3
import json,pathlib,re,csv
from html.parser import HTMLParser
root=pathlib.Path(__file__).parents[1]
a=json.loads((root/'data'/'atlas.json').read_text('utf8'))
assert len(a['countries'])==51
assert len(a['sources'])==79
assert len(a['stars'])==40
assert len({c['iso'] for c in a['countries']})==51
assert len({s['id'] for s in a['sources']})==len(a['sources'])
assert len({m['id'] for m in a['stars']})==len(a['stars'])
assert all(len(c['source_ids'])>0 for c in a['countries'])
source_ids={s['id'] for s in a['sources']}; country_ids={c['iso'] for c in a['countries']}
assert all(s['country'] in country_ids for s in a['sources'])
assert all(m['country'] in country_ids and set(m['sources'])<=source_ids for m in a['stars'])
assert all(set(c['source_ids'])<=source_ids for c in a['countries'])
assert len(list((root/'docs').glob('*.md')))==51
world=json.loads((root/'data'/'world_simplified.geojson').read_text())
assert world['type']=='FeatureCollection'
assert len(world['features'])>=170
iso_map={x['properties']['iso'] for x in world['features']}
assert country_ids-iso_map=={'SGP','MLT'}
for f in ['index.html','assets/styles.css','assets/app.js','assets/world-data.js','assets/atlas-data.js','INFORME_MAESTRO.md','data/paises.csv','data/fuentes.csv','data/medidas_estrella.csv']:
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
print(f"OK: {len(a['countries'])} países · {len(a['sources'])} referencias · {len(a['stars'])} medidas · 51 fichas · {len(world['features'])} polígonos · {len(p.urls)} recursos HTML locales")
