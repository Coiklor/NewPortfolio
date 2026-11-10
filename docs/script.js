/* Dynamic robot */
const cube = document.querySelector('.cube');
const faces = document.querySelectorAll('.face');

// 1. CONTROL POR MOVIMIENTO (Sin rotación automática)
window.addEventListener('mousemove', (e) => {
    // Robot Percent
    const x = (e.clientX / window.innerWidth - 0.5) * 45; // Max 30 grados
    const y = (e.clientY / window.innerHeight - 0.5) * -30;

    // Responsive Percent
    const isMobile = window.innerWidth <= 768;
    const scale = isMobile ? 'scale(0.6)' : 'scale(1)';

    cube.style.transform = `${scale} rotateX(${y}deg) rotateY(${x}deg)`;
});

// 2. CONTROL POR CLIC (Interactividad de las caras)
faces.forEach(face => {
    face.addEventListener('click', () => {
        const faceName = face.innerText; // O usa un atributo data-project
        
        // Ejemplo de acción: Redirigir según la cara
        if(faceName === "1") {
            console.log("Cargando proyecto NESCAFÉ...");
            // window.location.href = "url-de-tu-proyecto";
        }
        
        // Efecto visual de feedback
        face.style.transform += " scale(0.9)";
        setTimeout(() => face.style.transform = face.style.transform.replace(" scale(0.9)", ""), 100);
    });
});

/* Robot is angry */
document.addEventListener("DOMContentLoaded", () => {
    const robotFace = document.getElementById("face_robot");

    if (robotFace) {
        robotFace.addEventListener("click", () => {
            // Añadimos la clase de ira
            robotFace.classList.add("is-angry");
            
            // Forzamos el reset a los 0.7s para que el bostezo se detenga 
            // y el robot "despierte" de golpe por el susto/ira
            setTimeout(() => {
                robotFace.classList.remove("is-angry");
                robotFace.style.transform = "rotateY(0deg) translateZ(102px)";
            }, 700); 
        });
    }
});

/* Robot is sleeping (Inactividad) */
document.addEventListener("DOMContentLoaded", () => {
    const robotFace = document.getElementById("face_robot");
    if (!robotFace) return;

    let inactivityTimer;
    const idleTimeLimit = 5000; // 

    function startInactivityTimer() {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
            robotFace.classList.add("is-sleeping");
            console.log("El robot se ha dormido por inactividad.");
        }, idleTimeLimit);
    }

    function resetInactivity() {
        if (robotFace.classList.contains("is-sleeping")) {
            robotFace.classList.remove("is-sleeping");
            console.log("El robot se ha despertado.");
        }
        startInactivityTimer();
    }

    // Usamos eventos más estables para no reiniciar el contador por cada microrregla del mouse:
    window.addEventListener("click", resetInactivity);
    
    // Opcional: si quieres que el mouse mueva el contador, usamos un intervalo para que no sature
    let mouseMovedRecently = false;
    window.addEventListener("mousemove", () => {
        if (!mouseMovedRecently) {
            mouseMovedRecently = true;
            resetInactivity();
            setTimeout(() => { mouseMovedRecently = false; }, 1000); // Solo registra movimiento de mouse 1 vez por segundo
        }
    });

    // Arrancamos el contador inicial
    startInactivityTimer();
});

document.addEventListener("DOMContentLoaded", () => {
    const robotFace = document.getElementById("face_robot");
    
    // Guardamos el mensaje inicial para recuperarlo después
    const originalMsg = robotFace.getAttribute("data-message");

    // Seleccionamos TODO lo que tenga un mensaje: proyectos, links y el H1
    const interactiveElements = document.querySelectorAll(".project-item, .menuRight a, .home h1");

    interactiveElements.forEach(el => {
        el.addEventListener("mouseenter", () => {
            const newMsg = el.getAttribute("data-message");
            if (newMsg) {
                robotFace.setAttribute("data-message", newMsg);
                robotFace.classList.add("robot-speaking");
            }
        });

        el.addEventListener("mouseleave", () => {
            robotFace.classList.remove("robot-speaking");
            // Recuperamos el mensaje de bienvenida original
            robotFace.setAttribute("data-message", originalMsg);
        });
    });
});

/* Dynamic text */
const textElement = document.querySelector(".dynamic-text");
const phrases = ["UX/UI_DESIGNER", "UX_SECURITY", "CREATIVE", "SELF_TOUGHT"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 130;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        // Borrando: quitamos un caracter
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; // Más rápido al borrar
    } else {
        // Escribiendo: añadimos un caracter
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 150;
    }

    // Lógica de cambio de estado
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pausa al terminar de escribir
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500; // Pausa antes de empezar la nueva palabra
    }

    //cambio de tama;o sourcing specialist

    if (currentPhrase === "SOURCING_SPECIALIST") {
    textElement.style.fontSize = "8vw";
    } else {
        textElement.style.fontSize = "10vw"; // El tamaño original para las otras
    }

    setTimeout(type, typeSpeed);
}

// Iniciar la animación
document.addEventListener("DOMContentLoaded", type);


/* Particles */
particlesJS("particles", {
  "particles": {
    "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
    "color": { "value": "#49ff7f" }, // Azul neón
    "shape": { "type": "circle" },
    "opacity": { "value": 0.5, "random": true },
    "size": { "value": 4, "random": true },
    "line_linked": { "enable": false }, //Lineas desactivadas
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "top", // sube
      "random": true,
      "straight": false,
      "out_mode": "out"
    }
  },
  "interactivity": {
    "events": {
      "onhover": { "enable": true, "mode": "bubble" },
      "onclick": { "enable": true, "mode": "repulse" }
    },
    "modes": {
      "bubble": { "size": 6, "distance": 200 },
      "repulse": { "distance": 200 }
    }
  }
});


/* Overlay */

let on = (id) => {
    let overlay = document.getElementById(id);
    if (!overlay) return;
    
    overlay.style.display = "flex";
    overlay.style.opacity = "0";
    overlay.style.transition = "opacity 0.3s ease-out";
    
    requestAnimationFrame(() => {
        overlay.style.opacity = "1";
    });
}

let off = (id) => {
    let overlay = document.getElementById(id);
    if (!overlay) return;
    
    overlay.style.transition = "opacity 0.25s ease-in";
    overlay.style.opacity = "0";
    
    setTimeout(() => {
        overlay.style.display = "none";
    }, 250);
}


/* Lazy loading */
document.addEventListener("DOMContentLoaded", () => {
    const lazyBackgrounds = [].slice.call(document.querySelectorAll(".lazy-bg"));

    if ("IntersectionObserver" in window) {
        const bgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Agrega la clase que tiene la URL de la imagen
                    entry.target.classList.add("lazy-background-loaded");
                    bgObserver.unobserve(entry.target); // Deja de vigilarlo
                }
            });
        });

        lazyBackgrounds.forEach((bg) => {
            bgObserver.observe(bg);
        });
    }
});

/* Carousel */
// --- CONFIGURACIÓN DE DATOS ---
// Define aquí qué imágenes van dentro de CADA carrusel independiente.
// Las claves ('journey', 'research', 'survey') deben coincidir con las llamadas en el HTML.
const raksusGalleries = {
  'journey': [
    "Images/Raksus/Journey Map.webp",
    "Images/Raksus/Journey Map2.webp",
    "Images/Raksus/Journey Map3.webp",
    "Images/Raksus/Journey Map4.webp"  
  ],
  'research': [
    "Images/Raksus/Research/Screenshot_2.webp",
    "Images/Raksus/Research/Screenshot_3.webp",
    "Images/Raksus/Research/Screenshot_4.webp",
    "Images/Raksus/Research/Screenshot_5.webp",
    "Images/Raksus/Research/Screenshot_6.webp",
    "Images/Raksus/Research/Screenshot_7.webp",
    "Images/Raksus/Research/Screenshot_8.webp",
    "Images/Raksus/Research/Screenshot_9.webp",
    "Images/Raksus/Research/Screenshot_10.webp",
    "Images/Raksus/Research/Screenshot_11.webp",
    "Images/Raksus/Research/Screenshot_12.webp"
  ],
  'survey': [
    "Images/Raksus/Survey/Portada Survey.webp", // Foto 1 (Portada)
    "Images/Raksus/Survey/Portada Survey_ESP.webp",
    "Images/Raksus/Survey/Question 1.webp",
    "Images/Raksus/Survey/Question 2.webp",
    "Images/Raksus/Survey/Question 3.webp",
    "Images/Raksus/Survey/Question 4.webp",
    "Images/Raksus/Survey/Question 5.webp",
    "Images/Raksus/Survey/Question 6.webp",
    "Images/Raksus/Survey/Question 7.webp",
    "Images/Raksus/Survey/Question 8.webp",
    "Images/Raksus/Survey/Question 9.webp",
    "Images/Raksus/Survey/Question 10.webp",
    "Images/Raksus/Survey/Resultados.webp",
    "Images/Raksus/Survey/Resultados test 1.webp",
    "Images/Raksus/Survey/Resultados test 2.webp",
    "Images/Raksus/Survey/Resultados test 3.webp",
    "Images/Raksus/Survey/Resultados test 4.webp",
  ],
  'planos': [
    "Images/Raksus/Planos/Hardware Raksus.webp",
    "Images/Raksus/Planos/Hardware created.webp",
    "Images/Raksus/Planos/PortadaPlanos2.webp",
  ],
  'Nescafe_Journey_Map': [
    "Images/Nescafe/JourneyMap/Usuario 1.webp",
    "Images/Nescafe/JourneyMap/Usuario 2.webp",
    "Images/Nescafe/JourneyMap/Usuario 3.webp",
    "Images/Nescafe/JourneyMap/Journey_Map.webp"
    ],
    'Nescafe_Arquitecure': [
    "Images/Nescafe/Arquitectura/Arquitectura_Conductor1.webp",
    "Images/Nescafe/Arquitectura/Arquitectura_Conductor2.webp",
    "Images/Nescafe/Arquitectura/Arquitectura_Conductor3.webp",
    "Images/Nescafe/Arquitectura/Arquitectura_Usuario1.webp",
    "Images/Nescafe/Arquitectura/Arquitectura_Usuario2.webp",
    "Images/Nescafe/Arquitectura/Arquitectura_Usuario3.webp",
    "Images/Nescafe/AQDI.webp"
    ],
    'Nescafe_Branding':[
    "Images/Nescafe/Branding/NESCAFE Bag.webp",
    "Images/Nescafe/Branding/NESCAFE Jacket.webp",
    ],
    'Nescafe_CandyMockups1':[
    "Images/Nescafe/Nescafe_Candy/MockupsNCC_V1.webp",
    "Images/Nescafe/Nescafe_Candy/MockupsNCC_V2.webp",
    "Images/Nescafe/Nescafe_Candy/MockupsNOC_V1.webp",
    "Images/Nescafe/Nescafe_Candy/MockupsNOC_V2.webp",
    ],
    'Nescafe_CandyMockups2':[
    "Images/Nescafe/Nescafe_Candy/Cuadrados/M1.webp",
    "Images/Nescafe/Nescafe_Candy/Cuadrados/M2.webp",
    "Images/Nescafe/Nescafe_Candy/Cuadrados/M3.webp",
    "Images/Nescafe/Nescafe_Candy/Redondos/M1.webp",
    "Images/Nescafe/Nescafe_Candy/Redondos/M2.webp",
    "Images/Nescafe/Nescafe_Candy/Redondos/M3.webp",
    ],
    'TERESUELVO_ARQ':[
        "Images/Teresuelvo/Arquitectura/Usuario.webp",
        "Images/Teresuelvo/Arquitectura/Lider de comunidad.webp",
        "Images/Teresuelvo/Arquitectura/Alcaldia.webp",
        "Images/Teresuelvo/Arquitectura/Diagrama1.webp",
        "Images/Teresuelvo/Arquitectura/Diagrama2.webp",
        "Images/Teresuelvo/Arquitectura/Diagrama3.webp",
    ],
    'TERESUELVO_JOURNEY':[
        "Images/Teresuelvo/Journey/Journey_Map1.webp",
        "Images/Teresuelvo/Journey/Journey_Map2.webp",
        "Images/Teresuelvo/Journey/Journey_Map3.webp",
    ],
    'TERESUELVO_BRANDING':[
        "Images/Teresuelvo/Mockups/Mockup1.webp",
        "Images/Teresuelvo/Mockups/Mockup4.webp",
        "Images/Teresuelvo/Mockups/Mockup2.webp",
        "Images/Teresuelvo/Mockups/Branding3.webp",
    ]
};

// --- VARIABLES DE ESTADO ---
let carouselCurrentIndex = 0;
let currentGalleryKey = ''; // Guarda qué galería estamos viendo actualmente ('journey', etc.)

// --- FUNCIONES ---

function openCarouselModal(index, galleryKey) {
  if (!raksusGalleries[galleryKey]) {
    console.error(`La galería '${galleryKey}' no está definida en JavaScript.`);
    return;
  }
  
  currentGalleryKey = galleryKey;
  carouselCurrentIndex = index;
  updateCarouselImage();

  const modal = document.getElementById('carousel-modal');
  if (modal) {
    // 1. Preparamos el estado inicial invisible y desplazado hacia abajo
    modal.style.display = "flex";
    modal.style.opacity = "0";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    modal.style.backdropFilter = "blur(5px)";
    modal.style.transition = "opacity 0.35s ease-out";

    // Buscamos el contenedor interno del carrusel para darle efecto de zoom/subida
    let content = modal.querySelector('.carousel-content') || modal.firstElementChild;
    if (content) {
      content.style.transform = "translateY(30px) scale(0.95)";
      content.style.transition = "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)";
    }

    // 2. Activamos la animación en el siguiente frame
    requestAnimationFrame(() => {
      modal.style.opacity = "1";
      if (content) {
        content.style.transform = "translateY(0) scale(1)";
      }
    });

    document.addEventListener('keydown', handleCarouselKeyPress);
  }
}

function closeCarouselModal(event) {
  const isClickOutside = event && event.target.classList.contains('carousel-modal');
  const isClickCloseBtn = event && event.target.classList.contains('carousel-close');

  if (!event || isClickOutside || isClickCloseBtn) {
    const modal = document.getElementById('carousel-modal');
    if (modal) {
      
      modal.style.transition = "opacity 0.25s ease-in";
      modal.style.opacity = "0";

      let content = modal.querySelector('.carousel-content') || modal.firstElementChild;
      if (content) {
        content.style.transition = "transform 0.25s ease-in";
        content.style.transform = "translateY(20px) scale(0.95)";
      }

     
      setTimeout(() => {
        modal.style.display = "none";
        if (content) content.style.transform = "none";
      }, 250);

      document.removeEventListener('keydown', handleCarouselKeyPress);
      currentGalleryKey = '';
    }
  }
}


function navigateCarousel(step, event) {
  if (event) event.stopPropagation(); 
  
  if (!currentGalleryKey) return; 

  const images = raksusGalleries[currentGalleryKey];
  carouselCurrentIndex += step;
  
  if (carouselCurrentIndex < 0) {
    carouselCurrentIndex = images.length - 1;
  } else if (carouselCurrentIndex >= images.length) {
    carouselCurrentIndex = 0;
  }
  
  updateCarouselImage();
}


function updateCarouselImage() {
  const enlargedImg = document.getElementById('carousel-enlarged-image');
  const counter = document.getElementById('carousel-counter');

  if (enlargedImg && counter && currentGalleryKey) {
    const images = raksusGalleries[currentGalleryKey];
    enlargedImg.style.transition = "opacity 0.15s ease-in";
    enlargedImg.style.opacity = "0";

    
    setTimeout(() => {
      enlargedImg.src = images[carouselCurrentIndex];
      counter.textContent = `${carouselCurrentIndex + 1} / ${images.length}`;
      enlargedImg.style.transition = "opacity 0.2s ease-out";
      enlargedImg.style.opacity = "1";
    }, 150);
  }
}

function handleCarouselKeyPress(e) {
  if (e.key === 'ArrowLeft') navigateCarousel(-1);
  if (e.key === 'ArrowRight') navigateCarousel(1);
  if (e.key === 'Escape') closeCarouselModal();
}

/* Overlay for resume */
function openResumeModal() {
    const modal = document.getElementById('resume-modal');
    if (!modal) return;
    modal.style.display = "flex";
    modal.style.opacity = "0";
    modal.style.transition = "opacity 0.3s ease-out";
    requestAnimationFrame(() => {
        modal.style.opacity = "1";
    });
}
function closeResumeModal(event) {
    const modal = document.getElementById('resume-modal');
    if (!modal) return;
    modal.style.transition = "opacity 0.25s ease-in";
    modal.style.opacity = "0";
    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
}
/* Preloader */
window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader');
  
  // Opcional: un pequeño delay (ej. 800ms) para que el usuario alcance a ver el robot
  setTimeout(() => {
    loader.classList.add('fade-out');
    
    // Opcional: removerlo del DOM por completo tras la transición para liberar memoria
    setTimeout(() => {
      loader.remove();
    }, 1700);
    
  }, 2200); 
});