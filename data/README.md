# Esquemas de datos

- `atlas.json`: `meta`, `levels`, `countries`, `sources`, `stars`.
- `paises.csv`: identificadores ISO alfa-3, regiones, instrumento localizado, nivel de confianza, identificadores de fuentes y medidas.
- `fuentes.csv`: referencia única `F001` etc.; origen, naturaleza y fuerza jurídica, URL y observaciones.
- `medidas_estrella.csv`: `M01` etc.; requisito documentado, fuerza, ámbito y cautelas.
- `world_simplified.geojson`: fronteras Natural Earth simplificadas, dominio público, solo para **orientación**, no límites territoriales oficiales. Malta y Singapur se representan como marcadores de localización.
- `referencias.ris`, `referencias.bib`, `referencias.csl.json`: exportación bibliográfica a Zotero, LaTeX y gestores compatibles.

**No interpretar** la clase `especifica`/`sectorial`/`subnacional` como evaluación del éxito o de la severidad regulatoria. Una fuente `official=true` identifica un dominio institucional/oficial, no garantiza que el texto esté consolidado o sea vinculante; consultar `type`, `effect` y `note`.
