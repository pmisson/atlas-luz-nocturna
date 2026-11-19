from pathlib import Path
p=Path(__file__).parent/'index.html'
s=p.read_text(encoding='utf8')
if 'id="espana"' not in s:
    spain='''
  <section id="espana" class="regional-section section-pad"><div class="layout-width">
    <div class="section-head"><div><div class="eyebrow mini">02 / DERECHO AUTONOMICO</div><h2>Espa&ntilde;a. <em>19 &aacute;mbitos.</em></h2><p>Las 17 comunidades aut&oacute;nomas y dos ciudades aut&oacute;nomas, con leyes, reglamentos y referencias oficiales. No se han inventariado todas las ordenanzas municipales.</p></div><a href="data/autonomias_espana.csv" download class="text-link">&#8595; Descargar matriz regional</a></div>
    <div class="regional-tools"><label class="search-box"><span>&#9906;</span><input id="spainSearch" type="search" placeholder="Buscar Baleares, Cantabria, Canarias, Navarra..." aria-label="Buscar regiones"></label><select id="spainLevel"><option value="todos">Todas las regiones</option><option value="especifica">Ley o reglamento espec&iacute;fico</option><option value="sectorial">Previsi&oacute;n sectorial</option><option value="pendiente">Pendiente de verificar</option></select><span id="spainCount" class="section-count">19 territorios</span></div>
    <div class="regional-panel"><div class="regional-table-wrap"><table class="regional-table"><thead><tr><th>Territorio</th><th>Tipo</th><th>Normas y alcance</th><th></th></tr></thead><tbody id="spainRows"></tbody></table></div><aside id="spainDetail" class="region-detail" aria-live="polite">Selecciona una comunidad aut&oacute;noma para ver las referencias.</aside></div>
    <p class="method-callout"><b>Repertorios consultados:</b> <a href="https://guaix.fis.ucm.es/reecl/legislacion" target="_blank" rel="noopener noreferrer">REECL (UCM)</a> y <a href="https://vell.celfosc.org/biblio/legal/index.html" target="_blank" rel="noopener noreferrer">archivo hist&oacute;rico Cel Fosc</a> (no accesible en esta consulta). Se enlaza a fuentes oficiales cuando est&aacute;n identificadas. <a class="text-link" href="docs/ESP_COMUNIDADES.md">&#8599; Fichas completas</a></p>
  </div></section>
'''
    s=s.replace('  <section class="stars-section section-pad" id="medidas">',spain+'  <section class="stars-section section-pad" id="medidas">',1)
if 'id="internacional"' not in s:
    more='''
  <section class="research-section section-pad" id="internacional"><div class="layout-width">
    <div class="section-head"><div><div class="eyebrow mini">04 / DERECHO INTERNACIONAL</div><h2>La luz como energ&iacute;a. <em>El alcance del derecho.</em></h2><p>Convenio de Ginebra de 1979, Comisi&oacute;n de Derecho Internacional, restauraci&oacute;n de la naturaleza en la UE y criterios de contrataci&oacute;n verde. El potencial interpretativo no constituye por s&iacute; solo una infracci&oacute;n sancionable.</p></div><a href="docs/DERECHO_INTERNACIONAL.md" class="text-link">&#8599; An&aacute;lisis jur&iacute;dico</a></div>
    <div id="intlGrid" class="research-grid"></div><p class="method-callout"><b>Alcance del Convenio:</b> para la contaminaci&oacute;n atmosf&eacute;rica transfronteriza del art. 1.b deben concurrir los requisitos de origen, efectos en otro Estado y distancia. No existen en el Convenio l&iacute;mites universales de CCT, ULOR o luz azul.</p>
  </div></section>
  <section class="publications-section section-pad" id="literatura"><div class="layout-width">
    <div class="section-head"><div><div class="eyebrow mini">05 / LITERATURA JURIDICA Y CIENTIFICA</div><h2>Documentos que <em>fundamentan las normas.</em></h2><p>El inventario del Ministerio checo, los trabajos de Salvador Bar&aacute; y Yana Yakushina y las propuestas de REECL. Se distingue expresamente investigaci&oacute;n, doctrina y derecho positivo.</p></div><a class="text-link" href="data/bibliografia_cientifica.csv" download>&#8595; Bibliograf&iacute;a CSV</a></div>
    <div id="scienceGrid" class="pub-list"></div>
  </div></section>
'''
    s=s.replace('  <section class="countries-section section-pad" id="paises">',more+'  <section class="countries-section section-pad" id="paises">',1)
s=s.replace('<a href="#medidas">Medidas estrella</a>','<a href="#espana">Espa&ntilde;a</a><a href="#medidas">Medidas estrella</a><a href="#internacional">Internacional</a><a href="#literatura">Ciencia</a>')
s=s.replace('<strong id="metric-sources">79</strong>','<strong id="metric-sources">121</strong>')
s=s.replace('<strong id="metric-stars">40</strong>','<strong id="metric-stars">45</strong>')
s=s.replace('id="starCounter">40 medidas','id="starCounter">45 medidas')
s=s.replace('<script src="assets/app.js"></script>','<script src="assets/app.js"></script>\n<script src="assets/extras.js"></script>')
s=s.replace('de 51 pa&iacute;ses','de 51 pa&iacute;ses')
p.write_text(s,encoding='utf8')
