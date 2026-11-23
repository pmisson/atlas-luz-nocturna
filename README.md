# ATLAS DE LA NOCHE · Legislación mundial sobre contaminación lumínica

**Sitio estático listo para publicar · edición 23-11-2026**

> **Publicación prevista para GitHub `pmisson`**: una vez creado el repositorio público `pmisson/atlas-luz-nocturna` y habilitado GitHub Pages (rama `main`, directorio `/ (root)`), el atlas tendrá esta dirección: **https://pmisson.github.io/atlas-luz-nocturna/**. Esta edición solo prepara los archivos; no significa que el repositorio ya exista ni que el sitio esté publicado. Consulta [PUBLICAR_EN_GITHUB.md](PUBLICAR_EN_GITHUB.md).

## Contenido

El atlas contiene:

- **Mapa SVG mundial interactivo** (funciona offline): países seleccionables, lupa, desplazamiento y filtros por región y tipo de normativa; los puntos de Malta, Singapur, Andorra y Liechtenstein completan la cartografía de Natural Earth de baja resolución.
- **229 fichas de países y territorios** en la web y en `docs/`, con contexto jurídico y enlaces a referencias.
- **579 referencias documentales** clasificadas por fuerza y procedencia; no se copia de terceros íntegramente ningún documento protegido.
- **155 medidas estrella** que distinguen ley vinculante, regulación sectorial, plan territorial, orientación, proyecto o mandato normativo.
- **19 fichas subnacionales espanolas**: 17 comunidades autonomas y Ceuta y Melilla, con citas al BOE, REECL y fuentes regionales, y advertencias de vigencia.
- **Derecho internacional y doctrina**: CLRTAP (1979), CDI ONU, Reglamento UE 2024/1991, compilacion checa de 2022, Bara y Yakushina.
- **Datos reutilizables** (`data/atlas.json`, `data/paises.csv`, `data/fuentes.csv`, `data/medidas_estrella.csv`), informe maestro `INFORME_MAESTRO.md` y fichas Markdown.
- Script de generación `build_data.py` (incluye `enrich_atlas.py`) y generación de mapa `make_map.py` para que las actualizaciones sean reproducibles.

## Abrir localmente

Abre el archivo **`index.html`** en Firefox o Chromium. No necesitas servidor ni acceso a internet para el mapa, los filtros, las fichas o las tablas. Únicamente los enlaces a boletines y documentos externos requieren conexión.

## Publicar en GitHub Pages (gratuito)

### Con el navegador

1. En GitHub, crea un repositorio público, por ejemplo `atlas-luz-nocturna`.
2. Descomprime el ZIP **antes de subirlo**; añade todo el contenido de `atlas-luz-nocturna-pmisson/` a la raíz del repositorio, incluyendo `index.html`, `assets/`, `data/`, `docs/` y el resto de archivos.
3. El paquete contiene un archivo oculto `.nojekyll` para que GitHub Pages no transforme las fichas `.md`; súbelo también. Ve a **Settings → Pages**. Elige **Deploy from a branch**, rama `main` y carpeta `/(root)`.
4. GitHub publicará un sitio con forma `https://pmisson.github.io/atlas-luz-nocturna/`.

No hay que configurar tokens de Google Earth Engine, servicios de mapas ni API de pago.

### Con Git

```sh
cd atlas-luz-nocturna-pmisson
ssh -T git@github.com
git init
git add .
git commit -m "Publicar atlas legal de contaminación lumínica 2026"
git branch -M main
git remote add origin git@github.com:pmisson/atlas-luz-nocturna.git
git push -u origin main
```

Después configura Pages en Settings. Para actualizar el sitio, edita los datos y ejecuta `python3 build_data.py && python3 make_map.py`, revisa los cambios y haz un commit.

## Publicar en Netlify (sin Git)

1. Accede a [Netlify Drop](https://app.netlify.com/drop).
2. Descomprime el ZIP y arrastra la **carpeta completa** que contiene `index.html` a Netlify Drop.
3. Se obtendrá un enlace público; puedes cambiar el nombre y asociar un dominio.

## Organización

```
index.html                 Sitio web
assets/styles.css          Estilos y diseño adaptativo
assets/app.js              Filtros, mapa, fichas, referencias
assets/extras.js           Espanña autonoma, internacional y estudios
assets/world-data.js       Geometrías simplificadas (Natural Earth)
assets/atlas-data.js       Datos integrados para apertura offline
data/atlas.json            Base de datos legible por máquina
data/paises.csv            Matriz de 52 países
data/fuentes.csv           Bibliografía documental (121 registros)
data/medidas_estrella.csv   Tabla de 45 medidas destacadas
docs/                      51 fichas nacionales + 3 anexos tematicos en Markdown
data/autonomias_espana.csv Cuadro subnacional de 19 territorios
data/marco_internacional.csv
data/bibliografia_cientifica.csv
INFORME_MAESTRO.md         Informe comparado con matriz y bibliografía
documents/                 Índice de documentos originales (enlaces)
build_data.py              Script de construcción de base y fichas
make_map.py                Script de cartografía SVG
```

## Cautelas de procedencia y alcance

**No se han recuperado los textos completos de todos los informes previos.** Está disponible el informe de la última ampliación (14 países), y para las demás jurisdicciones se ha realizado una reconstrucción basada en referencias identificadas. Esta es una **compilación documental inicial extensa**, no un dictamen jurídico exhaustivo certificado de toda la legislación municipal de 52 países. Algunas referencias son genéricas, secundarias, proyectos o guías: están etiquetadas para no darles fuerza vinculante indebida. No se afirma que una fuente sectorial regule automáticamente todas las luminarias ni que la falta de una norma específica identificada pruebe que no existe ninguna.

Antes de aplicar la información a legislación, inspección, licitaciones o informes científicos, comprueba la **versión oficial consolidada** de cada instrumento, sus artículos y las excepciones.

Los nombres y documentos de terceros permanecen bajo derechos y condiciones de sus titulares. Las geometrías mundiales son del conjunto Natural Earth de dominio público, preparado a partir de la copia incluida en la instalación de `pyogrio`/GeoPandas.

## Cómo incorporar nueva legislación

Edita `build_data.py` para los paises iniciales; en `enrich_atlas.py` se mantiene la extension autonoma, internacional y academica. Para nuevas fuentes, comprueba siempre la fuente oficial primaria. Verifica que cada cifra o requisito tenga una fuente. Ejecuta:

```sh
python3 build_data.py
python3 make_map.py
```

Las referencias se enlazan por `F001`, `F002`, etc.; `M01`, `M02`, etc. son identificadores de esta edición. Para integraciones duraderas, una futura base de datos deberá asignar identificadores persistentes que no dependan del orden de las filas.

**Fecha de corte:** 19 de noviembre de 2026.

## Bibliografía para gestores académicos

Las **121 referencias** también están exportadas como `data/referencias.ris` (importación directa en Zotero), `data/referencias.bib` (LaTeX/BibTeX) y `data/referencias.csl.json` (Citation Style Language). Son registros reconstruidos con la información disponible, por lo que el campo año o el título exacto puede requerir revisión antes de incorporarlos a un manuscrito.

## Fuentes que solicitaron los usuarios

- REECL: https://guaix.fis.ucm.es/reecl/legislacion (indice especializado y actualizado; no es el boletin oficial).
- Cel Fosc: https://vell.celfosc.org/biblio/legal/index.html (repositorio historico; no disponible durante la consulta de noviembre de 2026, sin verificacion de vigencia).

**Importante**: el numero de registros bibliograficos no equivale al numero de normas distintas ni a una certificacion de verificacion exhaustiva.

### Venezuela (revisión jurídica 19-XI-2026)

La ficha `docs/VEN_venezuela.md` documenta la Ley Orgánica del Ambiente de 2006, las Resoluciones 112/2014 (luminarias viales LED) y 73/2011 (publicidad luminosa; horario CORREGIDO 19:00-00:00), el precedente astronómico de Llano del Hato y noticias sobre la ordenanza ambiental de Maracaibo de 2026. Las últimas dos normas requieren cotejo de texto íntegro/vigencia. El atlas tiene actualmente 130 fuentes y 67 medidas estrella. Al regenerar la base con los scripts antiguos, es necesario preservar la revisión de Venezuela para evitar perder esta actualización.

## Extensión regional e internacional (20-XI-2026)

El atlas ahora incluye 22 entradas territoriales italianas, 9 Länder de Austria, las resoluciones UICN WCC-2012-Rec-183, WCC-2020-Res-124 y WCC-2025-Res-046, y una guía UICN de gestión de la oscuridad. Añade 12 vías legales transversales (penal, biodiversidad, Natura 2000, evaluación ambiental, inmisiones civiles). Documentos: `docs/ITA_REGIONES.md`, `docs/AUT_LANDER.md`, `docs/UICN_DECLARACIONES.md`, `docs/MARCO_TRANSVERSAL.md`. CSV descargables: `data/regiones_italia.csv`, `data/lander_austria.csv`, `data/uicn_declaraciones.csv`, `data/marco_transversal.csv`.

**Importante:** parte del inventario regional recoge referencias históricas y asuntos pendientes de cotejo. La mera emisión de luz nocturna no implica automáticamente responsabilidad penal. La UICN emite resoluciones y recomendaciones que no se convierten por sí solas en normas sancionables. Los scripts `build_data.py` y `enrich_atlas.py` siguen siendo generadores históricos y **no deben ejecutarse para sustituir los datos actuales sin incorporar primero las ampliaciones posteriores**.

### Austria: revisión documental 22-XI-2026

Actualización basada en informe de 26 páginas facilitado por el usuario, sin redistribuirlo. Nueve Länder; §41b de Alta Austria 2024 con adaptación hasta 2029; §123a de Luftfahrtgesetz actualizado septiembre de 2026 para balizamiento bajo demanda; art.4(d) Carintia (permiso de proyectores celestes), §85(4) Viena (rótulos y molestias), GewO y caso civil OGH 6Ob60/20x. Corregida afirmación histórica: CE 245/2009 derogado desde septiembre 2021 por UE 2019/2020. Las guías ÖNORM no obligan a nivel nacional por sí solas. Los generadores históricos `build_data.py` y `enrich_atlas.py` no incluyen estas ampliaciones y no deben regenerar `data/atlas.json` sin integrar las revisiones posteriores.

### Unión Europea y acuerdos paneuropeos (22-XI-2026)

Nuevo inventario de 22 entradas con fuente y cautela jurídica: Directivas Hábitats, Aves y EIA; sentencia TJUE C-504/14; restauración de naturaleza 2024; CMS COP15 2026; EUROBATS; CEN/EN13201 y GPP. Cuatro medidas estrella añadidas con ámbito «Internacional» sin contar la UE como país. Documentos: `docs/UE_MARCO_NORMATIVO.md`, `docs/UE_NORMAS_TECNICAS.md`; datos: `data/marco_europeo.csv`. El DOCX de investigación aportado no se publica íntegramente. Los generadores históricos no deben usarse sin integrar todas las ampliaciones acumuladas.

## Inventario de proyectos europeos (22-XI-2026)

Nueva sección pública `#proyectos-europeos`: 21 proyectos con financiación europea (Horizon Europe, H2020, ERC/MSCA, LIFE, Interreg, COST, Erasmus+) y dos iniciativas vinculadas (IMPEL ReLiPo y OpenRed, dependiente de PLAN-B). Enlaces oficiales y programas, fechas, ámbito, estado, objetivos y presupuesto cuando está verificado. Archivos: `data/proyectos_europeos.json`, `.csv`, `.ris`, y `docs/PROYECTOS_EUROPEOS.md`.

### Visualización robusta de la Unión Europea

El apartado `#union-europea` ahora contiene 22 filas y tres fichas principales **integradas en el HTML** para no depender del arranque del JavaScript. Se añade un parámetro de versión a los recursos CSS/JS para refrescar la caché de GitHub Pages.

## Auditoría CORDIS ampliada (22-XI-2026)

Se encontraron 10 proyectos adicionales con ficha oficial CORDIS: ECOLIGHT, ECOLIGHTSFORSEABIRDS, CORALAN, ECO-EVO ALAN, CITISENSE, CitySleep, DiurnalHealth, STEP, MigDisrupt y Starlight (sensor). El catálogo contiene ahora **31 proyectos financiados** y **2 iniciativas asociadas** (33 entradas). Se identifican por acuerdo de subvención para evitar duplicados. Se separan los relacionados indirectamente y se advierte la cronología contradictoria de CORALAN. Consulte `docs/PROYECTOS_EUROPEOS.md` y `data/proyectos_europeos.csv`.

## Arabia Saudí: regulación de AlUla (22-XI-2026)

Nuevo país **SAU** (52 países en total), 8 fuentes nuevas y 6 medidas estrella: resolución RCU **C/15/25/1 de 22-06-2025** publicada 01-08-2025 y entrada en aplicación por fases desde enero de 2026. CCT ≤2700 K, zonas LZ0–3, presupuestos lumínicos por parcela, iluminancia máxima al lindero 0,5/1/3/8 lx, apagados de 22:00–00:00 y sanciones de 3000 SAR por edificio. Los alcances de seguridad, luminarias decorativas, carreteras públicas, otros supuestos excluidos y exenciones se detallan en `docs/SAU_arabia-saudi.md`. Se distinguen los marcos nacionales medioambientales o viarios de las certificaciones voluntarias DarkSky. **No extrapolar estas normas territoriales a toda Arabia Saudí.**

Los generadores históricos `build_data.py` y `enrich_atlas.py` no deben ejecutarse sin integrar primero todas las actualizaciones manuales del atlas.

## Ampliación de diez países (22-XI-2026)

Se incorporan **Andorra, Luxemburgo, Hungría, Letonia, Indonesia, Liechtenstein, Emiratos Árabes Unidos, Estonia, Islandia y Lituania**, con fuentes primarias o institucionales, ámbito jurídico y medidas estrella cuando procede. El caso de **Puerto Rico** (Ley 218/2008 y reglamento) se añade como territorio de EE.UU., no país separado. Se documentan también cinco países pendientes de investigación específica (`docs/PAISES_PENDIENTES.md`).

Muy destacables: Luxemburgo reconoce expresamente 'pollution lumineuse' en su legislación de biodiversidad; Andorra regula espectro por banda inferior a 500 nm (no basta 3000 K para afirmar bajo azul); Hungría prohíbe proyectar alumbrado causante de fényszennyezés; Letonia limita luminancia de anuncios nacionalmente y Riga la concreta en 2026; Indonesia protege Bosscha; Islandia reforma la regulación en 2026. Las políticas de Abu Dabi y Steinfort se distinguen de leyes generales y sancionadoras.

La cartografía SVG representa Andorra y Liechtenstein como puntos porque la simplificación cartográfica no conserva estos microestados.

## Revisión del 22 de noviembre de 2026

Se incorporaron Bulgaria (regulación urbanística), Chipre (restricciones en área de protección de tortugas y estudios ambientales) y Vietnam (Ley 72/2020, art. 89). Se ampliaron las fichas de Argentina (Malargüe y El Leoncito), Brasil (IBAMA 11/1995) y Noruega (§6 con aplicación condicionada). Los instrumentos indirectos no se presentan como leyes nacionales específicas de cielo oscuro. Véase [auditoría de límites jurídicos](docs/PAISES_PENDIENTES.md).

### Sincronización segura

Después de editar `data/atlas.json`, ejecutar `python3 sync_public_data.py` para regenerar `assets/atlas-data.js` y los tres CSV, con comprobaciones de referencias. **Atención:** `build_data.py`/`enrich_atlas.py` reconstruyen una base histórica parcial y todavía no deben ejecutarse sobre `main` sin integrar antes todas las ampliaciones de noviembre de 2026, pues sobrescribirían datos curados recientes.

### Serbia y Rumanía (22-XI-2026)

Se añaden Serbia (artículo 81 Ley de Protección de la Naturaleza; proyectores y láseres hacia el cielo) y Rumanía (Plan de Gestión Văcărești 2025, restricciones expresas a la iluminación artificial). Total actualizado: **99 países, 341 fuentes, 121 medidas**. Montenegro permanece en auditoría: existe orientación oficial sobre contaminación lumínica, no límite ALAN vinculante identificado.

## Investigación de Oriente Medio y norte de África (22-XI-2026)

Se han incorporado **Turquía, Israel, Argelia, Egipto y Túnez**, ampliado Omán, y distinguido expresamente normas de iluminación vinculantes, condiciones de licencias locales, políticas territoriales, legislación ambiental indirecta y proyectos normativos no vigentes. Datos actuales: **99 países, 341 fuentes, 121 medidas**. Jordania permanece en investigación: no consta una prohibición ALAN específica contrastada en los reglamentos consultados.

## Investigación comparada IAU — 23 de noviembre de 2026

Se han integrado 22 países de la muestra de 77 países del informe IAU aún ausentes del atlas. El total del atlas es ahora **99 países, 341 referencias y 121 medidas**. Nuevas fichas: Baréin, Kazajistán, Ucrania, Pakistán, Sri Lanka, Camerún, Chad, Nigeria, Tailandia, Nicaragua, El Salvador, Qatar, Azerbaiyán, Bangladés, Bielorrusia, Kenia, Líbano, Rusia, Ruanda, Senegal, Sierra Leona y Uzbekistán.

**Nota metodológica:** la presencia en el atlas significa documentación de leyes, reglas técnicas, políticas o estudios de referencia, pero **no prueba la existencia de ley específica de ALAN**. El Código ARZ (Líbano), GSAS (Qatar) y SREDA (Bangladés) son certificaciones generalmente optativas; la antigua norma de Púlkovo (Rusia) fue derogada. Los parámetros ucranianos de una versión archivada no se hacen pasar por valores vigentes. La documentación y las cautelas figuran en cada ficha y en el informe maestro.

## Rusia y Bielorrusia: verificación de 23-XI-2026

Las fichas RUS y BLR pasan de `pendiente` a `sectorial`. Rusia: [SanPiN 1.2.3685-21](https://sudact.ru/law/postanovlenie-glavnogo-gosudarstvennogo-sanitarnogo-vracha-rf-ot_1430/sanpin-1.2.3685-21/v/gigienicheskie-normativy-fizicheskikh-faktorov-v/tablitsa-5.57/), tabla 5.57, límites de luz intrusa a ventanas y SP 52.13330.2016; no se recupera la vigencia de la ley antigua de Púlkovo. Bielorrusia: Ley de Publicidad 225-Z art. 13, Decreto 395/2021, decisiones de Nesvizh 2328/2026 y Miory 1036/2026. Los límites 5/7/10/20 lux de la antigua TKP 2009 bielorrusa **no están verificados en la nueva SN 2.04.03-2020**. Totales actuales: 99 países, 341 fuentes y 121 medidas.

## Púlkovo y norma bielorrusa — 23-XI-2026

Actualización: Resolución 524/2016 de San Petersburgo, sección 3.16, modificada por 1008/2025: protección urbanística de Púlkovo y consulta del observatorio. No constituye prueba de la antigua obligación derogada de limitar el resplandor del cielo. Bielorrusia: se identifica SN 2.04.03-2020 y SP 4.04.01-2022, pero no se puede confirmar que los valores 5/7/10/20 lux de TKP 2009 sigan siendo exigibles. Totales: **99 países, 341 fuentes, 121 medidas**.

## Cinco jurisdicciones insulares y Moldavia — 23-XI-2026

Seychelles (Ley de pesca 3/2025, art. 21: luces para atraer peces); Moldavia (ANRE 498/2024 y NCM C.04.02-2025); Jamaica (permiso NEPA 2005-09017-EP00199, condición 22 de protección de tortugas); Kuwait (Decisión municipal 599/2023, art. 13.12 sobre deslumbramiento de anuncios); Trinidad y Tobago (Aviso 90/2014 sobre perturbación luminosa de tortugas verdes). Estos instrumentos son sectoriales o individuales, **no cinco leyes nacionales de control general del cielo nocturno**. Total vigente: 99 países, 341 fuentes y 121 medidas.

## Actualización 23-11-2026

101 países, 347 referencias y 122 medidas destacadas. Incorporados Jordania (marco ambiental y estándar de iluminación exterior) y Montenegro (Ley de Protección de la Naturaleza 117/2026, art. 96, prohibición de luz como medio de captura o perturbación de aves). Véase `data/atlas.json` y `docs/JOR_jordania.md`, `docs/MNE_montenegro.md`. La incorporación no presupone una ley general de contaminación lumínica.

## Actualización Mongolia y Filipinas — 23 noviembre 2026

**Estado vigente:** 103 países; 353 referencias documentales; 126 medidas destacadas. Mongolia incorpora la norma de diseño БНбД 23-02-08 sobre iluminancia vertical en ventanas y atenuación condicionada. Filipinas incorpora el Boletín DENR-BMB 2020-05, con recomendaciones sobre iluminación de playas de anidación, y la circular interministerial 01/2020 con restricciones sobre flashes y luces en actividades turísticas con fauna marina. No equivalen a leyes generales de contaminación lumínica. Fuente consolidada: `data/atlas.json`.

## Ampliación documental 23-11-2026 (fase 108)

**Estado actual del inventario: 108 países, 364 referencias documentales y 131 medidas destacadas.** Se incorporan Armenia (normas de luz intrusa en ventanas), Nepal (control ambiental y obligaciones de proyectos), Bután (guías de edificación y planeamiento), Mauricio (Fisheries Act 2023 §31) y Madagascar (restricciones de luces de agregación de atunes documentadas ante IOTC). Georgia permanece pendiente por falta de una disposición específica verificada. Cifras antiguas de otras secciones del informe son históricas. La base vigente es `data/atlas.json`.

## Revisión Balcanes y Asia central — 23 noviembre 2026

**Estado vigente: 110 países, 368 fuentes, 134 medidas destacadas.** Añadidas Federación de Bosnia y Herzegovina (Ley ambiental 2021 art. 21, definición expresa de contaminación lumínica, solo jurisdicción FBiH) y Kirguistán (СН КР 23-05:2019, iluminancia vertical máxima en ventanas de 5/7/10/20 lx y reglas sobre publicidad iluminada). Albania, Macedonia del Norte, Georgia y Tayikistán continúan en investigación: no contabilizados sin referencia legal suficiente. Los contadores antiguos de secciones históricas no representan el estado vigente; consultar `data/atlas.json`.

## Ampliación Ghana, Barbados y Bahamas — 23-11-2026

**Estado vigente: 113 países, 377 fuentes, 137 medidas destacadas.** Ghana GS 1207:2018 §5.17: zonas de contaminación lumínica, uplight e intrusión y deslumbramiento B/G. Barbados Physical Development Plan Amendment 2023: evaluación de iluminación en playas de tortugas, con cautelas sobre su exigibilidad. Bahamas: Coastal Infrastructure Design Guidance 2023, guía no equivalente a ley general. Fiyi, Samoa, Vanuatu y otras jurisdicciones siguen pendientes de instrumentos específicos suficientemente documentados. El registro canónico es `data/atlas.json`.

## Fase tortugas y espacios protegidos — 23 noviembre 2026

**Estado vigente del atlas: 116 países, 385 referencias y 142 medidas destacadas.** Añadidos República Dominicana (Resolución 0024/2025 y reglamento de iluminación en áreas de anidamiento de tortugas marinas), Etiopía (Adís Abeba Directiva 185/2025 de alumbrado exterior) y Tanzania (Ley de Gestión Ambiental art.140 contaminación lumínica y TANAPA políticas de parques §3.10.4). Fiyi, Samoa, Vanuatu, Papúa Nueva Guinea y Botsuana quedan pendientes de normas específicas acreditadas. La base canónica es `data/atlas.json`.

## Ampliación Caribe y Pacífico — 23 noviembre 2026

**Estado vigente: 119 países, 391 fuentes y 145 medidas.** Honduras: Plan de Manejo Islas de la Bahía, acuerdo ICF 089-2025, sustituye 047-2024; Belice: guía DOE 2010 sobre iluminación de estructuras sobre el agua y protección de anidación de tortugas, exigible según permiso; Vanuatu: plan de acción 2016–2020 (histórico, no atribuir vigencia en 2026) y folleto SPREP 2025 no vinculante. Otros países evaluados aún pendientes de normativa concreta. Registro canónico en `data/atlas.json`.

## Revisión África y Oceanía — 23 noviembre 2026

**Estado vigente: 121 países, 396 referencias y 147 medidas.** Incorporados Uganda (Reglamento SI 53/2026 art.89, restricción de luces que afectan visibilidad en vías) y Zambia (Wildlife Act 2015 art.73, restricción de linternas y fuentes de luz durante caza nocturna, con permiso como excepción). Los dos son regímenes sectoriales, no leyes generales contra la contaminación lumínica. Fiyi, Samoa, Papúa Nueva Guinea, Botsuana, Cuba y Mozambique aún pendientes de norma específica verificada. Fuente canónica `data/atlas.json`.

## Ampliación Fiyi, Botsuana y Cuba — 23-11-2026

**Estado vigente del atlas: 124 países, 402 referencias, 150 medidas destacadas.** Fiyi: FRA Road Lighting Design Guide 2019, reglas sectoriales para skyglow, luz intrusa y emisión ascendente; Botsuana: Wildlife Conservation and National Parks Act 1992 art.55, uso de luces deslumbrantes para caza, con excepciones; Cuba: Ley 150/2022 art.84, evaluación ambiental de emisiones de energía lumínica sin límite fotométrico nacional identificado. Samoa, Papúa Nueva Guinea y Mozambique siguen pendientes de disposiciones precisas. Fuente vigente `data/atlas.json`; contadores anteriores son históricos.

## Actualización Mozambique — 23 noviembre 2026

**Inventario vigente: 125 países, 406 referencias y 152 medidas destacadas.** Mozambique: Decreto 89/2020 REPMAR art.42 sobre fuentes de luz para atração pesquera (exclusión de atún y máximo 100 kW para supuestos autorizados); Resolución 63/2024 y POEM: reducción de iluminación nocturna durante la anidación de tortugas. Samoa y Papúa Nueva Guinea siguen sin norma de ALAN suficientemente acreditada. Los totales históricos de apartados anteriores no son vigentes; consultar `data/atlas.json`.

## Actualización Samoa y Albania — 23 noviembre 2026

**Inventario vigente: 127 países, 410 referencias y 155 medidas destacadas.** Samoa: Signage Policy PUMA 2016 para autorizaciones de rótulos iluminados; Apia Urban Design Standards 2018 C5 DO1.2 recomienda orientación descendente, evitar deslumbramiento y luz a fincas colindantes. Albania: Plan Detallado de Spille, decisión 1/2020 art.61, recomienda LED 2700–3200 K y niveles de iluminancia en vías y plazas, sin límite nacional ALAN. Papúa Nueva Guinea sigue pendiente de medidas jurídicas concretas. La fuente canónica es `data/atlas.json`; cifras de secciones antiguas son históricas.

## Estado de la compilación (23-11-2026)

La fuente consolidada es `data/atlas.json`: **229 jurisdicciones** y **579 fuentes**. El archivo `build_data.py` es un constructor histórico protegido contra sobrescrituras; no debe utilizarse para reconstruir la edición completa. Para volver a generar los archivos de publicación desde el JSON consolidado y preservar las ampliaciones documentadas, usar `python3 sync_territorios.py`. Las fases documentales de los diez territorios más recientes están en `data/territorios_20261123.json` y `data/territorios_20261123_fase2.json` y `data/territorios_20261123_fase3.json` y `data/territorios_20261123_fase4.json` y `data/territorios_20261123_fase5.json`.

La incorporación no significa que todas las jurisdicciones tengan legislación lumínica vinculante. La clasificación distingue leyes específicas, obligaciones generales o urbanísticas, orientaciones y referencias indirectas.
