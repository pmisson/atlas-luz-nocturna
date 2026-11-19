# ATLAS DE LA NOCHE · Legislación mundial sobre contaminación lumínica

**Sitio estático listo para publicar · edición 19-11-2026**

> **Publicación prevista para GitHub `pmisson`**: una vez creado el repositorio público `pmisson/atlas-luz-nocturna` y habilitado GitHub Pages (rama `main`, directorio `/ (root)`), el atlas tendrá esta dirección: **https://pmisson.github.io/atlas-luz-nocturna/**. Esta edición solo prepara los archivos; no significa que el repositorio ya exista ni que el sitio esté publicado. Consulta [PUBLICAR_EN_GITHUB.md](PUBLICAR_EN_GITHUB.md).

## Contenido

El atlas contiene:

- **Mapa SVG mundial interactivo** (funciona offline): países seleccionables, lupa, desplazamiento y filtros por región y tipo de normativa; los puntos de Malta y Singapur completan la cartografía de Natural Earth de baja resolución.
- **51 fichas** en la web y en `docs/`, con contexto jurídico y enlaces a referencias.
- **79 referencias documentales** clasificadas por fuerza y procedencia; no se copia de terceros íntegramente ningún documento protegido.
- **40 medidas estrella** que distinguen ley vinculante, regulación sectorial, plan territorial, orientación, proyecto o mandato normativo.
- **Datos reutilizables** (`data/atlas.json`, `data/paises.csv`, `data/fuentes.csv`, `data/medidas_estrella.csv`), informe maestro `INFORME_MAESTRO.md` y fichas Markdown.
- Script de generación `build_data.py` y generación de mapa `make_map.py` para que las actualizaciones sean reproducibles.

## Abrir localmente

Abre el archivo **`index.html`** en Firefox o Chromium. No necesitas servidor ni acceso a internet para el mapa, los filtros, las fichas o las tablas. Únicamente los enlaces a boletines y documentos externos requieren conexión.

## Publicar en GitHub Pages (gratuito)

### Con el navegador

1. En GitHub, crea un repositorio público, por ejemplo `atlas-luz-nocturna`.
2. Descomprime el ZIP **antes de subirlo**; añade todo el contenido de `atlas_legislacion_luminica/` a la raíz del repositorio, incluyendo `index.html`, `assets/`, `data/`, `docs/` y el resto de archivos.
3. El paquete contiene un archivo oculto `.nojekyll` para que GitHub Pages no transforme las fichas `.md`; súbelo también. Ve a **Settings → Pages**. Elige **Deploy from a branch**, rama `main` y carpeta `/(root)`.
4. GitHub publicará un sitio con forma `https://pmisson.github.io/atlas-luz-nocturna/`.

No hay que configurar tokens de Google Earth Engine, servicios de mapas ni API de pago.

### Con Git

```sh
cd atlas_legislacion_luminica
git init
git add .
git commit -m "Publicar atlas legal de contaminación lumínica 2026"
git branch -M main
git remote add origin https://github.com/pmisson/atlas-luz-nocturna.git
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
assets/world-data.js       Geometrías simplificadas (Natural Earth)
assets/atlas-data.js       Datos integrados para apertura offline
data/atlas.json            Base de datos legible por máquina
data/paises.csv            Matriz de 51 países
data/fuentes.csv           Bibliografía documental (79 registros)
data/medidas_estrella.csv   Tabla de 40 medidas destacadas
docs/                      51 fichas en Markdown
INFORME_MAESTRO.md         Informe comparado con matriz y bibliografía
documents/                 Índice de documentos originales (enlaces)
build_data.py              Script de construcción de base y fichas
make_map.py                Script de cartografía SVG
```

## Cautelas de procedencia y alcance

**No se han recuperado los textos completos de todos los informes previos.** Está disponible el informe de la última ampliación (14 países), y para las demás jurisdicciones se ha realizado una reconstrucción basada en referencias identificadas. Esta es una **compilación documental inicial extensa**, no un dictamen jurídico exhaustivo certificado de toda la legislación municipal de 51 países. Algunas referencias son genéricas, secundarias, proyectos o guías: están etiquetadas para no darles fuerza vinculante indebida. No se afirma que una fuente sectorial regule automáticamente todas las luminarias ni que la falta de una norma específica identificada pruebe que no existe ninguna.

Antes de aplicar la información a legislación, inspección, licitaciones o informes científicos, comprueba la **versión oficial consolidada** de cada instrumento, sus artículos y las excepciones.

Los nombres y documentos de terceros permanecen bajo derechos y condiciones de sus titulares. Las geometrías mundiales son del conjunto Natural Earth de dominio público, preparado a partir de la copia incluida en la instalación de `pyogrio`/GeoPandas.

## Cómo incorporar nueva legislación

Edita `build_data.py` para añadir o actualizar país (`C`), fuente (`S`) o medida estrella (`M`). Verifica que cada cifra o requisito tenga una fuente. Ejecuta:

```sh
python3 build_data.py
python3 make_map.py
```

Las referencias se enlazan por `F001`, `F002`, etc.; `M01`, `M02`, etc. son identificadores de esta edición. Para integraciones duraderas, una futura base de datos deberá asignar identificadores persistentes que no dependan del orden de las filas.

**Fecha de corte:** 19 de noviembre de 2026.

## Bibliografía para gestores académicos

Las **79 referencias** también están exportadas como `data/referencias.ris` (importación directa en Zotero), `data/referencias.bib` (LaTeX/BibTeX) y `data/referencias.csl.json` (Citation Style Language). Son registros reconstruidos con la información disponible, por lo que el campo año o el título exacto puede requerir revisión antes de incorporarlos a un manuscrito.
