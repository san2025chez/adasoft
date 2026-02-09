# 🔍 Guía para Verificar Accesibilidad de Imagen en WhatsApp

## ✅ Verificación Rápida

### 1. Verificar que la imagen sea accesible públicamente

Abre esta URL en tu navegador:
```
https://adasoft.com.ar/images/profesionales-oficios-portada.jpg
```

**Resultado esperado:** Debe mostrar la imagen sin errores.

### 2. Verificar headers HTTP de la imagen

Ejecuta en la terminal:
```bash
curl -I https://adasoft.com.ar/images/profesionales-oficios-portada.jpg
```

**Resultado esperado:**
- `HTTP/2 200` (éxito)
- `content-type: image/jpeg`
- `access-control-allow-origin: *` (permite acceso desde cualquier origen)

### 3. Verificar tamaño de la imagen

**Recomendación de WhatsApp:**
- Tamaño máximo: **1 MB** (1,024 KB)
- Dimensiones recomendadas: **1200x630px**
- Formato: JPG o PNG

**Verificar tamaño:**
```bash
ls -lh public/images/profesionales-oficios-portada.jpg
```

Si la imagen es mayor a 1 MB, optimízala usando:
- [TinyPNG](https://tinypng.com/) - Comprime sin perder calidad
- [Squoosh](https://squoosh.app/) - Optimizador avanzado de Google
- ImageMagick: `convert -quality 85 -resize 1200x630 input.jpg output.jpg`

### 4. Verificar meta tags con herramientas externas

#### Facebook Sharing Debugger (Recomendado)
1. Ve a: https://developers.facebook.com/tools/debug/
2. Ingresa la URL del blog: `https://adasoft.com.ar/#/blog/profesionales-oficios-jujuy`
3. Haz clic en "Debug"
4. Revisa que aparezca:
   - ✅ `og:image` con la URL correcta
   - ✅ `og:title` con el título del post
   - ✅ `og:description` con la descripción
5. Si hay errores, haz clic en "Scrape Again" para limpiar el caché

#### LinkedIn Post Inspector
1. Ve a: https://www.linkedin.com/post-inspector/
2. Ingresa la URL del blog
3. Verifica el preview

### 5. Verificar en WhatsApp

1. **Comparte el link** del blog post en WhatsApp
2. **Verifica el preview** que aparece:
   - ✅ Debe mostrar la imagen
   - ✅ Debe mostrar el título
   - ✅ Debe mostrar la descripción

**Si no aparece la imagen:**
- Usa el depurador de Facebook primero para limpiar el caché
- Espera unos minutos (WhatsApp cachea los previews)
- Verifica que la URL de la imagen sea exactamente: `https://adasoft.com.ar/images/profesionales-oficios-portada.jpg`

## 🔧 Solución de Problemas

### Problema: La imagen no aparece en WhatsApp

**Causas posibles:**
1. **Caché de WhatsApp** - Usa el depurador de Facebook para limpiar
2. **Tamaño de imagen** - Optimiza a menos de 1 MB
3. **URL incorrecta** - Verifica que la URL sea exacta y use HTTPS
4. **Meta tags no actualizados** - Los meta tags se generan dinámicamente, puede tomar tiempo

**Solución:**
```bash
# 1. Verificar que la imagen sea accesible
curl -I https://adasoft.com.ar/images/profesionales-oficios-portada.jpg

# 2. Verificar tamaño
ls -lh public/images/profesionales-oficios-portada.jpg

# 3. Usar el depurador de Facebook
# https://developers.facebook.com/tools/debug/
```

### Problema: La imagen aparece pero es muy grande

**Solución:**
```bash
# Optimizar imagen con ImageMagick (si está instalado)
convert -quality 85 -resize 1200x630^ \
  -gravity center -extent 1200x630 \
  public/images/profesionales-oficios-portada.jpg \
  public/images/profesionales-oficios-portada-optimized.jpg
```

### Problema: Los meta tags muestran la imagen incorrecta

**Causa:** Los meta tags se generan dinámicamente en React. WhatsApp puede estar leyendo los meta tags estáticos del `index.html`.

**Solución:**
1. Verifica en la consola del navegador que los meta tags se actualicen correctamente
2. Usa el depurador de Facebook para forzar la actualización
3. Asegúrate de que el código en `BlogPost.js` esté actualizando los meta tags correctamente

## 📋 Checklist de Verificación

- [ ] La imagen es accesible públicamente (HTTP 200)
- [ ] La imagen usa HTTPS (no HTTP)
- [ ] El tamaño de la imagen es menor a 1 MB
- [ ] Las dimensiones son 1200x630px (recomendado)
- [ ] Los meta tags `og:image` apuntan a la URL correcta
- [ ] Los meta tags se actualizan dinámicamente en el cliente
- [ ] El depurador de Facebook muestra la imagen correcta
- [ ] WhatsApp muestra el preview correctamente

## 🚀 Script de Verificación Automática

Ejecuta el script incluido:
```bash
node verify-image-accessibility.js
```

Este script verifica automáticamente:
- ✅ Accesibilidad de la imagen
- ✅ Headers HTTP
- ✅ Tamaño de la imagen
- ✅ Meta tags en la página
- ✅ Uso de HTTPS

## 📞 Notas Importantes

1. **WhatsApp cachea los previews** - Puede tomar varios minutos en actualizarse
2. **Los meta tags se generan dinámicamente** - React actualiza los meta tags en el cliente
3. **El depurador de Facebook es esencial** - Úsalo siempre antes de compartir en WhatsApp
4. **La imagen debe ser pública** - No puede estar en localhost o detrás de autenticación
