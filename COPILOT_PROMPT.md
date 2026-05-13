# Prompt para GitHub Copilot/Codex - Concept Store

> **Cómo usar este prompt**: Copia el contenido debajo de "## Instrucciones Principales" y pégalo en GitHub Copilot o Codex. El AI generará el código necesario.

## Contexto General

**Proyecto**: Concept Store - Aplicación Next.js de gestión de productos

**Estado Actual**:
- Funciona en modo DEMO sin BD (DEMO_MODE=true)
- Puede conectarse a MySQL si se cambia DEMO_MODE=false
- Documentación simplificada (solo README.md)
- API fully functional con validaciones

**Tecnologías**: Next.js 14, React 18, Tailwind CSS, MySQL (opcional), Cloudinary (opcional)

---

## Instrucciones Principales

Copia esto en Copilot/Codex:

```
Eres un experto en Next.js 14 y desarrollo full-stack.
Trabajas en un proyecto llamado "Concept Store" que es una aplicación de gestión de productos.

## Contexto del Proyecto:
- Framework: Next.js 14 (App Router)
- UI: Tailwind CSS
- BD: MySQL2 (opcional, solo si DEMO_MODE=false)
- Imágenes: Cloudinary (opcional, solo si DEMO_MODE=false)
- Modo DEMO: Está implementado y funcionando

## Estructura de Carpetas:
- src/app/api/products/route.js - API GET/POST productos
- src/app/api/products/[id_product]/route.js - API GET/PUT/DELETE producto
- src/data/demo.js - Datos de ejemplo
- src/libs/useDatabase.js - Abstracción de BD (DEMO vs DATABASE)
- src/components/ - Componentes React
- README.md - Documentación

## Requisitos para TODO cambio de código:

### 1. Validaciones
- Nombre: requerido, max 100 caracteres
- Precio: requerido, número, > 0
- Descripción: opcional, string
- ID: número positivo válido
- Imagen: JPEG/PNG/WebP/GIF, max 5MB

### 2. Respuestas API
SIEMPRE retornar objeto con esta estructura:
```json
{
  "success": true/false,
  "data": {...},
  "message": "Descripción clara",
  "mode": "demo" o "database"
}
```

### 3. Soporte Dual (DEMO/DATABASE)
- Si DEMO_MODE=true: usar src/data/demo.js
- Si DEMO_MODE=false: usar BD MySQL
- Usar getDatabase() de src/libs/useDatabase.js
- Las operaciones deben tener la misma interfaz en ambos modos

### 4. Importaciones
- Importar Cloudinary solo cuando DEMO_MODE=false (lazy load)
- Importar MySQL solo cuando DEMO_MODE=false (lazy load)
- Nunca importar de forma fija, siempre lazy

### 5. UI/UX
- Agregar validación en formularios
- Mostrar mensajes de error claros
- Loading states durante operaciones
- Respetar Tailwind CSS para estilos

## Tarea a Realizar:

[DESCRIBE AQUÍ EXACTAMENTE QUÉ QUIERES HACER]

Ejemplo:
- Agregar filtro de búsqueda en la página de productos
- Crear página de detalles expandida
- Agregar carrito de compras
- Agregar categorías de productos
- Mejorar el formulario
- Etc.

## Lo que debes hacer:

1. Analizar el código existente
2. Proponer cambios (si aplica)
3. Escribir código que siga patrones existentes
4. Mantener compatibilidad con ambos modos (DEMO/DATABASE)
5. Incluir validaciones apropiadas
6. Retornar respuestas bien formateadas

Comienza a trabajar.
```

---

## Ejemplos de Tareas Completas

### Ejemplo 1: Agregar búsqueda de productos

```
Tarea: Agregar funcionalidad de búsqueda de productos

Requisitos:
- Campo de búsqueda en la navbar o página de productos
- Buscar por nombre y descripción
- En tiempo real o con botón de búsqueda
- Debe funcionar en ambos modos (DEMO y DATABASE)
- Mostrar "No hay resultados" si no encuentra nada

Debes:
1. Modificar o crear componente de búsqueda
2. Agregar endpoint GET /api/products?search=query (opcional)
3. Filtrar productos en el frontend
4. Actualizar UI para mostrar resultados

Restricciones:
- Mantener estructura de carpetas actual
- No modificar archivos de configuración
- Usar Tailwind para estilos
```

### Ejemplo 2: Agregar categorías de productos

```
Tarea: Agregar soporte para categorías de productos

Requisitos:
- Agregar campo "category" a productos
- Filtro por categoría
- Actualizar demo.js con categorías
- Guardar categoría en BD (si DEMO_MODE=false)
- Actualizar componentes

Debes:
1. Modificar src/data/demo.js (agregar category a cada producto)
2. Modificar schema BD si es necesario (category VARCHAR)
3. Actualizar API routes para manejar categorías
4. Agregar filtro en UI
5. Validar que category sea string válido

Restricciones:
- Mantener compatibilidad con código existente
- Las categorías deben ser predefinidas o custom
```

### Ejemplo 3: Mejorar el formulario de productos

```
Tarea: Mejorar ProductForm.jsx con validaciones en tiempo real

Requisitos:
- Validación mientras escribe (debounced)
- Indicadores visuales de validez
- Mejor manejo de errores
- Preview de imagen mejorado
- Estados visuales (valid/invalid/pending)

Debes:
1. Actualizar src/components/ProductForm.jsx
2. Agregar validaciones debounced
3. Agregar estilos Tailwind para estados
4. Mejorar UX del formulario
5. Mantener funcionalidad actual

Restricciones:
- No cambiar estructura de datos
- Seguir patrones de validación existentes
- Usar React hooks nativos (no librerías extra)
```

---

## Notas Importantes

### Cambiar entre DEMO y DATABASE

Para cambiar a modo DATABASE:

1. Editar `.env.local`:
   ```
   DEMO_MODE=false
   MYSQL_HOST=localhost
   MYSQL_USER=root
   MYSQL_PASSWORD=tu_contraseña
   MYSQL_PORT=3306
   MYSQL_DATABASE=concept_store
   ```

2. Ejecutar schema:
   ```bash
   mysql -u root -p concept_store < database/db.sql
   ```

3. Reiniciar servidor

### Testing

Para probar cambios:

```bash
npm run dev
# Luego en otra terminal:
curl http://localhost:3000/api/products
```

### Archivos Importantes

- **API Routes**: src/app/api/products/
- **Componentes**: src/components/
- **Datos Demo**: src/data/demo.js
- **BD Abstraction**: src/libs/useDatabase.js
- **Config**: .env.local (local, ignorado en git)

---

## Estilo de Código

### Principios
- Clean code
- Validaciones robustas
- Manejo de errores claro
- Comentarios cuando sea necesario
- Nombres de variables descriptivos

### Ejemplo de estilo:

```javascript
// ❌ Malo
const x = data.get("n");
if (!x) throw "error";

// ✅ Bueno
const productName = data.get("name");
if (!productName?.trim()) {
  return NextResponse.json(
    { message: "Product name is required", success: false },
    { status: 400 }
  );
}
```

---

## Checklist para TODO cambio

Después de que Copilot genere código, verifica:

- [ ] Validaciones implementadas
- [ ] Respuestas JSON bien formateadas
- [ ] Funciona en modo DEMO
- [ ] Funciona en modo DATABASE (si aplica)
- [ ] Sin imports fijos de Cloudinary/MySQL
- [ ] Estilos con Tailwind CSS
- [ ] Manejo de errores
- [ ] Mensajes amigables
- [ ] Documentación en README actualizada

---

## ¿Necesitas Más?

Si necesitas cambios más específicos, proporcioná:

1. **Qué**: Descripción clara de la funcionalidad
2. **Por qué**: Contexto o razón del cambio
3. **Cómo**: Comportamiento esperado (pasos, ejemplos)
4. **Restricciones**: Limitaciones (BD, librerías, etc)

¡Listo para trabajar! 🚀
