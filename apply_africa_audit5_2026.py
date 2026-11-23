#!/usr/bin/env python3
"""Reaplica la quinta auditoría después de build_data.py y las ampliaciones.
Uso: python3 apply_africa_audit5_2026.py
"""
import csv,json
from pathlib import Path
r=Path(__file__).resolve().parent
p=r/"data"/"atlas.json"
d=json.loads(p.read_text(encoding="utf8"))
a=json.loads((r/"data"/"africa_audit5_2026.json").read_text(encoding="utf8"))
for c in a["countries"]:
    ix=next((i for i,v in enumerate(d["countries"]) if v["iso"]==c["iso"]),None)
    if ix is None:d["countries"].append(c)
    else:d["countries"][ix]=c
seen={x["id"] for x in d["sources"]}
d["sources"].extend(x for x in a["sources"] if x["id"] not in seen)
d["meta"]["country_count"]=len(d["countries"])
d["meta"]["source_count"]=len(d["sources"])
p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
(r/"assets"/"atlas-data.js").write_text("window.ATLAS_DATA="+json.dumps(d,ensure_ascii=False,separators=(",",":"))+";\n",encoding="utf8")
for name,rows,fields in (
("paises.csv",d["countries"],["iso","name","region","level","summary","scope","confidence","note","keywords","source_ids","star_ids"]),
("fuentes.csv",d["sources"],["id","country","title","url","type","effect","note","year","official"])):
    with (r/"data"/name).open("w",encoding="utf-8-sig",newline="") as f:
        w=csv.DictWriter(f,fieldnames=fields,extrasaction="ignore");w.writeheader()
        for row in rows:w.writerow({k:"; ".join(row[k]) if isinstance(row.get(k),list) else row.get(k,"") for k in fields})
print(len(d["countries"]),len(d["sources"]))
