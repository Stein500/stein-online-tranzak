<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Paiement Mobile Premium - MTN & Moov Bénin</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        /* VOTRE CSS EXISTANT ICI */
        :root {
            --mtn-gold: linear-gradient(135deg, #ffcc00, #ffd700, #ffed4e);
            --mtn-gold-dark: linear-gradient(135deg, #e6b800, #ffcc00);
            --moov-pink: linear-gradient(135deg, #e6007e, #ff4da6, #ff80bf);
            --moov-pink-dark: linear-gradient(135deg, #cc0066, #e6007e);
            --deep-space: linear-gradient(135deg, #0c0c2b, #1a1a3a, #2d2d5a);
            --cosmic-purple: linear-gradient(135deg, #4a00e0, #8e2de2);
            --neon-cyan: #00f3ff;
            --neon-pink: #ff00c8;
            --electric-blue: #0066ff;
            --pure-white: #ffffff;
            --dark-matter: #0a0a1f;
            --stardust: rgba(255, 255, 255, 0.1);
            --galaxy-dust: rgba(255, 255, 255, 0.05);
            --shadow-glow: 0 0 20px rgba(0, 243, 255, 0.5);
            --shadow-glow-pink: 0 0 20px rgba(255, 0, 200, 0.5);
            --shadow-glow-gold: 0 0 20px rgba(255, 204, 0, 0.5);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
        }

        body {
            background: var(--deep-space);
            color: var(--pure-white);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 2rem 1rem;
            overflow-x: hidden;
            position: relative;
        }

        /* VOTRE CSS EXISTANT CONTINUE... */
    </style>
</head>
<body>
    <!-- Canvas pour effets spéciaux -->
    <canvas id="matrixCanvas"></canvas>
    <canvas id="particleCanvas"></canvas>
    <div id="confetti-container"></div>
    
    <!-- Éléments d'effets spéciaux -->
    <div id="morphing-shapes"></div>
    <div id="audio-visualizer"></div>
    <div id="hologram-effect"></div>
    
    <!-- Notification flottante -->
    <div id="floating-notification" class="hidden">
        <i class="fas fa-check-circle"></i>
        <span>Transaction réussie!</span>
    </div>

    <!-- Interface de chargement avancée -->
    <div id="quantum-loader" class="hidden">
        <div class="quantum-sphere"></div>
        <div class="quantum-rings">
            <div class="ring"></div>
            <div class="ring"></div>
            <div class="ring"></div>
        </div>
        <p>Initialisation du système quantique...</p>
    </div>

    <!-- Votre HTML existant ici -->
    <div class="container">
        <!-- Votre contenu existant -->
    </div>

    <script>
        // =============================================
        // SYSTÈME DE PARTICULES AVANCÉ
        // =============================================

        class QuantumParticleSystem {
            constructor() {
                this.canvas = document.getElementById('particleCanvas');
                this.ctx = this.canvas.getContext('2d');
                this.particles = [];
                this.mouse = { x: 0, y: 0, radius: 150 };
                
                this.init();
                this.animate();
                this.setupEventListeners();
            }

            init() {
                this.resize();
                this.createParticles(150);
                
                window.addEventListener('resize', () => this.resize());
            }

            resize() {
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;
            }

            createParticles(count) {
                for (let i = 0; i < count; i++) {
                    this.particles.push({
                        x: Math.random() * this.canvas.width,
                        y: Math.random() * this.canvas.height,
                        size: Math.random() * 3 + 1,
                        speedX: Math.random() * 2 - 1,
                        speedY: Math.random() * 2 - 1,
                        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
                        life: 1,
                        decay: Math.random() * 0.02 + 0.005
                    });
                }
            }

            animate() {
                this.ctx.fillStyle = 'rgba(10, 10, 31, 0.1)';
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

                this.particles.forEach((particle, index) => {
                    // Mouvement
                    particle.x += particle.speedX;
                    particle.y += particle.speedY;
                    particle.life -= particle.decay;

                    // Rebond sur les bords
                    if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
                    if (particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -1;

                    // Interaction souris
                    const dx = particle.x - this.mouse.x;
                    const dy = particle.y - this.mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < this.mouse.radius) {
                        const angle = Math.atan2(dy, dx);
                        const force = (this.mouse.radius - distance) / this.mouse.radius;
                        particle.x += Math.cos(angle) * force * 5;
                        particle.y += Math.sin(angle) * force * 5;
                    }

                    // Dessiner la particule
                    this.ctx.save();
                    this.ctx.globalAlpha = particle.life;
                    this.ctx.fillStyle = particle.color;
                    this.ctx.beginPath();
                    this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    this.ctx.fill();
                    this.ctx.restore();

                    // Supprimer les particules mortes
                    if (particle.life <= 0) {
                        this.particles.splice(index, 1);
                        this.createParticles(1);
                    }
                });

                requestAnimationFrame(() => this.animate());
            }

            setupEventListeners() {
                window.addEventListener('mousemove', (e) => {
                    this.mouse.x = e.clientX;
                    this.mouse.y = e.clientY;
                });

                window.addEventListener('click', () => {
                    this.createExplosion(this.mouse.x, this.mouse.y, 20);
                });
            }

            createExplosion(x, y, count) {
                for (let i = 0; i < count; i++) {
                    this.particles.push({
                        x,
                        y,
                        size: Math.random() * 4 + 2,
                        speedX: Math.random() * 6 - 3,
                        speedY: Math.random() * 6 - 3,
                        color: `hsl(${Math.random() * 60 + 300}, 100%, 60%)`,
                        life: 1,
                        decay: Math.random() * 0.05 + 0.02
                    });
                }
            }
        }

        // =============================================
        // EFFET MATRIX AVANCÉ
        // =============================================

        class MatrixRain {
            constructor() {
                this.canvas = document.getElementById('matrixCanvas');
                this.ctx = this.canvas.getContext('2d');
                this.columns = [];
                this.fontSize = 14;
                
                this.init();
                this.animate();
            }

            init() {
                this.resize();
                this.setupColumns();
                
                window.addEventListener('resize', () => {
                    this.resize();
                    this.setupColumns();
                });
            }

            resize() {
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;
            }

            setupColumns() {
                this.columns = [];
                const columnCount = Math.floor(this.canvas.width / this.fontSize);
                
                for (let i = 0; i < columnCount; i++) {
                    this.columns[i] = {
                        x: i * this.fontSize,
                        y: Math.random() * -this.canvas.height,
                        speed: Math.random() * 5 + 2,
                        characters: this.generateRandomCharacters(30)
                    };
                }
            }

            generateRandomCharacters(length) {
                const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                let result = '';
                
                for (let i = 0; i < length; i++) {
                    result += chars.charAt(Math.floor(Math.random() * chars.length));
                }
                
                return result;
            }

            animate() {
                this.ctx.fillStyle = 'rgba(10, 10, 31, 0.05)';
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
                
                this.ctx.font = `${this.fontSize}px monospace`;
                
                this.columns.forEach(column => {
                    // Couleur dégradé
                    const gradient = this.ctx.createLinearGradient(0, column.y, 0, column.y + 20);
                    gradient.addColorStop(0, '#00ff00');
                    gradient.addColorStop(0.5, '#ffffff');
                    gradient.addColorStop(1, '#00ff00');
                    
                    this.ctx.fillStyle = gradient;
                    
                    // Dessiner les caractères
                    for (let i = 0; i < column.characters.length; i++) {
                        const char = column.characters.charAt(i);
                        const y = column.y + i * this.fontSize;
                        
                        if (y > 0 && y < this.canvas.height) {
                            const opacity = i / column.characters.length;
                            this.ctx.globalAlpha = opacity;
                            this.ctx.fillText(char, column.x, y);
                        }
                    }
                    
                    // Mouvement
                    column.y += column.speed;
                    
                    // Réinitialiser quand la colonne sort de l'écran
                    if (column.y > this.canvas.height) {
                        column.y = Math.random() * -100;
                        column.characters = this.generateRandomCharacters(30);
                    }
                });
                
                this.ctx.globalAlpha = 1;
                requestAnimationFrame(() => this.animate());
            }
        }

        // =============================================
        // SYSTÈME DE CONFÉTTI QUANTIQUE
        // =============================================

        class QuantumConfetti {
            constructor() {
                this.container = document.getElementById('confetti-container');
                this.particles = [];
            }

            launch(x, y, count = 150) {
                for (let i = 0; i < count; i++) {
                    this.createParticle(x, y);
                }
            }

            createParticle(x, y) {
                const particle = document.createElement('div');
                particle.className = 'confetti-particle';
                
                // Styles de base
                const size = Math.random() * 12 + 6;
                const colors = [
                    '#ff0000', '#00ff00', '#0000ff', '#ffff00', 
                    '#ff00ff', '#00ffff', '#ff8000', '#ff0080'
                ];
                
                particle.style.cssText = `
                    position: fixed;
                    width: ${size}px;
                    height: ${size}px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    border-radius: ${Math.random() > 0.7 ? '50%' : '2px'};
                    top: ${y}px;
                    left: ${x}px;
                    pointer-events: none;
                    z-index: 1000;
                    transform: rotate(${Math.random() * 360}deg);
                `;
                
                this.container.appendChild(particle);
                
                // Animation
                const animation = particle.animate([
                    {
                        transform: `translate(0, 0) rotate(0deg)`,
                        opacity: 1
                    },
                    {
                        transform: `translate(${Math.random() * 400 - 200}px, ${window.innerHeight}px) rotate(${Math.random() * 720}deg)`,
                        opacity: 0
                    }
                ], {
                    duration: Math.random() * 3000 + 2000,
                    easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
                });
                
                animation.onfinish = () => {
                    particle.remove();
                };
                
                this.particles.push(particle);
            }
        }

        // =============================================
        // MORPHING SHAPES AVANCÉ
        // =============================================

        class MorphingShapes {
            constructor() {
                this.container = document.getElementById('morphing-shapes');
                this.shapes = [];
                this.init();
            }

            init() {
                this.createShapes(5);
                this.animate();
            }

            createShapes(count) {
                for (let i = 0; i < count; i++) {
                    const shape = document.createElement('div');
                    shape.className = 'morphing-shape';
                    
                    shape.style.cssText = `
                        position: fixed;
                        width: ${Math.random() * 200 + 50}px;
                        height: ${Math.random() * 200 + 50}px;
                        background: radial-gradient(circle, 
                            hsl(${Math.random() * 360}, 70%, 60%) 0%, 
                            transparent 70%);
                        border-radius: ${Math.random() * 50}%;
                        filter: blur(${Math.random() * 30 + 10}px);
                        opacity: ${Math.random() * 0.3 + 0.1};
                        mix-blend-mode: screen;
                        pointer-events: none;
                        z-index: -1;
                    `;
                    
                    this.container.appendChild(shape);
                    this.shapes.push({
                        element: shape,
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        targetX: Math.random() * window.innerWidth,
                        targetY: Math.random() * window.innerHeight,
                        speed: Math.random() * 2 + 0.5
                    });
                }
            }

            animate() {
                this.shapes.forEach(shape => {
                    // Mouvement vers la cible
                    const dx = shape.targetX - shape.x;
                    const dy = shape.targetY - shape.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 10) {
                        shape.targetX = Math.random() * window.innerWidth;
                        shape.targetY = Math.random() * window.innerHeight;
                    } else {
                        shape.x += (dx / distance) * shape.speed;
                        shape.y += (dy / distance) * shape.speed;
                    }
                    
                    shape.element.style.transform = `translate(${shape.x}px, ${shape.y}px)`;
                    
                    // Morphing de la forme
                    const borderRadius = Math.random() * 50;
                    shape.element.style.borderRadius = `${borderRadius}%`;
                });
                
                requestAnimationFrame(() => this.animate());
            }
        }

        // =============================================
        // SYSTÈME DE NOTIFICATIONS HOLOGRAPraphIQUES
        // =============================================

        class HologramNotifications {
            constructor() {
                this.notification = document.getElementById('floating-notification');
                this.queue = [];
                this.isShowing = false;
            }

            show(message, type = 'success', duration = 3000) {
                this.queue.push({ message, type, duration });
                if (!this.isShowing) this.processQueue();
            }

            processQueue() {
                if (this.queue.length === 0) {
                    this.isShowing = false;
                    return;
                }

                this.isShowing = true;
                const { message, type, duration } = this.queue.shift();
                
                // Mettre à jour le contenu
                const icon = this.notification.querySelector('i');
                const text = this.notification.querySelector('span');
                
                icon.className = this.getIconClass(type);
                text.textContent = message;
                this.notification.className = `notification ${type}`;
                
                // Animation d'entrée
                this.notification.classList.remove('hidden');
                this.notification.animate([
                    { transform: 'translateX(100%) scale(0.8)', opacity: 0 },
                    { transform: 'translateX(0) scale(1)', opacity: 1 }
                ], {
                    duration: 500,
                    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                });

                // Timer pour masquer
                setTimeout(() => {
                    this.hide();
                }, duration);
            }

            hide() {
                this.notification.animate([
                    { transform: 'translateX(0) scale(1)', opacity: 1 },
                    { transform: 'translateX(100%) scale(0.8)', opacity: 0 }
                ], {
                    duration: 500,
                    easing: 'ease-in'
                }).onfinish = () => {
                    this.notification.classList.add('hidden');
                    setTimeout(() => this.processQueue(), 300);
                };
            }

            getIconClass(type) {
                const icons = {
                    success: 'fas fa-check-circle',
                    error: 'fas fa-exclamation-circle',
                    warning: 'fas fa-exclamation-triangle',
                    info: 'fas fa-info-circle'
                };
                return icons[type] || icons.info;
            }
        }

        // =============================================
        // LOADER QUANTIQUE AVANCÉ
        // =============================================

        class QuantumLoader {
            constructor() {
                this.loader = document.getElementById('quantum-loader');
                this.isVisible = false;
            }

            show(message = 'Initialisation du système quantique...') {
                this.loader.querySelector('p').textContent = message;
                this.loader.classList.remove('hidden');
                this.isVisible = true;
                
                // Animation d'entrée
                this.loader.animate([
                    { opacity: 0, transform: 'scale(0.8) rotate(-10deg)' },
                    { opacity: 1, transform: 'scale(1) rotate(0deg)' }
                ], {
                    duration: 600,
                    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                });
            }

            hide() {
                if (!this.isVisible) return;
                
                this.loader.animate([
                    { opacity: 1, transform: 'scale(1) rotate(0deg)' },
                    { opacity: 0, transform: 'scale(0.8) rotate(10deg)' }
                ], {
                    duration: 400,
                    easing: 'ease-in'
                }).onfinish = () => {
                    this.loader.classList.add('hidden');
                    this.isVisible = false;
                };
            }

            updateProgress(percent, message) {
                if (message) this.loader.querySelector('p').textContent = message;
                // Implémenter une barre de progression visuelle si nécessaire
            }
        }

        // =============================================
        // SYSTÈME DE PAIEMENT AVEC EFFETS SPÉCIAUX
        // =============================================

        class EpicPaymentSystem {
            constructor() {
                this.quantumLoader = new QuantumLoader();
                this.hologramNotifications = new HologramNotifications();
                this.quantumConfetti = new QuantumConfetti();
                this.isProcessing = false;
                
                this.init();
            }

            init() {
                this.setupEventListeners();
                this.initializeSystem();
            }

            initializeSystem() {
                // Simulation d'initialisation du système
                this.quantumLoader.show('Chargement des modules quantiques...');
                
                setTimeout(() => {
                    this.quantumLoader.updateProgress(33, 'Synchronisation avec les serveurs...');
                    
                    setTimeout(() => {
                        this.quantumLoader.updateProgress(66, 'Activation des protocoles de sécurité...');
                        
                        setTimeout(() => {
                            this.quantumLoader.updateProgress(100, 'Système prêt!');
                            
                            setTimeout(() => {
                                this.quantumLoader.hide();
                                this.hologramNotifications.show(
                                    'Système de paiement quantique activé!', 
                                    'success'
                                );
                            }, 800);
                        }, 1200);
                    }, 1200);
                }, 1200);
            }

            setupEventListeners() {
                const payBtn = document.getElementById('pay-btn');
                const operatorBtns = document.querySelectorAll('.operator-btn');
                const amountOptions = document.querySelectorAll('.amount-option');

                // Bouton de paiement
                payBtn.addEventListener('click', () => this.processPayment());

                // Sélection d'opérateur avec effets
                operatorBtns.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        this.animateOperatorSelection(e.target);
                    });
                });

                // Sélection de montant avec effets
                amountOptions.forEach(option => {
                    option.addEventListener('click', (e) => {
                        this.animateAmountSelection(e.target);
                    });
                });

                // Effets de saisie
                const inputs = document.querySelectorAll('input, select');
                inputs.forEach(input => {
                    input.addEventListener('focus', () => {
                        this.animateInputFocus(input);
                    });
                    
                    input.addEventListener('input', () => {
                        this.animateInputChange(input);
                    });
                });
            }

            animateOperatorSelection(button) {
                // Effet de particules
                const rect = button.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;
                
                this.quantumConfetti.launch(x, y, 30);
                
                // Animation du bouton
                button.animate([
                    { transform: 'scale(1)' },
                    { transform: 'scale(1.1)' },
                    { transform: 'scale(1)' }
                ], {
                    duration: 300,
                    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                });
            }

            animateAmountSelection(option) {
                // Effet de vague lumineuse
                option.animate([
                    { 
                        boxShadow: '0 0 0 0 rgba(255, 255, 255, 0.7)',
                        transform: 'scale(1)'
                    },
                    { 
                        boxShadow: '0 0 0 20px rgba(255, 255, 255, 0)',
                        transform: 'scale(1.05)'
                    },
                    { 
                        transform: 'scale(1)'
                    }
                ], {
                    duration: 600,
                    easing: 'ease-out'
                });
            }

            animateInputFocus(input) {
                input.parentElement.animate([
                    { transform: 'translateY(0)' },
                    { transform: 'translateY(-2px)' },
                    { transform: 'translateY(0)' }
                ], {
                    duration: 400,
                    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                });
            }

            animateInputChange(input) {
                if (input.value.length > 0) {
                    input.style.background = 'rgba(0, 243, 255, 0.1)';
                } else {
                    input.style.background = 'rgba(255, 255, 255, 0.07)';
                }
            }

            async processPayment() {
                if (this.isProcessing) return;
                
                this.isProcessing = true;
                const payBtn = document.getElementById('pay-btn');
                
                // Animation de préparation
                payBtn.innerHTML = '<div class="quantum-spinner"></div> Initialisation quantique...';
                payBtn.disabled = true;
                
                // Effet de chargement épique
                this.quantumLoader.show('Début de la séquence de paiement...');
                
                // Simulation des étapes de paiement avec effets
                const steps = [
                    { delay: 1500, message: 'Vérification des identifiants quantiques...' },
                    { delay: 2000, message: 'Chiffrement des données sensibles...' },
                    { delay: 1800, message: 'Connexion au réseau blockchain...' },
                    { delay: 2200, message: 'Validation de la transaction...' },
                    { delay: 2500, message: 'Finalisation du processus...' }
                ];
                
                for (let i = 0; i < steps.length; i++) {
                    await this.simulateStep(steps[i]);
                }
                
                // Succès épique!
                this.quantumLoader.hide();
                this.showEpicSuccess();
            }

            simulateStep(step) {
                return new Promise(resolve => {
                    setTimeout(() => {
                        this.quantumLoader.updateProgress(
                            Math.floor((steps.indexOf(step) + 1) / steps.length * 100),
                            step.message
                        );
                        
                        // Effet sonore visuel
                        this.createRippleEffect();
                        resolve();
                    }, step.delay);
                });
            }

            showEpicSuccess() {
                const payBtn = document.getElementById('pay-btn');
                
                // Confetti massif
                this.quantumConfetti.launch(
                    window.innerWidth / 2, 
                    window.innerHeight / 2, 
                    500
                );
                
                // Notification holographique
                this.hologramNotifications.show(
                    'Paiement quantique réussi! Transaction sécurisée.', 
                    'success', 
                    5000
                );
                
                // Animation du bouton de succès
                payBtn.innerHTML = '<i class="fas fa-star"></i> Transaction Quantique Réussie!';
                payBtn.style.background = 'linear-gradient(135deg, #00b09b, #96c93d)';
                
                payBtn.animate([
                    { transform: 'scale(1)' },
                    { transform: 'scale(1.2)' },
                    { transform: 'scale(1)' }
                ], {
                    duration: 1000,
                    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                });
                
                // Effet de lumière stroboscopique
                this.createLightShow();
                
                // Réinitialisation après délai
                setTimeout(() => {
                    this.resetPaymentUI();
                    this.isProcessing = false;
                }, 5000);
            }

            createRippleEffect() {
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    width: 100px;
                    height: 100px;
                    border: 2px solid #00f3ff;
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                    z-index: 10000;
                `;
                
                document.body.appendChild(ripple);
                
                ripple.animate([
                    { 
                        width: '100px',
                        height: '100px',
                        opacity: 1,
                        borderWidth: '2px'
                    },
                    { 
                        width: '500px',
                        height: '500px',
                        opacity: 0,
                        borderWidth: '0px'
                    }
                ], {
                    duration: 1000,
                    easing: 'ease-out'
                }).onfinish = () => {
                    ripple.remove();
                };
            }

            createLightShow() {
                const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
                
                for (let i = 0; i < 10; i++) {
                    setTimeout(() => {
                        document.body.style.background = colors[Math.floor(Math.random() * colors.length)];
                        
                        setTimeout(() => {
                            document.body.style.background = '';
                        }, 100);
                    }, i * 200);
                }
            }

            resetPaymentUI() {
                const payBtn = document.getElementById('pay-btn');
                const inputs = document.querySelectorAll('input, select');
                const amountOptions = document.querySelectorAll('.amount-option');
                
                // Réinitialiser le bouton
                payBtn.innerHTML = '<i class="fas fa-lock"></i> Payer maintenant';
                payBtn.disabled = false;
                payBtn.style.background = '';
                
                // Réinitialiser les champs
                inputs.forEach(input => {
                    input.value = '';
                    input.style.background = '';
                });
                
                // Réinitialiser les options de montant
                amountOptions.forEach(option => {
                    option.classList.remove('selected');
                });
                
                // Réinitialiser l'opérateur
                const mtnBtn = document.querySelector('.operator-btn.mtn');
                const moovBtn = document.querySelector('.operator-btn.moov');
                
                mtnBtn.classList.add('active');
                moovBtn.classList.remove('active');
            }
        }

        // =============================================
        // INITIALISATION DU SYSTÈME COMPLET
        // =============================================

        document.addEventListener('DOMContentLoaded', () => {
            // Démarrer tous les systèmes
            const matrixRain = new MatrixRain();
            const quantumParticles = new QuantumParticleSystem();
            const morphingShapes = new MorphingShapes();
            const quantumConfetti = new QuantumConfetti();
            const paymentSystem = new EpicPaymentSystem();
            
            // Effet de démarrage épique
            setTimeout(() => {
                quantumConfetti.launch(
                    window.innerWidth / 2,
                    window.innerHeight / 2,
                    200
                );
            }, 2000);
            
            console.log('🚀 Système de paiement quantique initialisé!');
            console.log('✨ Effets spéciaux activés');
            console.log('🎮 Interface prête pour l\'expérience épique');
        });

        // =============================================
        // CSS POUR LES NOUVEAUX ÉLÉMENTS
        // =============================================

        const style = document.createElement('style');
        style.textContent = `
            #matrixCanvas, #particleCanvas {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: -1;
            }
            
            #confetti-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 10000;
            }
            
            #morphing-shapes {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: -1;
            }
            
            #floating-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 10px;
                padding: 15px 20px;
                display: flex;
                align-items: center;
                gap: 10px;
                z-index: 10000;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            }
            
            #floating-notification.hidden {
                display: none;
            }
            
            #floating-notification.success {
                border-left: 4px solid #2ecc71;
            }
            
            #floating-notification.error {
                border-left: 4px solid #e74c3c;
            }
            
            #quantum-loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(10, 10, 31, 0.95);
                backdrop-filter: blur(10px);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                z-index: 100000;
            }
            
            #quantum-loader.hidden {
                display: none;
            }
            
            .quantum-sphere {
                width: 80px;
                height: 80px;
                background: radial-gradient(circle, #00f3ff, #0066ff);
                border-radius: 50%;
                animation: quantumPulse 2s infinite alternate;
            }
            
            @keyframes quantumPulse {
                0% { transform: scale(1); box-shadow: 0 0 20px #00f3ff; }
                100% { transform: scale(1.2); box-shadow: 0 0 40px #0066ff; }
            }
            
            .quantum-spinner {
                width: 20px;
                height: 20px;
                border: 2px solid transparent;
                border-top: 2px solid #00f3ff;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                display: inline-block;
                margin-right: 10px;
            }
            
            .hidden {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    </script>
</body>
</html>