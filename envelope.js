let heartInterval;

document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');
    const envelopeWrapper = document.querySelector('.envelope-wrapper');
    const letter = envelope.querySelector('.letter');
    
    // Crear elementos decorativos del fondo
    createStars();
    createFireflies();

    // Esperar a que termine la estrella (4s) para mostrar el sobre
    setTimeout(() => {
        envelope.classList.add('appear');
        envelopeWrapper.classList.add('active'); // Activa pointer-events del wrapper
    }, 4000);

    envelope.addEventListener('click', () => {
        if (!envelope.classList.contains('open')) {
            envelope.classList.add('open');
            
            // Iniciar lluvia de corazones después de abrir
            setTimeout(startHeartRain, 1000);

            // Expandir la carta después de que salga del sobre
            setTimeout(() => {
                envelope.style.transform = 'none';
                envelopeWrapper.classList.add('letter-expanded'); // Desactiva wrapper
                letter.classList.add('full-size');
            }, 1500);
        }
    });

    // Evento para cerrar la carta y que el sobre se vaya
    letter.addEventListener('click', (e) => {
        if (letter.classList.contains('full-size')) {
            e.stopPropagation();
            
            // 1. Detener la lluvia de corazones
            stopHeartRain();

            // 2. Guardar la carta
            envelopeWrapper.classList.remove('letter-expanded'); // Reactiva wrapper
            letter.classList.remove('full-size');
            
            // 3. Esperar a que la carta se guarde y cerrar el sobre
            setTimeout(() => {
                envelope.classList.remove('open');
                
                // 4. Hacer que el sobre vuele como estrella fugaz
                setTimeout(() => {
                    envelope.classList.add('fly-away');
                    envelopeWrapper.classList.remove('active'); // Desactiva wrapper
                }, 800);
            }, 1000);
        }
    });

    // Prevenir que clics en la carta se propaguen al wrapper cuando está expandida
    letter.addEventListener('click', (e) => {
        if (letter.classList.contains('full-size')) {
            e.stopPropagation();
        }
    });
});

function startHeartRain() {
    heartInterval = setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart-rain');
        heart.innerHTML = '❤️';
        // Posición aleatoria solo en la mitad DERECHA (50vw a 100vw)
        heart.style.left = (Math.random() * 50 + 50) + 'vw';
        heart.style.animationDuration = Math.random() * 2 + 3 + 's';
        
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }, 100);
}

function stopHeartRain() {
    clearInterval(heartInterval);
    document.querySelectorAll('.heart-rain').forEach(h => h.remove());
}

function createStars() {
    const night = document.querySelector('.night');
    if (night) {
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            const size = Math.random() * 2 + 1;
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
            night.appendChild(star);
        }
    }
}

function createFireflies() {
    const body = document.body;
    for (let i = 0; i < 20; i++) {
        const firefly = document.createElement('div');
        firefly.classList.add('firefly');
        firefly.style.left = Math.random() * 100 + 'vw';
        firefly.style.top = (Math.random() * 50 + 50) + 'vh';
        firefly.style.setProperty('--duration', (Math.random() * 5 + 5) + 's');
        firefly.style.setProperty('--moveX', (Math.random() * 100 - 50) + 'px');
        firefly.style.setProperty('--moveY', (Math.random() * 100 - 50) + 'px');
        body.appendChild(firefly);
    }
}