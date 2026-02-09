#!/usr/bin/env node

/**
 * Script para verificar la accesibilidad de la imagen del blog post
 * y los meta tags para compartir en redes sociales
 */

const https = require('https');
const http = require('http');

const IMAGE_URL = 'https://adasoft.com.ar/images/profesionales-oficios-portada.jpg';
const BLOG_URL = 'https://adasoft.com.ar/#/blog/profesionales-oficios-jujuy';

console.log('🔍 Verificando accesibilidad de imagen y meta tags...\n');

// Función para hacer petición HTTP/HTTPS
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

// Verificar imagen
async function verifyImage() {
  console.log('📸 Verificando imagen...');
  console.log(`   URL: ${IMAGE_URL}\n`);
  
  try {
    const response = await fetchUrl(IMAGE_URL);
    
    if (response.status === 200) {
      console.log('✅ Imagen accesible (HTTP 200)');
      console.log(`   Content-Type: ${response.headers['content-type']}`);
      console.log(`   Content-Length: ${(parseInt(response.headers['content-length']) / 1024).toFixed(2)} KB`);
      console.log(`   Access-Control-Allow-Origin: ${response.headers['access-control-allow-origin'] || 'No especificado'}`);
      
      // Verificar que sea HTTPS
      if (IMAGE_URL.startsWith('https://')) {
        console.log('✅ URL usa HTTPS (requerido por WhatsApp)');
      } else {
        console.log('❌ URL no usa HTTPS (WhatsApp requiere HTTPS)');
      }
      
      // Verificar tamaño (WhatsApp recomienda menos de 1MB)
      const sizeKB = parseInt(response.headers['content-length']) / 1024;
      if (sizeKB < 1024) {
        console.log(`✅ Tamaño de imagen: ${sizeKB.toFixed(2)} KB (óptimo para WhatsApp)`);
      } else {
        console.log(`⚠️  Tamaño de imagen: ${(sizeKB / 1024).toFixed(2)} MB (puede ser demasiado grande para WhatsApp)`);
      }
      
    } else {
      console.log(`❌ Imagen no accesible (HTTP ${response.status})`);
    }
  } catch (error) {
    console.log(`❌ Error al verificar imagen: ${error.message}`);
  }
  
  console.log('\n');
}

// Verificar meta tags en la página del blog
async function verifyMetaTags() {
  console.log('🏷️  Verificando meta tags en la página del blog...');
  console.log(`   URL: ${BLOG_URL}\n`);
  
  try {
    const response = await fetchUrl(BLOG_URL);
    
    if (response.status === 200) {
      const html = response.body;
      
      // Verificar meta tags Open Graph
      const ogImage = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
      const ogTitle = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i);
      const ogDescription = html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i);
      
      if (ogImage) {
        console.log(`✅ og:image encontrado: ${ogImage[1]}`);
        if (ogImage[1] === IMAGE_URL) {
          console.log('   ✅ URL de imagen coincide');
        } else {
          console.log(`   ⚠️  URL de imagen no coincide (esperado: ${IMAGE_URL})`);
        }
      } else {
        console.log('❌ og:image no encontrado');
      }
      
      if (ogTitle) {
        console.log(`✅ og:title encontrado: ${ogTitle[1]}`);
      } else {
        console.log('❌ og:title no encontrado');
      }
      
      if (ogDescription) {
        console.log(`✅ og:description encontrado: ${ogDescription[1].substring(0, 80)}...`);
      } else {
        console.log('❌ og:description no encontrado');
      }
      
      // Verificar que la imagen en og:image use HTTPS
      if (ogImage && ogImage[1].startsWith('https://')) {
        console.log('✅ og:image usa HTTPS');
      } else if (ogImage) {
        console.log('❌ og:image no usa HTTPS (WhatsApp requiere HTTPS)');
      }
      
    } else {
      console.log(`❌ Página no accesible (HTTP ${response.status})`);
    }
  } catch (error) {
    console.log(`❌ Error al verificar meta tags: ${error.message}`);
    console.log('   Nota: Si usas HashRouter, los meta tags pueden generarse dinámicamente en el cliente');
  }
  
  console.log('\n');
}

// Verificar con herramientas externas
function showExternalTools() {
  console.log('🔧 Herramientas externas para verificar:');
  console.log('\n1. Facebook Sharing Debugger:');
  console.log('   https://developers.facebook.com/tools/debug/');
  console.log(`   Ingresa: ${BLOG_URL}`);
  console.log('\n2. LinkedIn Post Inspector:');
  console.log('   https://www.linkedin.com/post-inspector/');
  console.log(`   Ingresa: ${BLOG_URL}`);
  console.log('\n3. WhatsApp:');
  console.log('   Comparte el link en WhatsApp y verifica el preview');
  console.log('   Si no aparece, usa el depurador de Facebook primero');
  console.log('\n4. Verificar imagen directamente:');
  console.log(`   Abre en el navegador: ${IMAGE_URL}`);
  console.log('\n');
}

// Ejecutar verificaciones
async function main() {
  await verifyImage();
  await verifyMetaTags();
  showExternalTools();
  
  console.log('✨ Verificación completada');
  console.log('\n💡 Consejos:');
  console.log('   - Si WhatsApp no muestra la imagen, limpia el caché usando el depurador de Facebook');
  console.log('   - Asegúrate de que la imagen esté optimizada (menos de 1MB recomendado)');
  console.log('   - Verifica que la URL de la imagen sea exactamente: ' + IMAGE_URL);
}

main().catch(console.error);
