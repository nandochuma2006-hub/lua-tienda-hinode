# lúa · Tienda de productos Hinode

Proyecto final de **Programación Web**: tienda en línea para una emprendedora independiente que vende productos Hinode en Bolivia, hecha con **Next.js**.

La página muestra los productos del catálogo Hinode **Ciclo 04 · Campaña Navidad (noviembre 2026)** con fotos, códigos y precios en bolivianos, y permite armar un pedido que se envía por WhatsApp en un solo mensaje.

## Funcionalidades

- **Página principal:** categorías, oferta destacada, favoritos, "Encuentra tu aroma", ideas de regalo y pasos para pedir.
- **Catálogo (`/catalogo`):** 64 productos con buscador y filtros por categoría, género, familia olfativa, precio y orden.
- **Detalle de producto (`/catalogo/[codigo]`):** pirámide olfativa, selector de cantidad y productos parecidos.
- **Mi pedido:** carrito guardado en el navegador que calcula el total y arma el mensaje para WhatsApp.
- **Diseño responsive** para computadora, tablet y celular.

## Tecnologías

- Next.js 16 (App Router)
- React 19
- JavaScript (JSX)
- CSS

## Cómo ejecutarlo

```bash
npm install
npm run dev
```

Luego abrir [http://localhost:3000](http://localhost:3000).

## Configuración

Los datos de la tienda (nombre, número de WhatsApp, ciclo del catálogo) están en `src/app/config/tienda.js`.

> Precios del catálogo Hinode Bolivia Ciclo 04, sujetos a cambio. Imágenes ilustrativas. Hinode es una marca de Grupo Hinode.
