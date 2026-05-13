# 🔐 Seguridad - Gestión de Credenciales y .env

## Lo Que Pasó

Detectamos que el archivo `.env` con credenciales fue subido al repositorio en commits anteriores. Aunque ya no sirven, aquí está lo que hicimos para prevenir que vuelva a pasar.

## ✅ Lo Que Ya Hemos Hecho

### 1. Actualizado `.gitignore`
Se agregaron estas líneas para ignorar archivos de entorno:

```
# local env files
.env
.env.local
.env.*.local
.env.production.local
```

### 2. Creado `.env.example`
Archivo de ejemplo que muestra qué variables se necesitan, SIN credenciales reales:

```
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
...
```

### 3. Removido `.env` del Git Index
El archivo `.env` fue removido del repositorio con:
```bash
git rm --cached .env
```

Esto significa que el archivo continúa en tu computadora pero Git ya no lo rastreará.

## 🚨 Importante: Limpiar el Histórico (Para El Servidor)

Si el repositorio está en GitHub/GitLab y alguien ya vio las credenciales, necesitas hacer esto INMEDIATAMENTE:

### Opción 1: Si el repositorio es privado (SEGURO)
No hay problema si solo ustedes lo ven. Pero cambien las credenciales en Railway/Base de datos por si acaso.

### Opción 2: Si el repositorio es público (CRÍTICO)
Ejecuten esto para remover el `.env` completamente del histórico:

```bash
# Instalar BFG Repo-Cleaner (una sola vez)
brew install bfg

# Clonar mirror del repo
git clone --mirror https://github.com/usuario/Concept-Store.git
cd Concept-Store.git

# Remover archivos .env del histórico
bfg --delete-files .env

# Aplicar cambios
git reflog expire --expire=now --all && git gc --prune=now --aggressive

# Pushear cambios de vuelta
git push --force
```

## 📋 Instrucciones Para El Equipo

### Para cada miembro:

1. **Copiar el archivo de ejemplo:**
   ```bash
   cp .env.example .env.local
   ```

2. **Editar `.env.local` con credenciales reales** (SIN commits):
   ```bash
   nano .env.local  # o usa tu editor favorito
   ```

3. **NUNCA commitar `.env` o `.env.local`:**
   ```bash
   # ❌ NUNCA hagas esto
   git add .env
   git commit -m "add env file"
   
   # ✅ SI necesitas verificar que no va a ser commiteado
   git status  # Debería mostrar .env como untracked pero IGNORED
   ```

## 🔄 Workflow Correcto Para El Equipo

```bash
# 1. Clonar el repo
git clone https://github.com/usuario/Concept-Store.git
cd Concept-Store

# 2. Crear archivo local de entorno
cp .env.example .env.local

# 3. Editar con credenciales reales
nano .env.local

# 4. Instalar dependencias
npm install

# 5. Correr proyecto
npm run dev

# 6. NUNCA hacer git add .env o .env.local
# Git automáticamente los ignorará
```

## ✋ Git Pre-commit Hook (Protección Extra)

Opcionalmente, pueden agregar un pre-commit hook para que Git les advierta si intentan commitar un archivo `.env`:

**Crear `.git/hooks/pre-commit`:**

```bash
#!/bin/bash
# Prevenir que archivos .env sean commiteados

if git diff --cached --name-only | grep -E "\.env$|\.env\.local$|\.env\.\w+\.local$"; then
    echo "ERROR: You are trying to commit .env files!"
    echo "Never commit .env files with credentials."
    echo ""
    echo "Use .env.example instead and add your local .env to .gitignore"
    exit 1
fi
```

Hacer ejecutable:
```bash
chmod +x .git/hooks/pre-commit
```

## 🔍 Verificar Que Todo Esté Seguro

```bash
# Ver archivos ignorados
git status --ignored

# Ver archivos siendo trackeados
git ls-files

# Buscar archivos .env en el histórico (no debería mostrar nada)
git log --all --full-history -- ".env" | grep -c "commit"
```

## 📖 Referencias

- [Git .gitignore Documentation](https://git-scm.com/docs/gitignore)
- [GitHub - Removing Sensitive Data](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)
- [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/)

---

## Resumen Rápido

| Acción | Resultado |
|--------|-----------|
| ✅ Actualizado `.gitignore` | `.env` ya no será trackeado |
| ✅ Creado `.env.example` | Equipo sabe qué variables usar |
| ✅ Removido `.env` del índice | No se commitea más |
| ✅ Git commit seguro | Histórico limpio hacia adelante |
| ⚠️ Histórico antiguo | Contiene .env (solo visible si público) |

**Próximo paso:** Si el repo es público, ejecuten el comando BFG para limpiar el histórico completamente.
