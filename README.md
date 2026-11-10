# Examen I – Desarrollo de Aplicaciones de Vanguardia

API REST en Node.js + Express con dos partes en el mismo servidor (puerto 3000):

- **Parte 1 – Empleados** (MySQL `empresa_db` + Sequelize): `GET/POST /empleados`, `GET/PUT/DELETE /empleados/:id`. El salario debe ser mayor que 0. El DELETE **desactiva** al empleado (`activo = false`) en vez de borrarlo, para no perder el historial.
- **Parte 2 – Pedidos** (MongoDB + Mongoose): `POST /pedidos`, `GET /pedidos`, `GET /pedidos/estado/:estado`. Estados permitidos: pendiente, enviado, entregado.

## Estructura
```
src/config      conexión a MySQL y MongoDB
src/models      Empleado.js (Sequelize) y Pedido.js (Mongoose)
src/controllers lógica de cada endpoint
src/routes      rutas de Express
database        script para crear empresa_db
postman         colección de pruebas y resultado de Newman
```


