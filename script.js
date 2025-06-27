function showTab(tabName) {
    if (tabName === 'certificados') {
        // Hacer scroll a la sección de certificados
        document.getElementById('certificates-section').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Activar el botón de certificados en la navegación
        const buttons = document.querySelectorAll('.tab-btn');
        buttons.forEach(button => {
            button.classList.remove('active');
        });
        event.target.classList.add('active');
        return;
    }
    
    if (tabName === 'proyectos') {
        // Si es proyectos, hacer scroll a la sección de proyectos
        document.querySelector('.projects-section').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Activar el botón de proyectos en la navegación
        const buttons = document.querySelectorAll('.tab-btn');
        buttons.forEach(button => {
            button.classList.remove('active');
        });
        event.target.classList.add('active');
        return;
    }
    
    // Para otras pestañas, comportamiento normal
    // Ocultar todos los contenidos de tabs
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => {
        content.classList.remove('active');
    });

    // Remover clase active de todos los botones
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    // Mostrar el contenido seleccionado
    document.getElementById(tabName).classList.add('active');
    
    // Activar el botón correspondiente
    event.target.classList.add('active');
}

// Función para abrir la sección de certificados
function openCertificatesSection() {
    const certificatesToggle = document.getElementById('certificatesToggle');
    const certificatesContent = document.getElementById('certificatesContent');
    
    if (certificatesToggle && certificatesContent) {
        // Agregar clases para mostrar el contenido
        certificatesToggle.classList.add('active');
        certificatesContent.classList.add('expanded');
        
        // Hacer scroll hasta la sección
        document.getElementById('certificates-section').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Función para la funcionalidad del botón desplegable de certificados
function initializeCertificatesToggle() {
    const certificatesToggle = document.getElementById('certificatesToggle');
    const certificatesContent = document.getElementById('certificatesContent');

    if (certificatesToggle && certificatesContent) {
        certificatesToggle.addEventListener('click', function() {
            // Toggle de la clase active para el botón
            this.classList.toggle('active');
            
            // Toggle de la clase expanded para el contenido
            certificatesContent.classList.toggle('expanded');
        });
    }
}

// Función para agregar animaciones cuando se cargan los elementos
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el toggle de certificados
    initializeCertificatesToggle();
    
    // Animación de entrada para las tarjetas de certificados (si existen en otras secciones)
    const certItems = document.querySelectorAll('.cert-item');
    certItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Animación de entrada para las categorías de tech stack
    const techCategories = document.querySelectorAll('.tech-category');
    techCategories.forEach((category, index) => {
        category.style.opacity = '0';
        category.style.transform = 'scale(0.9)';
        setTimeout(() => {
            category.style.transition = 'all 0.6s ease';
            category.style.opacity = '1';
            category.style.transform = 'scale(1)';
        }, index * 150);
    });
    
    // Animación de entrada para la sección de certificados desplegable
    const certificatesSection = document.querySelector('.certificates-section');
    if (certificatesSection) {
        certificatesSection.style.opacity = '0';
        certificatesSection.style.transform = 'translateY(30px)';
        setTimeout(() => {
            certificatesSection.style.transition = 'all 0.8s ease';
            certificatesSection.style.opacity = '1';
            certificatesSection.style.transform = 'translateY(0)';
        }, 500);
    }

    // INICIALIZAR FUNCIONALIDAD DE POP-UP DE CERTIFICADOS
    initializeCertificatesPopup();
});

// Función para cambiar el tema de color del gradiente (opcional)
function changeGradientTheme() {
    const body = document.body;
    const themes = [
        'linear-gradient(135deg, #6B73FF 0%, #9C27B0 25%, #FF6B6B 50%, #4ECDC4 75%, #45B7D1 100%)',
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    ];
    
    const currentIndex = Math.floor(Math.random() * themes.length);
    body.style.background = themes[currentIndex];
    body.style.backgroundSize = '400% 400%';
}

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
        name: "🐍 Python Essentials | Cisco",
        image: "./certificadosIMG/Python.jpg"
    },
    {
        name: "☁️ AWS Academy Graduate | AWS Academy Cloud Foundations",
        image: "./certificadosIMG/CloudFoundations.jpg"
    },
    {
        name: "☕ Java Fundamentals | Oracle",
        image: "./certificadosIMG/JavaFundamentals.jpg"
    },
    {
        name: "☕ Java Programming | Oracle",
        image: "./certificadosIMG/JavaProgramming.jpg"
    },
    {
        name: "🔒 IT Security Foundations: Operating System Security | LinkedIn",
        image: "./certificadosIMG/IT.jpg"
    },
    {
        name: "📊 Introduction to Data Science | Cisco",
        image: "./certificadosIMG/DataS.jpg"
    },
    {
        name: "🗃️ Database Foundations | Oracle Academy",
        image: "./certificadosIMG/DataF.jpg"
    },
    {
        name: "🏗️ Data Structure | Oracle Academy",
        image: "https://via.placeholder.com/600x400/f80000/ffffff?text=Data+Structure+Oracle"
    },
    {
        name: "⚡ Rapid Developer | Mendix",
        image: "./certificadosIMG/Mendix.jpg"
    },
    {
        name: "🌐 Networking Basics | Cisco",
        image: "./certificadosIMG/Netw.jpg"
    },
    {
        name: "💻 Web Development Fundamentals | IBM SkillsBuild",
        image: "./certificadosIMG/WebD.jpg"
    },
    {
        name: "☁️ AWS Academy Graduate - AWS Academy Cloud Operations",
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
        
        // Auto-deslizamiento opcional (descomenta si lo quieres)
        /*
        setInterval(function() {
            showNext();
        }, 5000); // Cambia cada 5 segundos
        */
        
        console.log('Certificados inicializados correctamente');
    } else {
        console.error('No se pudieron encontrar todos los elementos necesarios');
    }
});