#!/usr/bin/env python3
"""Genera los datos cartográficos JS a partir del GeoJSON incluido.
Solo requiere la librería estándar. Natural Earth public domain.
"""
import json,pathlib
root=pathlib.Path(__file__).parent
geo_file=root/'data'/'world_simplified.geojson'
if not geo_file.exists():
    print('Falta',geo_file,'; se conserva assets/world-data.js existente.')
    raise SystemExit(1)
geo=json.loads(geo_file.read_text(encoding='utf8'))
def coord(pt):
    x,y=pt
    return f'{(x+180)*1200/360:.2f},{(85-y)*3.55:.2f}'
def polygon_to_svg(poly):
    return ' '.join('M'+' L'.join(coord(pt) for pt in ring)+' Z' for ring in poly if len(ring)>2)
world=[]
for f in geo['features']:
    g=f['geometry'];typ=g['type']
    if typ=='Polygon':d=polygon_to_svg(g['coordinates'])
    elif typ=='MultiPolygon':d=' '.join(polygon_to_svg(p) for p in g['coordinates'])
    else:continue
    world.append(dict(iso=f['properties']['iso'],name=f['properties']['name'],d=d))
(root/'assets'/'world-data.js').write_text('window.WORLD_GEO='+json.dumps(world,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf8')
a=json.loads((root/'data'/'atlas.json').read_text(encoding='utf8'))
(root/'assets'/'atlas-data.js').write_text('window.ATLAS_DATA='+json.dumps(a,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf8')
print('Geometrías:',len(world),'países en atlas:',len(a['countries']))
