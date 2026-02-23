// Google Translate Initialization
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'es',
        includedLanguages: 'en,fr,it,pt,de',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
    }, 'google_translate_element');
}

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.sidebar-link');
    const mainContent = document.querySelector('main');
    const cursor = document.getElementById('cursor');
    const scrollProgress = document.getElementById('scroll-progress');

    // 1. Custom Cursor Follower
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, .cursor-pointer, .osi-layer, .tcp-ip-layer, .comm-layer, .port-card, .ip-class-card, .tier-card, .www-governance-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('active'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });

    // 2. Scroll Progress Bar
    mainContent.addEventListener('scroll', () => {
        const scrollTop = mainContent.scrollTop;
        const scrollHeight = mainContent.scrollHeight - mainContent.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        scrollProgress.style.width = progress + '%';
    });

    // Funcionalidad de clic en la barra lateral
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                setActiveLink(link);
            }
        });
    });

    function setActiveLink(activeLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

    // Intersection Observer para resaltar la sección actual al hacer scroll
    const observerOptions = {
        root: mainContent,
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const correspondingLink = document.querySelector(`.sidebar-link[href="#${id}"]`);
                if (correspondingLink) {
                    setActiveLink(correspondingLink);
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Animaciones de revelado al hacer scroll (Inmersión)
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));

    // Interactividad Modelo OSI
    const osiLayers = document.querySelectorAll('.osi-layer');
    const osiInfoPanel = document.getElementById('osi-info-panel');

    const osiData = {
        1: { title: "Capa Física", desc: "Transmisión de bits crudos sobre un medio físico. Define las especificaciones eléctricas y mecánicas de los cables, conectores y voltajes." },
        2: { title: "Enlace de Datos", desc: "Provee transferencia de datos confiable entre dos nodos conectados directamente. Se encarga de la detección de errores y el direccionamiento físico (MAC)." },
        3: { title: "Capa de Red", desc: "Determina la mejor ruta para enviar paquetes a través de redes interconectadas utilizando direccionamiento lógico (IP) y enrutamiento." },
        4: { title: "Capa de Transporte", desc: "Garantiza la entrega de datos de extremo a extremo, asegurando que lleguen en orden y sin errores (TCP/UDP)." },
        5: { title: "Capa de Sesión", desc: "Establece, gestiona y finaliza las sesiones de comunicación entre aplicaciones. Mantiene el control del diálogo y la sincronización." },
        6: { title: "Capa de Presentación", desc: "Traduce, cifra y comprime los datos. Asegura que la información enviada por la capa de aplicación de un sistema sea legible por la del otro." },
        7: { title: "Capa de Aplicación", desc: "Interfaz directa para el usuario y los procesos de red. Proporciona servicios como navegación web (HTTP), correo (SMTP) y transferencia de archivos (FTP)." }
    };

    osiLayers.forEach(layer => {
        layer.addEventListener('click', () => {
            const layerId = layer.getAttribute('data-layer');
            const data = osiData[layerId];

            // Feedback visual en la lista
            osiLayers.forEach(l => l.classList.remove('bg-primary', 'shadow-xl', 'shadow-red-900/20', 'scale-105', 'z-10'));
            layer.classList.add('bg-primary', 'shadow-xl', 'shadow-red-900/20', 'scale-105', 'z-10');

            // Actualizar panel
            osiInfoPanel.style.opacity = '0';
            osiInfoPanel.style.transform = 'translateY(10px)';

            setTimeout(() => {
                osiInfoPanel.innerHTML = `
                    <div class="space-y-4 animate-fadeIn">
                        <h4 class="text-secondary font-black text-2xl uppercase tracking-tighter italic">${data.title}</h4>
                        <div class="h-1 w-12 bg-primary mx-auto rounded-full"></div>
                        <p class="text-black leading-relaxed font-light text-lg italic">"${data.desc}"</p>
                    </div>
                `;
                osiInfoPanel.style.opacity = '1';
                osiInfoPanel.style.transform = 'translateY(0)';
            }, 300);
        });
    });

    // Interactividad Modelo TCP/IP
    const tcpIpLayers = document.querySelectorAll('.tcp-ip-layer');
    const tcpIpInfoPanel = document.getElementById('tcp-ip-info-panel');

    const tcpIpData = {
        1: { title: "Acceso a la Red", desc: "Corresponde a las capas Física y de Enlace del modelo OSI. Maneja el hardware y la transmisión de bits sobre el medio físico." },
        2: { title: "Capa de Internet", desc: "Se encarga del direccionamiento lógico y el enrutamiento de paquetes a través de la red (IP)." },
        3: { title: "Capa de Transporte", desc: "Gestiona la comunicación host-a-host con protocolos como TCP (confiable) y UDP (rápido)." },
        4: { title: "Capa de Aplicación", desc: "Interfaz donde residen los protocolos de red que usan las aplicaciones (HTTP, SMTP, DNS, FTP)." }
    };

    tcpIpLayers.forEach(layer => {
        layer.addEventListener('click', () => {
            const layerId = layer.getAttribute('data-layer');
            const data = tcpIpData[layerId];

            // Feedback visual
            tcpIpLayers.forEach(l => l.classList.remove('bg-primary', 'shadow-xl', 'shadow-red-900/20', 'scale-105', 'z-10'));
            layer.classList.add('bg-primary', 'shadow-xl', 'shadow-red-900/20', 'scale-105', 'z-10');

            // Actualizar panel
            tcpIpInfoPanel.style.opacity = '0';
            tcpIpInfoPanel.style.transform = 'translateY(10px)';

            setTimeout(() => {
                tcpIpInfoPanel.innerHTML = `
                    <div class="space-y-4 animate-fadeIn">
                        <h4 class="text-white font-black text-2xl uppercase tracking-tighter italic">${data.title}</h4>
                        <div class="h-1 w-12 bg-primary mx-auto rounded-full"></div>
                        <p class="text-slate-300 leading-relaxed font-light text-lg italic">"${data.desc}"</p>
                    </div>
                `;
                tcpIpInfoPanel.style.opacity = '1';
                tcpIpInfoPanel.style.transform = 'translateY(0)';
            }, 300);
        });
    });

    // Interactividad Protocolos de Comunicación
    const commLayers = document.querySelectorAll('.comm-layer');
    const commInfoPanel = document.getElementById('comm-info-panel');

    const commData = {
        application: {
            title: "Capa de Aplicación (L7-L5)",
            desc: "Donde residen los servicios que interactúan directamente con el usuario y las aplicaciones finales.",
            protocols: [
                { category: "Nombres", items: "DNS" },
                { category: "Web", items: "HTTP, Gopher" },
                { category: "Archivos", items: "FTP, TFTP, NFS" },
                { category: "Correo", items: "SMTP, POP, IMAP, NNTP" },
                { category: "Gestión", items: "SNMP, DHCP, BOOTP" },
                { category: "Interactivos", items: "Telnet, IRC" }
            ]
        },
        transport: {
            title: "Capa de Transporte (L4)",
            desc: "Asegura que los datos lleguen correctamente entre los procesos de las computadoras finales.",
            protocols: [
                { category: "Conexión", items: "TCP (Transmisión Controlada)" },
                { category: "Sin Conexión", items: "UDP (Datagramas de Usuario)" }
            ]
        },
        internet: {
            title: "Capa de Internet (L3)",
            desc: "Responsable del direccionamiento lógico y el enrutamiento de paquetes a través de redes locales e internacionales.",
            protocols: [
                { category: "Núcleo", items: "IP (IPv4, IPv6)" },
                { category: "Soporte", items: "ICMP, IGMP, ND" },
                { category: "Enrutamiento", items: "BGP, OSPF, RIP, IS-IS" },
                { category: "Seguridad", items: "IPSec" }
            ]
        },
        network: {
            title: "Acceso a la Red (L2-L1)",
            desc: "Define cómo se envían físicamente los datos a través de la infraestructura de hardware.",
            protocols: [
                { category: "Resolución", items: "ARP, RARP" },
                { category: "Enlaces", items: "PPP, SLIP" },
                { category: "Hardware", items: "Ethernet, Wi-Fi, Controladores" }
            ]
        }
    };

    commLayers.forEach(layer => {
        layer.addEventListener('click', () => {
            const layerId = layer.getAttribute('data-layer');
            const data = commData[layerId];

            // Feedback visual
            commLayers.forEach(l => {
                l.classList.remove('bg-primary', 'shadow-xl', 'shadow-red-900/20', 'scale-105', 'z-10');
                l.querySelector('.bg-white')?.classList.remove('text-white', 'bg-red-800');
                l.querySelectorAll('span').forEach(s => s.classList.replace('text-white', 'text-slate-700'));
                l.querySelectorAll('span').forEach(s => s.classList.replace('text-slate-200', 'text-slate-400'));
                l.querySelectorAll('span').forEach(s => s.classList.remove('text-white', 'text-slate-200')); // Safety
            });

            layer.classList.add('bg-primary', 'shadow-xl', 'shadow-red-900/20', 'scale-105', 'z-10');
            layer.querySelector('.bg-white')?.classList.add('bg-red-800', 'text-white');
            layer.querySelectorAll('span').forEach(s => {
                if (s.innerText && !s.classList.contains('material-symbols-outlined')) {
                    if (s.classList.contains('text-slate-700')) s.classList.replace('text-slate-700', 'text-white');
                    else if (s.classList.contains('text-slate-400')) s.classList.replace('text-slate-400', 'text-slate-200');
                    else {
                        if (s.parentElement.classList.contains('text-left') || s.classList.contains('leading-none')) {
                            s.classList.add('text-white');
                        }
                    }
                }
            });

            // Actualizar panel
            commInfoPanel.style.opacity = '0';
            commInfoPanel.style.transform = 'scale(0.95)';

            setTimeout(() => {
                let protocolsHtml = data.protocols.map(p => `
                    <div class="flex flex-col p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <span class="text-[9px] font-black text-primary uppercase tracking-widest mb-1">${p.category}</span>
                        <span class="text-sm font-bold text-secondary">${p.items}</span>
                    </div>
                `).join('');

                commInfoPanel.innerHTML = `
                    <div class="space-y-6 animate-fadeIn w-full">
                        <div class="text-center">
                            <h4 class="text-secondary font-black text-2xl uppercase tracking-tighter italic">${data.title}</h4>
                            <div class="h-1 w-12 bg-primary mx-auto rounded-full mt-2"></div>
                            <p class="text-slate-600 leading-relaxed font-light text-md mt-4 italic px-4">"${data.desc}"</p>
                        </div>
                        <div class="grid grid-cols-2 gap-3 mt-6">
                            ${protocolsHtml}
                        </div>
                    </div>
                `;
                commInfoPanel.style.opacity = '1';
                commInfoPanel.style.transform = 'scale(1)';
            }, 300);
        });
    });

    // Interactividad Comparativa de Modelos
    const osiMiniCards = document.querySelectorAll('.osi-card-mini');
    const tcpRows = document.querySelectorAll('.service-layer-row');

    const mappingOSIToTCP = {
        7: "application", 6: "application", 5: "application",
        4: "transport",
        3: "internet",
        2: "network", 1: "network"
    };

    const mappingTCPToOSI = {
        application: [7, 6, 5],
        transport: [4],
        internet: [3],
        network: [2, 1]
    };

    function clearHighlights() {
        osiMiniCards.forEach(c => c.classList.remove('scale-110', 'shadow-lg', 'z-10', 'ring-2', 'ring-primary'));
        tcpRows.forEach(r => {
            r.classList.remove('bg-white/20', 'border-primary/50', 'scale-[1.02]');
            r.querySelector('.absolute')?.classList.add('opacity-100');
        });
    }

    osiMiniCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const osiLevel = card.getAttribute('data-osi');
            const tcpLayer = mappingOSIToTCP[osiLevel];

            clearHighlights();
            card.classList.add('scale-110', 'shadow-lg', 'z-10', 'ring-2', 'ring-primary');
            const targetTcp = document.querySelector(`[data-tcp-layer="${tcpLayer}"]`);
            if (targetTcp) targetTcp.classList.add('bg-white/20', 'border-primary/50', 'scale-[1.02]');
        });
    });

    tcpRows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            const tcpLayer = row.getAttribute('data-tcp-layer');
            const osiLevels = mappingTCPToOSI[tcpLayer];

            clearHighlights();
            row.classList.add('bg-white/20', 'border-primary/50', 'scale-[1.02]');
            osiLevels.forEach(level => {
                const targetOsi = document.querySelector(`[data-osi="${level}"]`);
                if (targetOsi) targetOsi.classList.add('scale-110', 'shadow-lg', 'z-10', 'ring-2', 'ring-primary');
            });
        });
    });

    document.getElementById('comparison-grid')?.addEventListener('mouseleave', clearHighlights);

    // Acronym Data Dictionary
    const acronymData = {
        "OSI": { significado: "Open Systems Interconnection", desc: "El modelo de referencia para los protocolos de red que divide la comunicación en 7 capas." },
        "TCP/IP": { significado: "Transmission Control Protocol / Internet Protocol", desc: "El lenguaje universal de Internet que asegura que los datos se dividan en paquetes y lleguen a su destino." },
        "DNS": { significado: "Domain Name System", desc: "La 'agenda telefónica' de la web que traduce nombres (google.com) en números (IP)." },
        "HTTP": { significado: "Hypertext Transfer Protocol", desc: "El protocolo que permite pedir y recibir las páginas que ves en tu navegador." },
        "HTTPS": { significado: "Hypertext Transfer Protocol Secure", desc: "La versión segura de HTTP que cifra la información para que nadie pueda leerla." },
        "WWW": { significado: "World Wide Web", desc: "El sistema interconectado de documentos y páginas accesibles a través de Internet." },
        "W3C": { significado: "World Wide Web Consortium", desc: "La organización internacional que define los estándares para que la web funcione igual en todo el mundo." },
        "RFC": { significado: "Request for Comments", desc: "Documentos técnicos que definen los estándares y protocolos oficiales de Internet." },
        "IP": { significado: "Internet Protocol", desc: "El sistema de direccionamiento que permite identificar cada dispositivo conectado a una red." },
        "FTP": { significado: "File Transfer Protocol", desc: "Utilizado específicamente para enviar y recibir archivos entre computadoras." },
        "SSH": { significado: "Secure Shell", desc: "Permite controlar computadoras remotas de forma segura y cifrada." },
        "MIME": { significado: "Multi-Purpose Internet Mail Extension", desc: "Reglas que permiten enviar audio, video e imágenes a través de Internet." },
        "IETF": { significado: "Internet Engineering Task Force", desc: "Grupo que desarrolla los estándares técnicos de Internet, como el protocolo IP." },
        "IAB": { significado: "Internet Architecture Board", desc: "Comité que supervisa el diseño técnico y la arquitectura general de Internet." }
    };

    // Acronym Tooltip Logic
    const acronymElems = document.querySelectorAll('.acronym');
    const acronymTooltip = document.getElementById('acronym-tooltip');
    const tSigla = document.getElementById('tooltip-sigla');
    const tMeaning = document.getElementById('tooltip-meaning');
    const tDesc = document.getElementById('tooltip-desc');

    acronymElems.forEach(el => {
        el.classList.add('cursor-help', 'border-b', 'border-primary/30');

        el.addEventListener('mouseenter', (e) => {
            const acro = el.getAttribute('data-acro') || el.innerText.trim();
            const data = acronymData[acro];
            if (data) {
                tSigla.innerText = acro;
                tMeaning.innerText = data.significado;
                tDesc.innerText = data.desc;

                const rect = el.getBoundingClientRect();
                acronymTooltip.style.left = rect.left + 'px';
                acronymTooltip.style.top = (rect.top - acronymTooltip.offsetHeight - 10) + 'px';
                acronymTooltip.classList.remove('opacity-0', 'pointer-events-none', 'scale-90');
                acronymTooltip.classList.add('opacity-100', 'scale-100');
            }
        });

        el.addEventListener('mouseleave', () => {
            acronymTooltip.classList.add('opacity-0', 'pointer-events-none', 'scale-90');
            acronymTooltip.classList.remove('opacity-100', 'scale-100');
        });
    });

    // Glossary Toggle Logic
    const glossaryToggle = document.getElementById('glossary-toggle');
    let glossaryActive = false;

    glossaryToggle?.addEventListener('click', () => {
        const translateWidget = document.getElementById('google_translate_element');
        translateWidget.style.display = translateWidget.style.display === 'block' ? 'none' : 'block';

        // Visual feedback
        glossaryToggle.classList.toggle('translate-active');
    });

    // Interactividad Puertos de Red (Enhanced)
    const portCards = document.querySelectorAll('.port-card');
    const portDetailContainer = document.getElementById('port-detail-container');
    const dPortNumber = document.getElementById('detail-port-number');
    const dPortName = document.getElementById('detail-port-name');
    const dPortSigla = document.getElementById('detail-port-sigla-meaning');
    const dPortDesc = document.getElementById('detail-port-desc');

    const portInfo = {
        21: { name: "FTP", meaning: "File Transfer Protocol", desc: "El estándar para transferir archivos. Piensa en él como un camión de mudanzas que lleva cajas (archivos) de un sitio a otro." },
        22: { name: "SSH", meaning: "Secure Shell", desc: "Permite conectarse a otro equipo por 'control remoto' de forma totalmente segura. Es la llave maestra de los administradores." },
        23: { name: "Telnet", meaning: "Terminal Network", desc: "Un sistema antiguo de control remoto. A diferencia de SSH, este no es seguro (no cifra los datos)." },
        25: { name: "SMTP", meaning: "Simple Mail Transfer Protocol", desc: "El cartero de Internet. Se encarga de recoger y entregar tus correos electrónicos al servidor." },
        53: { name: "DNS", meaning: "Domain Name System", desc: "Traduce nombres como 'google.com' en las direcciones IP que entienden las máquinas." },
        80: { name: "HTTP", meaning: "Hypertext Transfer Protocol", desc: "El lenguaje de la Web. Se usa para pedir y enviar las páginas que ves ahora mismo en el navegador." },
        110: { name: "POP3", meaning: "Post Office Protocol v3", desc: "Descarga tus correos del servidor a tu equipo y, normalmente, los borra de la nube." },
        119: { name: "NNTP", meaning: "Network News Transfer Protocol", desc: "Utilizado para los grupos de noticias y foros clásicos de Internet. Hoy en día es menos común." },
        123: { name: "NTP", meaning: "Network Time Protocol", desc: "Mantiene el reloj de tu computadora sincronizado con la hora exacta mundial." },
        143: { name: "IMAP", meaning: "Internet Message Access Protocol", desc: "Permite ver tus correos en el servidor sin descargarlos. Ideal para ver el mail desde varios dispositivos." },
        161: { name: "SNMP", meaning: "Simple Network Management Protocol", desc: "Herramienta que usan los técnicos para vigilar que los routers y switches funcionen bien." },
        194: { name: "IRC", meaning: "Internet Relay Chat", desc: "El abuelo del chat moderno. Permite hablar en tiempo real con personas de todo el mundo mediante texto." },
        443: { name: "HTTPS", meaning: "Hypertext Transfer Protocol Secure", desc: "La versión con 'escudo' de la Web. Cifra todo lo que envías (senas, tarjetas) para proteger tu privacidad." }
    };

    portCards.forEach(card => {
        card.addEventListener('click', () => {
            const port = card.getAttribute('data-port');
            const data = portInfo[port];

            // Feedback visual en tarjetas
            portCards.forEach(c => c.classList.remove('ring-4', 'ring-primary/30', 'border-primary', 'bg-primary/5'));
            card.classList.add('ring-4', 'ring-primary/30', 'border-primary', 'bg-primary/5');

            if (data) {
                // Actualizar y mostrar el panel
                dPortNumber.innerText = port;
                dPortName.innerText = data.name;
                dPortSigla.innerText = data.meaning;
                dPortDesc.innerText = data.desc;

                portDetailContainer.style.height = 'auto';
                const height = portDetailContainer.scrollHeight + 'px';
                portDetailContainer.style.height = '0';

                setTimeout(() => {
                    portDetailContainer.classList.remove('opacity-0', 'scale-95');
                    portDetailContainer.style.height = height;
                    portDetailContainer.classList.add('opacity-100', 'scale-100');

                    // Scroll suave hacia el panel si es necesario
                    portDetailContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 10);
            }
        });
    });

    // Interactividad Clases de IP
    const ipClassCards = document.querySelectorAll('.ip-class-card');
    ipClassCards.forEach(card => {
        card.addEventListener('click', () => {
            ipClassCards.forEach(c => c.classList.remove('ring-4', 'ring-primary/30', 'border-primary/50', 'bg-white/10'));
            card.classList.add('ring-4', 'ring-primary/30', 'border-primary/50', 'bg-white/10');
        });
    });

    // Interactividad 3-Tier Architecture
    const tierCards = document.querySelectorAll('.tier-card');
    tierCards.forEach(card => {
        card.addEventListener('click', () => {
            tierCards.forEach(c => {
                c.classList.remove('ring-4', 'ring-primary/20', 'border-primary/50');
                c.classList.add('border-slate-200');
            });
            card.classList.remove('border-slate-200');
            card.classList.add('ring-4', 'ring-primary/20', 'border-primary/50');
        });
    });

    // Interactividad World Wide Web Governance
    const govCards = document.querySelectorAll('.www-governance-card');
    govCards.forEach(card => {
        card.addEventListener('click', () => {
            govCards.forEach(c => {
                c.classList.remove('ring-4', 'ring-primary/20', 'border-primary/50', 'bg-white');
                c.classList.add('bg-slate-50', 'border-slate-100');
            });
            card.classList.remove('bg-slate-50', 'border-slate-100');
            card.classList.add('ring-4', 'ring-primary/20', 'border-primary/50', 'bg-white');
        });
    });

    // Final Tour Button - Celebration Logic
    const finalBtn = document.getElementById('final-tour-btn');
    finalBtn?.addEventListener('click', () => {
        // 1. Celebration Confetti
        for (let i = 0; i < 60; i++) {
            createConfettiPiece();
        }

        // 2. Change state
        finalBtn.innerHTML = `
            <div class="absolute inset-0 bg-green-600 transition-colors duration-500"></div>
            <span class="relative z-10 text-white font-black text-xs uppercase tracking-[0.3em] flex items-center gap-4">
                ¡Recorrido Completado!
                <span class="material-symbols-outlined animate-bounce">verified</span>
            </span>
        `;
        finalBtn.classList.remove('bg-secondary');

        setTimeout(() => {
            alert('¡Felicidades! Has completado el recorrido por los Fundamentos de la Web. \n\nPronto podrás descargar tu "Guía de Estudio" personalizada desde este mismo botón.');
        }, 1000);
    });

    function createConfettiPiece() {
        const piece = document.createElement('div');
        const colors = ['#C41E3A', '#1E293B', '#F8FAFC', '#94A3B8'];
        piece.style.position = 'fixed';
        piece.style.zIndex = '9999';
        piece.style.width = '10px';
        piece.style.height = '10px';
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.left = Math.random() * 100 + 'vw';
        piece.style.top = '-10px';
        piece.style.borderRadius = '2px';

        document.body.appendChild(piece);

        piece.animate([
            { top: '-10px', opacity: 1, transform: `rotate(0deg) translateX(0)` },
            { top: '100vh', opacity: 0, transform: `rotate(720deg) translateX(${Math.random() * 100 - 50}px)` }
        ], {
            duration: 2000 + Math.random() * 3000,
            easing: 'cubic-bezier(.37,0,.63,1)'
        }).onfinish = () => piece.remove();
    }

    // 3. Tilt Effect for Cards
    const tiltCards = document.querySelectorAll('.tier-card, .www-governance-card, .ip-class-card, .osi-layer, .tcp-ip-layer, #web-ecosystem .p-6');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 8;
            const rotateY = (centerX - x) / 8;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    });

    // Share Functionality
    const shareBtn = document.getElementById('footer-share-btn');
    shareBtn?.addEventListener('click', async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Fundamentos de la Web - UFPS',
                    text: 'Aprende los cimientos de la infraestructura digital global en este recurso interactivo.',
                    url: window.location.href
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert('Enlace copiado al portapapeles. ¡Compártelo con tus colegas!');
        }
    });

    // Unified Download Functionality
    const downloadTxtBtn = document.getElementById('download-txt');
    const downloadPdfBtn = document.getElementById('download-pdf');

    const generateStudyGuideContent = (isMarkdown = true) => {
        let content = isMarkdown ? `# GUÍA DE ESTUDIO: FUNDAMENTOS DE LA WEB\n` : `GUÍA DE ESTUDIO: FUNDAMENTOS DE LA WEB\n`;
        content += isMarkdown ? `*Un recurso académico de Ingeniería de Sistemas - UFPS*\n\n` : `Un recurso académico de Ingeniería de Sistemas - UFPS\n\n`;

        content += isMarkdown ? `## 1. DICCIONARIO TÉCNICO (GLOSARIO)\n` : `1. DICCIONARIO TÉCNICO (GLOSARIO)\n`;
        for (const [key, data] of Object.entries(acronymData)) {
            content += isMarkdown ? `### ${key} (${data.significado})\n` : `${key} (${data.significado})\n`;
            content += `${data.desc}\n\n`;
        }

        content += isMarkdown ? `\n## 2. MAPA DE PUERTOS DE RED COMUNES\n` : `\n2. MAPA DE PUERTOS DE RED COMUNES\n`;
        if (isMarkdown) {
            content += `| Puerto | Nombre | Significado | Descripción |\n`;
            content += `| :--- | :--- | :--- | :--- |\n`;
        }
        for (const [port, data] of Object.entries(portInfo)) {
            if (isMarkdown) {
                content += `| ${port} | ${data.name} | ${data.meaning} | ${data.desc} |\n`;
            } else {
                content += `Puerto ${port}: ${data.name} (${data.meaning}) - ${data.desc}\n`;
            }
        }

        content += `\n\n--- \n© 2026 · Ingeniería de Sistemas · Universidad Francisco de Paula Santander`;
        return content;
    };

    downloadTxtBtn?.addEventListener('click', () => {
        const content = generateStudyGuideContent(false);
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Guia_Estudio_UFPS.txt';
        a.click();
        URL.revokeObjectURL(url);
    });

    downloadPdfBtn?.addEventListener('click', () => {
        const content = generateStudyGuideContent(true);

        // Create a temporary container for PDF styling
        const tempDiv = document.createElement('div');
        tempDiv.className = 'p-10 bg-white text-slate-900 font-sans';
        tempDiv.style.width = '800px';

        // Use marked approach or manual HTML generation for PDF
        let htmlContent = `
            <div style="font-family: 'Inter', sans-serif; color: #1e293b; line-height: 1.6;">
                <h1 style="color: #C41E3A; border-bottom: 2px solid #C41E3A; padding-bottom: 10px;">GUÍA DE ESTUDIO: FUNDAMENTOS DE LA WEB</h1>
                <p style="font-style: italic; color: #64748b;">Un recurso académico de Ingeniería de Sistemas - UFPS</p>
                
                <h2 style="color: #0F172A; margin-top: 30px;">1. DICCIONARIO TÉCNICO</h2>
                <div style="display: grid; gap: 15px;">
                    ${Object.entries(acronymData).map(([key, data]) => `
                        <div style="padding: 10px; background: #f8fafc; border-left: 4px solid #C41E3A; border-radius: 4px;">
                            <strong style="color: #C41E3A;">${key}</strong> (${data.significado})<br>
                            <span style="font-size: 0.9em;">${data.desc}</span>
                        </div>
                    `).join('')}
                </div>

                <h2 style="color: #0F172A; margin-top: 40px;">2. MAPA DE PUERTOS</h2>
                <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 0.85em;">
                    <thead>
                        <tr style="background: #C41E3A; color: white;">
                            <th style="padding: 8px; text-align: left; border: 1px solid #e2e8f0;">Pto</th>
                            <th style="padding: 8px; text-align: left; border: 1px solid #e2e8f0;">Servicio</th>
                            <th style="padding: 8px; text-align: left; border: 1px solid #e2e8f0;">Significado</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${Object.entries(portInfo).map(([port, data]) => `
                            <tr>
                                <td style="padding: 6px; border: 1px solid #e2e8f0;"><strong>${port}</strong></td>
                                <td style="padding: 6px; border: 1px solid #e2e8f0;">${data.name}</td>
                                <td style="padding: 6px; border: 1px solid #e2e8f0;">${data.meaning}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                
                <footer style="margin-top: 50px; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px; color: #94a3b8; font-size: 0.8em;">
                    © 2026 · Ingeniería de Sistemas · Universidad Francisco de Paula Santander
                </footer>
            </div>
        `;

        tempDiv.innerHTML = htmlContent;

        const opt = {
            margin: 1,
            filename: 'Guia_Estudio_UFPS.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().from(tempDiv).set(opt).save();
    });
});
