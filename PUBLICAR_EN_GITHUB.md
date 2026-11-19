# Publicar NOCTIS ATLAS en GitHub Pages · cuenta pmisson

**Repositorio recomendado (crear, todavía no creado):** https://github.com/pmisson/atlas-luz-nocturna

**URL pública esperada una vez configurado:** https://pmisson.github.io/atlas-luz-nocturna/

## Método 1: GitHub desde el navegador

1. Inicia sesión como `pmisson` y abre https://github.com/new.
2. En **Repository name**, escribe `atlas-luz-nocturna`, selecciona **Public** y crea el repositorio. Para esta opción es mejor crearlo **sin añadir README ni .gitignore**, porque la carpeta del sitio ya los contiene.
3. Descomprime este ZIP y sube a **la raíz del repositorio** el contenido de esta carpeta (no la carpeta contenedora), de modo que `index.html` esté directamente en la raíz y existan allí las carpetas `assets/`, `data/`, `docs/` y el archivo oculto `.nojekyll`.
4. Ve a **Settings → Pages → Build and deployment → Source** y elige **Deploy from a branch**. Selecciona `main` y `/(root)` y guarda.
5. La URL del sitio será https://pmisson.github.io/atlas-luz-nocturna/ cuando GitHub haya completado el despliegue.

## Método 2: usando git en Ubuntu (recomendado)

Crea primero el repositorio público vacío en https://github.com/new con el nombre `atlas-luz-nocturna`. Después descomprime el ZIP, abre una terminal **dentro de la carpeta que contiene `index.html`** y ejecuta:

```bash
ssh -T git@github.com
git init
git add .
git commit -m "Publicar atlas de legislación lumínica (51 países)"
git branch -M main
git remote add origin git@github.com:pmisson/atlas-luz-nocturna.git
git push -u origin main
```

A continuación entra en Settings → Pages y activa el despliegue desde `main`, carpeta `/(root)`.

Los comandos usan **SSH**, no contraseñas ni tokens de HTTPS. El paso `ssh -T git@github.com` sirve para comprobar que la clave de tu Ubuntu ya está aceptada por GitHub. Si no, configura tu clave antes de intentar el push.

## Cómo actualizar el sitio después

Edita archivos y, desde la misma carpeta, ejecuta:

```bash
python3 build_data.py
python3 make_map.py
python3 tests/verify_atlas.py
node tests/verify_js.js
git add .
git commit -m "Actualizar fichas y referencias jurídicas"
git push
```

Los cambios se publican al actualizar la rama `main`.

## Comprobaciones y cautelas

- Antes de subir: comprueba que **index.html** esté en la raíz, no dentro de una subcarpeta adicional.
- El mapa no requiere token ni servicios de pago; sus recursos son relativos y funcionan bajo `/atlas-luz-nocturna/`.
- Revisa el contenido de `docs/`, `INFORME_MAESTRO.md` y `data/`: el repositorio será **público**.
- No incorpores archivos secretos, claves o tokens; este paquete no necesita credenciales para funcionar.
- La colección documental incluye referencias cuya vigencia y alcance requieren revisión jurídica. No es un registro oficial de normas.
- Si prefieres mantener privados los borradores y mostrar solo la web, utiliza un repositorio público separado con el contenido estático que desees publicar.

## Ultima edicion ampliada

La web incluye 51 paises, 19 territorios espanoles, 121 fuentes y 45 medidas estrella. Se incluyen el Convenio CLRTAP, la CDI y bibliografia de Bara y Yakushina. El paquete **no se ha subido ni publicado**; son instrucciones para hacerlo desde Ubuntu con SSH.
