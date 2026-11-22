# ATLAS DE LA NOCHE · Legislación mundial sobre contaminación lumínica

**Sitio estático listo para publicar · edición 19-11-2026**

> **Publicación prevista para GitHub `pmisson`**: una vez creado el repositorio público `pmisson/atlas-luz-nocturna` y habilitado GitHub Pages (rama `main`, directorio `/ (root)`), el atlas tendrá esta dirección: **https://pmisson.github.io/atlas-luz-nocturna/**. Esta edición solo prepara los archivos; no significa que el repositorio ya exista ni que el sitio esté publicado. Consulta [PUBLICAR_EN_GITHUB.md](PUBLICAR_EN_GITHUB.md).

## Contenido

El atlas contiene:

- **Mapa SVG mundial interactivo** (funciona offline): países seleccionables, lupa, desplazamiento y filtros por región y tipo de normativa; los puntos de Malta y Singapur completan la cartografía de Natural Earth de baja resolución.
- **51 fichas nacionales** en la web y en `docs/`, con contexto jurídico y enlaces a referencias.
- **221 referencias documentales** clasificadas por fuerza y procedencia; no se copia de terceros íntegramente ningún documento protegido.
- **67 medidas estrella** que distinguen ley vinculante, regulación sectorial, plan territorial, orientación, proyecto o mandato normativo.
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
