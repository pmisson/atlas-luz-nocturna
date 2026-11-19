# Esquemas de datos

- `atlas.json`: `meta`, `levels`, `countries`, `sources`, `stars`, `spain_regions`, `international`, `bibliography`.
- `paises.csv`: identificadores ISO alfa-3, regiones, instrumento localizado, nivel de confianza, identificadores de fuentes y medidas.
- `fuentes.csv`: referencia única `F001` etc.; origen, naturaleza y fuerza jurídica, URL y observaciones.
- `medidas_estrella.csv`: `M01` etc.; requisito documentado, fuerza, ámbito y cautelas.
- `world_simplified.geojson`: fronteras Natural Earth simplificadas, dominio público, solo para **orientación**, no límites territoriales oficiales. Malta y Singapur se representan como marcadores de localización.
- `referencias.ris`, `referencias.bib`, `referencias.csl.json`: exportación bibliográfica a Zotero, LaTeX y gestores compatibles.

**No interpretar** la clase `especifica`/`sectorial`/`subnacional` como evaluación del éxito o de la severidad regulatoria. Una fuente `official=true` identifica un dominio institucional/oficial, no garantiza que el texto esté consolidado o sea vinculante; consultar `type`, `effect` y `note`.

- `autonomias_espana.csv`: 17 comunidades autonomas y dos ciudades autonomas (fichas con cautelas de vigencia).
- `marco_internacional.csv`: tratados, soft law y politicas comunitarias con estado normativo.
- `bibliografia_cientifica.csv`: estudios y recopilaciones doctrinales para evaluar y mejorar la legislacion.
- REECL (UCM): https://guaix.fis.ucm.es/reecl/legislacion; Cel Fosc historico (no comprobado): https://vell.celfosc.org/biblio/legal/index.html.
