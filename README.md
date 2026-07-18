# Wiki · Diseño e implementación de un material didáctico basado en circuitos electrónicos para la enseñanza del efecto Doppler

## Cómo verla
Abre `index.html` en cualquier navegador (doble clic, o "Abrir con..."). No requiere servidor ni instalación.

## Estructura del proyecto
```
/
├── index.html          → página principal de la wiki (estructura y contenido)
├── css/
│   └── style.css       → estilos, temas claro/oscuro, tipografía, layout
├── js/
│   └── main.js         → interactividad: menú, tema, scroll-spy, buscador, animaciones SVG
├── assets/
│   ├── img/            → fotografías del proyecto (agregar aquí)
│   ├── icons/          → iconografía adicional
│   ├── diagrams/       → esquemáticos y diagramas de bloques del circuito
│   ├── pdf/            → informe y manuales en PDF
│   ├── videos/         → videos de construcción, demostración, uso de Phyphox
│   ├── animations/     → animaciones o GIFs adicionales
│   └── documents/      → otros documentos técnicos
├── pages/              → reservado para futuras páginas independientes
├── components/         → reservado para componentes reutilizables si el proyecto crece
└── data/               → reservado para datos experimentales (JSON/CSV) de los módulos de resultados
```

## Contenido ya desarrollado
Los módulos 01, 02, 03, 04, 05, 07 y 10 están completos, basados en el marco teórico entregado:
- 01 · Material didáctico en la enseñanza de la Física
- 02 · Tecnologías educativas
- 03 · Circuitos electrónicos educativos
- 04 · Ondas sonoras
- 05 · Efecto Doppler (con ecuaciones MathJax y diagrama SVG)
- 07 · Uso de Phyphox
- 10 · Bibliografía APA 7

## Contenido pendiente de completar
Los módulos 06 (implementación), 08 (metodología), 09 (resultados) y 11 (anexos) quedaron marcados como
secciones "pendientes" porque requieren información propia del proyecto que aún no se ha proporcionado:
fotografías del prototipo, diseño metodológico, datos experimentales reales, encuestas, videos, etc.

Para completarlos:
1. Coloca las imágenes/videos/PDF en las carpetas correspondientes dentro de `assets/`.
2. Reemplaza los bloques `<div class="callout pending">...</div>` en `index.html` con el contenido real
   (puedes usar como referencia el formato de las secciones ya completadas).
3. Si agregas datos experimentales, puedes guardarlos como JSON/CSV en `data/` y graficarlos con Chart.js
   (ya se puede importar vía CDN añadiendo `<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js"></script>`).

## Notas técnicas
- Las ecuaciones se renderizan con **MathJax** (cargado desde CDN, requiere conexión a internet).
- Las fuentes (Space Grotesk, Inter, JetBrains Mono) se cargan desde Google Fonts (requiere conexión a internet).
- El modo oscuro/claro y el menú móvil funcionan sin dependencias externas.
