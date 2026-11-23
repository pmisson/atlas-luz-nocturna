#!/usr/bin/env python3
"""Reaplica la ampliación final de 16 Estados después de regenerar el atlas.

Ejecutar después de build_data.py, apply_asia_2026.py,
apply_africa_2026.py, apply_africa_audit5_2026.py y
apply_greenland_guianas_2026.py.
No vuelve a insertar registros existentes.
"""
import csv
import json
from pathlib import Path

root = Path(__file__).resolve().parent
data = root / "data"
path = data / "atlas.json"
atlas = json.loads(path.read_text(encoding="utf-8"))
add = json.loads((data / "final16_2026_additions.json").read_text(encoding="utf-8"))
existing_countries = {x["iso"] for x in atlas["countries"]}
existing_sources = {x["id"] for x in atlas["sources"]}

atlas["countries"].extend(x for x in add["countries"] if x["iso"] not in existing_countries)
atlas["sources"].extend(x for x in add["sources"] if x["id"] not in existing_sources)
atlas["meta"]["country_count"] = len(atlas["countries"])
atlas["meta"]["source_count"] = len(atlas["sources"])
path.write_text(json.dumps(atlas, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
(root / "assets" / "atlas-data.js").write_text(
    "window.ATLAS_DATA=" + json.dumps(atlas, ensure_ascii=False, separators=(",", ":")) + ";\n",
    encoding="utf-8",
)

for filename, records, fields in (
    ("paises.csv", atlas["countries"],
     ["iso", "name", "region", "level", "summary", "scope", "confidence", "note", "keywords", "source_ids", "star_ids"]),
    ("fuentes.csv", atlas["sources"],
     ["id", "country", "title", "url", "type", "effect", "note", "year", "official"]),
):
    with (data / filename).open("w", encoding="utf-8-sig", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fields, extrasaction="ignore")
        writer.writeheader()
        for item in records:
            writer.writerow({
                key: "; ".join(item[key]) if isinstance(item.get(key), list) else item.get(key, "")
                for key in fields
            })
print("Jurisdicciones:", len(atlas["countries"]), "Fuentes:", len(atlas["sources"]))
