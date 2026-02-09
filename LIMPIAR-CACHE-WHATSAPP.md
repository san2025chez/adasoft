# 📱 Cómo Limpiar el Caché de WhatsApp en Android

WhatsApp cachea los previews de links de forma muy agresiva. Si la imagen no aparece después de actualizar, sigue estos pasos:

## 🔧 Método 1: Limpiar Caché de WhatsApp (Recomendado)

### Pasos:
1. **Abre la configuración de Android:**
   - Ve a **Configuración** → **Aplicaciones** (o **Apps**)
   - Busca **WhatsApp** en la lista

2. **Accede al almacenamiento:**
   - Toca en **WhatsApp**
   - Toca en **Almacenamiento** (o **Storage**)

3. **Limpia el caché:**
   - Toca en **Limpiar caché** (o **Clear cache**)
   - ⚠️ **NO toques "Borrar datos"** (eso borraría tus chats)

4. **Reinicia WhatsApp:**
   - Cierra completamente WhatsApp
   - Vuelve a abrirlo

5. **Prueba compartir el link nuevamente**

## 🔧 Método 2: Forzar Re-scraping con Facebook Debugger

1. **Abre el depurador de Facebook:**
   - Ve a: https://developers.facebook.com/tools/debug/
   - Ingresa la URL: `https://adasoft.com.ar/blog/profesionales-oficios-jujuy.html`
   - Haz clic en **"Scrape Again"** varias veces (3-5 veces)
   - Esto fuerza a Facebook/WhatsApp a re-leer los meta tags

2. **Espera 5-10 minutos** después de hacer el re-scraping

3. **Prueba compartir el link en WhatsApp nuevamente**

## 🔧 Método 3: Agregar Parámetro de Caché Buster (Temporal)

Si necesitas probar inmediatamente, puedes compartir esta URL con un parámetro único:

```
https://adasoft.com.ar/blog/profesionales-oficios-jujuy.html?v=2
```

Esto fuerza a WhatsApp a leer la página como si fuera nueva.

## 🔧 Método 4: Usar WhatsApp Web

1. Abre WhatsApp Web en tu computadora
2. Comparte el link desde ahí
3. A veces WhatsApp Web tiene un caché diferente

## ⏰ Tiempo de Espera

WhatsApp puede tardar entre **5 minutos y 24 horas** en actualizar el caché. Si después de limpiar el caché y usar el depurador de Facebook aún no aparece:

1. Espera al menos 1 hora
2. Vuelve a usar el depurador de Facebook
3. Prueba compartir el link nuevamente

## ✅ Verificación

Para verificar que los meta tags están correctos:

1. Abre esta URL en tu navegador:
   ```
   https://adasoft.com.ar/blog/profesionales-oficios-jujuy.html
   ```

2. Verifica que en el código fuente (Ctrl+U) aparezca:
   ```html
   <meta property="og:image" content="https://adasoft.com.ar/images/oficios.png" />
   <meta property="og:image:width" content="1024" />
   <meta property="og:image:height" content="630" />
   ```

3. Verifica que la imagen sea accesible:
   ```
   https://adasoft.com.ar/images/oficios.png
   ```

## 🐛 Si Aún No Funciona

1. **Verifica que el deploy se haya completado:**
   - Asegúrate de que el archivo HTML estático esté en el servidor
   - Verifica que la imagen esté accesible públicamente

2. **Usa el depurador de Facebook:**
   - Ve a: https://developers.facebook.com/tools/debug/
   - Ingresa la URL y verifica que muestre la imagen correcta
   - Si muestra la imagen en el preview de Facebook, WhatsApp debería mostrarla también

3. **Verifica el formato de la imagen:**
   - WhatsApp prefiere imágenes JPG o PNG
   - Tamaño recomendado: menos de 1MB
   - Dimensiones recomendadas: 1200x630 (aunque 1024x630 también funciona)

## 📝 Notas Importantes

- **WhatsApp cachea por URL**: Si cambias la URL (agregando parámetros), WhatsApp la tratará como nueva
- **El caché es por dispositivo**: Limpiar el caché en un dispositivo no afecta a otros
- **WhatsApp Web tiene caché separado**: Puede tener un caché diferente al móvil
