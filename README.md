# LAALT Mini Lab Public

> Demo visual publica del ecosistema LAALT para mostrar lectura ejecutiva de hallazgos en una interfaz breve, clara y ordenada.

Este repositorio funciona como la capa visual publica del ecosistema.

Su objetivo es mostrar, de forma entendible y profesional, como un conjunto reducido de hallazgos puede leerse desde prioridad, estado, ownership, vencimientos y seguimiento.

## Enlaces publicos

- Sitio: `https://mgodoylegal-tech.github.io/laalt-mini-lab-public/`
- Contexto general del ecosistema: `https://mgodoylegal-tech.github.io/laalt-overview/`
- Guia publica recortada: `https://mgodoylegal-tech.github.io/laalt-auditor-guide-public/`

## Rol dentro del ecosistema

| Repositorio | Rol publico o privado |
| --- | --- |
| `laalt-mini-lab-public` | Demo visual publica / showcase ejecutivo |
| `laalt-auditor-guide-public` | Guia pedagogica publica recortada |
| `laalt-overview` | Mapa general y contexto publico del ecosistema |
| `cyber-audit-core-lab` | Nucleo metodologico y operativo privado |

## Que muestra

- una demo visual compacta
- un dataset publico, reducido y seguro
- lectura ejecutiva de prioridad, estado y seguimiento
- criterio de comunicacion para findings orientados a decision

## Que no muestra

- taxonomias extensas
- matrices de clasificacion detalladas
- scoring sensible
- flujos operativos completos
- plantillas de trabajo
- backend o configuraciones internas

## Criterio editorial

Este repositorio esta diseñado para que la capa visual se entienda por si misma, con foco en claridad, recorrido y legibilidad.

Por eso:

- los hallazgos de ejemplo son sinteticos
- el lenguaje es publico y no canonico
- el detalle de lectura se mantiene deliberadamente corto
- la demo privilegia una experiencia breve y concreta

## Uso local

Abrir `index.html` con Live Server o servir la carpeta como sitio estatico.

```bash
npx serve .
```

## Publicacion

Este repo incluye workflow de GitHub Pages para desplegar el sitio estatico desde la rama `main`.

## Nota editorial

Si un contenido nuevo rompe la claridad de la demo o amplifica de mas su alcance, conviene resumirlo o dejarlo fuera.
