#!/usr/bin/env python3
"""Restore four territory entries after regenerating the base atlas.

Run after other apply_*_2026.py scripts. Idempotent by ISO and source ID.
"""
import csv,json
from pathlib import Path
root=Path(__file__).resolve().parent
data=root/"data"
p=data/"atlas.json"
d=json.loads(p.read_text(encoding="utf-8"))
add=json.loads((data/"territorios_2026_additions.json").read_text(encoding="utf-8"))
have={x["iso"] for x in d["countries"]}
have_refs={x["id"] for x in d["sources"]}
d["countries"].extend(x for x in add["countries"] if x["iso"] not in have)
d["sources"].extend(x for x in add["sources"] if x["id"] not in have_refs)
d["meta"]["country_count"]=len(d["countries"])
d["meta"]["source_count"]=len(d["sources"])
p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
(root/"assets"/"atlas-data.js").write_text("window.ATLAS_DATA="+json.dumps(d,ensure_ascii=False,separators=(",",":"))+";\n",encoding="utf-8")
for filename,records,fields in (
 ("paises.csv",d["countries"],["iso","name","region","level","summary","scope","confidence","note","keywords","source_ids","star_ids"]),
 ("fuentes.csv",d["sources"],["id","country","title","url","type","effect","note","year","official"])
):
    with (data/filename).open("w",encoding="utf-8-sig",newline="") as out:
        w=csv.DictWriter(out,fieldnames=fields,extrasaction="ignore");w.writeheader()
        for item in records:
            w.writerow({k:"; ".join(item[k]) if isinstance(item.get(k),list) else item.get(k,"") for k in fields})
print(len(d["countries"]),len(d["sources"]))
