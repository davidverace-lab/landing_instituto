# Fuente Verlag

Coloca aquí los archivos de la fuente **Verlag** en los formatos woff2 y woff.

## Archivos requeridos

| Archivo | Peso | Uso |
|---|---|---|
| `Verlag-Bold.woff2` | 700–900 | Títulos principales |
| `Verlag-Bold.woff` | 700–900 | Fallback |
| `Verlag-Book.woff2` | 400–600 | Peso regular |
| `Verlag-Book.woff` | 400–600 | Fallback |
| `Verlag-Light.woff2` | 100–300 | Peso ligero |
| `Verlag-Light.woff` | 100–300 | Fallback |

## Notas

- La fuente se aplica solo a los **títulos grandes** de las páginas `Instituto` y `Landing`.
- Si solo tienes el peso Bold, renombra el archivo y actualiza el `@font-face` en `apps/web/src/styles/fonts.css`.
- Formatos soportados: `.woff2` (prioritario) y `.woff` (fallback).
