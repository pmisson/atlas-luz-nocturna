#!/usr/bin/env python3
"""Curated extension: Spain regional laws, international framework, academic literature.
Always run after build_data.py. No external dependencies and no network access.
"""
from pathlib import Path
import json, csv, re, html
ROOT=Path(__file__).parent
p=ROOT/'data'/'atlas.json'
d=json.loads(p.read_text(encoding='utf-8'))
# Idempotency if called twice without rebuilding base.
d['sources']=[s for s in d['sources'] if int(s['id'][1:])<=79]
d['stars']=[s for s in d['stars'] if int(s['id'][1:])<=40]
esp=next(c for c in d['countries'] if c['iso']=='ESP')
esp['source_ids']=[s for s in esp['source_ids'] if int(s[1:])<=79]
esp['star_ids']=[s for s in esp['star_ids'] if int(s[1:])<=40]

refs={}
def src(key,country,title,url,kind,scope,note='',year='',official=True):
    i=f"F{len(d['sources'])+1:03d}"
    s={'id':i,'country':country,'title':title,'url':url,'type':kind,'effect':scope,'note':note,'year':year,'official':official}
    d['sources'].append(s); refs[key]=i
    if country=='ESP':esp['source_ids'].append(i)
    return i

src('reecl','ESP','REECL (UCM) - repertorio de legislacion sobre contaminacion luminica',
    'https://guaix.fis.ucm.es/reecl/legislacion','Indice secundario especializado','Espa\u00f1a: gu\u00eda organizada por \u00e1mbito estatal, ambiental, observatorios y autonom\u00edas',
    'Repositorio orientativo, no sustituye boletines oficiales.',official=False)
src('reeclaut','ESP','REECL - listado de normas autonomicas',
    'https://guaix.fis.ucm.es/reecl/node/126','Indice secundario especializado','Normativa de CCAA; no incluye ordenanzas municipales',
    'Puede estar incompleto o desactualizado; abrir siempre BOE o boletin autonomico.',official=False)
src('celfosc','ESP','Cel Fosc - archivo historico de legislacion (sitio antiguo)',
    'https://vell.celfosc.org/biblio/legal/index.html','Archivo historico no verificado','Enlace suministrado por el usuario para contraste historico',
    'No accesible durante la revision (timeout); nunca usarlo como prueba de vigencia.',official=False)
src('catlaw','ESP','Catalu\u00f1a - Ley 6/2001 de ordenacion ambiental del alumbrado',
    'https://www.boe.es/buscar/act.php?id=BOE-A-2001-11962','Ley auton\u00f3mica','Catalu\u00f1a; ley espec\u00edfica y modificaciones consolidadas','Vigencia y modificatorias en texto BOE.','2001')
src('catdec','ESP','Catalu\u00f1a - Decreto 190/2015 de desarrollo',
    'https://portaljuridic.gencat.cat/eli/es-ct/d/2015/08/25/190','Reglamento auton\u00f3mico','Catalu\u00f1a; desarrollo de Ley 6/2001','Identificador ELI; comprobar texto consolidado y anexos.','2015')
src('bal','ESP','Illes Balears - Ley 3/2005 de proteccion del medio nocturno',
    'https://www.boe.es/buscar/act.php?id=BOE-A-2005-8460','Ley auton\u00f3mica','Illes Balears; instalaciones exteriores e interiores con afeccion exterior',year='2005')
src('men','ESP','Menorca - Reglamento insular de proteccion del medio nocturno (2021)',
    'https://guaix.fis.ucm.es/reecl/node/126','Referenciado en indice tecnico','Menorca, reglamento insular; texto oficial enlazado desde REECL',
    'Enlace de contexto; sustituir por BOIB primario en siguiente auditoria.',year='2021',official=False)
src('ibi','ESP','Eivissa - Reglamento de proteccion del medio nocturno de la isla (BOIB 140/2026)',
    'https://www.caib.es/eboibfront/pdf/es/2026/140/1231903','Reglamento insular','Eivissa; 3-XI-2026; art. 5 zonificacion E1-E4, horarios y anexos tecnicos',
    'Aprobado 30-X-2026, publicado 3-XI-2026. Comprobar disposicion final de entrada en vigor.','2026')
src('cant','ESP','Cantabria - Ley 6/2006 de prevencion de contaminacion luminica',
    'https://www.boe.es/buscar/act.php?id=BOE-A-2006-14085','Ley auton\u00f3mica','Cantabria; zonificacion, alumbrado, horarios y regimen sancionador',year='2006')
src('cantdec','ESP','Cantabria - Decreto 48/2010, desarrollo parcial de Ley 6/2006',
    'https://boc.cantabria.es/','Reglamento auton\u00f3mico','Cantabria; desarrollo parcial y observatorio',
    'Enlace al portal del BOC, localizar por numero y fecha; corregido por fe de erratas.','2010')
src('andalaw','ESP','Andalucia - Ley 2/2026 para la Gestion Ambiental',
    'https://www.boe.es/buscar/act.php?id=BOE-A-2026-7558','Ley auton\u00f3mica','Andalucia: titulo IV, cap II, seccion 3; sanciones titulo IX cap II seccion 4',
    'En vigor 20-VI-2026; deroga expresamente la Ley 7/2007.','2026')
src('andareg','ESP','Andalucia - Decreto 37/2025, Reglamento de proteccion frente a la contaminacion luminica',
    'https://www.juntadeandalucia.es/boja/2025/31/5','Reglamento auton\u00f3mico','Andalucia; medidas de iluminacion, areas sensibles y zonificacion',
    'Vigente en lo que no contradiga la Ley 2/2026; comprobar compatibilidad.','2025')
src('andarepeal','ESP','Andalucia - Ley 7/2007 (derogada desde 20-VI-2026)',
    'https://www.boe.es/buscar/act.php?id=BOE-A-2007-15158','Ley derogada','Historica; no presentar como vigente','Derogada por Ley 2/2026, disposicion derogatoria unica.','2007')
src('mur','ESP','Region de Murcia - Ley 4/2009 de proteccion ambiental integrada',
    'https://www.boe.es/buscar/act.php?id=BOE-A-2011-2547','Ley auton\u00f3mica ambiental','Murcia; responsabilidades locales y control de contaminacion luminica',year='2009')
src('cyl','ESP','Castilla y Leon - Ley 15/2010, prevencion contaminacion luminica',
    'https://www.boe.es/buscar/act.php?id=BOE-A-2010-20074','Ley auton\u00f3mica','Castilla y Leon: alumbrado, ahorro y eficiencia energetica',year='2010')
src('ex','ESP','Extremadura - Ley 16/2015 de proteccion ambiental',
    'https://www.boe.es/buscar/act.php?id=BOE-A-2015-5490','Ley auton\u00f3mica ambiental','Extremadura; titulo II capitulo III contaminacion luminica',year='2015')
src('pv','ESP','Euskadi - Ley 10/2021 de Administracion Ambiental',
    'https://www.boe.es/buscar/act.php?id=BOE-A-2022-951','Ley ambiental auton\u00f3mica','Euskadi; art. 6 deberes ambientales; no ley integral sobre luz',year='2021')
src('nav','ESP','Navarra - Ley Foral 4/2022 de Cambio Climatico y Transicion Energetica',
    'https://www.boe.es/buscar/act.php?id=BOE-A-2022-6402','Ley foral','Navarra; art. 43 alumbrado exterior; deroga Ley Foral 10/2005 y DF 199/2007',year='2022')
src('navrepeal','ESP','Navarra - Ley Foral 10/2005 (DEROGADA 2-IV-2022)',
    'https://www.boe.es/buscar/act.php?id=BOE-A-2005-20977','Ley historica derogada','Solo referencia de evolucion normativa','Derogada por Ley Foral 4/2022; no vigente.','2005')
src('val','ESP','Comunitat Valenciana - Ley 6/2022 de Cambio Climatico, art. 40',
    'https://www.boe.es/buscar/act.php?id=BOE-A-2023-4378','Ley auton\u00f3mica','Valencia: reduccion maxima de contaminacion luminica en alumbrado publico',year='2022')
src('canlaw','ESP','Canarias - Ley 6/2022 de cambio climatico y transicion energetica',
    'https://www.boe.es/buscar/act.php?id=BOE-A-2023-2941','Ley auton\u00f3mica sectorial','Canarias; politicas sectoriales y alteraciones hasta 2026',
    'No confundir con la normativa especial IAC, de ambito geografico diferente.','2022')
src('iacle','ESP','Ley 31/1988, proteccion de observatorios del IAC',
    'https://www.boe.es/buscar/act.php?id=BOE-A-1988-25332','Ley estatal especial territorial','La Palma y areas de Tenerife en ambito reglamentario; protege calidad astronomica',year='1988')
src('iacrd','ESP','Real Decreto 243/1992, Reglamento de la Ley 31/1988',
    'https://www.boe.es/buscar/act.php?id=BOE-A-1992-8705','Reglamento estatal especial','Proteccion IAC; modificado por RD 580/2017',
    'Ver delimitacion geografica y catalogo tecnico original.','1992')
src('zar','ESP','Aragon - Ley 10/2017 de regimen especial de Zaragoza, art. 27.1.g',
    'https://www.boe.es/buscar/act.php?id=BOE-A-2018-1683','Ley autonomica habilitante local','Solo municipio Zaragoza; competencia sobre contaminacion luminica',year='2017')
src('reeclamb','ESP','REECL - referencias ambientales nacionales y europeas',
    'https://guaix.fis.ucm.es/reecl/node/123','Indice secundario','Ley 21/2013, Natura 2000, parques nacionales y Reglamento UE 2024/1991',official=False)
src('reeclobs','ESP','REECL - proteccion observatorios IAC y Cantabria',
    'https://guaix.fis.ucm.es/reecl/node/125','Indice secundario','Ley 31/1988, RD 243/1992 y observatorio de Cantabria',official=False)
src('reeclbase','ESP','REECL - marco basico, RD 1890/2008 y guia IDAE',
    'https://guaix.fis.ucm.es/reecl/node/122','Indice secundario','Prevencion nacional, eficiencia e iluminacion en carreteras',official=False)

src('unece','INT','1979 Convention on Long-range Transboundary Air Pollution - articulos 1 a 4',
    'https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:21979A1113(01)','Tratado internacional','CLRTAP: art. 1 menciona sustancias o energia; art. 1.b exige afeccion transfronteriza a distancia',
    'Interpretacion luminica plausible; no fija limites de CCT/ULOR ni sanciones luminicas.',year='1979')
src('ilc','INT','ONU CDI - Protection of the atmosphere, 2021 - guias y comentarios',
    'https://legal.un.org/ilc/texts/8_8.shtml','Material juridico no vinculante','Proyecto de directrices; ONU AG resolucion 76/112 toma nota',
    'No es tratado internacional con limites de luz.',year='2021')
src('unres','INT','ONU Asamblea General - resolucion 76/112, proteccion de la atmosfera',
    'https://digitallibrary.un.org/record/3952214','Resolucion ONU','La AG toma nota de las directrices de la CDI, no crea convenio vinculante adicional',year='2021')
src('eu-rest','INT','UE - Reglamento 2024/1991 de restauracion de la naturaleza',
    'https://eur-lex.europa.eu/eli/reg/2024/1991/oj','Reglamento UE','Anexo VII: ejemplo de medidas para detener, reducir o remediar luz artificial',
    'No implica directamente valor de CCT o flujo maximo universal.','2024')
src('eu-purch','INT','JRC - Green Public Procurement Criteria for Road Lighting and Traffic Signals',
    'https://publications.jrc.ec.europa.eu/repository/handle/JRC115406','Criterios voluntarios de contratacion','Instrumentos luminotecnicos para contratacion; vigencia segun adopcion',year='2019')
src('ee-2023','INT','European Commission - Light pollution, Mitigation measures for environmental protection',
    'https://data.europa.eu/doi/10.2779/906521','Informe tecnico UE','Proteccion ecosistemas, estrategias y medidas no vinculantes',year='2023')

src('czech','REF','Czech Ministry of the Environment - Light pollution reduction measures in Europe',
    'https://doi.org/10.5281/zenodo.12676720','Compilacion gubernamental comparada','Informe de 2022 sobre 32 paises europeos: ley, norma, guia y reservas',
    'Panorama de 2022: no utilizar como prueba de vigencia 2026.',year='2022',official=True)
src('bara2021','REF','Bara et al. - Keeping light pollution at bay: red-lines, target values, top-down approach',
    'https://doi.org/10.1016/j.envc.2021.100212','Articulo cientifico','Propuesta sobre limites de inmisiones y presupuesto de emisiones, no norma vigente',year='2021',official=False)
src('bara2023','REF','Bara & Falchi - Artificial light at night: a global disruptor of the night-time environment',
    'https://doi.org/10.1098/rstb.2022.0352','Revision cientifica','Conceptos y repercusiones ambientales, no reglamento',year='2023',official=False)
src('bara2025','REF','Bara et al. - Por un uso responsable de la iluminacion artificial (2025)',
    'https://doi.org/10.17075/uriarap.2025.es','Recomendacion experta','Recomendaciones a administraciones; no ley obligatoria',year='2025',official=False)
src('yak2025','REF','Yana Yakushina - Light pollution regulations and where to find them',
    'https://doi.org/10.1016/j.jenvman.2024.123757','Articulo cientifico-juridico','Revision comparada de normas de contaminacion luminica',year='2025',official=False)
src('yak2025b','REF','Yana Yakushina - The endangered night: the challenge of light pollution within international environmental legal context',
    'https://doi.org/10.1093/jel/eqaf025','Articulo cientifico-juridico','Derecho ambiental internacional y proteccion de la noche',year='2025',official=False)
src('manifesto','REF','Yakushina, Smith y Sanchez de Miguel - Manifesto for Tackling Light Pollution & EU Monitoring',
    'https://doi.org/10.5281/zenodo.12606631','Manifiesto de investigacion','Propuesta de seguimiento europeo, no instrumento juridico',year='2024',official=False)
src('reeclpapers','REF','REECL - bibliografia cientifica y bases ALAN',
    'https://guaix.fis.ucm.es/reecl/Bibliografia','Repertorio academico','Bibliografia de papers y colecciones tematicas',official=False)
src('reeclrest','REF','REECL - propuestas para restaurar la calidad de la noche',
    'https://guaix.fis.ucm.es/reecl/node/135','Propuesta de politica publica','Objetivos sugeridos para plan nacional de restauracion naturaleza, no norma vigente',year='2026',official=False)

region_data=[
 ('AN','Andaluc\u00eda','especifica','Ley 2/2026 (desde junio 2026) y Decreto 37/2025; derogacion de Ley 7/2007.', ['andalaw','andareg','andarepeal'],'No extrapolar automaticamente sanciones antiguas de la GICA.'),
 ('AR','Arag\u00f3n','sectorial','No localizada ley auton\u00f3mica integral. Zaragoza tiene competencia municipal expresa en Ley 10/2017, art. 27.1.g.', ['zar'],'La habilitacion municipal no equivale a limites generales auton\u00f3micos.'),
 ('AS','Principado de Asturias','pendiente','Aplicacion del marco estatal y ordenanzas/planes locales a investigar; sin ley regional especifica documentada aqui.', ['reeclaut'],'Ausencia en esta base no demuestra inexistencia.'),
 ('IB','Illes Balears','especifica','Ley 3/2005 y reglamentos insulares: Menorca (2021) y Eivissa (2026, con zonificacion E1-E4).',['bal','men','ibi'],'Distinguir ley auton\u00f3mica y regulacion insular; entrada en vigor y excepciones por texto.'),
 ('CN','Canarias','sectorial','Ley 6/2022; proteccion especial de observatorios IAC por Ley estatal 31/1988 y RD 243/1992.', ['canlaw','iacle','iacrd'],'La proteccion astronomica especial no se extiende identicamente a todas las islas.'),
 ('CB','Cantabria','especifica','Ley 6/2006 y Decreto 48/2010 de desarrollo parcial; especial referencia al Observatorio Astronomico de Cantabria.', ['cant','cantdec','reeclobs'],'Regulacion parcial y correcciones en BOC por cotejar.'),
 ('CL','Castilla y Le\u00f3n','especifica','Ley 15/2010 especifica de prevencion de contaminacion luminica y ahorro energetico.', ['cyl'],'Comprobar modificaciones y cronograma de adaptacion.'),
 ('CM','Castilla-La Mancha','pendiente','Marco general y municipal. No localizada ley auton\u00f3mica especifica en esta auditoria.', ['reeclaut'],'Revisar ordenanzas y reglas de espacios naturales.'),
 ('CT','Catalu\u00f1a','especifica','Ley 6/2001 y Decreto 190/2015; mapas oficiales de zonificacion nocturna.', ['catlaw','catdec'],'Aplicacion territorial mediante zonificacion y excepciones.'),
 ('VC','Comunitat Valenciana','sectorial','Ley 6/2022 de Cambio Climatico, art. 40 de reduccion de contaminacion del alumbrado publico.', ['val'],'Especificaciones tecnicas y ordenanzas locales requieren comprobacion.'),
 ('EX','Extremadura','sectorial','Ley 16/2015 de proteccion ambiental, titulo II capitulo III: contaminacion luminica.', ['ex'],'No equiparar previsiones ambientales a valores luminotecnicos no constatados.'),
 ('GA','Galicia','pendiente','Marco estatal y ordenanzas municipales; sin ley integral especifica localizada en esta compilacion.', ['reeclaut'],'Revisar directrices locales y otras normas sectoriales.'),
 ('MD','Comunidad de Madrid','pendiente','Competencias generales y ordenanzas municipales; no se ha verificado una ley auton\u00f3mica integral de contaminacion luminica.', ['reeclaut'],'La Ley 2/2002 ambiental fue parcialmente derogada; evitar invocarla sin cotejar la version vigente.'),
 ('MC','Regi\u00f3n de Murcia','sectorial','Ley 4/2009 de proteccion ambiental integrada; previsiones de competencia municipal.', ['mur'],'Los controles precisos deben verificarse en autorizaciones locales.'),
 ('NC','Comunidad Foral de Navarra','sectorial','Ley Foral 4/2022, art. 43, alumbrado exterior; deroga expresamente Ley Foral 10/2005.', ['nav','navrepeal'],'Ley 10/2005 y Decreto 199/2007 NO estan vigentes desde abril de 2022.'),
 ('PV','Pa\u00eds Vasco / Euskadi','sectorial','Ley 10/2021 de Administracion Ambiental; deberes generales art. 6.', ['pv'],'No afirmar que art. 6 contiene limites de color/flujo no verificados.'),
 ('RI','La Rioja','pendiente','Marco estatal y regulacion municipal; no localizada ley auton\u00f3mica especifica en esta compilacion.', ['reeclaut'],'Leyes sectoriales y ordenanzas deben investigarse por localidad.'),
 ('CE','Ceuta','pendiente','Ciudad autonoma: normativa basica estatal y eventual ordenanza local sin comprobar.', ['reecl'],'Incluir a efectos de cobertura territorial, no como comunidad autonoma.'),
 ('ML','Melilla','pendiente','Ciudad autonoma: normativa basica estatal y eventual ordenanza local sin comprobar.', ['reecl'],'Incluir a efectos de cobertura territorial, no como comunidad autonoma.')
]
d['spain_regions']=[{'id':code,'name':name,'level':lvl,'summary':summary,'source_ids':[refs[k] for k in keys],'caution':caution,'reviewed':'2026-11-19'} for code,name,lvl,summary,keys,caution in region_data]
esp.update(summary='La Ley 34/2007 y el RD 1890/2008 se completan con un mosaico auton\u00f3mico e insular; en 2026 destaca la nueva Ley andaluza 2/2026. El atlas ofrece 17 fichas auton\u00f3micas y Ceuta/Melilla.',scope='Estatal; 17 comunidades autonomas, 2 ciudades autonomas y ordenanzas municipales',keywords='Andalucia Baleares Menorca Ibiza Cantabria Castilla Leon Canarias Navarra Cataluna');

new_stars=[
 ('Proteccion insular de Eivissa (E1-E4)','Reglamento insular aprobado en octubre y publicado en noviembre de 2026: zonificacion, horario de reduccion y anexo tecnico.','Reglamento insular','Zonas E1/E2/E3/E4; art. 5; parametros segun anexos','Illes Balears: isla de Eivissa',['ibi','bal'],'Confirmar entrada en vigor exacta de disposicion final; no extender sus prohibiciones a Baleares entera.'),
 ('Desarrollo especifico de Cantabria','Ley 6/2006 y reglamento parcial de 2010 establecen zonas, horarios y restricciones de alumbrado.','Ley auton\u00f3mica y reglamento','Zonificacion, horario, prohibiciones; arts. 7, 10 y 11 de Ley 6/2006','Cantabria',['cant','cantdec'],'Verificar anexo tecnico y correcciones publicadas.'),
 ('Marco renovado de Andalucia 2026','La Ley 2/2026 sustituye a la Ley 7/2007 y coexiste con Decreto 37/2025 cuando sea compatible.','Ley y reglamento autonomicos','Prevencion y sanciones: Ley 2/2026 titulo IV y IX; reglamento 2025','Andalucia',['andalaw','andareg'],'No usar Ley 7/2007 como ley vigente ni deducir automaticamente supervivencia de preceptos incompatibles.'),
 ('Proteccion especial de observatorios de Canarias','La Ley estatal 31/1988 y el RD 243/1992 protegen la calidad astronomica en zonas determinadas.','Ley estatal de ambito territorial','Proteccion especial del cielo y condiciones de alumbrado; detalle segun reglamento','La Palma y zonas de Tenerife determinadas',['iacle','iacrd'],'No aplicar a todas las Canarias sin leer limites geograficos y excepciones.'),
 ('Sustitucion del regimen de Navarra','La Ley Foral 4/2022 integra criterios de alumbrado exterior y deroga la ley previa de 2005.','Ley foral','Art. 43 de la Ley Foral 4/2022; limites concretos por verificar','Navarra',['nav','navrepeal'],'No usar limites historicos de la Ley Foral 10/2005 como actuales.')
]
for title,desc,force,param,scope,keys,caution in new_stars:
    mid=f"M{len(d['stars'])+1:02d}";d['stars'].append({'id':mid,'country':'ESP','title':title,'description':desc,'force':force,'param':param,'scope':scope,'sources':[refs[k] for k in keys],'caution':caution,'replicability':'Alta'});esp['star_ids'].append(mid)

d['international']=[
  {'id':'INT1','title':'Tratado de Ginebra de 1979: definicion abierta de contaminante','subtitle':'Articulos 1 a 4: sustancias o energia y danos transfronterizos','status':'Tratado vinculante entre Partes, interpretacion luminica por debatir','detail':'El articulo 1.a define contaminacion del aire mediante la introduccion de sustancias o energia con efectos perjudiciales. La luz es energia electromagnetica; no obstante, se debe demostrar el alcance material del tratado, los efectos ambientales relevantes y, para el articulo 1.b, el caracter transfronterizo a distancia. El tratado no establece por si mismo limites de CCT, flujo luminoso o sanciones de alumbrado.','source_ids':[refs['unece']]},
  {'id':'INT2','title':'Comision de Derecho Internacional y Asamblea General','subtitle':'Proyecto de directrices sobre la proteccion de la atmosfera (2021)','status':'Interpretacion y soft law; no vinculante por si solo','detail':'La CDI aprobo doce proyectos de directrices con comentarios. La Asamblea General en su resolucion 76/112 tomo nota, promovio su difusion y los puso en conocimiento de los Estados. No se transforman por ello en un tratado ratificado ni en sanciones nacionales automaticas.','source_ids':[refs['ilc'],refs['unres']]},
  {'id':'INT3','title':'Union Europea: restauracion de la naturaleza','subtitle':'Reglamento (UE) 2024/1991, anexo VII','status':'Reglamento vinculante; medida luminica como ejemplo a considerar','detail':'El anexo VII menciona detener, reducir o corregir contaminacion por luz artificial como ejemplo de medidas de restauracion. No crea un limite universal de temperatura de color ni exige una medida uniforme de apagado en todas las luces.','source_ids':[refs['eu-rest']]},
  {'id':'INT4','title':'UE: contratacion verde y estudios tecnico-ambientales','subtitle':'JRC 2019; Comision Europea 2023','status':'Criterios de compra y evidencia; vinculacion segun incorporacion','detail':'Los criterios tecnicos de compra publica ayudan a trasladar parametros fotometricos y espectrales a pliegos. La fuerza obligatoria para cada contrato depende de la normativa de contratacion y de los requisitos adoptados.','source_ids':[refs['eu-purch'],refs['ee-2023']]}
]
d['bibliography']=[
 {'name':'Ministerio checo del Medio Ambiente (2022)','title':'Light pollution reduction measures in Europe','topic':'Compilacion historica de 32 paises; NO actualizacion automatica a 2026','source_id':refs['czech']},
 {'name':'S. Bara, F. Falchi, R. C. Lima y M. Pawley (2021)','title':'Keeping light pollution at bay: A red-lines, target values, top-down approach','topic':'Objetivos de inmisiones, presupuestos de emision; propuesta metodologica','source_id':refs['bara2021']},
 {'name':'S. Bara y F. Falchi (2023)','title':'Artificial light at night: a global disruptor of the night-time environment','topic':'Base cientifica de impactos en el medio nocturno','source_id':refs['bara2023']},
 {'name':'S. Bara et al. (2025)','title':'Por un uso responsable de la iluminacion artificial','topic':'Guia y recomendaciones para administraciones publicas','source_id':refs['bara2025']},
 {'name':'Y. Yakushina (2025)','title':'Light pollution regulations and where to find them','topic':'Inventario juridico comparado internacional','source_id':refs['yak2025']},
 {'name':'Y. Yakushina (2025)','title':'The endangered night: the challenge of light pollution within international environmental legal context','topic':'Implicaciones y limite del derecho ambiental internacional','source_id':refs['yak2025b']},
 {'name':'Y. Yakushina, D. Smith y A. Sanchez de Miguel (2024)','title':'Manifesto for Tackling Light Pollution & Proposing EU Light Pollution Monitoring','topic':'Declaracion y propuesta cientifico-politica, sin rango de ley','source_id':refs['manifesto']},
 {'name':'REECL (UCM)','title':'Bibliografia cientifica / ALAN Database','topic':'Indice de estudios y recursos academicos','source_id':refs['reeclpapers']},
 {'name':'REECL (2026)','title':'Propuestas de control de la contaminacion luminica para el Plan Nacional de Restauracion','topic':'Documento de recomendaciones, no regulacion aprobada','source_id':refs['reeclrest']}
]
# Link source registry with separate provenance and audit status: true is official institution, not necessarily binding.
d['meta']['source_count']=len(d['sources']);d['meta']['star_count']=len(d['stars']);d['meta']['spain_regions_count']=17;d['meta']['spain_cities_count']=2;d['meta']['bibliography_count']=len(d['bibliography'])
d['meta']['note_2026']='Revision ampliada con REECL y Cel Fosc (archivo no accesible), Espana autonoma, derecho internacional y articulos academicos.'
p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
(ROOT/'assets'/'atlas-data.js').write_text('window.ATLAS_DATA='+json.dumps(d,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf-8')

def csv_export(filename,fields,items):
    with (ROOT/'data'/filename).open('w',encoding='utf-8-sig',newline='') as f:
        w=csv.DictWriter(f,fieldnames=fields,extrasaction='ignore');w.writeheader()
        for item in items:w.writerow({k:'; '.join(map(str,v)) if isinstance(v,list) else v for k,v in item.items()})
csv_export('fuentes.csv',list(d['sources'][0]),d['sources'])
csv_export('medidas_estrella.csv',list(d['stars'][0]),d['stars'])
csv_export('autonomias_espana.csv',['id','name','level','summary','source_ids','caution','reviewed'],d['spain_regions'])
csv_export('bibliografia_cientifica.csv',['name','title','topic','source_id'],d['bibliography'])
csv_export('marco_internacional.csv',['id','title','subtitle','status','detail','source_ids'],d['international'])
countryname={c['iso']:c['name'] for c in d['countries']}; countryname.update({'INT':'Internacional','REF':'Bibliografia cientifica'})
with (ROOT/'data'/'referencias.ris').open('w',encoding='utf-8') as f:
  for s in d['sources']:
    k='JOUR' if s['type'].startswith('Articulo') else ('STAT' if s['type'].startswith(('Ley','Reglamento','Tratado')) else 'ELEC')
    f.write(f"TY  - {k}\nID  - {s['id']}\nT1  - {s['title']}\nUR  - {s['url']}\nCY  - {countryname.get(s['country'],s['country'])}\nN1  - {s['type']}. {s['effect']}. {s['note']}\n")
    if s.get('year'):f.write(f"PY  - {s['year']}\n")
    f.write('ER  - \n\n')
with (ROOT/'data'/'referencias.bib').open('w',encoding='utf-8') as f:
  def latex(v):return str(v).replace('\\','\\textbackslash{}').replace('{','\\{').replace('}','\\}').replace('&','\\&').replace('%','\\%')
  for s in d['sources']:
    f.write(f"@misc{{{s['id']},\n  title = {{{latex(s['title'])}}},\n  url = {{{s['url']}}},\n  year = {{{s.get('year') or 'n.d.'}}},\n  note = {{{latex(countryname.get(s['country'],s['country'])+': '+s['effect'])}}}\n}}\n\n")
(ROOT/'data'/'referencias.csl.json').write_text(json.dumps([{'id':s['id'],'type':'article-journal' if s['type'].startswith('Articulo') else 'webpage','title':s['title'],'URL':s['url'],'note':s['type']+'; '+s['effect'],'issued':{'date-parts':[[int(s['year'])]]} if str(s.get('year','')).isdigit() else None} for s in d['sources']],ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

# Full regional and global annexes for direct citation and offline reading.
lines=['# Legislacion subnacional espanola (corte 19-XI-2026)','', 'Se incluyen las 17 comunidades autonomas y las dos ciudades autonomas, sin computarlas como paises. Un resultado pendiente no equivale a ausencia normativa. Revisar boletines oficiales consolidados.','']
for reg in d['spain_regions']:
  lines += [f"## {reg['name']}", '',reg['summary'],'',f"Naturaleza en esta compilacion: **{reg['level']}**.", '', f"Cautela: {reg['caution']}",'', 'Fuentes:']
  for id_ in reg['source_ids']:
    s=next(s for s in d['sources'] if s['id']==id_);lines += [f"- [{id_}: {s['title']}]({s['url']})"]
  lines += ['']
(ROOT/'docs'/'ESP_COMUNIDADES.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
lines=['# Implicaciones juridicas internacionales','', 'El convenio de 1979 contiene la palabra energia en su definicion de contaminacion atmosferica, pero la calificacion de la luz como caso concreto requiere interpretacion. No hay valores obligatorios universales de luz nocturna incorporados por esta sola circunstancia.','']
for it in d['international']:
  lines += [f"## {it['title']}", '',f"**Caracter juridico:** {it['status']}",'',it['detail'],'']
  for id_ in it['source_ids']:
    s=next(s for s in d['sources'] if s['id']==id_);lines += [f"- [{id_} - {s['title']}]({s['url']})"]
  lines+=['']
(ROOT/'docs'/'DERECHO_INTERNACIONAL.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
lines=['# Referencias cientificas y recopilaciones','', 'Fuentes doctrinales, informes oficiales de referencia y propuestas, separadas de los textos legales vinculantes.','']
for it in d['bibliography']:
  s=next(s for s in d['sources'] if s['id']==it['source_id'])
  lines += [f"- **{it['name']}**. [{it['title']}]({s['url']}). {it['topic']} ({it['source_id']})"]
(ROOT/'docs'/'BIBLIOGRAFIA_JURIDICA_Y_CIENTIFICA.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
old=(ROOT/'docs'/'ESP_espana.md');base=old.read_text(encoding='utf-8');base=base.split('\n## Actualizacion 2026:')[0];base+='\n## Actualizacion 2026: comunidades e internacional\n\nVer [cuadro de 17 autonomias y Ceuta y Melilla](ESP_COMUNIDADES.md), [marco juridico internacional](DERECHO_INTERNACIONAL.md), y [bibliografia juridico-cientifica](BIBLIOGRAFIA_JURIDICA_Y_CIENTIFICA.md). La Ley 7/2007 andaluza y la Ley Foral 10/2005 navarra estan derogadas. La compilacion no sustituye textos oficiales actualizados.\n';old.write_text(base,encoding='utf-8')
# Update master without destroying the 51-country historical comparative report.
master=(ROOT/'INFORME_MAESTRO.md');old=master.read_text(encoding='utf-8').split('\n## Ampliacion autonoma y doctrinal 2026')[0]
extra=['','## Ampliacion autonoma y doctrinal 2026','',f"La base documental ampliada cuenta ahora con **{len(d['sources'])} referencias** y **{len(d['stars'])} medidas estrella**. La matriz mundial sigue teniendo 51 paises. Adicionalmente se presentan **17 comunidades autonomas y 2 ciudades autonomas**. Las cifras de 79 fuentes y 40 estrellas de la version original quedan sustituidas por los nuevos totales.", '', '### Repertorios proporcionados por el usuario','', '- [REECL: compilacion de legislacion espanola](https://guaix.fis.ucm.es/reecl/legislacion), indice de trabajo secundario.','- [Cel Fosc: archivo historico](https://vell.celfosc.org/biblio/legal/index.html), no accesible en la revision actual; usar con cautela historica.', '', '### Regiones espanolas','', '| Comunidad / ciudad | Instrumento identificado | Fuente oficial / notas |', '|---|---|---|']
for reg in d['spain_regions']:
  srcs=[next(x for x in d['sources'] if x['id']==sid) for sid in reg['source_ids']]
  prima=next((x for x in srcs if x['official']),srcs[0]);extra.append(f"| {reg['name']} | {reg['summary'].replace('|','/')} | [{prima['id']}]({prima['url']}) |")
extra += ['', '### Derecho internacional y cuestiones abiertas','']
for it in d['international']:
  x=d['sources'][int(it['source_ids'][0][1:])-1];extra += [f"- **{it['title']}**: {it['detail']} [{x['id']}]({x['url']})."]
extra += ['', '### Literatura academica y estudios de referencia','']
for it in d['bibliography']:
  x=d['sources'][int(it['source_id'][1:])-1];extra += [f"- {it['name']}. [{it['title']}]({x['url']}) -- {it['topic']}."]
extra += ['', '### Anexos descargables','', '- [Matriz espanola CSV](data/autonomias_espana.csv)', '- [Derecho internacional CSV](data/marco_internacional.csv)', '- [Bibliografia cientifica CSV](data/bibliografia_cientifica.csv)', '- [Fichas subnacionales](docs/ESP_COMUNIDADES.md)', '- [Capitulo internacional](docs/DERECHO_INTERNACIONAL.md)', '', 'Las leyes derogadas se conservan solo como antecedentes historicos. Las propuestas de la doctrina (por ejemplo, limites top-down) no son por si mismas legislacion vigente.']
master.write_text(old+'\n'.join(extra)+'\n',encoding='utf-8')
print('Atlas enriquecido:',len(d['countries']),'paises,',len(d['spain_regions']),'territorios de Espana,',len(d['sources']),'fuentes,',len(d['stars']),'medidas estrella')
