# Concept Store - Setup Instructions

Todas las dependencias están actualizadas y las correcciones de seguridad están implementadas. Aquí te digo exactamente qué hacer para ejecutar el proyecto.

## ✅ Ya Completado

- ✅ Actualización de Axios (1.16.0) - Todas las vulnerabilidades SSRF, DoS y prototype pollution fueron solucionadas
- ✅ Actualización de Cloudinary (2.10.0) - Arbitrary argument injection fue arreglado
- ✅ Validación de SSL en conexión MySQL - Ahora es segura en producción
- ✅ Validación de entrada en todos los API endpoints
- ✅ Validación de archivos (tamaño máx 5MB, tipos permitidos)
- ✅ Mejor manejo de errores y respuestas consistentes en JSON
- ✅ Mejora del formulario de productos con validaciones en cliente
- ✅ Corrección de configuración Tailwind CSS

## 📋 Pasos para Ejecutar

### 1. Instalar las Dependencias

```bash
npm install
```

**IMPORTANTE:** La carpeta `node_modules` ya existe pero puede estar incompleta. El comando `npm install` va a descargar todos los paquetes necesarios.

### 2. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con tus credenciales:

```
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=tu_contraseña
MYSQL_PORT=3306
MYSQL_DATABASE=nombre_de_tu_base_datos

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu_cloudinary_cloud_name
CLOUDINARY_API_KEY=tu_cloudinary_api_key
CLOUDINARY_API_SECRET=tu_cloudinary_api_secret

NODE_ENV=development
```

### 3. Crear la Base de Datos

Primero, asegúrate de que MySQL está corriendo, luego:

```bash
mysql -u tu_usuario -p < database/db.sql
```

Reemplaza `tu_usuario` con tu usuario de MySQL. Se te pedirá que ingreses tu contraseña.

### 4. Ejecutar el Proyecto

```bash
npm run dev
```

El proyecto estará disponible en: **http://localhost:3000**

## 🔧 Otros Comandos Útiles

```bash
# Build para producción
npm run build

# Ejecutar la versión de producción localmente
npm run build
npm run start

# Ejecutar linting
npm run lint

# Ver dependencias desactualizadas
npm outdated

# Ver vulnerabilidades actuales
npm audit
```

## 📦 Cambios en las Respuestas de la API

Las API ahora retornan respuestas consistentes con esta estructura:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Nombre del Producto",
    "price": 99.99,
    "description": "Descripción",
    "image": "https://cloudinary.com/..."
  },
  "message": "Product created successfully"
}
```

### Si tu código frontend esperaba la estructura anterior

Si tienes componentes que esperan la estructura vieja, necesitas actualizar:

**Antes:**
```javascript
const product = res.data[0]; // Array
```

**Ahora:**
```javascript
const product = res.data.data; // Objeto dentro de data
```

**Ya está actualizado:** El archivo `ProductForm.jsx` ya fue corregido para manejar ambos formatos.

## 🔒 Validaciones Implementadas

### En Cliente (ProductForm.jsx):
- ✅ Nombre requerido y máx 100 caracteres
- ✅ Precio válido y mayor a 0
- ✅ Imagen requerida solo para productos nuevos
- ✅ Tipo de imagen validado (JPEG, PNG, WebP, GIF)
- ✅ Tamaño máximo de imagen 5MB
- ✅ Mensajes de error y éxito al usuario

### En Servidor (API Routes):
- ✅ Validación de todos los campos
- ✅ Sanitización de entrada
- ✅ Validación de ID de producto (debe ser número positivo)
- ✅ Límite de tamaño de archivo
- ✅ Validación de tipo MIME
- ✅ Manejo robusto de errores

## 🆘 Solución de Problemas

### Error: "Can't find module 'mysql2'"
```bash
npm install
```

### Error: "Port 3000 is already in use"
```bash
npm run dev -- -p 3001  # Usa puerto 3001
```

### Error: "Connection refused to MySQL"
- Verifica que MySQL está corriendo
- Verifica credenciales en `.env.local`
- Verifica que la base de datos existe

### Error: "Image upload failed"
- Verifica que Cloudinary está configurado en `.env.local`
- Comprueba que la imagen es JPEG, PNG, WebP o GIF
- Verifica que el archivo no excede 5MB

### npm install toma mucho tiempo
Esto es normal la primera vez. Las dependencias están siendo descargadas. Puedes esperar o usar un gestión de paquetes más rápido:

```bash
npm install --verbose  # Para ver el progreso
```

## 📊 Dependencias Principales

| Paquete | Versión | Estado |
|---------|---------|--------|
| Next.js | 14.2.4 | ✅ Estable |
| React | 18.3.1 | ✅ Estable |
| MySQL2 | 3.10.1 | ✅ Estable |
| Axios | 1.16.0 | ✅ Actualizado (vulnerable → seguro) |
| Cloudinary | 2.10.0 | ✅ Actualizado (vulnerable → seguro) |
| Tailwind CSS | 3.4.4 | ✅ Estable |

## 📝 Notas Importantes

1. **node_modules:** Ya existe una carpeta `node_modules` pero puede estar incompleta. `npm install` va a completar/actualizar todo.

2. **Package Lock:** El archivo `package-lock.json` ya está actualizado con las nuevas versiones.

3. **Seguridad:** Todas las vulnerabilidades críticas en dependencias de producción (Axios, Cloudinary) han sido resueltas.

4. **DevDependencies:** Algunas vulnerabilidades moderadas en eslint, glob, etc. no afectan a la aplicación en producción.

---

¡Listo! El proyecto está preparado. Solo necesitas ejecutar `npm install` y configurar las variables de entorno.
