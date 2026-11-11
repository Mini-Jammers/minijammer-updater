/**
 * =============================================================================
 * SIMULADOR INTERACTIVO Y GUÍA TÉCNICA - MINIJAMMER XXL V2.0
 * RECREACIÓN PIXEL-PERFECT BASADA DIRECTAMENTE EN UIVIEW.CPP E INPUTCONTROLLER.CPP
 * =============================================================================
 */

(function () {
  'use strict';

  // Base de Datos Estructurada de las 4 Secciones Principales y sus Subpartes
  const SECTIONS_DATA = {
    // =========================================================================
    // SECCIÓN 1: MODO JAM PRINCIPAL
    // =========================================================================
    'sampler': {
      sectionKey: 'jam',
      subKey: 'sampler',
      screenId: 'screen-jam-sampler',
      badge: '1.1 SAMPLER',
      titulo: '1.1 Sampler — Reproducción Polifónica, Chops, Envolventes y Páginas P1..P4',
      icon: '🥁',
      highlightControls: ['hw-pads-matrix', 'hw-pot-vol', 'hw-enc-1', 'hw-enc-2', 'hw-enc-3', 'hw-enc-4', 'hw-touchstrip', 'hw-joy'],
      screenHeader: 'ESTUDIO JAM • PISTA SAMPLER (T1..T8)',
      screenBreakdown: [
        {
          zona: 'Barra Global Superior (Y=0..12)',
          detalles: 'Punto verde de MicroSD montada, separadores blancos verticales, indicadores MON (Verde: monitor de entrada activo), LINE (Entrada física de línea auxiliar), SPK (Altavoz encendido), FM (Radio FM apagada), cronómetro de grabación directa a MicroSD (00:00) y tiempo libre disponible en la tarjeta (< 45m >).'
        },
        {
          zona: 'Barra Superior de 8 Pistas (Y=15..27)',
          detalles: '4 pestañas por página con bordes redondeados y esquinas suaves. Pista T1:SMP activa en amarillo dorado brillante (fill #463700, border #ffd700) con punto indicador de disparo rítmico a la izquierda; pistas secundarias en reposo e indicador de página [1/2] o [2/2] al margen derecho.'
        },
        {
          zona: 'Mini Matriz de 16 Pads en Pantalla (X=7, Y=19)',
          detalles: 'Matriz 4x4 idéntica a los 16 pads físicos. Pads con muestra de audio cargada se rellenan en ámbar (#c86400). El Pad 1 tiene recuadro cian (#00e5ff) indicando foco de edición. El Pad 3 se ilumina en verde al sonar. Debajo se muestra el estado MUTE | SOLO.'
        },
        {
          zona: 'Cuadrante de Sensores y Radar Híbrido (Y=33..72)',
          detalles: '4 barras analógicas laterales: LZ (Láser ToF 10-400mm en rojo), TS1 (Touchstrip en cian), RT (Velocidad de rotación BMI160 en amarillo) y SH (Agitar en verde). Cuadrante Radar híbrido a la derecha (48x48 px, borde naranja) mostrando anillos concéntricos, burbuja magenta del Giroscopio 2D y anillo naranja con vector de deflexión del Joystick Hall. Columna central con barras de modulación del Encoder 3 (E3, E3C, E3S, E3SC).'
        },
        {
          zona: 'Recuadro Central de Forma de Onda (X=66, Y=86, W=188, H=54)',
          detalles: 'Visualizador de onda con detector de picos en cian, amarillo y rojo según nivel. Marcador de Inicio verde con flechas direccionales, marcador de Fin rojo con flechas direccionales, aguja de reproducción blanca (Playhead), zoom óptico x1/x2 arriba a la derecha y velocidad de toque V:127 abajo a la derecha.'
        },
        {
          zona: 'Parámetros Izquierdo (X=5) y Derecho (X=266)',
          detalles: 'Izquierda: Indicador de Página y Pad (P1 P:1 en verde), VOL (100%), PIT (1.00x), ATK (0ms), REL (250ms). Derecha: MODE (>1SHOT, >GATE, >LOOP o <1SHOT en reversa), CHOKE (>OFF o >G1..G4) y calidad de muestreo (44k/16b).'
        },
        {
          zona: 'Memoria y Secuenciador Inferior (Y=144..167)',
          detalles: '16 casillas de memoria asignada de muestras (CUBET) o barra continua (CINTA) mostrando segundos usados (20.1s LOFI) y memoria restante (MEM: 02827). Línea inferior con las 16 casillas de pasos de ritmo con cabezal de barrido blanco.'
        }
      ],
      controles: [
        { control: '16 Pads de Matriz', accion: 'Disparo polifónico instantáneo con respuesta analógica a la fuerza de impacto (Velocity continuo de 1 a 127).' },
        { control: 'SOSTENER PAD + ENC 1 (Clic)', accion: 'Abre el Chop Studio (Editor de Muestras) para ajustar puntos de inicio y final con zoom visual de onda.' },
        { control: 'Encoder 1 (Giro)', accion: 'Navega entre las 8 pistas del MiniJammer o cambia el Pad activo en edición.' },
        { control: 'Encoder 2 (Giro)', accion: 'Ajusta el volumen de la muestra (0% a 200%) o el nivel de zoom en el editor.' },
        { control: 'Encoder 3 (Giro)', accion: 'Ajusta la afinación (Pitch) de 0.25x a 4.00x semitono a semitono.' },
        { control: 'Encoder 4 (Giro)', accion: 'Ajusta el tiempo de relajación (Release) del sample de 10ms a 5.0 segundos.' },
        { control: 'SHIFT + ENC 1..4', accion: 'Alterna entre las 4 páginas de parámetros: P1 (Pitch/Env), P2 (Filtro Cut/Res), P3 (FX Drive/Bitcrush), P4 (Pan/Tune).' },
        { control: 'SHIFT + REC', accion: 'Inicia o detiene la grabación de la mezcla Master estéreo en formato WAV directo a la MicroSD (/REC).' },
        { control: 'SOSTENER PAD + REC', accion: 'Borra instantáneamente todas las notas grabadas de ese instrumento en el compás actual.' },
        { control: 'CLIC JOYSTICK (Simple)', accion: 'Abre la consola del Mezclador (MIXER) de 8 canales.' },
        { control: 'CLIC JOYSTICK (Largo 500ms)', accion: 'Abre el Menú de Sistema Unificado (Sony a6000).' }
      ]
    },

    'synth': {
      sectionKey: 'jam',
      subKey: 'synth',
      screenId: 'screen-jam-synth',
      badge: '1.2 SINTETIZADOR',
      titulo: '1.2 Sintetizador — 18 Motores de Audio, Dashboard de 5 Capas y Filtro VCF TPT-SVF',
      icon: '🎹',
      highlightControls: ['hw-pads-matrix', 'hw-enc-1', 'hw-enc-2', 'hw-enc-3', 'hw-enc-4', 'hw-touchstrip', 'hw-joy'],
      screenHeader: 'ESTUDIO JAM • PISTA SINTETIZADOR V2.0',
      screenBreakdown: [
        {
          zona: 'Barra de Pistas en Sintetizador (Y=15..27)',
          detalles: 'Pista activa en azul rey vivo (fill #0f234b, border #1e5ff0, text white) con punto indicador azul de disparo. Las pistas de sampler o AMY se identifican con sus respectivos colores ámbar y magenta.'
        },
        {
          zona: 'Matriz de Teclado Cromático (X=7, Y=19)',
          detalles: 'Los 16 pads funcionan como un teclado musical cromático ordenado de C3 a D#4. El recuadro cian resalta la nota en foco (C4). Los pads iluminados en verde indican voces activas sonando en polifonía simultánea.'
        },
        {
          zona: 'Bloque de Nota y Motor (X=5, Y=86)',
          detalles: 'NOTE: C4 (verde), OCT: 4 (octava activa en cian), VOL: 100%, WAVE: #12 (VA-PRO / FM2OP / ACID / RHOD / ORGN / SWARM).'
        },
        {
          zona: 'Dashboard Dinámico de 5 Capas / 20 Controles (X=66, Y=86, W=250, H=66)',
          detalles: 'Encabezado con 5 casillas numeradas [1] [2] [3] [4] [5] correspondientes a: 1. OSC Y PITCH (Amarillo), 2. ENVOLVENTE ADSR (Cian), 3. FILTRO Y TONO (Naranja), 4. LFO Y MODULACION (Magenta), 5. ANALOGICO Y VCF (Verde). Muestra la velocidad del último toque (V:115).'
        },
        {
          zona: '4 Tarjetas de Parámetros Individuales (W=58, H=47)',
          detalles: 'Cada tarjeta muestra el nombre del parámetro, el valor en tiempo real, el badge de modulación por sensor físico (LZ: Láser, TS: Touchstrip, JX/JY: Joystick, GY/GX: Giroscopio, RT: Rotación) y una barra de nivel modulada.'
        }
      ],
      controles: [
        { control: '16 Pads de Matriz', accion: 'Teclado cromático musical polifónico de 16 notas con dinámica de pulsación (Velocity).' },
        { control: 'Encoder 1 (Giro)', accion: 'Alterna entre las 5 capas del sintetizador: Oscilador, Envolvente, Filtro, LFO y Analógico VCF.' },
        { control: 'Encoder 2 (Giro)', accion: 'Selecciona entre los 36 Presets ROM de fábrica o cambia el preset cargado desde la MicroSD.' },
        { control: 'Encoder 3 (Giro)', accion: 'Modifica el Parámetro 3 de la capa activa (ej. Detune en Oscilador, Sustain en ADSR, Cutoff en Filtro).' },
        { control: 'Encoder 4 (Giro)', accion: 'Modifica el Parámetro 4 de la capa activa (ej. Drive en Oscilador, Release en ADSR, Resonancia en Filtro).' },
        { control: 'JOYSTICK X (Izquierda/Derecha)', accion: 'Cambio instantáneo de octava (Octave Up / Down de C1 a C7).' },
        { control: 'JOYSTICK Y (Arriba/Abajo)', accion: 'Transposición musical de semitonos sin cambiar la digitación en los pads.' },
        { control: 'TOUCHSTRIP Capacitivo', accion: 'Control continuo de Pitch Bend o barrido de frecuencia de corte del filtro analógico VCF.' },
        { control: 'COPY/DEL + ENC 1', accion: 'Guarda el sonido personalizado actual como archivo .TXT en la carpeta /PRESETS de la MicroSD.' }
      ]
    },

    'seq': {
      sectionKey: 'jam',
      subKey: 'seq',
      screenId: 'screen-jam-seq',
      badge: '1.3 SECUENCIADOR',
      titulo: '1.3 Secuenciador — Grabación por Pasos, Notas Ligadas (TIEs), P-Locks y Polirritmia',
      icon: '🎼',
      highlightControls: ['hw-btn-rec', 'hw-btn-play', 'hw-pads-matrix', 'hw-btn-del'],
      screenHeader: 'ESTUDIO JAM • SECUENCIADOR MULTI-PISTA V2.0',
      screenBreakdown: [
        {
          zona: 'Marco de Modo Step Recording (X=4, Y=16, W=55, H=55)',
          detalles: 'Marco amarillo redondeado alrededor de los 16 pads que se activa al presionar REC en pausa. En grabación en vivo con PLAY activo, el marco cambia a rojo vivo parpadeante.'
        },
        {
          zona: 'Overlay Visual de Notas en los 16 Pads',
          detalles: 'Pads en Rojo: Pasos de ritmo programados. Pads en Ámbar/Naranja: Notas ligadas (TIEs) sostenidas continuamente. Pad en Blanco: Cabezal barriendo el compás.'
        },
        {
          zona: 'Panel Central de Estado de Secuencia',
          detalles: 'Indica el modo de grabación activo (● MODO STEP REC ACTIVO), el paso seleccionado (PASO [ 07 / 16 ]) y la página de compás (PÁGINA 1/4 = hasta 64 pasos totales).'
        },
        {
          zona: 'Panel de Parameter Locks (P-Locks)',
          detalles: 'Muestra los parámetros automatizados en ese paso específico: CUTOFF bloqueado a 1.45 kHz, PITCH BEND (+7 st) y NUDGE (+18% de groove micro-timing estilo J Dilla).'
        },
        {
          zona: 'Línea Inferior de 16 Pasos',
          detalles: 'Vista lineal de todo el compás con recuadro amarillo resaltando el paso en foco para edición.'
        }
      ],
      controles: [
        { control: 'REC (con Play detenido)', accion: 'Activa el modo Grabación por Pasos (Step Recording). El marco de la matriz se ilumina en amarillo.' },
        { control: 'Pulsar cualquier Pad en Step Rec', accion: 'Inserta o elimina una nota en ese paso del compás.' },
        { control: 'SOSTENER PAD A + PULSAR PAD B', accion: 'Crea una Nota Ligada (TIE estilo OP-XY): la nota se sostiene desde el paso A hasta el paso B sin re-disparar el ataque, iluminando los pasos intermedios en color ámbar.' },
        { control: 'REC (con Play sonando)', accion: 'Activa la Grabación en Vivo (Live Recording). Toca los pads o gira perillas para capturar notas y automatizaciones (P-Locks) en tiempo real.' },
        { control: 'SOSTENER PAD + REC', accion: 'Borra instantáneamente todas las notas del compás activo para ese instrumento.' },
        { control: 'COPY/DEL + ENC 1', accion: 'Ajusta la longitud de pista (Track Length de 1 a 64 pasos) permitiendo crear Polirritmias (ej. pista 1 en 16 pasos y pista 2 en 5 pasos).' },
        { control: 'COPY/DEL + ENC 2', accion: 'Ajusta el Micro-timing Nudge (desplazamiento analógico de notas fuera de rejilla) y Groove/Swing estilo J Dilla.' }
      ]
    },

    // =========================================================================
    // SECCIÓN 2: MENÚ DE SISTEMA (ESTILO SONY A6000)
    // =========================================================================
    'menu-files': {
      sectionKey: 'menu',
      subKey: 'menu-files',
      screenId: 'screen-menu-files',
      badge: '2.1 ARCHIVOS',
      titulo: '2.1 Explorador de Archivos — Navegación en MicroSD, Preescucha en Vivo y Proyectos .JAM',
      icon: '📁',
      highlightControls: ['hw-joy', 'hw-btn-play', 'hw-btn-stop', 'hw-btn-shift', 'hw-pads-matrix'],
      screenHeader: 'MENÚ DE SISTEMA SONY a6000 • PESTAÑA ARCHIVOS',
      screenBreakdown: [
        {
          zona: 'Pestañas Superiores Estilo Sony a6000 (Y=0..22)',
          detalles: '4 pestañas horizontales de 80px: [ARCHIVOS], [SENSORES], [MASTER], [UI]. La pestaña ARCHIVOS activa tiene fondo oscuro #1e1e26, marco blanco y la distintiva franja inferior naranja Sony a6000 (Y=20..22).'
        },
        {
          zona: 'Columna 1: Selector de Fuente y Motor (X=0..100)',
          detalles: 'Selector vertical con recuadro blanco: SAMPLER (muestras WAV para pads), SYNTH (presets .TXT), AMY SYNTH (parches Roland/DX7) y JAMS (proyectos de canciones completas).'
        },
        {
          zona: 'Columna 2: Navegador de Carpetas y Muestras (X=100..320)',
          detalles: 'Explorador del sistema de archivos FAT32 de la MicroSD con iconos de carpetas (DRUMS_808/, SYNTH_STABS/) y archivos de audio WAV. El archivo enfocado se resalta en cian (#00e5ff) mostrando tasa de muestreo y duración (44.1kHz • 16b PCM • 1.2s).'
        },
        {
          zona: 'Pie de Página Funcional (Y=151..169)',
          detalles: 'Indicador izquierdo parpadeante verde >> PREVIEW / ESCUCHAR y advertencia de seguridad derecha roja MANTÉN [STOP] BORRAR.'
        }
      ],
      controles: [
        { control: 'CLIC JOYSTICK (Largo 500ms)', accion: 'Abre o cierra el Menú de Sistema Unificado (Sony a6000) desde cualquier modo del MiniJammer.' },
        { control: 'JOYSTICK X (Izquierda/Derecha)', accion: 'Navega horizontalmente entre las 4 pestañas superiores (Archivos, Sensores, Master, UI) o entra a carpetas.' },
        { control: 'JOYSTICK Y (Arriba/Abajo)', accion: 'Baja del encabezado a las opciones o desplaza la lista de archivos WAV en la tarjeta MicroSD.' },
        { control: 'Botón PLAY', accion: 'Preescucha en vivo del archivo de audio WAV seleccionado a través del motor DMA sin cargarlo a memoria.' },
        { control: 'CLIC JOYSTICK + SOSTENER CUALQUIER PAD', accion: 'Carga y mapea directamente el archivo WAV seleccionado al Pad que estás presionando.' },
        { control: 'MANTENER STOP (2 segundos)', accion: 'Elimina permanentemente de la MicroSD el archivo WAV o el proyecto .JAM seleccionado.' },
        { control: 'Botón shift', accion: 'Regresa el foco a la barra superior de pestañas o sale del menú si ya estás en el nivel 0.' }
      ]
    },

    'menu-sensors': {
      sectionKey: 'menu',
      subKey: 'menu-sensors',
      screenId: 'screen-menu-sensors',
      badge: '2.2 SENSORES',
      titulo: '2.2 Sensores & Matriz de Modulación — Láser ToF, Touchstrip, Giroscopio BMI160 y Joystick',
      icon: '📡',
      highlightControls: ['hw-touchstrip', 'hw-joy', 'hw-enc-1', 'hw-enc-2', 'hw-enc-3'],
      screenHeader: 'MENÚ DE SISTEMA SONY a6000 • MATRIZ DE SENSORES',
      screenBreakdown: [
        {
          zona: 'Pestaña [SENSORES] Activa (Y=0..22)',
          detalles: 'Subrayado naranja Sony en la base de la pestaña 2 con divisor vertical a X=130.'
        },
        {
          zona: 'Columna 1: 16 Sensores Físicos Mapeables',
          detalles: 'Lista de fuentes físicas: LASER ToF, GIRO X, GIRO Y, VEL GIRO, AGITAR (SHAKE), JOYSTICK X, JOYSTICK Y, TOUCHSTRIP 1..5, ENCODER 3 CLK, ENC 3 SHIFT.'
        },
        {
          zona: 'Columna 2: Destinos de Modulación y Profundidad',
          detalles: 'Configuración del destino (FILTER CUTOFF, PITCH BEND, DELAY FEEDBACK, DRIVE TUBE, TAPESTOP, etc.), profundidad porcentual (+85%), polaridad unipolar/bipolar y curva de respuesta.'
        },
        {
          zona: 'Medidor Analógico de Sensor en Vivo',
          detalles: 'Barra visual que refleja en tiempo real la distancia del Láser en milímetros (10 a 400mm) o el ángulo físico del aparato.'
        }
      ],
      controles: [
        { control: 'Encoder 1 / JOYSTICK Y', accion: 'Selecciona la fila del sensor físico que deseas enrutar.' },
        { control: 'Encoder 2 (Giro)', accion: 'Elige el destino de audio o parámetro de síntesis que el sensor modulará.' },
        { control: 'Encoder 3 (Giro)', accion: 'Ajusta la profundidad de modulación desde -100% (inversa) hasta +100% (directa).' },
        { control: 'Encoder 4 (Giro)', accion: 'Cambia la polaridad (Unipolar o Bipolar) y la curva de respuesta (Lineal o Exponencial).' }
      ]
    },

    'menu-master': {
      sectionKey: 'menu',
      subKey: 'menu-master',
      screenId: 'screen-menu-master',
      badge: '2.3 MASTER BUS',
      titulo: '2.3 Master Bus — Ecualizador Graves/Agudos, Ganancias de E/S, Bloqueador DC y Limitador',
      icon: '🎚️',
      highlightControls: ['hw-pot-vol', 'hw-joy', 'hw-enc-1', 'hw-enc-2', 'hw-btn-shift'],
      screenHeader: 'MENÚ DE SISTEMA SONY a6000 • CADENA MASTER BUS',
      screenBreakdown: [
        {
          zona: 'Pestaña [MASTER] Activa (Y=0..22)',
          detalles: 'Indicador naranja Sony a6000 en base y lista de 10 parámetros de calibración de alta fidelidad.'
        },
        {
          zona: 'Parámetros de Audio Master de Alta Fidelidad',
          detalles: 'EQ GRAVES (±12 dB shelf), EQ AGUDOS (±12 dB shelf), VOL MIC (ganancia preamplificador analógico), VOL LINE IN (entrada auxiliar estéreo), VOL MICRO SD, VOL SESION REC (mezcla de grabación WAV), VOL AUDIFONOS, VOL BOCINA (amplificador clase D), BLOQ DC (Filtro hardware contra corriente continua ON/OFF) y LIMITADOR BRICKWALL (-0.1 dB FS).'
        }
      ],
      controles: [
        { control: 'SHIFT + CLIC JOYSTICK', accion: 'Atajo global directo para abrir el Master Bus al vuelo desde cualquier pantalla.' },
        { control: 'Encoder 1 / JOYSTICK Y', accion: 'Navega verticalmente entre los parámetros de ecualización y ganancia.' },
        { control: 'Encoder 2 (Giro)', accion: 'Ajusta el valor en decibelios (dB), porcentaje de ganancia o conmutador ON/OFF.' },
        { control: 'Perilla VOL (Analógica)', accion: 'Atenuador físico master de hardware sobre la etapa de salida analógica.' }
      ]
    },

    'menu-ui': {
      sectionKey: 'menu',
      subKey: 'menu-ui',
      screenId: 'screen-menu-ui',
      badge: '2.4 UI & CONFIG',
      titulo: '2.4 UI & Configuración — Idioma ES/EN, Calibración de Pads Piezo, Debounce y LEDs RGB',
      icon: '⚙️',
      highlightControls: ['hw-joy', 'hw-enc-1', 'hw-enc-2', 'hw-pads-matrix'],
      screenHeader: 'MENÚ DE SISTEMA SONY a6000 • CONFIGURACIÓN DE HARDWARE',
      screenBreakdown: [
        {
          zona: 'Pestaña [UI] Activa (Y=0..22)',
          detalles: 'Pestaña derecha del menú de sistema con opciones globales de personalización del dispositivo.'
        },
        {
          zona: 'Parámetros de Calibración de Hardware',
          detalles: 'IDIOMA (Español / English), VELOCIDAD (Curva piezoeléctrica Suave/Media/Dura), TECHO VEL (Ceiling de 127), TIEMPO ESC (Tiempo de escaneo de debounce de matriz en milisegundos), PANTALLA INICIO (Splash screen de arranque), COLOR SHIFT (Paleta RGB configurable del botón shift y vúmetros) y RESTAURAR DEF (Factory Reset).'
        }
      ],
      controles: [
        { control: 'Encoder 1 / JOYSTICK Y', accion: 'Navega por las opciones de personalización del sistema.' },
        { control: 'Encoder 2 (Giro)', accion: 'Alterna entre Español / Inglés o ajusta la sensibilidad de respuesta de los pads.' },
        { control: 'Botón PLAY sobre RESTAURAR DEF', accion: 'Restaura todos los ajustes de fábrica a la memoria Flash interna del ESP32.' }
      ]
    },

    // =========================================================================
    // SECCIÓN 3: MODO CANCIÓN / ESCENAS (ARRANGER V2.0)
    // =========================================================================
    'song': {
      sectionKey: 'song',
      subKey: 'song',
      screenId: 'screen-song',
      badge: '3.1 CANCIÓN / ARRANGER',
      titulo: '3.1 Modo Canción / Escenas (Arranger V2.0) — Estructura de Temas, Variaciones A..P y Timeline',
      icon: '🎬',
      highlightControls: ['hw-btn-shift', 'hw-btn-play', 'hw-btn-rec', 'hw-enc-1', 'hw-enc-2', 'hw-enc-3', 'hw-enc-4', 'hw-joy'],
      screenHeader: 'ARRANGER V2.0 • VISTA DE ESCENAS & LÍNEA DE TIEMPO',
      screenBreakdown: [
        {
          zona: '8 Columnas Verticales de Pista (X=0..295, Y=20..134)',
          detalles: 'Cada pista tiene su columna individual con divisores verticales. Arriba se muestran los badges T1..T8 en los colores del tipo de motor (Amarillo para Sampler, Azul para Sintetizador, Magenta para AMY).'
        },
        {
          zona: 'Pila Vertical de Variaciones de Patrón (Y=22..134)',
          detalles: 'Tarjetas rectangulares con letras de patrón (A, B, C...). La variación seleccionada aparece siempre centrada en Y=55 con borde brillante e iluminación viva. Las pistas vacías muestran un guión medio en reposo.'
        },
        {
          zona: 'Columna Derecha de Encoders (X=296..320)',
          detalles: 'Encabezados de acción rápida para los 4 Encoders: [+] ENC 1 (Crear nueva variación), [-] ENC 2 (Borrar variación activa), [M] ENC 3 (Mute de pista / [S-] con REC para escena anterior), [S] ENC 4 (Solo de pista / símbolo infinito LOOP con REC).'
        },
        {
          zona: 'Indicador de Escena Activa (Inferior Izquierda X=2, Y=136, W=28, H=32)',
          detalles: 'Recuadro cuadrado con borde gris #8c919b y texto en grande S1, S2, etc., indicando qué escena global se está reproduciendo o editando.'
        },
        {
          zona: 'Línea de Tiempo de Canción (Timeline X=33, Y=136, W=285, H=32)',
          detalles: 'Marco redondeado verde vivo (fill #0c1c12, border #4be16e). Muestra 6 pasos visibles simultáneos. Cada paso tiene su número arriba a la izquierda (1, 2, 3...), la escena asignada en el centro (S1, S2, S3...) y las repeticiones en amarillo abajo a la derecha (x2, x4...). El paso seleccionado se destaca con marco verde medio #2daf4b. A la derecha muestra el ratio (1/4) y el badge cyan LOOP o 1 SHOT.'
        }
      ],
      controles: [
        { control: 'SHIFT + PLAY (Columna Izquierda)', accion: 'Abre o cierra la vista del Modo Canción / Arranger V2.0 al instante sin cortar la reproducción.' },
        { control: 'JOYSTICK X (Izquierda/Derecha)', accion: 'Selecciona la pista activa entre las 8 columnas verticales (T1 a T8).' },
        { control: 'JOYSTICK Y (Arriba/Abajo)', accion: 'Cambia la variación de patrón activa (A, B, C...) de la pista seleccionada.' },
        { control: 'Encoder 1 (Clic)', accion: 'Crea una nueva variación de patrón clonada o limpia ([+] NEW).' },
        { control: 'Encoder 2 (Clic)', accion: 'Elimina la variación de patrón activa ([-] CLEAR).' },
        { control: 'REC + Encoder 3 (Giro)', accion: 'Mueve el cursor verde paso a paso por la línea de tiempo inferior de la canción.' },
        { control: 'REC + Encoder 4 (Giro)', accion: 'Ajusta el número de repeticiones (x1 a x16) que se reproducirá la escena en ese paso.' },
        { control: 'REC + Encoder 4 (Clic)', accion: 'Alterna entre LOOP continuo (bucle infinito de canción) o 1 SHOT (detener al terminar).' },
        { control: 'SHIFT + COPY/DEL', accion: 'Clona, copia, pega o resetea el patrón seleccionado entre pistas.' }
      ]
    },

    // =========================================================================
    // SECCIÓN 4: MEZCLADOR (MIXER DE 8 PISTAS)
    // =========================================================================
    'mixer': {
      sectionKey: 'mixer',
      subKey: 'mixer',
      screenId: 'screen-mixer',
      badge: '4.1 MEZCLADOR',
      titulo: '4.1 Mezclador (Mixer de 8 Pistas) — Consola Extendida, Faders de Nivel, Paneo y Macros en Vivo',
      icon: '🎛️',
      highlightControls: ['hw-joy', 'hw-enc-1', 'hw-enc-2', 'hw-enc-3', 'hw-enc-4', 'hw-pads-matrix'],
      screenHeader: 'MEZCLADOR DE AUDIO • CONSOLA VERTICAL DE 8 PISTAS',
      screenBreakdown: [
        {
          zona: '8 Canales Verticales Extendidos (X=5 + t*39, W=37, H=165, Y=2..167)',
          detalles: 'Aprovechamiento total de los 170 píxeles verticales de pantalla. El canal activo (T1) se destaca con fondo iluminado #1a202a y marco blanco puro #ffffff.'
        },
        {
          zona: 'Cabecera de Canal y Rhythm Trigger Dot',
          detalles: 'Texto de canal T1..T8 con abreviatura de instrumento (SMP en amarillo, SYN en azul, AMY en magenta, --- en gris) y punto luminoso en la esquina derecha que parpadea rítmicamente en tiempo real con los golpes de audio.'
        },
        {
          zona: 'Control de Paneo Estéreo Gráfico y Numérico (Y=23 & Y=121)',
          detalles: 'Mini-barra horizontal con marcador cian de balance estéreo arriba y valor alfanumérico exacto abajo (C para centro, L10..L50 para izquierda, R10..R50 para derecha).'
        },
        {
          zona: 'Fader de Volumen con Vúmetro Graduado (Y=30..88, Alto 58px)',
          detalles: 'Ranura de fader vertical con vúmetro tricolor dinámico: verde en rango óptico (0..55%), amarillo en nivel medio (55..80%) y rojo en saturación (80..100%). Cuenta con tirador cap analógico con relieve táctil y lectura numérica porcentual en Y=98 (ej. 85%).'
        },
        {
          zona: 'Botones Táctiles de Mute y Solo (Y=103..116)',
          detalles: 'Botón [M] rojo vivo cuando la pista está silenciada y botón [S] cian brillante cuando la pista está en modo Solo exclusivo.'
        },
        {
          zona: 'Panel Inferior de Macros de Síntesis (Y=129..163)',
          detalles: 'Recuadro de acceso rápido: En Sampler muestra Afinación (P 1.0) y Caída (R 45%). En Sintetizador muestra Filtro Cutoff (C 75%) y Tiempo Decay (D 40%).'
        }
      ],
      controles: [
        { control: 'CLIC SIMPLE DE JOYSTICK', accion: 'Abre o cierra el Mezclador de 8 canales al instante desde el Modo Jam.' },
        { control: 'JOYSTICK X (Izquierda/Derecha)', accion: 'Navega rápidamente de un canal a otro entre las 8 pistas.' },
        { control: 'Encoder 1 (Giro)', accion: 'Fader de Volumen del canal seleccionado (0% a 200% con saturación analógica).' },
        { control: 'Encoder 2 (Giro)', accion: 'Balance de Paneo Estéreo (L50 a R50).' },
        { control: 'Encoder 3 (Giro)', accion: 'Ajuste en vivo del Macro 1: Pitch en pistas Sampler / Filtro Cutoff en pistas Sintetizador.' },
        { control: 'Encoder 4 (Giro)', accion: 'Ajuste en vivo del Macro 2: Release en pistas Sampler / Envolvente Decay en pistas Sintetizador.' },
        { control: 'PADS 1 a 8', accion: 'Pulsar los pads de las dos filas superiores para silenciar o activar (Mute/Unmute) instantáneamente cada una de las 8 pistas.' },
        { control: 'SHIFT + PADS 1 a 8', accion: 'Solo rápido e instantáneo de la pista elegida, enmudeciendo el resto de la mezcla.' }
      ]
    }
  };

  // Diccionario de Controles Físicos para Inspección al Clic
  const HARDWARE_CONTROL_INFO = {
    'hw-joy': {
      nombre: 'Joystick Analógico Hall 2D (con Pulsador JoySW)',
      subtitulo: 'Navegación Cuádruple y Conmutador de Modos',
      icono: '🕹️',
      acciones: [
        { tipo: 'Clic Simple (JoySW)', desc: 'Abre y cierra el Mezclador de 8 Pistas (MIXER) en cualquier momento.' },
        { tipo: 'Clic Sostenido (500ms - 2 seg)', desc: 'Abre y cierra el Menú de Sistema Unificado (estilo Sony a6000).' },
        { tipo: 'Movimiento X (Horizontal)', desc: 'Navega entre canales en el Mixer, entre columnas en el Arranger o entre pestañas en el Menú.' },
        { tipo: 'Movimiento Y (Vertical)', desc: 'Selecciona variaciones de patrón en el Arranger o explora archivos y parámetros en el Menú.' },
        { tipo: 'Modulación en Jam', desc: 'En modo Jam actúa como vector de radar 2D modulando filtros o efectos asignados en tiempo real.' }
      ]
    },
    'hw-pot-vol': {
      nombre: 'Perilla Master de Volumen (Potenciómetro Analógico)',
      subtitulo: 'Control Físico de Ganancia de Salida',
      icono: '🔊',
      acciones: [
        { tipo: 'Giro Analógico', desc: 'Atenúa o amplifica la señal estéreo que sale hacia la toma de auriculares y el altavoz frontal.' },
        { tipo: 'Independencia', desc: 'No altera el volumen digital del mezclador ni la grabación interna a MicroSD, garantizando tomas limpias.' }
      ]
    },
    'hw-btn-shift': {
      nombre: 'Botón shift',
      subtitulo: 'Modificador Global de Segundo Nivel (Columna Izquierda)',
      icono: '⚡',
      acciones: [
        { tipo: 'SHIFT + PLAY', desc: 'Abre y cierra el Modo Canción / Arranger V2.0.' },
        { control: 'SHIFT + REC', desc: 'Inicia o detiene la grabación master de audio en formato WAV estéreo a la MicroSD (/REC).' },
        { tipo: 'SHIFT + Clic Joystick', desc: 'Abre directamente el menú de ajustes del Master Bus (Ecualizador y Ganancias).' },
        { tipo: 'SHIFT + Encoders (1..4)', desc: 'Accede a las páginas secundarias de parámetros P1..P4 en el Sampler o parámetros extendidos en el Sinte.' },
        { tipo: 'Pulsación Simple', desc: 'Funciona como botón de escape o retroceso de nivel en cualquier menú.' }
      ]
    },
    'hw-btn-rec': {
      nombre: 'Botón REC (●)',
      subtitulo: 'Grabación de Notas, P-Locks y Modificador de Canción',
      icono: '🔴',
      acciones: [
        { tipo: 'REC en Pausa', desc: 'Entra al modo Step Recording. El marco de la matriz se ilumina en amarillo.' },
        { tipo: 'REC en Reproducción', desc: 'Entra a Grabación en Vivo (Live Recording). Graba notas y automatizaciones de perillas (P-Locks).' },
        { tipo: 'REC + Encoder 3', desc: 'Desplaza el cursor de la línea de tiempo en el Modo Canción (Arranger).' },
        { tipo: 'REC + Encoder 4', desc: 'Ajusta el número de repeticiones (x1 a x16) para el paso de la canción seleccionado.' },
        { tipo: 'Sostener Pad + REC', desc: 'Borra instantáneamente todas las notas grabadas de la pista activa.' }
      ]
    },
    'hw-btn-del': {
      nombre: 'Botón COPY / DEL (❐)',
      subtitulo: 'Copiar, Pegar, Polirritmia y Micro-timing',
      icono: '📋',
      acciones: [
        { tipo: 'COPY/DEL + ENC 1', desc: 'Ajusta la longitud de pista (Track Length 1 a 64 pasos) para secuencias polirrítmicas.' },
        { tipo: 'COPY/DEL + ENC 2', desc: 'Ajusta el Micro-timing Nudge y el Swing/Groove analógico estilo J Dilla.' },
        { tipo: 'En Arranger', desc: 'Permite copiar (CP) y pegar (PS) patrones entre pistas o duplicar compases.' }
      ]
    },
    'hw-btn-play': {
      nombre: 'Botón PLAY / PAUSA (▶||)',
      subtitulo: 'Transporte y Preescucha de Muestras',
      icono: '▶️',
      acciones: [
        { tipo: 'Pulsación Normal', desc: 'Inicia o pausa la reproducción del secuenciador o la canción.' },
        { tipo: 'En Explorador de Archivos', desc: 'Reproduce en preescucha instantánea el sample WAV seleccionado.' },
        { tipo: 'SHIFT + PLAY', desc: 'Conmuta entre el Modo Jam Principal y el Modo Canción / Arranger V2.0.' }
      ]
    },
    'hw-btn-stop': {
      nombre: 'Botón STOP (■)',
      subtitulo: 'Parada, Silencio y Borrado Seguro',
      icono: '⏹️',
      acciones: [
        { tipo: 'Pulsación Normal', desc: 'Detiene el secuenciador y apaga todas las notas y colas de sintetizador.' },
        { tipo: 'Mantener Presionado (2 seg en Menú)', desc: 'Borra permanentemente el archivo WAV o el proyecto .JAM seleccionado de la MicroSD.' }
      ]
    },
    'hw-touchstrip': {
      nombre: 'Touchstrip Capacitivo con Zigzag de Cobre',
      subtitulo: 'Fader Táctil de Expresión y Modulación Continua',
      icono: '⚡',
      acciones: [
        { tipo: 'Deslizar Dedo', desc: 'Modula el corte de filtro VCF, pitch bend o envío de delay en tiempo real sin pasos audibles.' },
        { tipo: '5 LEDs Laterales', desc: 'Indican visualmente la posición del dedo o el valor del parámetro asignado en la tira.' }
      ]
    },
    'hw-enc-1': {
      nombre: 'Encoder 1 (Rotary Encoder con Pulsador)',
      subtitulo: 'Navegación de Pistas, Capas y Volumen de Mixer',
      icono: '🎛️',
      acciones: [
        { tipo: 'En Modo Jam', desc: 'Cambia entre las 8 pistas del MiniJammer o navega entre las 5 capas del sintetizador.' },
        { tipo: 'En Mezclador (Mixer)', desc: 'Controla el fader de volumen (0% a 200%) del canal en foco.' },
        { tipo: 'En Arranger', desc: 'Crea una nueva variación de patrón ([+] NEW).' }
      ]
    },
    'hw-enc-2': {
      nombre: 'Encoder 2 (Rotary Encoder con Pulsador)',
      subtitulo: 'Parámetro Secundario, Presets y Paneo Estéreo',
      icono: '🎛️',
      acciones: [
        { tipo: 'En Modo Jam', desc: 'Ajusta el volumen del sample o selecciona entre los 36 presets del sintetizador.' },
        { tipo: 'En Mezclador (Mixer)', desc: 'Controla el balance de paneo estéreo (L50 a R50).' },
        { tipo: 'En Arranger', desc: 'Elimina la variación de patrón seleccionada ([-] CLEAR).' }
      ]
    },
    'hw-enc-3': {
      nombre: 'Encoder 3 (Rotary Encoder con Pulsador)',
      subtitulo: 'Pitch / Cutoff y Navegación de Timeline',
      icono: '🎛️',
      acciones: [
        { tipo: 'En Modo Jam', desc: 'Ajusta la afinación (Pitch) del sample o el parámetro 3 del sinte (Detune, Decay, Cutoff).' },
        { tipo: 'REC + ENC 3 en Arranger', desc: 'Mueve el cursor verde a través de los pasos de la canción.' },
        { tipo: 'En Mezclador (Mixer)', desc: 'Controla el Macro 1 (Pitch en Sampler / Cutoff en Sinte).' }
      ]
    },
    'hw-enc-4': {
      nombre: 'Encoder 4 (Rotary Encoder con Pulsador)',
      subtitulo: 'Release / Resonancia y Repeticiones de Escena',
      icono: '🎛️',
      acciones: [
        { tipo: 'En Modo Jam', desc: 'Ajusta el tiempo de relajación (Release) del sample o la resonancia del filtro VCF.' },
        { tipo: 'REC + ENC 4 en Arranger', desc: 'Ajusta el número de repeticiones de la escena (x1 a x16).' },
        { tipo: 'En Mezclador (Mixer)', desc: 'Controla el Macro 2 (Release en Sampler / Decay en Sinte).' }
      ]
    },
    'hw-speaker': {
      nombre: 'Altavoz Frontal Dinámico Clase D',
      subtitulo: 'Monitoreo Integrado de Campo Cercano',
      icono: '📢',
      acciones: [
        { tipo: 'Monitoreo Autónomo', desc: 'Permite componer y jammear en cualquier lugar sin necesidad de cables ni auriculares.' },
        { tipo: 'Desconexión Automática', desc: 'Se silencia automáticamente al conectar auriculares o un cable a la toma Jack de 3.5mm.' }
      ]
    }
  };

  // Variables de Estado
  let currentActiveSection = 'jam';
  let currentActiveView = 'sampler';

  // Elementos del DOM
  let svgElement = null;
  let inspectorCardEl = null;
  let activeBadgeEl = null;

  function initSimulator() {
    svgElement = document.getElementById('minijammer-svg');
    inspectorCardEl = document.getElementById('sim-inspector-card');
    activeBadgeEl = document.getElementById('sim-active-screen-badge');

    if (!svgElement || !inspectorCardEl) return;

    setupSectionNavigation();
    setupSubpartNavigation();
    setupHardwareInteractivity();
    setupSearchFunctionality();

    // Activar vista inicial: Sampler
    switchView('sampler');
  }

  // ===========================================================================
  // NAVEGACIÓN ENTRE SECCIONES (NIVEL 1) Y SUBPARTES (NIVEL 2)
  // ===========================================================================
  function setupSectionNavigation() {
    const secBtns = document.querySelectorAll('.sim-sec-btn');
    secBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetSec = btn.dataset.sec;
        if (targetSec === currentActiveSection) return;

        secBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentActiveSection = targetSec;

        // Ocultar todos los grupos de subpartes y mostrar el correspondiente
        document.querySelectorAll('.sim-subparts-group').forEach(group => {
          group.style.display = 'none';
          group.classList.remove('active');
        });

        const activeGroup = document.getElementById(`subparts-${targetSec}`);
        if (activeGroup) {
          activeGroup.style.display = 'flex';
          activeGroup.classList.add('active');

          // Seleccionar la primera subparte de este grupo
          const firstSubBtn = activeGroup.querySelector('.sim-sub-btn');
          if (firstSubBtn) {
            activeGroup.querySelectorAll('.sim-sub-btn').forEach(b => b.classList.remove('active'));
            firstSubBtn.classList.add('active');
            switchView(firstSubBtn.dataset.view);
          }
        }
      });
    });
  }

  function setupSubpartNavigation() {
    const subBtns = document.querySelectorAll('.sim-sub-btn');
    subBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetView = btn.dataset.view;
        const parentGroup = btn.closest('.sim-subparts-group');
        if (parentGroup) {
          parentGroup.querySelectorAll('.sim-sub-btn').forEach(b => b.classList.remove('active'));
        }
        btn.classList.add('active');
        switchView(targetView);
      });
    });
  }

  // ===========================================================================
  // CAMBIO DINÁMICO DE PANTALLA LCD Y RENDERIZADO DEL MANUAL TÉCNICO
  // ===========================================================================
  function switchView(viewKey) {
    currentActiveView = viewKey;
    const viewData = SECTIONS_DATA[viewKey];
    if (!viewData) return;

    // 1. Alternar pantallas SVG en el display LCD
    const allScreenGroups = svgElement.querySelectorAll('.lcd-view-group');
    allScreenGroups.forEach(grp => {
      grp.style.display = 'none';
    });

    const targetScreen = svgElement.querySelector(`#${viewData.screenId}`);
    if (targetScreen) {
      targetScreen.style.display = 'block';
    }

    // 2. Actualizar badge superior
    if (activeBadgeEl) {
      activeBadgeEl.textContent = viewData.badge;
    }

    // 3. Resaltar controles físicos relevantes en el hardware SVG
    highlightControlsForView(viewData.highlightControls);

    // 4. Renderizar la guía y desglose técnico exhaustivo en el Inspector
    renderTechnicalManual(viewData);
  }

  function highlightControlsForView(controlIds) {
    clearHardwareHighlights();

    if (!controlIds || !Array.isArray(controlIds)) return;

    controlIds.forEach(id => {
      if (id === 'hw-pads-matrix') {
        const allPads = svgElement.querySelectorAll('#hw-pads-matrix .hw-interactive');
        allPads.forEach((pad, idx) => {
          if (idx < 6) pad.classList.add('hw-highlight-hold');
        });
      } else {
        const el = svgElement.querySelector(`#${id}`);
        if (el) {
          el.classList.add('hw-highlight-press');
        }
      }
    });
  }

  function clearHardwareHighlights() {
    if (!svgElement) return;
    const highlighted = svgElement.querySelectorAll('.hw-highlight-press, .hw-highlight-hold, .hw-highlight-turn');
    highlighted.forEach(el => {
      el.classList.remove('hw-highlight-press', 'hw-highlight-hold', 'hw-highlight-turn');
    });
  }

  // ===========================================================================
  // RENDERIZADO DEL MANUAL TÉCNICO Y DESGLOSE EN EL INSPECTOR CARD
  // ===========================================================================
  function renderTechnicalManual(data) {
    if (!inspectorCardEl) return;

    // Desglose de pantalla LCD
    const screenBreakdownHtml = data.screenBreakdown.map((item, idx) => `
      <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; padding: 10px 14px; margin-bottom: 8px;">
        <div style="color: var(--cyan); font-weight: 700; font-size: 0.88rem; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
          <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: var(--cyan);"></span>
          ${item.zona}
        </div>
        <div style="color: var(--text-main); font-size: 0.84rem; line-height: 1.45;">
          ${item.detalles}
        </div>
      </div>
    `).join('');

    // Tabla de acciones y controles físicos
    const controlsHtml = data.controles.map(c => `
      <div style="display: flex; gap: 12px; align-items: flex-start; padding: 8px 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
        <div style="min-width: 170px; font-weight: 700; color: #ffd700; font-size: 0.84rem; font-family: monospace;">
          ${c.control}
        </div>
        <div style="color: var(--text-main); font-size: 0.84rem; line-height: 1.4;">
          ${c.accion}
        </div>
      </div>
    `).join('');

    inspectorCardEl.innerHTML = `
      <div class="sim-detail-header" style="margin-bottom: 16px;">
        <div class="sim-detail-icon">${data.icon}</div>
        <div class="sim-detail-title-group">
          <span class="sim-detail-badge badge-mode-${data.sectionKey}">${data.badge}</span>
          <h3 class="sim-detail-title">${data.titulo}</h3>
        </div>
      </div>

      <!-- Bloque 1: Análisis y Desglose Visual de la Pantalla LCD -->
      <div style="margin-bottom: 20px;">
        <div style="font-size: 0.92rem; font-weight: 700; color: var(--cyan); margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
          <span>🖥️</span> ANÁLISIS DETALLADO DE LA PANTALLA LCD (320x170 px)
        </div>
        ${screenBreakdownHtml}
      </div>

      <!-- Bloque 2: Acciones y Controles Físicos Asignados -->
      <div style="margin-bottom: 20px;">
        <div style="font-size: 0.92rem; font-weight: 700; color: #ffd700; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
          <span>🕹️</span> ACCIONES Y CONTROLES FÍSICOS (UIVIEW & INPUTCONTROLLER)
        </div>
        <div style="background: rgba(14, 18, 27, 0.9); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; overflow: hidden;">
          ${controlsHtml}
        </div>
      </div>

      <div class="sim-tip-box" style="margin-top: 10px;">
        <strong>💡 Consejo de Interpretación:</strong> Haz clic sobre cualquier perilla, pad, botón o joystick en el dibujo del MiniJammer XXL a la izquierda para inspeccionar sus atajos individuales.
      </div>
    `;
  }

  // ===========================================================================
  // INTERACTIVIDAD AL HACER CLIC SOBRE LOS CONTROLES FÍSICOS DEL SVG
  // ===========================================================================
  function setupHardwareInteractivity() {
    const interactives = svgElement.querySelectorAll('.hw-interactive');

    interactives.forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const controlId = el.id;
        showHardwareInspector(controlId);
      });
    });
  }

  function showHardwareInspector(controlId) {
    clearHardwareHighlights();

    const clickedEl = svgElement.querySelector(`#${controlId}`);
    if (clickedEl) {
      clickedEl.classList.add('hw-highlight-press');
    }

    let info = HARDWARE_CONTROL_INFO[controlId];

    // Manejador genérico para cualquier pad de la matriz
    if (!info && controlId.startsWith('hw-pad-')) {
      const padNum = controlId.replace('hw-pad-', '');
      info = {
        nombre: `Pad de Matriz #${padNum}`,
        subtitulo: 'Sensor de Fuerza Piezoeléctrico y Disparo Polifónico Instantáneo',
        icono: '🟧',
        acciones: [
          { tipo: 'Tocar con los dedos', desc: `Dispara el sample asignado al Pad ${padNum} en modo Sampler o la nota musical correspondiente en modo Sintetizador, con velocidad dinámica de impacto (Velocity 1..127).` },
          { tipo: 'Sostener Pad + ENC 1 (Clic)', desc: 'Abre el Chop Studio en pantalla para editar visualmente los puntos de inicio y final de la muestra.' },
          { tipo: 'Sostener Pad + REC', desc: `Borra todas las notas grabadas del Pad ${padNum} en el compás activo.` },
          { tipo: 'En Secuenciador por Pasos', desc: `Activa o desactiva el paso de ritmo número ${padNum} del compás.` },
          { tipo: 'En Mezclador (MIXER)', desc: padNum <= 8 ? `Silencia o activa (Mute/Unmute) instantáneamente el Canal ${padNum}.` : 'No asignado en Mixer.' },
          { tipo: 'SHIFT + Pad en Mezclador', desc: padNum <= 8 ? `Activa la escucha exclusiva (Solo) del Canal ${padNum}.` : 'No asignado en Mixer.' }
        ]
      };
    }

    if (!info) return;

    const accionesHtml = info.acciones.map(a => `
      <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; padding: 10px 14px; margin-bottom: 8px;">
        <div style="color: var(--cyan); font-weight: 700; font-size: 0.88rem; margin-bottom: 4px;">
          ${a.tipo}
        </div>
        <div style="color: var(--text-main); font-size: 0.84rem; line-height: 1.4;">
          ${a.desc}
        </div>
      </div>
    `).join('');

    inspectorCardEl.innerHTML = `
      <div class="sim-detail-header" style="margin-bottom: 16px;">
        <div class="sim-detail-icon">${info.icono}</div>
        <div class="sim-detail-title-group">
          <span class="sim-detail-badge badge-mode-sys">Control Físico Seleccionado</span>
          <h3 class="sim-detail-title">${info.nombre}</h3>
          <span style="font-size: 0.82rem; color: var(--text-muted);">${info.subtitulo}</span>
        </div>
      </div>

      <div style="margin-bottom: 16px;">
        <div style="font-size: 0.92rem; font-weight: 700; color: #ffd700; margin-bottom: 10px;">
          ⚡ FUNCIONES DISPONIBLES CON ESTE CONTROL:
        </div>
        ${accionesHtml}
      </div>

      <div class="sim-tip-box" style="border-left-color: var(--orange); background: rgba(255, 145, 0, 0.08); color: #ffd699;">
        <strong>💡 Modo Inspección:</strong> Para volver a ver el desglose general de la pantalla, haz clic en cualquiera de las pestañas superiores (Sampler, Sintetizador, Secuenciador, etc.).
      </div>
    `;
  }

  // ===========================================================================
  // BUSCADOR INTELIGENTE EN VIVO
  // ===========================================================================
  function setupSearchFunctionality() {
    const searchInput = document.getElementById('sim-search-input');
    const searchClear = document.getElementById('sim-search-clear');

    if (!searchInput) return;

    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      if (searchClear) searchClear.style.display = q ? 'flex' : 'none';

      if (!q) return;

      // Buscar coincidencia en vistas
      for (const [key, data] of Object.entries(SECTIONS_DATA)) {
        const textToSearch = (data.titulo + ' ' + data.badge + ' ' + JSON.stringify(data.screenBreakdown) + ' ' + JSON.stringify(data.controles)).toLowerCase();
        if (textToSearch.includes(q)) {
          // Activar sección y subparte correspondiente
          activateSectionAndSub(data.sectionKey, key);
          break;
        }
      }
    });

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchClear.style.display = 'none';
        searchInput.focus();
      });
    }
  }

  function activateSectionAndSub(sectionKey, subKey) {
    const secBtn = document.querySelector(`.sim-sec-btn[data-sec="${sectionKey}"]`);
    if (secBtn) {
      document.querySelectorAll('.sim-sec-btn').forEach(b => b.classList.remove('active'));
      secBtn.classList.add('active');
      currentActiveSection = sectionKey;

      document.querySelectorAll('.sim-subparts-group').forEach(group => {
        group.style.display = 'none';
        group.classList.remove('active');
      });

      const activeGroup = document.getElementById(`subparts-${sectionKey}`);
      if (activeGroup) {
        activeGroup.style.display = 'flex';
        activeGroup.classList.add('active');

        const subBtn = activeGroup.querySelector(`.sim-sub-btn[data-view="${subKey}"]`);
        if (subBtn) {
          activeGroup.querySelectorAll('.sim-sub-btn').forEach(b => b.classList.remove('active'));
          subBtn.classList.add('active');
          switchView(subKey);
        }
      }
    }
  }

  // Inicializar al cargar
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSimulator);
  } else {
    initSimulator();
  }
})();
