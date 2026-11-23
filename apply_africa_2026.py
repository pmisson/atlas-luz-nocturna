#!/usr/bin/env python3
"""Aplica los registros nuevos de África después de regenerar el catálogo base.

Ejecutar tras build_data.py y apply_asia_2026.py, si se reconstruye de cero.
Se conservan las clasificaciones originales de otros países.
"""
import csv, json
from pathlib import Path
root=Path(__file__).resolve().parent
p=root/"data"/"atlas.json"
d=json.loads(p.read_text(encoding="utf8"))
add=json.loads((root/"data"/"africa_2026_additions.json").read_text(encoding="utf8"))
seen_c={c["iso"] for c in d["countries"]}
seen_s={s["id"] for s in d["sources"]}
for c in add["countries"]:
    if c["iso"] not in seen_c:d["countries"].append(c)
for s in add["sources"]:
    if s["id"] not in seen_s:d["sources"].append(s)
d["meta"]["country_count"]=len(d["countries"])
d["meta"]["source_count"]=len(d["sources"])
p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
(root/"assets"/"atlas-data.js").write_text(
    "window.ATLAS_DATA="+json.dumps(d,ensure_ascii=False,separators=(",",":"))+";\n",encoding="utf8")
for filename,entries,fields in (
 ("paises.csv",d["countries"],["iso","name","region","level","summary","scope","confidence","note","keywords","source_ids","star_ids"]),
 ("fuentes.csv",d["sources"],["id","country","title","url","type","effect","note","year","official"])
):
    with (root/"data"/filename).open("w",encoding="utf-8-sig",newline="") as f:
        w=csv.DictWriter(f,fieldnames=fields,extrasaction="ignore");w.writeheader()
        for row in entries:
            w.writerow({key:"; ".join(row[key]) if isinstance(row.get(key),list) else row.get(key,"") for key in fields})
print("Total",len(d["countries"]),"África",sum(c["region"]=="África" for c in d["countries"]),
      "Fuentes",len(d["sources"]))
