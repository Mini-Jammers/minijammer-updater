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

  // ===========================================================================
  // BASE DE DATOS CONTEXTUAL DE HARDWARE - FILTRADA POR SECCIÓN Y MÓDULO ACTIVO
  // ===========================================================================
  const CONTEXTUAL_HARDWARE_INFO = {
    'hw-joy': {
      nombre: 'Joystick Analógico Hall 2D (con Pulsador JoySW)',
      subtitulo: 'Navegación Cuádruple, Modulación Radar y Conmutador de Modos',
      icono: '🕹️',
      modos: {
        'sampler': [
          { tipo: 'Eje X / Eje Y (Radar 2D)', desc: 'Modula dinámicamente en tiempo real los parámetros asignados (por defecto: Eje X modula Paneo/Filtro, Eje Y modula Pitch bend o profundidad de efectos). El vector de deflexión se visualiza en el cuadrante Radar superior derecho de la pantalla con el vector naranja.' },
          { tipo: 'Clic Simple (JoySW)', desc: 'Abre y cierra instantáneamente la consola del Mezclador (MIXER) de 8 canales sin interrumpir la reproducción.' },
          { tipo: 'Clic Sostenido (>500ms)', desc: 'Abre el Menú de Sistema Unificado (estilo Sony a6000) para acceder al explorador de archivos, configuración y sensores.' }
        ],
        'synth': [
          { tipo: 'Eje X (Horizontal)', desc: 'Aplica Pitch Bend analógico continuo (+/- 2 semitonos) sobre las notas activas del sintetizador.' },
          { tipo: 'Eje Y (Vertical)', desc: 'Modula en tiempo real la apertura del filtro VCF (Cutoff) o la profundidad del oscilador de baja frecuencia (LFO Depth).' },
          { tipo: 'Clic Simple (JoySW)', desc: 'Abre y cierra la consola del Mezclador (MIXER).' },
          { tipo: 'Clic Sostenido (>500ms)', desc: 'Abre el Menú de Sistema Unificado Sony a6000.' }
        ],
        'seq': [
          { tipo: 'Eje X (Izquierda / Derecha)', desc: 'Mueve el cursor de selección de paso horizontalmente (Pasos 1 a 16 del compás) para edición precisa.' },
          { tipo: 'Eje Y (Arriba / Abajo)', desc: 'Cambia la pista activa (T1..T8) en la vista de secuencia.' },
          { tipo: 'Clic Simple (JoySW)', desc: 'Abre el Mezclador (MIXER).' },
          { tipo: 'Clic Sostenido (>500ms)', desc: 'Abre el Menú de Sistema Unificado Sony a6000.' }
        ],
        'menu-files': [
          { tipo: 'Eje X (Izquierda / Derecha)', desc: 'Conmuta el foco entre la columna de categoría (SAMPLER, SYNTH, JAMS) y la columna del explorador de archivos FAT32 de la MicroSD.' },
          { tipo: 'Eje Y (Arriba / Abajo)', desc: 'Sube y baja para seleccionar carpetas o archivos WAV / proyectos .JAM.' },
          { tipo: 'Clic Simple (JoySW)', desc: 'Entra a una subcarpeta seleccionada o confirma y carga el archivo WAV seleccionado al Pad en foco.' },
          { tipo: 'Clic Sostenido (>500ms)', desc: 'Cierra el Menú de Sistema y regresa inmediatamente al modo Jam.' }
        ],
        'menu-sensors': [
          { tipo: 'Eje X (Izquierda / Derecha)', desc: 'Alterna entre los cuadrantes de prueba de sensores (Láser ToF, Touchstrip, Giroscopio BMI160 y Joystick Hall).' },
          { tipo: 'Eje Y (Arriba / Abajo)', desc: 'Ajusta los umbrales de sensibilidad y zonas muertas del sensor seleccionado.' },
          { tipo: 'Clic Simple (JoySW)', desc: 'Inicia la rutina de calibración del centro de reposo del joystick y sensores inerciales.' },
          { tipo: 'Clic Sostenido (>500ms)', desc: 'Cierra el Menú de Sistema y regresa al modo Jam.' }
        ],
        'menu-master': [
          { tipo: 'Eje Y (Arriba / Abajo)', desc: 'Navega verticalmente entre los renglones de ganancia y masterización: Ganancia Mic, Línea, SD, EQ Graves, EQ Agudos, Bloqueador DC y Limitador.' },
          { tipo: 'Clic Simple (JoySW)', desc: 'Conmuta (ON/OFF) el Limitador de picos o el filtro Bloqueador DC.' },
          { tipo: 'Clic Sostenido (>500ms)', desc: 'Cierra el Menú de Sistema y regresa al modo Jam.' }
        ],
        'menu-ui': [
          { tipo: 'Eje Y (Arriba / Abajo)', desc: 'Navega entre los parámetros de personalización: Brillo de Pantalla, Idioma (Español / Inglés), Brillo de LEDs NeoPixel, Modo Ahorro y Calibración de Pads.' },
          { tipo: 'Clic Simple (JoySW)', desc: 'Guarda la configuración actual en la memoria no volátil (Preferences NVS) de forma permanente.' },
          { tipo: 'Clic Sostenido (>500ms)', desc: 'Cierra el Menú de Sistema y regresa al modo Jam.' }
        ],
        'song': [
          { tipo: 'Eje X (Izquierda / Derecha)', desc: 'Navega horizontalmente por los bloques de la línea de tiempo de la canción (Intro, Verso, Coro, Puente, Outro).' },
          { tipo: 'Eje Y (Arriba / Abajo)', desc: 'Selecciona la pista vertical (T1..T8) para asignar o cambiar la variación de patrón en esa escena.' },
          { tipo: 'Clic Simple (JoySW)', desc: 'Conmuta y reproduce directamente la escena o paso de la canción seleccionado en el cursor.' },
          { tipo: 'Clic Sostenido (>500ms)', desc: 'Abre el Menú de Sistema.' }
        ],
        'mixer': [
          { tipo: 'Eje X (Izquierda / Derecha)', desc: 'Desplaza el foco horizontalmente entre los 8 canales de pista (CH 1 a CH 8) y el canal Master.' },
          { tipo: 'Eje Y (Arriba / Abajo)', desc: 'Selecciona el parámetro a controlar (Fader de Volumen, Balance de Paneo o Envío de Efectos FX Send).' },
          { tipo: 'Clic Simple (JoySW)', desc: 'Cierra la consola del Mezclador y regresa inmediatamente al modo Jam.' }
        ]
      }
    },

    'hw-pot-vol': {
      nombre: 'Perilla Master de Volumen (Potenciómetro Analógico)',
      subtitulo: 'Control Físico de Ganancia de Salida',
      icono: '🔊',
      modos: {
        'default': [
          { tipo: 'Giro Analógico Continuo', desc: 'Control de ganancia analógica de salida física conectada al amplificador Clase D. Regula el volumen del altavoz frontal y de la toma de auriculares Jack 3.5mm sin degradar la resolución digital del audio interno ni afectar la grabación WAV a MicroSD.' },
          { tipo: 'Comportamiento en esta sección', desc: 'Opera de forma independiente y global en cualquier modo del sistema (Jam, Menú, Canción o Mezclador).' }
        ]
      }
    },

    'hw-btn-shift': {
      nombre: 'Botón shift',
      subtitulo: 'Modificador Global de Segundo Nivel (Columna Izquierda)',
      icono: '⚡',
      modos: {
        'sampler': [
          { tipo: 'SHIFT + ENC 1..4', desc: 'Alterna entre las 4 páginas de parámetros del Sampler: P1 (Pitch y Envolvente ADSR), P2 (Filtro Cutoff y Resonancia), P3 (Efectos Drive/Bitcrush), P4 (Paneo L/R y Modo 1SHOT/GATE/LOOP/REVERSE).' },
          { tipo: 'SHIFT + REC', desc: 'Inicia o detiene la grabación en vivo de la mezcla master estéreo en formato WAV (44.1kHz / 16-bit) directamente en la carpeta /REC de la MicroSD.' },
          { tipo: 'SHIFT + PLAY', desc: 'Conmuta instantáneamente entre el Modo Jam y el Modo Canción / Arranger V2.0.' },
          { tipo: 'SHIFT + Clic Joystick', desc: 'Acceso directo al menú de ecualización y ganancias del Master Bus.' }
        ],
        'synth': [
          { tipo: 'SHIFT + ENC 2', desc: 'Navega cíclicamente entre las 5 capas del Dashboard dinámico del sintetizador: [1] OSC Y PITCH, [2] ENVOLVENTE ADSR, [3] FILTRO Y TONO, [4] LFO Y MODULACION, [5] ANALOGICO Y VCF.' },
          { tipo: 'SHIFT + REC', desc: 'Inicia o detiene la grabación master de audio a la MicroSD en formato WAV.' },
          { tipo: 'SHIFT + PLAY', desc: 'Conmuta al Modo Canción / Arranger.' }
        ],
        'seq': [
          { tipo: 'SHIFT + ENC 1', desc: 'Selecciona la página de compás (Página 1: Pasos 1..16, Página 2: 17..32, Página 3: 33..48, Página 4: 49..64).' },
          { tipo: 'SHIFT + PLAY', desc: 'Conmuta al Modo Canción / Arranger.' },
          { tipo: 'SHIFT + REC', desc: 'Inicia grabación master a WAV.' }
        ],
        'menu-files': [
          { tipo: 'Pulsación Simple', desc: 'Retrocede un nivel en el árbol de carpetas de la MicroSD (función Volver / Back).' }
        ],
        'menu-sensors': [
          { tipo: 'Pulsación Simple', desc: 'Cancela la edición o sale del submenú al nivel anterior.' }
        ],
        'menu-master': [
          { tipo: 'Pulsación Simple', desc: 'Cancela la edición o sale del submenú al nivel anterior.' }
        ],
        'menu-ui': [
          { tipo: 'Pulsación Simple', desc: 'Cancela la edición o sale del submenú al nivel anterior.' }
        ],
        'song': [
          { tipo: 'SHIFT + PLAY', desc: 'Sale del Modo Canción / Arranger y regresa al Modo Jam Principal.' },
          { tipo: 'SHIFT + ENC 1', desc: 'Mueve el cabezal de reproducción rápidamente al compás 1 de la canción (Rebobinado al inicio).' }
        ],
        'mixer': [
          { tipo: 'SHIFT + Pads 1 a 8', desc: 'Activa la escucha exclusiva (SOLO) de la pista seleccionada, silenciando temporalmente todos los demás canales de la mezcla.' },
          { tipo: 'Pulsación Simple', desc: 'Cierra el mezclador y regresa a la vista Jam.' }
        ]
      }
    },

    'hw-btn-rec': {
      nombre: 'Botón REC (●)',
      subtitulo: 'Grabación de Notas, P-Locks y Modificador de Canción',
      icono: '🔴',
      modos: {
        'sampler': [
          { tipo: 'REC en Reproducción (PLAY activo)', desc: 'Entra a Grabación en Vivo (Live Recording). Graba en tiempo real los golpes de los pads, la velocidad dinámica y las automatizaciones de las perillas (Parameter Locks).' },
          { tipo: 'REC en Pausa (PLAY detenido)', desc: 'Entra al modo Step Recording (Secuenciación por Pasos). El marco de la matriz se ilumina en amarillo brillante.' },
          { tipo: 'Sostener PAD + REC', desc: 'Borra instantáneamente todas las notas grabadas de ese Pad en el compás activo.' },
          { tipo: 'SHIFT + REC', desc: 'Inicia o detiene la grabación de la mezcla master estéreo a la MicroSD en formato WAV.' }
        ],
        'synth': [
          { tipo: 'REC en Reproducción (PLAY activo)', desc: 'Entra a Grabación en Vivo. Graba melodías cromáticas y automatizaciones de filtro (P-Locks) en tiempo real.' },
          { tipo: 'REC en Pausa (PLAY detenido)', desc: 'Entra al modo Step Recording.' },
          { tipo: 'Sostener PAD + REC', desc: 'Borra las notas grabadas de esa altura tonal en el compás activo.' },
          { tipo: 'SHIFT + REC', desc: 'Inicia o detiene la grabación directa a MicroSD en formato WAV.' }
        ],
        'seq': [
          { tipo: 'Pulsación Simple', desc: 'Activa o desactiva la edición directa de pasos (Step Record Mode). Permite programar ritmos encendiendo/apagando casillas con los 16 pads.' },
          { tipo: 'Sostener DEL + REC', desc: 'Borra por completo todas las notas de la pista activa, dejándola limpia en blanco.' }
        ],
        'menu-files': [
          { tipo: 'Sostener REC + Clic JoySW', desc: 'Inicia la grabación de un nuevo sample desde la entrada de línea (Line-In) o micrófono directamente a la carpeta actual.' }
        ],
        'menu-sensors': [],
        'menu-master': [],
        'menu-ui': [],
        'song': [
          { tipo: 'Pulsación Simple', desc: 'Activa la grabación de la secuencia de escenas en tiempo real (graba qué patrón entra en cada compás mientras suena el tema).' },
          { tipo: 'REC + ENC 3', desc: 'Desplaza el cursor verde a lo largo de los bloques de compás de la canción.' },
          { tipo: 'REC + ENC 4', desc: 'Ajusta el multiplicador de repeticiones de la escena activa (x1, x2, x4, x8, x16).' }
        ],
        'mixer': []
      }
    },

    'hw-btn-del': {
      nombre: 'Botón COPY / DEL (❐)',
      subtitulo: 'Copiar, Pegar, Polirritmia y Micro-timing',
      icono: '📋',
      modos: {
        'sampler': [
          { tipo: 'Sostener DEL + Tocar Pad', desc: 'Borra instantáneamente el contenido o notas del pad presionado.' },
          { tipo: 'DEL + ENC 1', desc: 'Ajusta la longitud de pista (Track Length 1 a 64 pasos) para secuencias polirrítmicas.' },
          { tipo: 'DEL + ENC 2', desc: 'Ajusta el Micro-timing Nudge y el Swing/Groove porcentual estilo J Dilla.' }
        ],
        'synth': [
          { tipo: 'Sostener DEL + Tocar Pad', desc: 'Borra las notas asignadas a esa altura tonal.' },
          { tipo: 'DEL + ENC 1', desc: 'Ajusta la longitud métrica de la pista melódica.' },
          { tipo: 'DEL + ENC 2', desc: 'Ajusta el micro-timing de la pista.' }
        ],
        'seq': [
          { tipo: 'Sostener DEL + Tocar Pad', desc: 'Elimina de inmediato el paso rítmico correspondiente a ese pad en el compás.' },
          { tipo: 'Sostener DEL + REC', desc: 'Limpia por completo la secuencia completa de la pista activa.' }
        ],
        'menu-files': [
          { tipo: 'Mantener presionado 2 segundos', desc: 'Elimina permanentemente el archivo WAV o el proyecto .JAM seleccionado de la tarjeta MicroSD (con diálogo de confirmación segura).' }
        ],
        'menu-sensors': [
          { tipo: 'Pulsación Simple', desc: 'Restaura los valores de calibración de sensores al valor predeterminado de fábrica.' }
        ],
        'menu-master': [
          { tipo: 'Pulsación Simple', desc: 'Restaura el ecualizador y ganancias al valor estándar plano (0 dB).' }
        ],
        'menu-ui': [
          { tipo: 'Pulsación Simple', desc: 'Restaura los ajustes de pantalla y LEDs al perfil de fábrica.' }
        ],
        'song': [
          { tipo: 'Pulsación Simple', desc: 'Elimina la variación de patrón asignada en la celda activa del Arranger dejándola vacía (--).' },
          { tipo: 'Sostener DEL (2 segundos)', desc: 'Borra la escena completa seleccionada.' }
        ],
        'mixer': [
          { tipo: 'Pulsación Simple', desc: 'Resetea el fader de volumen y el panorama del canal en foco a los valores estándar (0 dB, Paneo Centro).' }
        ]
      }
    },

    'hw-btn-play': {
      nombre: 'Botón PLAY / PAUSA (▶||)',
      subtitulo: 'Transporte y Preescucha de Muestras',
      icono: '▶️',
      modos: {
        'sampler': [
          { tipo: 'Pulsación Simple', desc: 'Inicia o pone en pausa la reproducción del secuenciador sincronizado a los BPM del proyecto.' },
          { tipo: 'SHIFT + PLAY', desc: 'Conmuta instantáneamente entre el Modo Jam y el Modo Canción / Arranger V2.0.' }
        ],
        'synth': [
          { tipo: 'Pulsación Simple', desc: 'Inicia o pone en pausa la reproducción del secuenciador.' },
          { tipo: 'SHIFT + PLAY', desc: 'Conmuta al Modo Canción / Arranger.' }
        ],
        'seq': [
          { tipo: 'Pulsación Simple', desc: 'Inicia o pone en pausa la reproducción del patrón en bucle mostrando el barrido de pasos.' },
          { tipo: 'SHIFT + PLAY', desc: 'Conmuta al Modo Canción / Arranger.' }
        ],
        'menu-files': [
          { tipo: 'Pulsación Simple', desc: 'Preescucha en vivo (Audio Preview) del archivo WAV enfocado en el explorador a través del altavoz o auriculares sin cargarlo a ningún pad.' }
        ],
        'menu-sensors': [],
        'menu-master': [],
        'menu-ui': [],
        'song': [
          { tipo: 'Pulsación Simple', desc: 'Inicia la reproducción continua de la canción completa recorriendo la línea de tiempo de escenas de principio a fin.' },
          { tipo: 'SHIFT + PLAY', desc: 'Sale del Modo Canción y regresa al Modo Jam Principal.' }
        ],
        'mixer': [
          { tipo: 'Pulsación Simple', desc: 'Inicia o detiene el bucle de ritmo para poder ajustar la mezcla, paneos y volúmenes mientras se escucha la música.' }
        ]
      }
    },

    'hw-btn-stop': {
      nombre: 'Botón STOP (■)',
      subtitulo: 'Parada, Pánico de Audio y Silencio Inmediato',
      icono: '⏹️',
      modos: {
        'default': [
          { tipo: 'Pulsación Simple', desc: 'Detiene inmediatamente la reproducción del secuenciador, silencia todas las notas y colas de síntesis activas (Pánico de audio / All Notes Off) y rebobina el cabezal de reproducción al paso 1 del compás.' }
        ]
      }
    },

    'hw-touchstrip': {
      nombre: 'Touchstrip Capacitivo con Zigzag de Cobre',
      subtitulo: 'Fader Táctil de Expresión y Modulación Continua',
      icono: '⚡',
      modos: {
        'sampler': [
          { tipo: 'Deslizar dedo sobre el cobre', desc: 'Controlador de expresión táctil continuo. Modula el filtro de corte (Cutoff) o el pitch de la muestra en tiempo real. La barra TS1 en pantalla y los 5 LEDs laterales reflejan el nivel exacto de modulación táctil.' }
        ],
        'synth': [
          { tipo: 'Deslizar dedo sobre el cobre', desc: 'Ribbon Controller analógico. Genera barridos continuos de frecuencia de corte VCF, modulación de morphing entre formas de onda o control de vibrato manual con respuesta instantánea sin escalonamiento.' }
        ],
        'seq': [
          { tipo: 'Sostener Pad + Deslizar dedo', desc: 'Activa la función Roll / Note Repeat continua con divisiones rítmicas según la posición del dedo (1/8, 1/16, 1/32, 1/64) para redobles de batería estilo trap o fills.' }
        ],
        'menu-sensors': [
          { tipo: 'Tocar o deslizar dedo', desc: 'Diagnóstico visual táctil. Muestra en pantalla el peso capacitivo y la calibración de los 5 segmentos individuales de cobre.' }
        ],
        'menu-files': [],
        'menu-master': [],
        'menu-ui': [],
        'song': [
          { tipo: 'Deslizar dedo', desc: 'Scrubber táctil para desplazarse rápidamente a través de la línea de tiempo de la canción hacia adelante o hacia atrás.' }
        ],
        'mixer': [
          { tipo: 'Deslizar dedo', desc: 'Aplica un filtro DJ de corte global de master (Low-pass a la izquierda, High-pass a la derecha) para transiciones en vivo.' }
        ]
      }
    },

    'hw-enc-1': {
      nombre: 'Encoder 1 (Rotary Encoder con Pulsador - Superior)',
      subtitulo: 'Navegación de Pistas, Capas y Puntos de Corte',
      icono: '🎛️',
      modos: {
        'sampler': [
          { tipo: 'Giro de perilla', desc: 'Cambia entre las 8 pistas (T1 a T8) del MiniJammer. Si se mantiene un Pad presionado, cambia el pad en foco de edición.' },
          { tipo: 'Clic en perilla', desc: 'Alterna la selección de pista o confirma puntos de corte en el Chop Studio.' }
        ],
        'synth': [
          { tipo: 'Giro de perilla', desc: 'Selecciona la octava activa del teclado (OCT: 1 a 8) o la pista melódica.' },
          { tipo: 'Clic en perilla', desc: 'Alterna cíclicamente entre los 18 Motores de Síntesis disponibles (VA-PRO, FM-2OP, ACID-303, RHODES, ORGAN, SWARM, etc.).' }
        ],
        'seq': [
          { tipo: 'Giro de perilla', desc: 'Navega entre las páginas de ritmo de 16 pasos (Página 1: Pasos 1..16, Página 2: Pasos 17..32, Página 3: 33..48, Página 4: 49..64).' },
          { tipo: 'Clic en perilla', desc: 'Alterna la resolución métrica de subdivisión del compás (1/16 estándar, 1/8T tresillos, 1/32 alta velocidad).' }
        ],
        'menu-files': [
          { tipo: 'Giro de perilla', desc: 'Desplazamiento ultra-rápido (Fast Scroll) a través de la lista de carpetas y archivos en la MicroSD.' },
          { tipo: 'Clic en perilla', desc: 'Abre la subcarpeta seleccionada o reproduce preescucha de audio.' }
        ],
        'menu-sensors': [
          { tipo: 'Giro de perilla', desc: 'Ajuste rápido del parámetro numérico del sensor seleccionado.' }
        ],
        'menu-master': [
          { tipo: 'Giro de perilla', desc: 'Ajuste rápido de ganancias de entrada/salida.' }
        ],
        'menu-ui': [
          { tipo: 'Giro de perilla', desc: 'Ajuste rápido del brillo o volumen de feedback.' }
        ],
        'song': [
          { tipo: 'Giro de perilla', desc: 'Desplaza el cursor a través de las celdas de la línea de tiempo de la canción (Timeline).' },
          { tipo: 'Clic en perilla', desc: 'Crea una nueva variación de patrón ([+] NEW) en la pista activa.' }
        ],
        'mixer': [
          { tipo: 'Giro de perilla', desc: 'Selecciona qué canal del mezclador (Pistas 1 a 8 o Bus Master) está en foco de edición.' },
          { tipo: 'Clic en perilla', desc: 'Resetea la ganancia del canal en foco al nivel neutro estándar de 0 dB.' }
        ]
      }
    },

    'hw-enc-2': {
      nombre: 'Encoder 2 (Rotary Encoder con Pulsador)',
      subtitulo: 'Volumen de Sample, Parámetro ADSR y Fader Digital',
      icono: '🎛️',
      modos: {
        'sampler': [
          { tipo: 'Giro de perilla', desc: 'Ajusta el Volumen de la muestra activa (0% a 200%). En Chop Studio controla el nivel de Zoom óptico de la onda (x1/x2).' },
          { tipo: 'SHIFT + Giro', desc: 'Accede a la Página P2 de parámetros (Filtro Cutoff y Resonancia).' },
          { tipo: 'Clic en perilla', desc: 'Restaura el volumen del sample al 100% por defecto.' }
        ],
        'synth': [
          { tipo: 'Giro de perilla', desc: 'Modifica el Parámetro 1 de la capa activa del Dashboard (Capa 1: Forma de Onda/Shape; Capa 2: Attack; Capa 3: Cutoff VCF; Capa 4: LFO Rate; Capa 5: Saturación/Drive).' },
          { tipo: 'SHIFT + Giro', desc: 'Cambia entre las 5 capas del Dashboard dinámico [1] OSC [2] ADSR [3] FILTRO [4] LFO [5] VCF.' },
          { tipo: 'Clic en perilla', desc: 'Selecciona entre los presets de fábrica del motor activo.' }
        ],
        'seq': [
          { tipo: 'Giro de perilla', desc: 'Ajusta el Tempo global (BPM: 40 a 240) o el porcentaje de Swing/Groove micro-timing.' },
          { tipo: 'Clic en perilla', desc: 'Función Tap Tempo: calcula el BPM pulsando rítmicamente la perilla.' }
        ],
        'menu-files': [
          { tipo: 'Giro de perilla', desc: 'Ajusta el volumen de preescucha (Preview Volume) de los archivos WAV.' }
        ],
        'menu-sensors': [
          { tipo: 'Giro de perilla', desc: 'Modifica el valor del umbral o curva de calibración.' }
        ],
        'menu-master': [
          { tipo: 'Giro de perilla', desc: 'Modifica el valor de la ganancia seleccionada.' }
        ],
        'menu-ui': [
          { tipo: 'Giro de perilla', desc: 'Modifica el brillo de la pantalla o de los LEDs.' }
        ],
        'song': [
          { tipo: 'Giro de perilla', desc: 'Ajusta el número de repeticiones para la escena seleccionada (x1, x2, x4, x8, x16 o bucle infinito).' },
          { tipo: 'Clic en perilla', desc: 'Elimina la variación de patrón de la pista en esa escena ([-] CLEAR).' }
        ],
        'mixer': [
          { tipo: 'Giro de perilla', desc: 'Fader digital de volumen del canal en foco (-∞ dB a +6 dB con indicación en vúmetro LCD).' },
          { tipo: 'Clic en perilla', desc: 'Silencia o reactiva (Mute/Unmute) el canal seleccionado.' }
        ]
      }
    },

    'hw-enc-3': {
      nombre: 'Encoder 3 (Rotary Encoder con Pulsador)',
      subtitulo: 'Pitch, Filtros, P-Locks y Paneo Estéreo',
      icono: '🎛️',
      modos: {
        'sampler': [
          { tipo: 'Giro de perilla', desc: 'Ajusta la Afinación (Pitch) de la muestra de 0.25x a 4.00x semitono a semitono.' },
          { tipo: 'SHIFT + Giro', desc: 'Accede a la Página P3 de parámetros (Efectos Drive analógico, Bitcrush y Tremolo).' },
          { tipo: 'Clic en perilla', desc: 'Restablece el Pitch a la afinación original del archivo (1.00x).' }
        ],
        'synth': [
          { tipo: 'Giro de perilla', desc: 'Modifica el Parámetro 2 de la capa activa del Dashboard (Capa 1: Detune; Capa 2: Decay; Capa 3: Resonancia VCF; Capa 4: LFO Depth; Capa 5: Calidez analógica Warmth).' },
          { tipo: 'Clic en perilla', desc: 'Restablece el parámetro a su valor neutro.' }
        ],
        'seq': [
          { tipo: 'Giro de perilla', desc: 'Ajusta la longitud de pista (Track Length: de 1 a 64 pasos) permitiendo polirritmias complejas respecto a otras pistas.' }
        ],
        'menu-files': [
          { tipo: 'Giro de perilla', desc: 'Filtra la lista por extensiones de archivo (.WAV para audio, .JAM para proyectos, .TXT para presets).' }
        ],
        'menu-sensors': [],
        'menu-master': [
          { tipo: 'Giro de perilla', desc: 'Ajusta el ecualizador Master de Graves (Bass Shelf de -12 dB a +12 dB).' }
        ],
        'menu-ui': [],
        'song': [
          { tipo: 'Giro de perilla', desc: 'Ajusta la transposición tonal global en semitonos para la sección enfocada.' }
        ],
        'mixer': [
          { tipo: 'Giro de perilla', desc: 'Control de Balance de Paneo Estéreo (L64 .. C .. R63) del canal seleccionado.' },
          { tipo: 'Clic en perilla', desc: 'Centra el panorama estéreo en el centro exacto (Center).' }
        ]
      }
    },

    'hw-enc-4': {
      nombre: 'Encoder 4 (Rotary Encoder con Pulsador - Inferior)',
      subtitulo: 'Release, Modos de Disparo y Envío de Efectos',
      icono: '🎛️',
      modos: {
        'sampler': [
          { tipo: 'Giro de perilla', desc: 'Ajusta el tiempo de relajación (Release/Decay) del sample de 10ms a 5.0 segundos.' },
          { tipo: 'SHIFT + Giro', desc: 'Accede a la Página P4 de parámetros (Modo de disparo: 1SHOT, GATE, LOOP, REVERSE y Choke Groups).' },
          { tipo: 'Clic en perilla', desc: 'Restablece el Release al valor predeterminado de la muestra.' }
        ],
        'synth': [
          { tipo: 'Giro de perilla', desc: 'Modifica el Parámetro 3 de la capa activa del Dashboard (Capa 1: Glide/Portamento; Capa 2: Release ADSR; Capa 3: Tipo de Filtro Low-Pass/Band-Pass/High-Pass; Capa 4: Destino LFO; Capa 5: Master Pan).' },
          { tipo: 'Clic en perilla', desc: 'Restaura el parámetro al valor estándar.' }
        ],
        'seq': [
          { tipo: 'Giro de perilla', desc: 'Ajusta la probabilidad de disparo (Trig Probability: 10% a 100%) para ritmos dinámicos y variaciones generativas automáticas.' }
        ],
        'menu-files': [],
        'menu-sensors': [],
        'menu-master': [
          { tipo: 'Giro de perilla', desc: 'Ajusta el ecualizador Master de Agudos (Treble Shelf de -12 dB a +12 dB).' }
        ],
        'menu-ui': [],
        'song': [
          { tipo: 'Giro de perilla', desc: 'Define el modo de encadenamiento entre escenas (Inmediato, Al terminar el compás o Repetir bucle).' }
        ],
        'mixer': [
          { tipo: 'Giro de perilla', desc: 'Ajusta el nivel de envío a la cadena de efectos Master (FX Send: Reverb y Delay).' }
        ]
      }
    },

    'hw-speaker': {
      nombre: 'Altavoz Frontal Dinámico Clase D',
      subtitulo: 'Monitoreo Integrado de Campo Cercano',
      icono: '📢',
      modos: {
        'default': [
          { tipo: 'Monitoreo Autónomo', desc: 'Permite componer y jammear en cualquier lugar sin necesidad de cables ni auriculares.' },
          { tipo: 'Desconexión Automática', desc: 'Se silencia automáticamente al conectar auriculares o un cable a la toma Jack de 3.5mm.' }
        ]
      }
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
    // Control de entorno: el simulador solo está habilitado en entorno local de desarrollo (localhost / 127.0.0.1 / file: o ?dev=true)
    const isLocalDev = window.location.hostname === 'localhost' ||
                       window.location.hostname === '127.0.0.1' ||
                       window.location.protocol === 'file:' ||
                       new URLSearchParams(window.location.search).has('dev');

    const simTabBtn = document.getElementById('tab-btn-simulador');
    if (simTabBtn) {
      if (isLocalDev) {
        simTabBtn.style.display = '';
      } else {
        simTabBtn.style.display = 'none';
        const simPanel = document.getElementById('tab-simulador');
        if (simPanel && simPanel.classList.contains('active')) {
          simPanel.classList.remove('active');
          const defaultTab = document.getElementById('tab-automatico');
          if (defaultTab) defaultTab.classList.add('active');
          const defaultBtn = document.querySelector('[data-tab="tab-automatico"]');
          if (defaultBtn) defaultBtn.classList.add('active');
        }
        return; // Salir en producción online para mantener inhabilitado el módulo
      }
    }

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

    // Si se hace clic en la pantalla LCD, volver al desglose técnico de la pantalla activa
    if (controlId === 'hw-lcd-display' || controlId === 'hw-screen') {
      const activeData = SECTIONS_DATA[currentActiveView];
      if (activeData) {
        renderTechnicalManual(activeData);
      }
      return;
    }

    const currentViewData = SECTIONS_DATA[currentActiveView];
    const currentBadge = currentViewData ? currentViewData.badge : currentActiveView.toUpperCase();

    let info = null;
    let acciones = [];

    // Manejador dinámico contextual para Pads de Matriz (Pads 1..16)
    if (controlId.startsWith('hw-pad-') || controlId === 'hw-pads-matrix') {
      const padNum = controlId.startsWith('hw-pad-') ? parseInt(controlId.replace('hw-pad-', ''), 10) : 1;
      info = {
        nombre: controlId === 'hw-pads-matrix' ? 'Matriz de 16 Pads Piezoeléctricos' : `Pad de Matriz #${padNum}`,
        subtitulo: 'Sensor de Fuerza y Disparo Dinámico Polifónico (Velocity 1..127)',
        icono: '🟧'
      };

      if (currentActiveView === 'sampler') {
        acciones = [
          { tipo: 'Tocar con los dedos (Golpe)', desc: `Dispara el sample asignado al Pad ${padNum} con velocidad dinámica analógica según la fuerza del impacto (Velocity 1..127) y respuesta instantánea.` },
          { tipo: 'Sostener Pad + Clic ENC 1', desc: 'Abre el Chop Studio en la pantalla LCD para ajustar visualmente los puntos de Inicio (Start) y Fin (End) de la muestra sobre la forma de onda.' },
          { tipo: 'Sostener Pad + ENC 2', desc: `Ajusta el volumen exclusivo del Pad ${padNum} (0% a 200%).` },
          { tipo: 'Sostener Pad + ENC 3', desc: `Ajusta la afinación (Pitch) del Pad ${padNum} de 0.25x a 4.00x semitono a semitono.` },
          { tipo: 'Sostener Pad + ENC 4', desc: `Ajusta el tiempo de relajación (Release/Decay) del Pad ${padNum} (10ms a 5.0 segundos).` },
          { tipo: 'Sostener Pad + REC', desc: `Borra instantáneamente todas las notas grabadas del Pad ${padNum} en el compás activo.` },
          { tipo: 'Sostener Pad + ENC 1 (Giro)', desc: `Mueve el foco de edición hacia el Pad ${padNum} sin disparar sonido.` }
        ];
      } else if (currentActiveView === 'synth') {
        acciones = [
          { tipo: 'Tocar con los dedos', desc: `Teclado musical cromático. Toca la nota asignada al Pad ${padNum} (escala polifónica según la octava seleccionada en pantalla) con velocidad sensible al impacto.` },
          { tipo: 'Sostener Pad', desc: 'Mantiene la nota sonando aplicando la envolvente ADSR (Attack, Decay, Sustain) configurada en el Dashboard dinámico.' },
          { tipo: 'Sostener Pad + REC', desc: `Borra las notas grabadas de esta altura tonal en el compás activo.` }
        ];
      } else if (currentActiveView === 'seq') {
        acciones = [
          { tipo: 'Tocar con los dedos', desc: `Activa o desactiva (Toggle ON/OFF) el paso de ritmo número ${padNum} del compás (Paso 1 a 16). El pad se ilumina en rojo cuando el paso está programado para sonar.` },
          { tipo: 'Sostener Pad + Girar Encoders', desc: `Edición de Parameter Locks (P-Locks) exclusivos para el paso ${padNum}: bloquea un valor específico de afinación, corte de filtro, volumen o micro-timing solo en este impacto.` },
          { tipo: 'Sostener DEL + Tocar Pad', desc: `Elimina de inmediato el paso rítmico número ${padNum}.` }
        ];
      } else if (currentActiveView === 'menu-files') {
        acciones = [
          { tipo: 'Tocar Pad', desc: `Asigna y carga inmediatamente el archivo de audio WAV seleccionado en el explorador de la MicroSD directamente al Pad ${padNum} de la pista de sampler activa.` },
          { tipo: 'Sostener Pad', desc: `Preescucha el sample que ya está cargado actualmente en el Pad ${padNum} para compararlo antes de reemplazarlo.` }
        ];
      } else if (currentActiveView === 'menu-sensors') {
        acciones = [
          { tipo: 'Tocar con los dedos', desc: `Diagnóstico y calibración de sensibilidad de fuerza (Velocity Curve) y respuesta piezoeléctrica para el Pad ${padNum}.` }
        ];
      } else if (currentActiveView === 'song') {
        acciones = [
          { tipo: 'Tocar Pad', desc: `Conmuta y pone en cola (Queue) el Patrón o Escena ${padNum} (Escenas 1 a 16) para que entre sincronizado exactamente al terminar el compás actual.` },
          { tipo: 'Sostener Pad', desc: `Asigna la variación de patrón seleccionada a la celda del cursor en la línea de tiempo del Arranger.` }
        ];
      } else if (currentActiveView === 'mixer') {
        if (padNum <= 8) {
          acciones = [
            { tipo: 'Tocar con los dedos', desc: `Silencia o reactiva (MUTE / UNMUTE) instantáneamente la Pista ${padNum}. El LED del pad cambia a rojo brillante cuando la pista está silenciada.` },
            { tipo: 'SHIFT + Pad', desc: `Activa la escucha en solitario (SOLO) de la Pista ${padNum}, silenciando temporalmente todas las demás pistas de la mezcla.` }
          ];
        } else {
          acciones = [
            { tipo: 'Tocar con los dedos (Punch-in FX)', desc: `Disparador de efecto en vivo sobre el bus Master (Efecto momentáneo estilo SP-404: Beat Repeat, Stutter, Vinyl Stop, Low-Pass Filter sweep).` }
          ];
        }
      } else {
        acciones = [
          { tipo: 'En este submenú', desc: 'Los pads de matriz permanecen en reposo o actúan como atajos numéricos directos.' }
        ];
      }
    } else {
      const baseInfo = CONTEXTUAL_HARDWARE_INFO[controlId];
      if (baseInfo) {
        info = {
          nombre: baseInfo.nombre,
          subtitulo: baseInfo.subtitulo,
          icono: baseInfo.icono
        };
        // Obtener acciones del modo específico, o de default
        if (baseInfo.modos[currentActiveView]) {
          acciones = baseInfo.modos[currentActiveView];
        } else if (baseInfo.modos['default']) {
          acciones = baseInfo.modos['default'];
        } else {
          acciones = [];
        }
      }
    }

    if (!info) return;

    let accionesHtml = '';
    if (acciones && acciones.length > 0) {
      accionesHtml = acciones.map(a => `
        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; padding: 10px 14px; margin-bottom: 8px;">
          <div style="color: var(--cyan); font-weight: 700; font-size: 0.88rem; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
            <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: var(--cyan);"></span>
            ${a.tipo}
          </div>
          <div style="color: var(--text-main); font-size: 0.84rem; line-height: 1.45;">
            ${a.desc}
          </div>
        </div>
      `).join('');
    } else {
      accionesHtml = `
        <div style="background: rgba(255, 255, 255, 0.02); border: 1px dashed rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 14px; text-align: center; color: var(--text-muted); font-size: 0.85rem; margin-bottom: 8px;">
          💤 En la sección <strong>${currentBadge}</strong> este control no tiene ninguna función activa asignada.
        </div>
      `;
    }

    inspectorCardEl.innerHTML = `
      <div class="sim-detail-header" style="margin-bottom: 16px;">
        <div class="sim-detail-icon">${info.icono}</div>
        <div class="sim-detail-title-group">
          <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 4px;">
            <span class="sim-detail-badge badge-mode-sys">Control Físico</span>
            <span class="sim-detail-badge badge-mode-${currentViewData ? currentViewData.sectionKey : 'jam'}">MODO: ${currentBadge}</span>
          </div>
          <h3 class="sim-detail-title">${info.nombre}</h3>
          <span style="font-size: 0.82rem; color: var(--text-muted);">${info.subtitulo}</span>
        </div>
      </div>

      <div style="margin-bottom: 16px;">
        <div style="font-size: 0.90rem; font-weight: 700; color: #ffd700; margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
          <span>⚡</span> FUNCIONES EXCLUSIVAS EN ESTE MÓDULO:
        </div>
        ${accionesHtml}
      </div>

      <div class="sim-tip-box" style="border-left-color: var(--cyan); background: rgba(0, 229, 255, 0.06); color: #c4f4fc; font-size: 0.82rem;">
        <strong>💡 Consejo de Navegación:</strong> Para ver el análisis visual de la pantalla LCD de este módulo, haz clic sobre la <strong>pantalla LCD</strong> en el dibujo o selecciona cualquiera de las pestañas superiores.
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
