# Proyecto para CoderHouse

## Es el proyecto final del curso de **Back-End** 

## Variables de Entorno
 - **PORT** - Puerto que utiliza nuestro servidor
 - **MONGO_DB** - Nombre de la base - Conexión a nuestra base de datos
 - **MONGO_USER** - Usuario de conexión a nuestra base de datos 
 - **MONGO_PASS** - Contraseña de conexión a nuestra base de datos
 - **JWT_PRIVATE_KEY** - Clave de la firma del Token
 - **EMAIL_ETH_HOST** - Host del servicio SMTP
 - **MAIL_ETH_PORT** - Puerto del servicio SMTP
 - **EMAIL_ETH_USER** - Usuario de acceso al servicio SMTP
 - **EMAIL_ETH_PASS** - Contraseña de acceso al servicio SMTP


 
### Para realizar el proyecto se utilizaron las siguientes técnologias:

 1. Node Js
 2. Mongo DB
 3. Bcrypt
 4. Dotenv
 5. Ejs
 6. Express
 7. Express Validator
 8. Jsonwebtoken
 9. Mongoose
 10. Nodemailer
 11. Socket.io
 12. Nodemon
 13. WebSockets


### Instalar Dependencias

    npm install

### Levantar el servidor
**Modo Producción**

    npm start

 **Modo Desarrollo (tener instalado Nodemon)**
    
    npm run dev

## Endpoints

### POST:  /auth/register

Registra un nuevo Usuario en la API

**Datos requeridos:**   (ejemplo)

> { 	"firstname":"nombre usuario", 	"lastname":"apellido del usuario",
> 	"email":"email del usuario", 	"password":"password del usuario",
> 	"verifyPassword": "reingresar el password", 	"phone": telefono del
> usuario }


### POST : /auth/login

Registra un nuevo Usuario en la API

**Datos requeridos:**   (ejemplo)

> { 	"email":"email del usuario", 	"password":"password del usuario" }

Los siguientes Endpoints se encuentran protegidos. Para realizar acciones el usuario deberá enviar el token que se genero al momento de hacer el login. El token se puede enviar por medio de los headers de la petición y con el nombre de **authorization-token** y el valor del token generado al hacer login. 

### Endpoints Protegidos (Enviar Token)

### GET:  /productos

Muestra todos los productos


### GET: /productos/id del producto

Muestra el producto según su ID

### POST: /productos/

Guarda un nuevo producto

**Datos requeridos:**

> { "name": nombre del producto, "description": descripción del
> producto, "thumbnail": URL de la imágen lel producto, "price": precio
> del producto, "category": categoria del producto }

### PUT: /productos/id del producto

Actualiza un producto

**Datos requeridos:**

> { "name": nombre del producto, "description": descripción del
> producto, "thumbnail": URL de la imágen lel producto, "price": precio
> del producto, "category": categoria del producto }

### DELETE: /productos/id del producto

Elimina un producto por su ID

### POST: /carrito

Crea un carrito de compras

**Datos requeridos:**

> { "email": email del usuario, "adress": dirección de entrega del producto }

### GET: /carrito

Muestra todos los carritos de compra

### GET: /carrito/id del carrito

Muestra el carrito según su ID

### DELETE: /carrito/id del carrito

Elimina un carrito según su Id

### POST: /carrito/id del carrito/productos/id del producto

Agrega un producto al carrito según el id del carrito y del producto

**Datos requeridos:**

> { "quantity": cantidades del producto agregar }

### PUT: /carrito/id del carrito/productos/id del producto

Actualiza un producto al carrito según el id del carrito y del producto

**Datos requeridos:**

> { "quantity": cantidad del producto actualizada }

### DELETE: /carrito/id del carrito/productos/id del producto

Elimina un producto del carrito según el id del carrito y del producto

### DELETE: /carrito/id del carrito/productos

Elimina todos los productos del carrito según el id del carrito


### POST: /ordenes/id del carrito
Crea una orden de compra segun el id del carrito con el email del usuario logeado y el detalle de los productos que fueron comprados, además del precio total de la compra. Una vez creada la orden, se borra el carrito de compras.


### GET: /ordenes

Muestra todas la ordenes de compra generadas

### GET: /ordenes/num de orden

Nos muestra la orden de compra según el número de la orden

### DELETE: /ordenes/num de orden

Elimina la orden de compra según el número de la orden

### GET: /chat

Nos muestra todos los mensajes del chat

### POST: /chat

Guarda un mensaje del chat

**Datos requeridos:**

> { "email": usuario,
> "user": las opciones son usuario o sistema,
> body: mensaje que envia el usuario 
    }

### DELETE: /chat

Elimina todos los mensajes del chat

---
Este proyecto final contiene dos vistas: la ruta principal es **/auth/login**. Al hacer el login se redirige a la ruta **/mensajes** donde se encuentra el chat, una vez logeados, podemos enviar y recibir mensajes

