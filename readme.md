# API Documentation

## Introducción

Esta API permite gestionar información relacionada con restaurantes, usuarios y reseñas. Cada entidad tiene sus propios endpoints, y estos requieren que se sigan ciertas reglas de validación. A continuación, se describen los endpoints disponibles, qué validaciones son necesarias para cada uno y qué tipo de modelo de datos se debe pasar.

## Endpoints

### Usuarios

#### **1. Obtener todos los usuarios**

- **Ruta:** `GET /usuarios/all`
- **Descripción:** Este endpoint permite obtener la lista de todos los usuarios registrados.
- **Validaciones:** No requiere validaciones específicas.
- **Modelo esperado:** No se necesita un modelo para esta operación.

#### **2. Obtener un usuario por su ID**

- **Ruta:** `GET /usuarios/id/:_id`
- **Descripción:** Obtiene los detalles de un usuario específico usando su `_id`.
- **Validaciones:** Se valida que `_id` sea un string no vacío y que esté presente en la solicitud.
- **Modelo esperado:**
  - Parámetro `_id` en la URL.

#### **3. Crear un nuevo usuario**

- **Ruta:** `POST /usuarios`
- **Descripción:** Permite crear un nuevo usuario en la base de datos.
- **Validaciones:** Los siguientes campos deben ser validados:
  - `nombre`: String, debe tener entre 1 y 50 caracteres, requerido.
  - `apellido1`: String, debe tener entre 1 y 100 caracteres, requerido.
  - `apellido2`: String, opcional, máximo 100 caracteres.
  - `nacimiento`: Fecha, opcional.
  - `usuario`: String, debe tener entre 1 y 25 caracteres, requerido.
  - `correo`: String, debe ser un email válido, requerido.
  - `password`: String, debe tener entre 1 y 100 caracteres, requerido.
- **Modelo esperado:**

```json
`{
"nombre": "Juan",
"apellido1": "Pérez",
"apellido2": "Gómez",
"nacimiento": "1990-01-01",
"usuario": "juanperez",
"correo": "juan.perez@example.com",
"password": "securepassword"
}`
```

#### **4. Actualizar un usuario existente**

- **Ruta:** `PUT /usuarios`
- **Descripción:** Actualiza los datos de un usuario existente.
- **Validaciones:** Se deben validar los mismos campos que en la creación del usuario, con la adición de:
  - `_id`: String, requerido.
- **Modelo esperado:**

```json
{
  "_id": "60c72b2f5f1b2c001c8e4b8e",
  "nombre": "Juan",
  "apellido1": "Pérez",
  "apellido2": "Gómez",
  "nacimiento": "1990-01-01",
  "usuario": "juanperez",
  "correo": "juan.perez@example.com"
}
```

#### **5. Eliminar un usuario**

- **Ruta:** `DELETE /usuarios/:_id`
- **Descripción:** Elimina un usuario específico usando su `_id`.
- **Validaciones:** Se valida que `_id` sea un string no vacío y que esté presente en la solicitud.
- **Modelo esperado:**
  - Parámetro `_id` en la URL.

### Restaurantes

#### **1. Obtener todos los restaurantes**

- **Ruta:** `GET /restaurantes/all`
- **Descripción:** Este endpoint devuelve la lista de todos los restaurantes registrados.
- **Validaciones:** No requiere validaciones específicas.
- **Modelo esperado:** No se necesita un modelo para esta operación.

#### **2. Obtener un restaurante por su código**

- **Ruta:** `GET /restaurantes/code/:code`
- **Descripción:** Obtiene la información de un restaurante específico usando su `codigo_restaurante`.
- **Validaciones:** Se valida que `code` sea un string no vacío y que esté presente en la solicitud.
- **Modelo esperado:**
  - Parámetro `code` en la URL.

#### **3. Obtener un restaurante por su ID**

- **Ruta:** `GET /restaurantes/id/:_id`
- **Descripción:** Obtiene los detalles de un restaurante específico usando su `_id`.
- **Validaciones:** Se valida que `_id` sea un string no vacío y que esté presente en la solicitud.
- **Modelo esperado:**
  - Parámetro `_id` en la URL.

### Búsqueda de Restaurantes con Filtros

#### **4. Buscar Restaurantes con Filtros**

- **Ruta:** `GET /restaurantes/search`
- **Descripción:** Este endpoint permite buscar restaurantes basándose en varios filtros proporcionados en la consulta. Los filtros son opcionales, lo que significa que se puede proporcionar uno o más de los siguientes parámetros para afinar la búsqueda.
- **Validaciones:**

  - `latitud`: Número, debe estar entre -90 y 90, requerido.
  - `longitud`: Número, debe estar entre -180 y 180, requerido.
  - `nombre`: String, opcional.
  - `distrito`: String, opcional.
  - `tipo_cocina`: String, opcional.
  - `calificacion`: Número, opcional.

- **Modelo esperado (para la consulta):**

  ```json
  {
    "latitud": 19.432608,
    "longitud": -99.133209,
    "nombre": "El Buen Sabor",
    "distrito": "Centro",
    "tipo_cocina": "Mexicana",
    "calificación": 4
  }`
  ```

#### **5. Crear un nuevo restaurante**

- **Ruta:** `POST /restaurantes`
- **Descripción:** Permite crear un nuevo restaurante en la base de datos.
- **Validaciones:** Los siguientes campos deben ser validados:
  - `codigo_restaurante`: String, longitud de 6 caracteres, requerido.
  - `nombre`: String, mínimo 1 y máximo 100 caracteres, requerido.
  - `distrito`: String, mínimo 1 y máximo 100 caracteres, requerido.
  - `tipo_cocina`: String, mínimo 1 y máximo 100 caracteres, requerido.
  - `latitud`: Número, entre -90 y 90, requerido.
  - `longitud`: Número, entre -180 y 180, requerido.
  - `nombre_calle`: String, mínimo 5 y máximo 100 caracteres, requerido.
  - `numero_calle`: String, opcional, mínimo 1 y máximo 6 caracteres.
  - `cp`: String, alfanumérico, longitud de 5 caracteres, requerido.
- **Modelo esperado:**

  ```json
  {
    "codigo_restaurante": "ABC123",
    "nombre": "El Buen Sabor",
    "distrito": "Centro",
    "tipo_cocina": "Mexicana",
    "latitud": 19.432608,
    "longitud": -99.133209,
    "nombre_calle": "Calle 123",
    "numero_calle": "45",
    "cp": "06000"
  }
  ```

#### **6. Actualizar un restaurante existente**

- **Ruta:** `PUT /restaurantes`
- **Descripción:** Actualiza la información de un restaurante existente.
- **Validaciones:** Se deben validar los mismos campos que en la creación del restaurante, con la adición de:
  - `_id`: String, requerido.
- **Modelo esperado:**

```json
{
  "_id": "60c72b2f5f1b2c001c8e4b8f",
  "codigo_restaurante": "ABC123",
  "nombre": "El Buen Sabor",
  "distrito": "Centro",
  "tipo_cocina": "Mexicana",
  "latitud": 19.432608,
  "longitud": -99.133209,
  "nombre_calle": "Calle 123",
  "numero_calle": "45",
  "cp": "06000"
}
```

#### **7. Eliminar un restaurante**

- **Ruta:** `DELETE /restaurantes/:_id`
- **Descripción:** Elimina un restaurante específico usando su `_id`.
- **Validaciones:** Se valida que `_id` sea un string no vacío y que esté presente en la solicitud.
- **Modelo esperado:**
  - Parámetro `_id` en la URL.

### Reseñas

#### **1. Crear una nueva reseña**

- **Ruta:** `POST /reseñas`
- **Descripción:** Permite crear una nueva reseña para un restaurante específico.
- **Validaciones:** Los siguientes campos deben ser validados:
  - `calificacion`: Número, entre 1 y 5, opcional.
  - `comentario`: String, mínimo 1 y máximo 255 caracteres, opcional.
  - `usuario_id`: String, requerido.
  - `restaurante_id`: String, requerido.
- **Modelo esperado:**

  ```json
  {
    "calificacion": 4,
    "comentario": "Excelente servicio",
    "usuario_id": "60c72b2f5f1b2c001c8e4b90",
    "restaurante_id": "60c72b2f5f1b2c001c8e4b8f"
  }
  ```

#### **2. Actualizar una reseña existente**

- **Ruta:** `PUT /reseñas`
- **Descripción:** Actualiza la información de una reseña existente.
- **Validaciones:** Se deben validar los mismos campos que en la creación de la reseña, con la adición de:
  - `_id`: String, requerido.
- **Modelo esperado:**

  ````json
  {
    "_id": "60c72b2f5f1b2c001c8e4b91",
    "calificacion": 5,
    "comentario": "Mejor experiencia gastronómica",
    "usuario_id": "60c72b2f5f1b2c001c8e4b90",
    "restaurante_id": "60c72b2f5f1b2c001c8e4b8f"
  }```
  ````
