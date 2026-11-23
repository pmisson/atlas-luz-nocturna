#!/usr/bin/env python3
"""Aplica la ampliación asiática de noviembre de 2026 a los datos generados.

Uso: python3 apply_asia_2026.py
Ejecutar después de build_data.py para conservar la ampliación.
"""
import csv, json
from pathlib import Path
root=Path(__file__).resolve().parent
path=root/"data"/"atlas.json"
d=json.loads(path.read_text(encoding="utf8"))
add=json.loads((root/"data"/"asia_2026_additions.json").read_text(encoding="utf8"))
used_c={c["iso"] for c in d["countries"]}
used_s={s["id"] for s in d["sources"]}
for c in add["countries"]:
    if c["iso"] not in used_c:
        d["countries"].append(c)
for s in add["sources"]:
    if s["id"] not in used_s:
        d["sources"].append(s)
d["meta"]["country_count"]=len(d["countries"])
d["meta"]["source_count"]=len(d["sources"])
path.write_text(json.dumps(d,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
(root/"assets"/"atlas-data.js").write_text("window.ATLAS_DATA="+json.dumps(d,ensure_ascii=False,separators=(",",":"))+";\n",encoding="utf8")
for filename,records,fields in (
 ("paises.csv",d["countries"],["iso","name","region","level","summary","scope","confidence","note","keywords","source_ids","star_ids"]),
 ("fuentes.csv",d["sources"],["id","country","title","url","type","effect","note","year","official"])
):
    with (root/"data"/filename).open("w",encoding="utf-8-sig",newline="") as f:
        writer=csv.DictWriter(f,fieldnames=fields,extrasaction="ignore")
        writer.writeheader()
        for rec in records:
            writer.writerow({k:"; ".join(rec[k]) if isinstance(rec.get(k),list) else rec.get(k,"") for k in fields})
print("Asia:",sum(c["region"]=="Asia" for c in d["countries"]),
      "Total:",len(d["countries"]),"Referencias:",len(d["sources"]))
