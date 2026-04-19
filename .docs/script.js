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
const phrases = ["UX/UI_DESIGNER", "UX_SECURITY", "SOURCING_SPECIALIST"];
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

let on =(id) =>{
    let overlay = document.getElementById(id);
    overlay.style.display = "flex";
}
let off=(id)=>{
    let overlay = document.getElementById(id);
    overlay.style.display = "none";
}
/* For te resuelvo, debo agregar un modal global */
function openImageModal(imageSrc) {
    const modal = document.getElementById('image-modal');
    const enlargedImage = document.getElementById('enlarged-image');
    
    enlargedImage.src = imageSrc;
    modal.style.display = 'flex';
}

function closeImageModal() {
    const modal = document.getElementById('image-modal');
    modal.style.display = 'none';
}
 /* Provicional for Nescafe */
function openImageModal1(imageSrc) {
    const modal = document.getElementById('image-modal1');
    const enlargedImage = document.getElementById('enlarged-image1');
    
    enlargedImage.src = imageSrc;
    modal.style.display = 'flex';
}

function closeImageModal1() {
    const modal = document.getElementById('image-modal1');
    modal.style.display = 'none';
}

/* Provicional for Nescafe */
function openImageModal2(imageSrc) {
    const modal = document.getElementById('image-modal2');
    const enlargedImage = document.getElementById('enlarged-image2');
    
    enlargedImage.src = imageSrc;
    modal.style.display = 'flex';
}

function closeImageModal2() {
    const modal = document.getElementById('image-modal2');
    modal.style.display = 'none';
}