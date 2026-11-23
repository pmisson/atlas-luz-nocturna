#!/usr/bin/env python3
"""Idempotent synchronization of territorial extensions into the published atlas.

Use only on the consolidated atlas (>=200 jurisdictions). Never run build_data.py
against published data without preserving its later manual extensions.
"""
import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
data_file = ROOT / "data" / "atlas.json"
additions = json.loads((ROOT / "data" / "territorios_20261123.json").read_text(encoding="utf-8"))["entries"]
atlas = json.loads(data_file.read_text(encoding="utf-8"))
if len(atlas["countries"]) < 200:
    raise SystemExit("ABORT: fuente histórica incompleta; no sobrescribir el atlas consolidado.")

present = {c["iso"] for c in atlas["countries"]}
for entry in additions:
    if entry["iso"] in present:
        continue
    ids = []
    for ref in entry["refs"]:
        next_id = "F" + str(max(int(s["id"][1:]) for s in atlas["sources"]) + 1).zfill(3)
        atlas["sources"].append({"id": next_id, "country": entry["iso"], **ref, "official": True})
        ids.append(next_id)
    faroe = entry["iso"] == "FRO"
    atlas["countries"].append({
        **{k: entry[k] for k in ("iso", "name", "region", "level", "summary", "scope", "confidence", "note", "keywords")},
        "source_ids": ids, "star_ids": [],
        "alan_scope": "proteccion" if faroe else "indirecto",
        "alan_scope_note": "Luz incluida en ley ambiental general" if faroe else "Mención ambiental/proyecto sin obligación general verificada",
        "alan_legal_class": "norma_amplia" if faroe else "indirecta",
        "alan_binding_review": "documentada" if faroe else "no_acreditada",
        "alan_binding_note": "Prevención en §§2-3; alcance sujeto a la ley" if faroe else "No computar como ley general vinculante",
    })
atlas["meta"].update(date="2026-11-23", country_count=len(atlas["countries"]),
                     source_count=len(atlas["sources"]), star_count=len(atlas["stars"]))
data_file.write_text(json.dumps(atlas, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
(ROOT / "assets" / "atlas-data.js").write_text("window.ATLAS_DATA=" + json.dumps(atlas, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
def output_csv(path, rows, keys):
    with (ROOT / path).open("w", newline="", encoding="utf-8-sig") as fh:
        out = csv.DictWriter(fh, fieldnames=keys, extrasaction="ignore")
        out.writeheader()
        for row in rows:
            out.writerow({k: "; ".join(v) if isinstance(v := row.get(k, ""), list) else v for k in keys})
output_csv("data/paises.csv", atlas["countries"], ["iso", "name", "region", "level", "summary", "scope", "confidence", "note", "keywords", "source_ids", "star_ids", "alan_scope", "alan_scope_note", "alan_legal_class", "alan_binding_review", "alan_binding_note"])
output_csv("data/fuentes.csv", atlas["sources"], ["id", "country", "title", "url", "type", "effect", "note", "year", "official"])
for e in additions:
    c = next(c for c in atlas["countries"] if c["iso"] == e["iso"])
    lines = ["# " + c["name"], "", "**Estado:** " + c["level"], "", c["summary"], "",
             "**Ámbito:** " + c["scope"], "", "**Cautela jurídica:** " + c["note"], "",
             "## Fuentes oficiales", ""]
    for source in atlas["sources"]:
        if source["id"] in c["source_ids"]:
            lines.append("- [" + source["title"] + "](" + source["url"] + ") — " + source["note"])
    (ROOT / "docs" / (c["iso"] + "_" + c["name"].lower().replace(" ", "_") + ".md")).write_text("\n".join(lines) + "\n", encoding="utf-8")
htmlfile = ROOT / "index.html"
html = htmlfile.read_text(encoding="utf-8")
import re
html = re.sub(r'(id="metric-countries">)\d+', lambda m: m.group(1) + str(len(atlas["countries"])), html)
html = re.sub(r'(id="metric-sources">)\d+', lambda m: m.group(1) + str(len(atlas["sources"])), html)
htmlfile.write_text(html, encoding="utf-8")
print("Atlas:", len(atlas["countries"]), "jurisdicciones,", len(atlas["sources"]), "fuentes")
