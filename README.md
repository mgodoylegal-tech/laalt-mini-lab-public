# LAALT Mini Lab Public

> Demo visual publica del ecosistema LAALT para mostrar lectura ejecutiva de hallazgos sin exponer el metodo privado.

Este repositorio funciona como la capa visual publica del ecosistema.

Su objetivo no es explicar el sistema completo ni operar auditorias reales. Su objetivo es mostrar, de forma entendible y profesional, como un conjunto reducido de hallazgos puede leerse desde prioridad, estado, ownership, vencimientos y seguimiento.

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

- taxonomia completa del sistema privado
- matriz completa de traduccion
- scoring interno sensible
- flujo operativo completo
- plantillas canonicas
- backend, configuraciones internas o logica privada del core

## Criterio de seguridad

Este repositorio esta diseñado para que el visitante entienda el valor de la capa visual sin poder reconstruir la capa doctrinal ni la capa operativa principal.

Por eso:

- los hallazgos de ejemplo son sinteticos
- el lenguaje es publico y no canonico
- el detalle de lectura se mantiene deliberadamente corto
- la demo no pretende representar el sistema privado completo

## Uso local

Abrir `index.html` con Live Server o servir la carpeta como sitio estatico.

```bash
npx serve .
```

## Nota editorial

Si un contenido nuevo ayuda a inferir taxonomia, matriz, scoring, plantillas o flujo completo, no debe publicarse aca.
