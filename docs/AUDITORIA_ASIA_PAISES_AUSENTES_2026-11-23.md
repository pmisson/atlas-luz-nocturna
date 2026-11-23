# Auditoría de países asiáticos ausentes — 23 noviembre 2026

Comparación directa con `data/paises.csv`: figuran 40 entradas clasificadas como Asia, incluida Taiwán. Se identifican seis Estados no incorporados todavía. Armenia, Georgia y Chipre figuran en Europa (convención del atlas).

| ISO | País | Evidencia localizada | Clasificación provisional | Fuente |
|---|---|---|---|---|
| YEM | Yemen | Ley 26/1995 art. 2.4 incluye el resplandor de la iluminación (وهج الإضاءة) entre los agentes contaminantes; arts. 22–24 prevención general | Protección lumínica expresamente reconocida, vigencia y alcance operativo por verificar | https://www.yemen-nic.info/db/laws_ye/detail.php?ID=11458&print=Y |
| BRN | Brunéi | Guidelines and Best Practices for Public Lighting, ESCOM/2024/01, mayo 2024; ley marco de protección ambiental CAP 240 | Guía técnica + marco general; no obligación ALAN específica acreditada | https://www.des.gov.bn/ResourcesDocs/escom_2024_01---guidelines-and-best-practices-for-public-lightingv2.pdf |
| MMR | Myanmar | EIA Procedure Notification 616/2015 y Environmental Conservation Law 9/2012 | Procedimiento EIA general, sin referencia lumínica expresa verificada | https://www.fao.org/faolex/en/documents/LEX-FAOC220598/environmental-impact-assessment-eia-procedure-mmr-2015 |
| TKM | Turkmenistán | Ley de protección de la naturaleza 2014 y reformas 2015/2017 | Marco ambiental general; ALAN no acreditada | https://faolex.fao.org/docs/pdf/tuk132755E.pdf |
| TJK | Tayikistán | Legislación ambiental pendiente de cotejo en fuente primaria | Pendiente de documentar; no imputar una obligación | |
| PRK | Corea del Norte | Estrategia nacional de biodiversidad refiere ley ambiental de 1986 y reformas | Marco ambiental general indirecto; ALAN no acreditada | https://faolex.fao.org/docs/pdf/prk163532.pdf |

**Regla editorial:** no sumar al contador de obligaciones vinculantes sin prueba normativa de su exigibilidad y alcance. No equiparar cobertura geográfica y legislación específica. Este documento es una investigación preparatoria y **no incorpora por sí mismo** las seis entradas al CSV maestro ni al mapa. El siguiente paso técnico es modificar `build_data.py`, regenerar CSV/JSON/mapa y verificar la sincronización de cifras.
