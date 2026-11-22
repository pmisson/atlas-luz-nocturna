#!/usr/bin/env python3
"""Regenerate website/CSV exports from the current curated data/atlas.json.
Does not rebuild the historical baseline or discard later jurisdiction amendments.
"""
from pathlib import Path
import csv
import json
ROOT=Path(__file__).resolve().parent
DATA=ROOT/"data"
atlas=json.loads((DATA/"atlas.json").read_text(encoding="utf-8"))
assert len({r["iso"] for r in atlas["countries"]})==len(atlas["countries"])
for label, items in [("country",atlas["countries"]),("source",atlas["sources"]),("star",atlas["stars"])]:
    assert items, f"Empty {label} table"
source_ids={s["id"] for s in atlas["sources"]}
star_ids={s["id"] for s in atlas["stars"]}
for country in atlas["countries"]:
    assert set(country["source_ids"])<=source_ids, country["iso"]
    assert set(country["star_ids"])<=star_ids, country["iso"]
atlas["meta"].update(country_count=len(atlas["countries"]),source_count=len(atlas["sources"]),star_count=len(atlas["stars"]))
(DATA/"atlas.json").write_text(json.dumps(atlas,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
(ROOT/"assets"/"atlas-data.js").write_text("window.ATLAS_DATA="+json.dumps(atlas,ensure_ascii=False,separators=(",",":"))+";\n",encoding="utf-8")
tables=[
("paises.csv",atlas["countries"],["iso","name","region","level","summary","scope","confidence","note","keywords","source_ids","star_ids"]),
("fuentes.csv",atlas["sources"],["id","country","title","url","type","effect","note","year","official"]),
("medidas_estrella.csv",atlas["stars"],["id","country","title","description","force","param","scope","sources","caution","replicability"])
]
for filename,rows,cols in tables:
    with (DATA/filename).open("w",encoding="utf-8-sig",newline="") as fh:
        w=csv.DictWriter(fh,fieldnames=cols,extrasaction="ignore")
        w.writeheader()
        for row in rows:
            w.writerow({k:("; ".join(v) if isinstance(v,list) else v) for k,v in row.items() if k in cols})
print(atlas["meta"]["country_count"],"countries;",atlas["meta"]["source_count"],"sources;",atlas["meta"]["star_count"],"measures")
