# Prueba de conocimiento - Dev. Junior - Fantasticfy

La siguiente prueba tiene como finalidad poner a prueba las habilidades y destrezas del candidato dentro del ecosistema de tecnologías utilizadas en Fantasticfy para la creación de aplicaciones de Shopify.

## Antes de comenzar

- Instala en tu equipo la CLI de Shopify, encontrarás la información necesaria en el siguiente [enlace](https://shopify.dev/docs/api/shopify-cli).
- Crea una instancia de MongoDB (gratuita). Te recomendamos utilizar MongoDB Atlas, pero puedes utilizar el proveedor que prefieras. [MondoDB Atlas](https://www.mongodb.com/es/lp/cloud/atlas/try4).

## Actividades a realizar

- Creacion de cuenta de partner y tienda de desarrollo.
- Fork del repositorio y conectar aplicación.

## Creación de cuenta de partner y tienda de desarrollo

Debes registrarte como partner en Shopify y posterior a ello crear una tienda de desarrollo, dicha tienda debe tener datos de prueba (productos, clientes, ordenes, colecciones, etc) para poder llevar a cabo el resto del desarrollo.

- Registro como [partner de Shopify](https://www.shopify.com/es-es/partners).
- Crear tienda de desarrollo con dummy data.

![alt text](<CleanShot 2024-08-29 at 14.00.53@2x.png>)

Se mostrará una página con opciones para la creación de la tienda, deberás leer detenidamente cada una de las opciones y aplicar tu criterio para seleccionar la que mejor corresponda al caso, recuerda que necesitas crear una tienda de desarrollo para probar funcionalidades y que la misma tenga datos de prueba.

## Fork del repositorio y conectar aplicación

Abajo encontrarás un repositorio con un proyecto que hemos preparado para la prueba, es una aplicación de Shopify hecha con ViteJs, encontrarás que en el backend tenemos un API REST con express, conexión a base de datos con mongoose y el front está hecho con React. Deberás crear tu propio repositorio y hacer un fork del que te damos, obtener una base de datos de mongodb, conectar la aplicación en tu cuenta de partner y finalmente instalarla en la tienda de desarrollo que creaste.

- Fork del [repositorio](https://github.com/Witocorp-Organization/test-dev-app.git).
- Obtén la URI de conexión a tu base de datos de la instancia de MongoDB que previamente creaste. Reemplaza el valor de la variable de entorno con el nombre `MONGO_URI` que encontrarás en el fichero `.env` dentro del directorio web.

En la raíz del proyecto, ejecuta `yarn install` para instalar las dependencias necesarias, posterios a ello ejecuta `yarn dev`. Un mensaje como el siguiente te aparecerá, con un enlace para que inicies sesión en tu cuenta de partner desde el navegador.

![alt text](<CleanShot 2024-08-30 at 12.11.51.png>)

Sigue la instrucciones que aparecen en consola, dependiendo de si tienes mas aplicaciones y tiendas en tu cuenta de partner el proceso de conexión puede hacerse de forma automática o no, en el caso de que no, te aparecerán opciones para conectar el repositorio actual con alguna aplicación de tu cuenta de partner y se te preguntará también en que tienda de desarrollo deseas instalar la aplicación, lee con antención las opciones que se te presentan y utiliza tu criterio para seleccionar las adecuadas, recuerda, debes crear una nueva aplicación con el repositorio que te damos y conectarla a la tienda de desarrollo con datos de prueba que previamente creaste en el paso anterior.

Si has realizado los pasos correctamente verás por consola que la aplicación se ejecuta y un mensaje que dice `Connected to database.`, si haces clic en la consola y presionas la letra `p` serás redirigido al navegador para instalar tu aplicación en la tienda. Deberías poder ver tu aplicación:

![alt text](<CleanShot 2024-08-30 at 12.34.22@2x.png>)

## Estado de sincronización

La home page de la aplicación se encuentra en el fichero `/web/frontend/pages/index.jsx`, en el verás que hay un método que hace una llamada al backend para obtener un conteo del total de productos y luego renderiza un componente que muestra este valor, hay otra línea para customers pero no está mostrando ningún valor obtenido del backend. Tu tarea en este ejercicio es hacer un poco de ingenieria inversa y encontrar el controlador que devuelve los datos para la petición que se hace desde el front.

Una vez que hayas encontrado el controlador, debes agregar una lógica adicional para que devuelva la cantidad todal de clientes y de ordenes que hay en tu tienda, para ello deberás utilizar el api de GraphQL de Shopify, devuelve estos valores en la respuesta y en el front muestralos manteniendo la misma estructura de los componentes.

- Encontrar el controlador que devuelve los datos de la llamada.
- Consultar el [total de clientes](https://shopify.dev/docs/api/admin-graphql/2024-07/queries/customersCount) y el [total de ordenes](https://shopify.dev/docs/api/admin-graphql/2024-07/queries/ordersCount) con el api de GraphQL.
- Mostrar el total en la página de inicio de la aplicación.

## Página de conexión ERP

Si te fijas en el menú de navegación de tu aplicación, verás que hay un enlace a una página con el nombre ERP, si das clic en el verás que la página a la que te envía está vacía.

![alt text](<CleanShot 2024-08-30 at 12.54.40@2x.png>)

El código de esta página se encuentra en el fichero `/web/frontend/pages/erp.jsx`, tu tarea en este ejercicio será construir un formulario en el que se puedan introducir las credenciales de acceso a un ERP:

- IP
- Puerto
- Usuario
- Password

Y enviarlas al backend para que se guarden en base de datos, luego cada vez que entres a esta página deberás poder ver precargadas las credenciales que ya hayas guardado.

Ten en cuenta que para la construcción de esta página solo debes utiliza componentes de [Polaris](https://polaris.shopify.com/components), a modo de ayuda te dejamos aquí debajo un listado con los componentes que utilizamos para la creación de esta página:

**Librería `@shopify/polaris`**

- Button
- Card
- FormLayout
- Icon
- Layout
- Page
- TextField

**Librería `@shopify/polaris-icons`**

- ViewIcon
- HideIcon

**Librería `react-query`**

- useQuery

**Librería `@shopify/app-bridge-react`**

- useAppBridge
- SaveBar

Utiliza esta información como guía al momento de desarrollar el componente, si no los utilizas todos no te preocupes, lo importante es que el componente no tenga errores y que tenga el siguiente comportamiento:

- **Carga inicial**
  - Consulta al backend para obtener las credenciales.
  - Rellenar el formulario con los datos obtenidos.
- **Modificación del formulario**
  - Mostrar una barra con un botón de guardar o descartar.
- **Clic en el botón de guardar**
  - Petición al back para actualizar las credenciales en la base de datos.
  - Actualizar los datos en el front con los mas recientes.
  - Ocultar la barra de guardar
  - Mostrar un mensaje indicando si se guardaron o no las credenciales.
- **Clic en el botón de descartar**
  - Reestablecer los valores del formulario con los originales.
  - Ocultar la barra de guardado
- **Campo de contraseña**
  - Mostrar botón que permite alternar el estado del tipo de campo de texto a password.

Para el backend, deberás crear dos rutas, dos controladores y un modelo, las rutas y los controladores deben ser para consultar y escribir las credenciales, y el módelo te permitirá interactuar con la base de datos, procura seguir la estrucutra de ficheros y directorios del repositorio, define las rutas dentro del directorio `/web/router` y exportala en el fichero `/web/router/index.js`, para los controladores utiliza el directorio `/web/controllers` y exportalo desde `/web/controllers/index.js` y el modelo lo puedes crear dentro del directorio `/web/models`. El resultado final debe ser una página como la siguiente:

![alt text](<CleanShot 2024-08-30 at 13.20.16.gif>)

## Extensión de tema - Bloque de productos destacados

Dentro del directorio `/extensions/featured-products` encontrarás una serie de carpetas y ficheros, estos pertenecen a una extension de tema que tiene tu aplicación, con ella deberás crear una sección en tu tienda que muestre un carrusel de productos obtenidos desde una API externa, la estructura y estilos de esta sección debe apegarse al diseño que encontrarás en este [Figma](https://www.figma.com/design/4NEx3jyvv3gAu8vCBbyWgv/Prueba?node-id=0-1&node-type=CANVAS&t=rOkLfP434HlFapkN-0). Para este ejercicio utilizarás el lenguage propio de Shopify, Liquid, y JavaScript Vanilla, no está permitido el uso de JQuery.

Detén tu servidor y vuelvelo a ejecutar con `yarn dev`, está atento a la consola porque verás que aparecen algunos enlaces con información, debes encontrar aquel que diga `Setup your theme app extension in the host theme` y hacer clic en el enlace que aparece debajo de el:

![alt text](<CleanShot 2024-08-30 at 14.05.59.png>)

Guarda esta URL porque seguramente la vualvas a necesitar mas tarde y es probable que se te pierda en la consola. Cuando naveges al enlace verás el personalizador de temas de Shopify, en el podrás agregar tu extensión para visualizarla en tu tienda, del lado izquierdo dentro del apartado de **Template** busca el botón que dice **Add section**, se mostrará una modal con dos tabs, cambiate al tab de Apps y busca la que pertenezca a tu aplicación, agregala y luego haz clic en el botón de guardar.

![alt text](<CleanShot 2024-08-30 at 14.12.46.gif>)

Como podrás haber notado, el fichero `/extensions/featured-products/blocks/featured_products.liquid` contiene una etiqueta `h1` que es lo único que se está renderizando cuando agregas tu sección al tema, si quieres visualizar los cambios en tiempo real debes buscar en tu consola el enlace que está bajo el nombre de `Preview your theme app extension`

![alt text](<CleanShot 2024-08-30 at 14.18.22.png>)

Se te pedirá la contraseña de tu tienda la puedes encontrar de la siguiente manera:

![alt text](<CleanShot 2024-08-30 at 14.20.24.gif>)

Desde esa URL, cualquier cambio que hagas en tu extensión del tema se verá reflejado de forma automática en tu tienda, puedes hacer la prueba y agregar un parrafo con un hola mundo debajo de la etiqueta h1, guarda y sin necesidad de recargar la página verás el parrafo con el texto.

Aquí comienza tu ejercicio, deberás crear la estructura de tu sección dentro del fichero `featured_products.liquid` y utilizar los dos ficheros que encontrarás dentro de la carpeta `/extensions/featured-products/assets` para el CSS y JS que vas a necesitar. Tendrás que consultar un API externa para obtener un listad de productos que luego vas a renderizar dentro de un carrusel, del lado izquierdo deberás mostrar una imagen y una serie de textos que obtendrás a través de las settings vía liquid

- Abre el personalizador de temas de tu extension.
- Añade tu extension al tema de desarrollo que estas utilizando.
- Navega al enlace de previsualización de tu tema.
- Crea la estructura para la sección que necesitas dentro del fichero `featured_products.liquid`.
- Incluye el archivo `featured_products.js` de la carpeta assets dentro de `featured_products.liquid`. [Ver documentación](https://shopify.dev/docs/api/liquid/filters/script_tag).
- Incluye el archivo `featured_products.css` de la carpeta assets dentro de `featured_products.liquid`. [Ver documentación](https://shopify.dev/docs/api/liquid/filters/stylesheet_tag).
- Crea la sección igual al diseño del [Figma](https://www.figma.com/design/4NEx3jyvv3gAu8vCBbyWgv/Prueba?node-id=0-1&node-type=CANVAS&t=rOkLfP434HlFapkN-0).
  - el bloque de la derecha debe ser un