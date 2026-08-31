# E-commerce con clases JavaScript

Primer trabajo obligatorio donde se implementan las clases y módulos. También se utiliza boostrap para los estilos.

## Objetivos

El proyecto muestra:

- clases separadas en archivos `.js`;
- módulos ES (`import` / `export`);
- getters y setters;
- campos privados (`#campo`);
- clases de tipo gestor;
- separación entre lógica de negocio y DOM;
- persistencia mediante `localStorage`;
- reconstrucción de instancias después de `JSON.parse`;
- consumo de una API externa con `fetch`;
- una página principal, una página de carrito y páginas de administrador, cada uno con su `script`.
- Estilos utilizando boostrap.

## Estructura

```text
ecommerce_clases_js/
├── index.html
├── carrito.html
├── confirmar-compra.html
├── confirmar-compra.html
├── editar-producto.html
├── login.html
├── registro-categoria.html
├── registro-producto.html
├── ver-ventas.html
├── css/
│   └── style.css
├── js/
│   ├── modelos/
│   │   ├── Categoria.js
│   │   ├── Venta.js
│   │   ├── Producto.js
│   │   └── ItemCarrito.js
│   ├── gestores/
│   │   ├── res/
│   │   │   └── Respuesta.js
│   │   ├── gestorStorage.js
│   │   ├── gestorVentas.js
│   │   ├── gestorCategorias.js
│   │   ├── gestorProductos.js
│   │   └── gestorCarrito.js
│   │── pages/
│   │    ├── index.js
│   │    ├── confirmar-compra.js
│   │    ├── detalle-producto.js
│   │    ├── detalle-ventas.js
│   │    ├── editar-producto.js
│   │    ├── login.js
│   │    ├── registro-categoria.js
│   │    ├── registro-producto.js
│   │    ├── ver-ventas.js
│   │    └── carrito.js
│   ├── comun.js
│   ├── init.js
│   └── carrito.js
└── README.md
```

## Arquitectura utilizada

```text
HTML
  ↓
page.js de cada página
  ↓
Gestores
  ↓
Modelos 
```

Los `pages.js` son los únicos archivos que conocen el DOM.

Los gestores no utilizan `document`, `querySelector` ni `getElementById`.

Los modelos tampoco conocen el DOM ni `localStorage`.

`gestorStorage` centraliza el acceso a `localStorage`.

## Módulos ES

Cada HTML carga solamente su archivo principal:

```html
<script type="module" src="./js/pages/index.main.js"></script>
```

Las dependencias se resuelven usando `import` y `export`.

## API de mapa y ubicación

`confirmar-compra.js` utiliza la librería **Leaflet.js** junto con las APIs públicas de **OpenStreetMap** y **Nominatim** para mostrar un mapa interactivo y obtener la dirección del usuario de manera más dinámica.

* **OpenStreetMap:** Proporciona las imágenes del mapa. Cada mapa se compone de pequeñas imágenes, que se solicitan con la siguiente URL:

```text
https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
```

* `{s}`: Subdominio del servidor (a, b, c).
* `{z}`: Nivel de zoom de la imágen.
* `{x}`: Coordenada horizontal de la imágen.
* `{y}`: Coordenada vertical de la imágen.


* **Nominatim**: Motor de búsqueda de direcciones basado en los datos de OpenStreetMap. Se usa en dos modos:

```
https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}
```

* **Obtener dirección escrita**: coordenadas(`lat`, `lon`) → dirección textual.

```
https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}
```

* **Obtener coordenadas**: dirección textual → coordenadas (`lat`, `lon`).

## Cómo ejecutar

Debido al uso de módulos ES, se recomienda ejecutar el proyecto mediante un servidor HTTP.

En VS Code puede utilizarse, por ejemplo, la extensión **Live Server**.

También puede publicarse directamente en un hosting estático.

## Persistencia

Productos y carrito se guardan en `localStorage`.

Cuando los datos se recuperan desde JSON, deben reconstruirse las instancias:

```javascript
Producto.fromJSON(datos)
ItemCarrito.fromJSON(datos)
```

Esto es necesario porque `JSON.parse()` devuelve objetos simples y no instancias de las clases originales.
