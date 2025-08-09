// Credenciales predefinidas - Múltiples usuarios
const VALID_USERS = {
    "umg": "123456",
    "admin": "admin2024"
};

// Función para cambiar estilos
function changeStyle() {
    const styleSelect = document.getElementById('styleSelect');
    const stylesheet = document.getElementById('stylesheet');
    const selectedValue = styleSelect.value;
    
    if (selectedValue === 'none') {
        // Remover la hoja de estilos para mostrar sin estilos
        stylesheet.disabled = true;
    } else {
        // Aplicar la hoja de estilos seleccionada
        stylesheet.disabled = false;
        stylesheet.href = selectedValue;
    }
    
    // Limpiar mensaje al cambiar estilo
    clearMessage();
}

// Función para limpiar mensajes
function clearMessage() {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = '';
    messageDiv.className = 'message';
}

// Función para mostrar mensaje
function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    
    // Auto-limpiar después de 5 segundos
    setTimeout(clearMessage, 5000);
}

// Función para validar login
function validateLogin(username, password) {
    return VALID_USERS[username] && VALID_USERS[username] === password;
}

// Función para manejar el envío del formulario
function handleLogin(event) {
    event.preventDefault(); // Prevenir el envío del formulario
    
    // Obtener valores de los campos
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    // Validar campos vacíos
    if (!username || !password) {
        showMessage('Por favor, complete todos los campos.', 'error');
        return;
    }
    
    // Validar credenciales
    if (validateLogin(username, password)) {
        showMessage('¡Login exitoso! Bienvenido al sistema.', 'success');
        
        // Opcional: Limpiar formulario después del login exitoso
        setTimeout(() => {
            usernameInput.value = '';
            passwordInput.value = '';
        }, 2000);
        
    } else {
        showMessage('Usuario o contraseña incorrectos. Intente nuevamente.', 'error');
        
        // Limpiar campos después de error
        passwordInput.value = '';
        usernameInput.focus();
    }
}

// Función para inicializar la aplicación
function initializeApp() {
    // Agregar event listener al formulario
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', handleLogin);
    
    // Agregar event listeners para limpiar mensaje al escribir
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    usernameInput.addEventListener('input', clearMessage);
    passwordInput.addEventListener('input', clearMessage);
    
    // Enfocar el campo de usuario al cargar la página
    usernameInput.focus();
    
    // Mostrar mensaje de bienvenida
    console.log('Sistema de Login UMG inicializado correctamente');
    console.log('Credenciales de prueba:');
    console.log('Usuario: umg / Contraseña: 123456');
    console.log('Usuario: admin / Contraseña: admin2024');
}

// Función para manejar teclas especiales
function handleKeyPress(event) {
    // Limpiar mensaje al presionar cualquier tecla en los campos de entrada
    if (event.target.tagName === 'INPUT') {
        clearMessage();
    }
    
    // Permitir envío con Enter desde cualquier campo del formulario
    if (event.key === 'Enter' && event.target.closest('#loginForm')) {
        const form = document.getElementById('loginForm');
        form.dispatchEvent(new Event('submit'));
    }
}

// Función para validación en tiempo real
function setupRealTimeValidation() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.querySelector('.login-btn');
    
    function checkFields() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        // Habilitar/deshabilitar botón según si hay contenido
        if (username && password) {
            loginBtn.style.opacity = '1';
            loginBtn.disabled = false;
        } else {
            loginBtn.style.opacity = '0.7';
            loginBtn.disabled = false; // Mantener habilitado para mostrar mensaje de error
        }
    }
    
    usernameInput.addEventListener('input', checkFields);
    passwordInput.addEventListener('input', checkFields);
    
    // Verificación inicial
    checkFields();
}

// Event listeners cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupRealTimeValidation();
    
    // Agregar listener global para teclas
    document.addEventListener('keypress', handleKeyPress);
    
    // Mensaje de información en consola
    console.log('%c¡Sistema de Login UMG!', 'color: #56ab2f; font-size: 16px; font-weight: bold;');
    console.log('Desarrollado para demostrar cambio de estilos CSS y validación de login');
});

// Función adicional para demo - simular diferentes tipos de usuario
function demoLogin(userType) {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    switch(userType) {
        case 'umg':
            usernameInput.value = 'umg';
            passwordInput.value = '123456';
            break;
        case 'admin':
            usernameInput.value = 'admin';
            passwordInput.value = 'admin2024';
            break;
        case 'clear':
            usernameInput.value = '';
            passwordInput.value = '';
            clearMessage();
            break;
        default:
            console.log('Tipo de usuario no reconocido');
    }
}

// Exponer funciones útiles al objeto window para debugging
window.demoLogin = demoLogin;
window.clearMessage = clearMessage;