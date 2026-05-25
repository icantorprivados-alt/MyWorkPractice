# 🎓 Instituto Nacional Albert Camus — Landing Page

> **Proyecto:** Landing Page Oficial INAC  
> **Tecnologías:** HTML5 · CSS3 · JavaScript (Vanilla ES6+)  
> **Diseño:** Luxury Academic — Cormorant Garamond + DM Sans · Paleta Navy/Gold/Ivory  

---

## 📁 Estructura del Proyecto

```
inac-landing/
├── index.html      → Estructura y contenido (HTML semántico + accesible)
├── styles.css      → Estilos completos con variables CSS y media queries
├── script.js       → Interactividad: navbar, validación, animaciones
└── README.md       → Documentación del proyecto
```

---

## 🌐 Secciones de la Landing Page

| # | Sección | Descripción |
|---|---------|-------------|
| 1 | **Hero** | Imagen de fondo, título institucional, subtítulo y botones CTA |
| 2 | **Navbar** | Barra de navegación fija con anclas, efecto scroll y menú hamburguesa |
| 3 | **Nosotros** | Descripción institucional, misión, valores y pilares educativos |
| 4 | **Servicios** | 4 tarjetas de bachilleratos con CSS Grid y efectos hover/tilt |
| 5 | **Matrícula 2027** | Formulario de inscripción con validación completa en JavaScript |
| 6 | **Footer** | Redes sociales, contacto, enlaces, año dinámico y créditos |

---

## 🎓 Bachilleratos Ofertados

- 📚 **Bachillerato General** — Formación humanística y científica integral
- 💻 **Bachillerato en Software** — Programación, desarrollo web/móvil e IA básica
- 💼 **Bachillerato en Contabilidad** — Finanzas, contabilidad y software contable
- 🏥 **Bachillerato en Salud** — Biología, química, anatomía y salud pública

---

## 📋 Formulario de Matrícula 2027

El formulario solicita los siguientes datos del estudiante:

| Campo | Tipo | Validación |
|-------|------|------------|
| Nombre(s) | Texto | Mínimo 2 caracteres |
| Apellido(s) | Texto | Mínimo 2 caracteres |
| DUI / Pasaporte | Texto | Formato DUI o pasaporte válido |
| Fecha de Nacimiento | Date | Entre 12 y 40 años de edad |
| Bachillerato de Interés | Select | Debe seleccionar una opción |
| Teléfono de Contacto | Tel | 7-15 dígitos válidos |
| Correo Electrónico | Email | Formato email válido (recibe información de matrícula) |
| Municipio / Ciudad | Texto | Mínimo 2 caracteres |
| Aceptación de términos | Checkbox | Obligatorio |

### Flujo del formulario:
1. El usuario completa el formulario con sus datos
2. Se ejecuta validación en tiempo real (blur) y al enviar (submit)
3. Si hay errores, se resalta el campo y se muestra el mensaje de error
4. Si todo es válido, se simula el envío del correo con la información de matrícula
5. Se muestra un mensaje de confirmación de envío exitoso

---

## ⚡ Funcionalidades JavaScript

### 1. Navbar
- Efecto `scrolled` al hacer scroll (fondo translúcido + blur)
- Resaltado del link activo según la sección visible
- Menú hamburguesa con animación circular `clip-path`
- Cierre al hacer clic fuera del menú o presionar `Escape`

### 2. Scroll Reveal
- `IntersectionObserver` para animaciones de entrada al hacer scroll
- Efecto `fadeUp` con `transitionDelay` para elementos en grilla

### 3. Validación de Formulario
- Validación campo por campo con reglas individuales
- Feedback visual (borde verde = válido, borde rojo = error)
- Accesibilidad: `aria-invalid`, `role="alert"`, `aria-required`
- Estado de carga en el botón durante el envío simulado
- Estado de éxito con opción de resetear el formulario

### 4. Card Tilt
- Efecto de perspectiva 3D sutil al pasar el mouse sobre las tarjetas de servicio

### 5. Smooth Scroll
- Anclaje suave con offset para compensar la altura del navbar fijo

---

## 📱 Responsive Design — Breakpoints

| Breakpoint | Ancho | Cambios principales |
|------------|-------|---------------------|
| Desktop | > 1200px | Layout completo, grid 4 columnas servicios |
| Large | ≤ 1200px | Grid servicios → 2 columnas |
| Medium | ≤ 960px | Nosotros y Matrícula en columna única |
| Tablet | ≤ 768px | Menú hamburguesa activado, grid 1 columna |
| Mobile | ≤ 480px | Ajuste tipografía y espaciado |
| Small | ≤ 360px | Mínimo tipográfico adaptado |

---

## 🎨 Paleta de Colores

```css
--navy:       #0d1b2a   /* Fondo principal oscuro */
--navy-mid:   #162637   /* Variante media */
--gold:       #c9a84c   /* Color de acento dorado */
--gold-light: #e8c97a   /* Dorado claro */
--ivory:      #f7f3ec   /* Fondo secciones claras */
--white:      #ffffff   /* Blanco puro */
```

### Colores de tarjetas por bachillerato:
- General      → `#c9a84c` (Dorado)
- Software     → `#2563eb` (Azul) ⭐ Tarjeta destacada
- Contabilidad → `#059669` (Verde)
- Salud        → `#e11d48` (Rosa)

---

## 🔤 Tipografía

| Fuente | Uso | Pesos |
|--------|-----|-------|
| **Cormorant Garamond** | Títulos, hero, quotes | 300 · 400 · 600 · 700 (italic) |
| **DM Sans** | Cuerpo, labels, navbar | 300 · 400 · 500 · 600 |

> Importadas desde Google Fonts vía `<link>` en el `<head>`.

---

## ♿ Accesibilidad

- HTML semántico: `<nav>`, `<section>`, `<article>`, `<footer>`, `<address>`
- Atributos `aria-label`, `aria-labelledby`, `aria-required`, `aria-invalid`, `aria-expanded`
- `role="alert"` en mensajes de error del formulario
- `role="list"` y `role="listitem"` en listas de navegación
- Navegación completa por teclado
- `alt` en imágenes y `aria-label` en íconos SVG
- Contraste de colores adecuado (WCAG AA)

---

## 🚀 Cómo usar

1. Descarga los 4 archivos en la misma carpeta:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`

2. Abre `index.html` en cualquier navegador moderno.

3. **Para producción:**
   - Reemplaza la imagen del hero con una foto real del instituto
   - Conecta el formulario a un backend real o servicio de email (EmailJS, Formspree, etc.)
   - Configura el envío real de correos a los estudiantes

---

## 🔗 Redes Sociales

- **Facebook:** [facebook.com/inacoficial](https://www.facebook.com/inacoficial)
- **Instagram:** *(agregar enlace oficial)*
- **YouTube:** *(agregar enlace oficial)*

---

## 📝 Notas de Desarrollo

- El formulario simula el envío con `setTimeout` (2 segundos). En producción debe integrarse con un servicio real de email como **EmailJS**, **Formspree** o un endpoint propio.
- Los datos del instituto (teléfono, dirección exacta) deben actualizarse con la información oficial.
- La imagen del Hero puede agregarse con `background-image` en `.hero-bg::before` en el CSS.

---

*© 2025 Instituto Nacional Albert Camus — Todos los derechos reservados.*
