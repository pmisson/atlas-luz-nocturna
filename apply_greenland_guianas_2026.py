#!/usr/bin/env python3
"""Aplica la ampliación Groenlandia/Guayanas tras regenerar el atlas.
Usar después de build_data.py y otras ampliaciones de Asia y África.
"""
import csv,json
from pathlib import Path
root=Path(__file__).resolve().parent
data=root/"data"
d=json.loads((data/"atlas.json").read_text(encoding="utf8"))
add=json.loads((data/"greenland_guianas_2026_additions.json").read_text(encoding="utf8"))
existing_c={x["iso"] for x in d["countries"]}
existing_s={x["id"] for x in d["sources"]}
d["countries"].extend(c for c in add["countries"] if c["iso"] not in existing_c)
d["sources"].extend(x for x in add["sources"] if x["id"] not in existing_s)
d["meta"]["country_count"]=len(d["countries"])
d["meta"]["source_count"]=len(d["sources"])
(data/"atlas.json").write_text(json.dumps(d,ensure_ascii=False,indent=2)+"\n",encoding="utf8")
(root/"assets"/"atlas-data.js").write_text("window.ATLAS_DATA="+json.dumps(d,ensure_ascii=False,separators=(",",":"))+";\n",encoding="utf8")
for filename,records,fields in (
("paises.csv",d["countries"],["iso","name","region","level","summary","scope","confidence","note","keywords","source_ids","star_ids"]),
("fuentes.csv",d["sources"],["id","country","title","url","type","effect","note","year","official"])):
    with (data/filename).open("w",encoding="utf-8-sig",newline="") as f:
        w=csv.DictWriter(f,fieldnames=fields,extrasaction="ignore");w.writeheader()
        for v in records:w.writerow({key:"; ".join(v[key]) if isinstance(v.get(key),list) else v.get(key,"") for key in fields})
print("Jurisdicciones:",len(d["countries"]),"Referencias:",len(d["sources"]))
