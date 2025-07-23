function showSection(section) {
    // Ocultar todas las secciones
    document.getElementById('about-section').classList.add('hidden');
    document.getElementById('projects-section').classList.add('hidden');
    
    // Remover clase active de todos los botones
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Mostrar la sección seleccionada
    if (section === 'about') {
        document.getElementById('about-section').classList.remove('hidden');
        document.querySelector('.nav-btn[onclick="showSection(\'about\')"]').classList.add('active');
    } else if (section === 'projects') {
        document.getElementById('projects-section').classList.remove('hidden');
        document.querySelector('.nav-btn[onclick="showSection(\'projects\')"]').classList.add('active');
    }
}

// Función para copiar al portapapeles
function copyToClipboard(text, message) {
    navigator.clipboard.writeText(text).then(function() {
        showNotification(message);
    }).catch(function(err) {
        console.error('Error al copiar: ', err);
        showNotification('Error al copiar al portapapeles');
    });
}

// Función para mostrar notificaciones
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Inicializar mostrando la sección "Sobre mí"
document.addEventListener('DOMContentLoaded', function() {
    showSection('about');
});
    

// Efecto de paralaje suave al hacer scroll
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('body');
    const speed = scrolled * 0.1;
    
    parallax.style.backgroundPositionY = speed + 'px';
});

// Función para detectar cuando un elemento entra en el viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Animaciones al hacer scroll
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.tech-category, .cert-item, .project-section, .certificates-section');
    
    elements.forEach(element => {
        if (isInViewport(element)) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// Función para copiar al portapapeles
async function copyToClipboard(text, message) {
    try {
        await navigator.clipboard.writeText(text);
        showNotification(message);
    } catch (err) {
        // Fallback para navegadores que no soportan la API moderna
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
                
        try {
            document.execCommand('copy');
            showNotification(message);
        } catch (err) {
            showNotification('Error al copiar');
        }    

        document.body.removeChild(textArea);
    }
}

// Función para mostrar notificación
function showNotification(message) {
    const notification = document.getElementById('copyNotification');
    const messageSpan = document.getElementById('copyMessage');
            
    messageSpan.textContent = message;
    notification.classList.add('show');
            
    // Ocultar después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

//Funcion descargar CV
function downloadCV(event) {
    event.preventDefault();
    
    // Cambia esta ruta por la de tu CV real
    const cvUrl = 'cv/CV-NS.pdf'; // Aquí pon la ruta de tu archivo CV
    const cvFileName = 'Naomi_Mayela_Santos_Rodriguez_CV.pdf';
    
    // Crear elemento temporal para descarga
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = cvFileName;
    link.target = '_blank';
    
    // Verificar si el archivo existe antes de descargar
    fetch(cvUrl, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                // El archivo existe, proceder con la descarga
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                showDownloadNotification();
            } else {
                // El archivo no existe, mostrar alerta
                alert('El archivo CV no está disponible. Por favor, contacta al administrador.');
            }
        })
        .catch(error => {
            // Error de red, usar método alternativo
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            showDownloadNotification();
        });
}

function showDownloadNotification() {
    const notification = document.getElementById('downloadNotification');
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Datos de los certificados
const certificates = [
    {
        name: "Python Essentials | Cisco",
        image: "./certificadosIMG/Python.jpg"
    },
    {
        name: "AWS Academy Graduate | AWS Academy Cloud Foundations",
        image: "./certificadosIMG/CloudFoundations.jpg"
    },
    {
        name: "Java Fundamentals | Oracle",
        image: "./certificadosIMG/JavaFundamentals.jpg"
    },
    {
        name: "Java Programming | Oracle",
        image: "./certificadosIMG/JavaProgramming.jpg"
    },
    {
        name: "IT Security Foundations: Operating System Security | LinkedIn",
        image: "./certificadosIMG/IT.jpg"
    },
    {
        name: "Introduction to Data Science | Cisco",
        image: "./certificadosIMG/DataS.jpg"
    },
    {
        name: "Database Foundations | Oracle Academy",
        image: "./certificadosIMG/DataF.jpg"
    },
    {
        name: "Data Structure | Oracle Academy",
        image: "https://via.placeholder.com/600x400/f80000/ffffff?text=Data+Structure+Oracle"
    },
    {
        name: "Rapid Developer | Mendix",
        image: "./certificadosIMG/Mendix.jpg"
    },
    {
        name: "Networking Basics | Cisco",
        image: "./certificadosIMG/Netw.jpg"
    },
    {
        name: "Web Development Fundamentals | IBM SkillsBuild",
        image: "./certificadosIMG/WebD.jpg"
    },
    {
        name: "AWS Academy Graduate - AWS Academy Cloud Operations",
        image: "./certificadosIMG/CloudOperations.jpg"
    }
];

let currentIndex = 0;
const totalCertificates = certificates.length;

// Elementos del DOM
const certificateTitle = document.getElementById('certificateTitle');
const certificateImage = document.getElementById('certificateImage');
const certificateCounter = document.getElementById('certificateCounter');
const prevArrow = document.getElementById('prevArrow');
const nextArrow = document.getElementById('nextArrow');
let certificateItems = [];

// Debug: Verificar que los elementos existen
console.log('Elementos encontrados:', {
    certificateImage: !!certificateImage,
    certificateTitle: !!certificateTitle,
    certificateCounter: !!certificateCounter,
    prevArrow: !!prevArrow,
    nextArrow: !!nextArrow
});

// Función para actualizar la vista del certificado
function updateCertificate(index = currentIndex) {
    currentIndex = index;
    const cert = certificates[index];
    
    // Actualizar la galería
    if (certificateTitle) {
        certificateTitle.textContent = cert.name;
        console.log('Título actualizado:', cert.name);
    }
    
    if (certificateImage) {
        certificateImage.src = cert.image;
        certificateImage.alt = cert.name;
    }
    
    if (certificateCounter) {
        certificateCounter.textContent = `${index + 1} de ${totalCertificates}`;
    }
    
    // Actualizar la lista (remover clase active de todos y agregar al actual)
    certificateItems.forEach(item => item.classList.remove('active'));
    if (certificateItems[index]) {
        certificateItems[index].classList.add('active');
        
        // Hacer scroll al elemento activo si es necesario
        certificateItems[index].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    }
    
    // Animación de fade
    if (certificateImage) {
        certificateImage.style.opacity = '0';
    }
    if (certificateTitle) {
        certificateTitle.style.opacity = '0';
    }
    
    setTimeout(() => {
        if (certificateImage) {
            certificateImage.style.opacity = '1';
        }
        if (certificateTitle) {
            certificateTitle.style.opacity = '1';
        }
    }, 150);
}

// Función para ir al certificado anterior
function showPrevious() {
    const prevIndex = (currentIndex - 1 + totalCertificates) % totalCertificates;
    updateCertificate(prevIndex);
}

// Función para ir al certificado siguiente
function showNext() {
    const nextIndex = (currentIndex + 1) % totalCertificates;
    updateCertificate(nextIndex);
}

// Función para ir a un certificado específico
function goToCertificate(index) {
    if (index >= 0 && index < totalCertificates) {
        updateCertificate(index);
    }
}

// Event listeners y inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos de la lista después de que el DOM esté cargado
    certificateItems = document.querySelectorAll('.certificate-item');
    
    // Verificar que los elementos existen
    if (certificateImage && certificateTitle && certificateCounter && prevArrow && nextArrow) {
        // Inicializar con el primer certificado
        updateCertificate(0);
        
        // Event listeners para las flechas de navegación
        prevArrow.addEventListener('click', showPrevious);
        nextArrow.addEventListener('click', showNext);
        
        // Event listeners para los elementos de la lista
        certificateItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                updateCertificate(index);
            });
        });
        
        // Navegación con teclado
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                showPrevious();
            } else if (e.key === 'ArrowRight') {
                showNext();
            }
        });
        
        console.log('Certificados inicializados correctamente');
    } else {
        console.error('No se pudieron encontrar todos los elementos necesarios');
    }
});