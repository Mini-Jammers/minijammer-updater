/**
 * =============================================================================
 * SIMULADOR INTERACTIVO DE ATAJOS Y HARDWARE - MINIJAMMER XXL V2.0
 * MODELADO EXACTO SEGÚN EL HARDWARE FÍSICO REAL (DISPOSICIÓN HORIZONTAL)
 * =============================================================================
 */

(function () {
  'use strict';

  // Base de datos de atajos y funciones del firmware V2.0
  const SHORTCUTS_DB = [
    // --- MODO CANCIÓN / ARRANGER ---
    {
      id: 'timeline-cursor',
      titulo: 'Mover Cursor en Línea de Tiempo',
      categoria: 'song',
      catNombre: 'Modo Canción / Arranger',
      badgeClass: 'badge-mode-song',
      icon: '🎬',
      controles: [
        { id: 'hw-btn-rec', label: 'REC', tipo: 'hold' },
        { id: 'hw-enc-3', label: 'Girar ENC 3', tipo: 'turn' }
      ],
      lcdHeader: 'ARRANGER • SONG MODE',
      lcdText: 'STEP [ 04 / 16 ]  SCN 02  x02\n<< MOVING TIMELINE CURSOR >>',
      pasos: [
        'Mantén presionado el botón REC (primer botón de la columna izquierda).',
        'Sin soltar REC, gira el Encoder 3 (tercer encoder de la columna derecha).',
        'El cursor verde tenue se moverá paso a paso por los 6 pasos visibles de la línea de tiempo.'
      ],
      tip: 'Novedad v2.0: Este atajo protegido previene saltos accidentales de escena si tocas las perillas durante un directo.'
    },
    {
      id: 'timeline-repeats',
      titulo: 'Ajustar Repeticiones del Paso (x1 a x16)',
      categoria: 'song',
      catNombre: 'Modo Canción / Arranger',
      badgeClass: 'badge-mode-song',
      icon: '🔁',
      controles: [
        { id: 'hw-btn-rec', label: 'REC', tipo: 'hold' },
        { id: 'hw-enc-4', label: 'Girar ENC 4', tipo: 'turn' }
      ],
      lcdHeader: 'ARRANGER • REPEATS',
      lcdText: 'STEP 04: REPEATS -> [ x04 ]\nPLAYBACK COUNT UPDATED',
      pasos: [
        'Mantén presionado el botón REC.',
        'Gira el Encoder 4 (último encoder inferior de la columna derecha) para ajustar cuántas veces se reproduce la escena (1 a 16).'
      ],
      tip: 'Los giros normales (sin REC) de los encoders 3 y 4 quedan libres de navegación en esta vista.'
    },
    {
      id: 'song-track-nav',
      titulo: 'Cambiar de Pista en Vista Arranger',
      categoria: 'song',
      catNombre: 'Modo Canción / Arranger',
      badgeClass: 'badge-mode-song',
      icon: '↔️',
      controles: [
        { id: 'hw-joy', label: 'Mover Joystick X', tipo: 'press' }
      ],
      lcdHeader: 'ARRANGER • TRACK SELECT',
      lcdText: 'SELECTED TRACK: [ T3 BASS ]\nVARIATION: PATTERN B',
      pasos: [
        'Empuja el Joystick analógico horizontalmente a la izquierda o derecha.',
        'La pista activa (T1..T8) cambiará en el encabezado para ver y conmutar el patrón asignado a cada instrumento.'
      ],
      tip: 'El Joystick horizontal está completamente dedicado a seleccionar pistas sin interferir con la canción.'
    },
    {
      id: 'song-trigger-scene',
      titulo: 'Disparar Escenas en Tiempo Real',
      categoria: 'song',
      catNombre: 'Modo Canción / Arranger',
      badgeClass: 'badge-mode-song',
      icon: '⚡',
      controles: [
        { id: 'hw-pad-1', label: 'Tocar Pad (1 a 16)', tipo: 'press' }
      ],
      lcdHeader: 'LIVE SCENE LAUNCH',
      lcdText: 'TRIGGERING SCENE [ SCN 01 ]\nALL 8 TRACKS SYNCED',
      pasos: [
        'Pulsa cualquiera de los 16 pads centrales.',
        'Cada pad lanza instantáneamente la escena correspondiente (SCN 01 a SCN 16).',
        'El cambio se cuantiza al tempo para que la transición sea fluida sin perder el ritmo.'
      ],
      tip: 'La escena activa se indica en la esquina inferior izquierda de la pantalla LCD con borde blanco/gris sobrio.'
    },

    // --- MODO JAM / ESTUDIO (SINTESIS & SAMPLES) ---
    {
      id: 'jam-play-notes',
      titulo: 'Interpretar Notas y Disparar Muestras',
      categoria: 'jam',
      catNombre: 'Modo Jam / Estudio',
      badgeClass: 'badge-mode-jam',
      icon: '🎹',
      controles: [
        { id: 'hw-pad-6', label: 'Tocar Pads 1..16', tipo: 'press' }
      ],
      lcdHeader: 'JAM: 01   T1 [SYNTH]',
      lcdText: 'PAD 06 -> NOTE D4 (VEL: 118)\nVOX 1 ACTIVE • PEAK: -2.1 dB',
      pasos: [
        'Toca los pads de la matriz central 4x4.',
        'En pistas de sintetizador interpretan la escala musical activa; en pistas de sampler disparan el sonido del pad.',
        'La fuerza de tu golpe se mide por el sensor de aceleración interno a 800 Hz.'
      ],
      tip: 'El algoritmo traduce la fuerza mediante una curva racional que destaca la dinámica en intensidades medias.'
    },
    {
      id: 'jam-main-params',
      titulo: 'Ajustar Parámetros Principales (P1 a P4)',
      categoria: 'jam',
      catNombre: 'Modo Jam / Estudio',
      badgeClass: 'badge-mode-jam',
      icon: '🎛️',
      controles: [
        { id: 'hw-enc-1', label: 'ENC 1 (Cutoff)', tipo: 'turn' },
        { id: 'hw-enc-2', label: 'ENC 2 (Reso)', tipo: 'turn' },
        { id: 'hw-enc-3', label: 'ENC 3 (Attack)', tipo: 'turn' },
        { id: 'hw-enc-4', label: 'ENC 4 (Decay)', tipo: 'turn' }
      ],
      lcdHeader: 'STUDIO • VCF PARAMS',
      lcdText: 'CUTOFF: 1.2 kHz   RESO: 42%\nATTACK: 12 ms     DECAY: 340 ms',
      pasos: [
        'Gira cualquiera de los 4 encoders verticales de la derecha.',
        'Cada encoder modifica en tiempo real el parámetro correspondiente mostrado en pantalla.',
        'En síntesis controlan el filtro analógico OTA y envolventes; en sampler controlan inicio, afinación y decay.'
      ],
      tip: 'La pantalla LCD dibuja la forma de onda y la curva de envolvente interactiva mientras giras las perillas.'
    },
    {
      id: 'jam-shift-params',
      titulo: 'Parámetros Secundarios (Pan, Vol, FX)',
      categoria: 'jam',
      catNombre: 'Modo Jam / Estudio',
      badgeClass: 'badge-mode-jam',
      icon: '✨',
      controles: [
        { id: 'hw-btn-shift', label: 'shift', tipo: 'hold' },
        { id: 'hw-enc-2', label: 'Girar ENC 1..4', tipo: 'turn' }
      ],
      lcdHeader: 'STUDIO • FX SENDS',
      lcdText: 'PAN: CENTER       VOL: +0.0 dB\nSEND 1 (REV): 25% SEND 2 (DEL): 10%',
      pasos: [
        'Mantén presionado el botón rectangular shift (bajo la perilla de volumen).',
        'Gira los encoders de la derecha para ajustar Paneo estéreo, Volumen de pista y los 2 Envíos de Efectos.'
      ],
      tip: 'Al soltar shift, la pantalla vuelve instantáneamente a la vista principal de la pista.'
    },
    {
      id: 'jam-plocks',
      titulo: 'Grabar Parameter Locks (P-Locks) en Vivo',
      categoria: 'jam',
      catNombre: 'Modo Jam / Estudio',
      badgeClass: 'badge-mode-jam',
      icon: '🔴',
      controles: [
        { id: 'hw-btn-rec', label: 'REC (en Play)', tipo: 'press' },
        { id: 'hw-enc-1', label: 'Mover Perilla', tipo: 'turn' }
      ],
      lcdHeader: 'STUDIO • MOTION RECORD',
      lcdText: 'REC [●] LIVE AUTOMATION\nLANE 1: CUTOFF CAPTURED',
      pasos: [
        'Con el compás en reproducción (botón PLAY activo), presiona el botón REC.',
        'Gira cualquier encoder mientras corre el loop.',
        'El movimiento quedará grabado en los carriles de automatización del patrón.'
      ],
      tip: 'Permite crear transiciones con barridos de filtro o modulación orgánica paso a paso.'
    },
    {
      id: 'jam-master-rec',
      titulo: 'Grabar Audio Master Directo a MicroSD',
      categoria: 'jam',
      catNombre: 'Modo Jam / Estudio',
      badgeClass: 'badge-mode-jam',
      icon: '🎙️',
      controles: [
        { id: 'hw-btn-shift', label: 'shift', tipo: 'hold' },
        { id: 'hw-btn-rec', label: 'Presionar REC', tipo: 'press' }
      ],
      lcdHeader: 'MASTER AUDIO RECORDER',
      lcdText: 'FILE: /REC/JAM_001.WAV\nSTATUS: RECORDING (44.1kHz 16b)',
      pasos: [
        'Mantén presionado el botón shift y presiona REC.',
        'El MiniJammer comenzará a grabar la mezcla master estéreo en formato WAV dentro de la carpeta /REC de la MicroSD.',
        'Pulsa shift + REC de nuevo para finalizar la grabación.'
      ],
      tip: 'Graba tus canciones terminadas sin necesidad de cables ni ordenador.'
    },
    {
      id: 'jam-chop-studio',
      titulo: 'Abrir Chop Studio (Editor de Muestras)',
      categoria: 'jam',
      catNombre: 'Modo Jam / Estudio',
      badgeClass: 'badge-mode-jam',
      icon: '✂️',
      controles: [
        { id: 'hw-pad-3', label: 'Sostener Pad', tipo: 'hold' },
        { id: 'hw-enc-1', label: 'Clic en ENC 1', tipo: 'press' }
      ],
      lcdHeader: 'CHOP STUDIO • WAVEFORM',
      lcdText: 'START: 0.120s     END: 0.850s\nENC 1: ZOOM       ENC 2: EXTRACT',
      pasos: [
        'Mantén presionado el pad con la muestra que deseas editar.',
        'Presiona hacia adentro (clic) el Encoder 1 de la columna derecha.',
        'Se abrirá el editor visual con zoom de forma de onda para recortar puntos de inicio y final.'
      ],
      tip: 'Puedes extraer fragmentos directamente a otros pads para armar kits de batería al vuelo.'
    },
    {
      id: 'jam-clear-track',
      titulo: 'Borrado Rápido de Pista o Patrón',
      categoria: 'jam',
      catNombre: 'Modo Jam / Estudio',
      badgeClass: 'badge-mode-jam',
      icon: '🗑️',
      controles: [
        { id: 'hw-pad-1', label: 'Sostener Pad', tipo: 'hold' },
        { id: 'hw-btn-rec', label: 'Presionar REC', tipo: 'press' }
      ],
      lcdHeader: 'STUDIO • CLEAR',
      lcdText: 'TRACK PATTERN CLEARED\nALL 16 STEPS EMPTIED',
      pasos: [
        'Sostén el pad de la pista que deseas vaciar.',
        'Presiona el botón REC (columna izquierda).',
        'Las notas grabadas de ese patrón se borrarán al instante sin detener la música.'
      ],
      tip: 'Ideal para corregir errores rápidamente durante una sesión en vivo.'
    },

    // --- SECUENCIADOR POR PASOS & POLIRRITMIA ---
    {
      id: 'seq-tie-notes',
      titulo: 'Crear Notas Ligadas / Sostenidas (TIEs)',
      categoria: 'seq',
      catNombre: 'Secuenciador & TIEs',
      badgeClass: 'badge-mode-seq',
      icon: '🔗',
      controles: [
        { id: 'hw-pad-1', label: 'Paso Inicial', tipo: 'hold' },
        { id: 'hw-pad-4', label: 'Paso Final', tipo: 'press' }
      ],
      lcdHeader: 'STEP REC • TIE NOTE',
      lcdText: 'NOTE SUSTAIN: STEP 01 -> 04\nLENGTH: 4 STEPS TIED [====]',
      pasos: [
        'En la vista de secuenciador por pasos, mantén pulsado el pad donde arranca la nota.',
        'Sin soltar el primero, pulsa el pad del paso donde quieres que termine la nota sostenida.',
        'Los LEDs intermedios se iluminarán en ámbar indicando que la nota se prolonga continuamente.'
      ],
      tip: 'Permite crear acordes y líneas de bajo ligadas con total naturalidad acústica.'
    },
    {
      id: 'seq-track-length',
      titulo: 'Longitud de Compás / Polirritmia (1 a 16 Pasos)',
      categoria: 'seq',
      catNombre: 'Secuenciador & TIEs',
      badgeClass: 'badge-mode-seq',
      icon: '📐',
      controles: [
        { id: 'hw-btn-del', label: 'COPY (❐)', tipo: 'hold' },
        { id: 'hw-btn-shift', label: 'shift', tipo: 'hold' },
        { id: 'hw-enc-4', label: 'Girar ENC 4', tipo: 'turn' }
      ],
      lcdHeader: 'POLYRHYTHM • TRACK LEN',
      lcdText: 'T1 LENGTH: [ 12 / 16 STEPS ]\nPOLYMETER: 3/4 AGAINST 4/4',
      pasos: [
        'Mantén presionados COPY (segundo botón izquierdo) y shift a la vez.',
        'Gira el Encoder 4 para definir el largo de compás de esa pista (entre 1 y 16 pasos).',
        'Cada pista puede tener métricas distintas generando polirritmias independientes.'
      ],
      tip: 'Prueba poner el bombo a 16 pasos y un sintetizador a 5 pasos para crear compases que mutan constantemente.'
    },

    // --- SISTEMA & CONFIGURACIÓN ---
    {
      id: 'sys-master-menu',
      titulo: 'Acceso Directo al Menú Master Bus',
      categoria: 'sys',
      catNombre: 'Sistema & Hardware',
      badgeClass: 'badge-mode-sys',
      icon: '⚙️',
      controles: [
        { id: 'hw-btn-shift', label: 'shift', tipo: 'hold' },
        { id: 'hw-joy', label: 'Clic en Joystick', tipo: 'press' }
      ],
      lcdHeader: 'MASTER BUS • EQ & GAIN',
      lcdText: 'BASS: +2.0 dB     TREBLE: +1.5 dB\nMIC GAIN: +12dB   DC BLOCK: ON',
      pasos: [
        'Mantén presionado el botón shift y presiona hacia adentro el Joystick.',
        'Se desplegará el menú flotante con los 10 parámetros del procesador Master (Graves, Agudos, Ganancias de entradas, Bloqueador DC y Limitador).'
      ],
      tip: 'Permite ecualizar la salida del altavoz interno o audífonos sobre la marcha.'
    },
    {
      id: 'sys-tabs-nav',
      titulo: 'Navegación por Pestañas del Sistema',
      categoria: 'sys',
      catNombre: 'Sistema & Hardware',
      badgeClass: 'badge-mode-sys',
      icon: '📑',
      controles: [
        { id: 'hw-joy', label: 'Joystick X / Y', tipo: 'press' }
      ],
      lcdHeader: 'SYSTEM [ ARCHIVOS ] [ SENSORES ]',
      lcdText: '[ MASTER ]   [ UI / IDIOMA ]\nJOYSTICK: NAVEGAR TABS',
      pasos: [
        'Mueve el Joystick hacia los lados para alternar entre las pestañas del menú de configuración (Archivos, Sensores, Master, UI).',
        'Mueve el Joystick hacia abajo para entrar a los ajustes de esa pestaña.'
      ],
      tip: 'Pulsa shift en cualquier momento para retroceder un nivel o salir del menú.'
    },
    {
      id: 'sys-save-preset',
      titulo: 'Guardar Preset de Sonido a MicroSD',
      categoria: 'sys',
      catNombre: 'Sistema & Hardware',
      badgeClass: 'badge-mode-sys',
      icon: '💾',
      controles: [
        { id: 'hw-btn-del', label: 'COPY (❐)', tipo: 'hold' },
        { id: 'hw-enc-1', label: 'Clic en ENC 1', tipo: 'press' }
      ],
      lcdHeader: 'PRESET MANAGER • SAVE',
      lcdText: 'NAME: [ ACID_BASS_01 ]\nSAVED TO: /PRESETS/SYNTH/',
      pasos: [
        'Mantén presionado COPY (segundo botón izquierdo) y pulsa el Encoder 1.',
        'Asigna nombre con los encoders y guarda tu sonido personalizado en la tarjeta MicroSD.'
      ],
      tip: 'Incluye 36 sonidos de fábrica en memoria interna más tus presets ilimitados en la tarjeta.'
    },

    // --- REPRODUCTOR SD & RADIO FM ---
    {
      id: 'media-load-track',
      titulo: 'Cargar Canción desde MicroSD al Reproductor',
      categoria: 'media',
      catNombre: 'Reproductor SD & Radio',
      badgeClass: 'badge-mode-sys',
      icon: '🎵',
      controles: [
        { id: 'hw-joy', label: 'Clic Joystick (2 seg)', tipo: 'hold' }
      ],
      lcdHeader: 'SD PLAYER • BROWSER',
      lcdText: 'LOADING: /MUSIC/TRACK01.WAV\nBUFFERING DMA AUDIO STREAM...',
      pasos: [
        'En el modo PLAYER, mantén presionado el clic del Joystick durante 2 segundos.',
        'Se abrirá el explorador de archivos para elegir y reproducir cualquier pista WAV.'
      ],
      tip: 'Usa PLAY y STOP para escuchar una preescucha rápida antes de cargar la canción completa.'
    },
    {
      id: 'media-tune-radio',
      titulo: 'Sintonizar Estaciones de Radio FM',
      categoria: 'media',
      catNombre: 'Reproductor SD & Radio',
      badgeClass: 'badge-mode-jam',
      icon: '📻',
      controles: [
        { id: 'hw-enc-1', label: 'Girar ENC 1 (Freq)', tipo: 'turn' }
      ],
      lcdHeader: 'FM RADIO TUNER',
      lcdText: 'FREQ: [ 102.5 MHz ]  STEREO\nRSSI: 84% • SIGNAL LOCKED',
      pasos: [
        'En el modo Radio FM, gira el Encoder 1 para sintonizar estaciones en pasos de 0.1 MHz.',
        'La pantalla muestra la barra analógica graduada de 88 a 108 MHz y el medidor de señal.'
      ],
      tip: '¡Puedes samplear directamente lo que suena en la radio hacia tu pista de Sampler con la entrada RESA!'
    }
  ];

  // Diccionario detallado de cada control físico real
  const HARDWARE_CONTROL_INFO = {
    'hw-btn-shift': {
      nombre: 'Botón shift',
      subtitulo: 'Modificador Global de Segundo Nivel (Bajo la perilla VOL)',
      icono: '⚡',
      acciones: [
        { tipo: 'Pulsación Simple / Escape', desc: 'Cancela diálogos, cierra menús y vuelve a la vista anterior.' },
        { tipo: 'shift + Encoders (1..4)', desc: 'Accede a la página secundaria de parámetros (Paneo, Envíos FX, Modulaciones).' },
        { tipo: 'shift + REC', desc: 'Inicia o detiene la grabación de audio Master en formato WAV estéreo a la MicroSD.' },
        { tipo: 'shift + Clic Joystick', desc: 'Abre el menú flotante del Master Bus (Ecualizador, Ganancias y Limitador).' }
      ]
    },
    'hw-btn-rec': {
      nombre: 'Botón REC (●)',
      subtitulo: 'Grabación y Modificador de Canción (Primer botón izquierdo)',
      icono: '🔴',
      acciones: [
        { tipo: 'REC en Reproducción', desc: 'Graba Parameter Locks (automatización de perillas) en vivo sobre el patrón activo.' },
        { tipo: 'REC + Encoder 3', desc: 'Mueve el cursor de la línea de tiempo en el Modo Canción (Song Arranger).' },
        { tipo: 'REC + Encoder 4', desc: 'Ajusta el número de repeticiones (x1..x16) de la escena seleccionada en la canción.' },
        { tipo: 'Sostener Pad + REC', desc: 'Borra instantáneamente todas las notas grabadas de la pista o patrón seleccionado.' }
      ]
    },
    'hw-btn-del': {
      nombre: 'Botón COPY (❐)',
      subtitulo: 'Copiar, Guardar y Polirritmia (Segundo botón izquierdo)',
      icono: '📋',
      acciones: [
        { tipo: 'COPY + Clic ENC 1', desc: 'Abre el diálogo para guardar el parche de sonido activo como nuevo preset en SD.' },
        { tipo: 'COPY + shift + ENC 4', desc: 'Ajusta la longitud de compás por pista (1 a 16 pasos) para polirritmias.' },
        { tipo: 'Pulsación Larga', desc: 'Acceso a utilidades de copia y borrado del sistema.' }
      ]
    },
    'hw-btn-play': {
      nombre: 'Botón PLAY / PAUSE (▶||)',
      subtitulo: 'Control de Transporte (Tercer botón izquierdo)',
      icono: '▶️',
      acciones: [
        { tipo: 'Pulsación Simple', desc: 'Inicia o pausa la reproducción del secuenciador o del reproductor MicroSD.' },
        { tipo: 'En Explorador de Archivos', desc: 'Activa la preescucha instantánea del archivo de audio resaltado.' }
      ]
    },
    'hw-btn-stop': {
      nombre: 'Botón STOP (■)',
      subtitulo: 'Detención y Rebobinado (Cuarto botón izquierdo)',
      icono: '⏹️',
      acciones: [
        { tipo: 'Pulsación Simple', desc: 'Detiene la reproducción y regresa el cabezal de lectura al paso inicial.' },
        { tipo: 'En Explorador de Archivos', desc: 'Corta inmediatamente cualquier audio que esté en preescucha.' }
      ]
    },
    'hw-joy': {
      nombre: 'Joystick Analógico',
      subtitulo: 'Efecto Hall Dual X/Y + Clic Central (Esquina superior izquierda)',
      icono: '🕹️',
      acciones: [
        { tipo: 'Movimiento X (Horizontal)', desc: 'Cambia de pestaña en menús del sistema y selecciona pistas en el Song Arranger.' },
        { tipo: 'Movimiento Y (Vertical)', desc: 'Desplaza listas de archivos, presets y parámetros en pantalla.' },
        { tipo: 'Clic Sostenido (2 seg)', desc: 'Carga la canción o audio seleccionado al reproductor MicroSD.' },
        { tipo: 'shift + Clic', desc: 'Abre el menú emergente del Master Bus con ecualización y limitador.' }
      ]
    },
    'hw-pot-vol': {
      nombre: 'Perilla de Volumen Master',
      subtitulo: 'Potenciómetro Analógico Suave (Junto al Joystick)',
      icono: '🔊',
      acciones: [
        { tipo: 'Giro Analógico', desc: 'Controla el volumen de salida general hacia el altavoz frontal y la salida de audífonos.' }
      ]
    },
    'hw-touchstrip': {
      nombre: 'Touchstrip Vertical de Cobre',
      subtitulo: 'Tira Táctil Capacitiva con 5 LEDs de Estado',
      icono: '⚡',
      acciones: [
        { tipo: 'Deslizamiento Continuo', desc: 'Modulación de pitch bend o envío de efectos asignable en síntesis.' },
        { tipo: 'En Modo GamePad', desc: 'Conmuta instantáneamente entre los 5 perfiles: MEDIA, GAMEPAD, PC WASD y CUSTOM.' }
      ]
    },
    'hw-enc-1': {
      nombre: 'Rotary Encoder 1',
      subtitulo: 'Parámetro 1 / Frecuencia VCF (Encoder superior derecho)',
      icono: '🎛️',
      acciones: [
        { tipo: 'Giro Simple', desc: 'Controla el Parámetro 1 de la pista (Frecuencia de Corte VCF en sintes / Start en samples).' },
        { tipo: 'Clic (Push)', desc: 'Sosteniendo un pad, abre Chop Studio para editar la muestra de audio.' },
        { tipo: 'En Menú UI', desc: 'Alterna instantáneamente el idioma del sistema entre Español e Inglés.' }
      ]
    },
    'hw-enc-2': {
      nombre: 'Rotary Encoder 2',
      subtitulo: 'Parámetro 2 / Resonancia VCF (Segundo encoder vertical)',
      icono: '🎛️',
      acciones: [
        { tipo: 'Giro Simple', desc: 'Controla el Parámetro 2 (Resonancia VCF / Loop End en samples / Estilo de Onda).' },
        { tipo: 'Con shift', desc: 'Controla el balance de Paneo Estéreo (L50..Center..R50) de la pista activa.' }
      ]
    },
    'hw-enc-3': {
      nombre: 'Rotary Encoder 3',
      subtitulo: 'Parámetro 3 / Navegación Timeline (Tercer encoder vertical)',
      icono: '🎛️',
      acciones: [
        { tipo: 'Giro Simple', desc: 'Controla Attack / Pitch en Studio. En vista Canción queda libre para evitar errores.' },
        { tipo: 'REC + Giro', desc: 'Desplaza el cursor de la línea de tiempo en el Modo Canción (Song Arranger).' },
        { tipo: 'En Menú Secuenciador', desc: 'Ajusta el porcentaje de Swing y los 5 algoritmos de Groove (Shuffle, Dilla, etc.).' }
      ]
    },
    'hw-enc-4': {
      nombre: 'Rotary Encoder 4',
      subtitulo: 'Parámetro 4 / Repeticiones (Encoder inferior derecho)',
      icono: '🎛️',
      acciones: [
        { tipo: 'Giro Simple', desc: 'Controla Decay / Release en síntesis y volumen del pad en sampler.' },
        { tipo: 'REC + Giro', desc: 'Modifica las repeticiones del bloque de canción (x1 a x16).' },
        { tipo: 'COPY + shift + Giro', desc: 'Modifica la longitud del compás por pista (Track Length para polirritmias).' }
      ]
    }
  };

  // Referencias DOM
  let searchInput, clearBtn, filterBtns, quickListEl;
  let inspectorCardEl, svgElement;
  let currentActiveCategory = 'all';
  let currentSelectedShortcut = null;

  function initSimulator() {
    searchInput = document.getElementById('sim-search-input');
    clearBtn = document.getElementById('sim-search-clear');
    filterBtns = document.querySelectorAll('.sim-filter-btn');
    quickListEl = document.getElementById('sim-quick-list');
    inspectorCardEl = document.getElementById('sim-inspector-card');
    svgElement = document.getElementById('minijammer-svg');

    if (!searchInput || !quickListEl || !svgElement) return;

    // 1. Escuchadores de búsqueda
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim().toLowerCase();
      clearBtn.style.display = query.length > 0 ? 'flex' : 'none';
      renderQuickList(query, currentActiveCategory);
    });

    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      clearBtn.style.display = 'none';
      renderQuickList('', currentActiveCategory);
      searchInput.focus();
    });

    // 2. Filtros de categoría
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentActiveCategory = btn.getAttribute('data-cat');
        renderQuickList(searchInput.value.trim().toLowerCase(), currentActiveCategory);
      });
    });

    // 3. Clics en elementos del SVG físico
    setupSvgInteractions();

    // 4. Render inicial con el primer atajo destacado (REC + ENC 3 de V2.0)
    renderQuickList('', 'all');
    selectShortcutById('timeline-cursor');
  }

  function setupSvgInteractions() {
    const interactiveElements = svgElement.querySelectorAll('.hw-interactive');
    interactiveElements.forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const controlId = el.getAttribute('id');
        showHardwareInspector(controlId);
      });
    });
  }

  function renderQuickList(query, category) {
    quickListEl.innerHTML = '';

    const filtered = SHORTCUTS_DB.filter(item => {
      const matchesCat = (category === 'all' || item.categoria === category);
      if (!matchesCat) return false;

      if (!query) return true;

      const inTitle = item.titulo.toLowerCase().includes(query);
      const inPasos = item.pasos.some(p => p.toLowerCase().includes(query));
      const inControles = item.controles.some(c => c.label.toLowerCase().includes(query));
      const inTip = item.tip.toLowerCase().includes(query);

      return inTitle || inPasos || inControles || inTip;
    });

    if (filtered.length === 0) {
      quickListEl.innerHTML = `
        <div style="text-align: center; padding: 24px 12px; color: var(--text-muted); font-size: 0.9rem;">
          🔍 No se encontraron atajos para <strong>"${query}"</strong>.<br>
          <span style="font-size: 0.78rem; opacity: 0.8;">Intenta con "cursor", "rec", "tie", "preset" o "p-locks".</span>
        </div>
      `;
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = `sim-item-card ${currentSelectedShortcut && currentSelectedShortcut.id === item.id ? 'selected' : ''}`;
      
      const comboText = item.controles.map(c => c.label).join(' + ');

      card.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 1.15rem;">${item.icon}</span>
          <span class="sim-item-name">${item.titulo}</span>
        </div>
        <span class="sim-item-keys">${comboText}</span>
      `;

      card.addEventListener('click', () => {
        document.querySelectorAll('.sim-item-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectShortcut(item);
      });

      quickListEl.appendChild(card);
    });
  }

  function selectShortcut(shortcut) {
    currentSelectedShortcut = shortcut;
    clearHardwareHighlights();
    animateShortcutOnSvg(shortcut);
    renderShortcutDetail(shortcut);
  }

  function selectShortcutById(id) {
    const found = SHORTCUTS_DB.find(s => s.id === id);
    if (found) {
      selectShortcut(found);
      const matchedCard = quickListEl.querySelector(`.sim-item-card`);
      if (matchedCard) matchedCard.classList.add('selected');
    }
  }

  function clearHardwareHighlights() {
    const all = svgElement.querySelectorAll('.hw-interactive');
    all.forEach(el => {
      el.classList.remove('hw-highlight-hold', 'hw-highlight-press', 'hw-highlight-turn', 'hw-rotate-anim');
      el.style.filter = '';
    });
  }

  function animateShortcutOnSvg(shortcut) {
    shortcut.controles.forEach(ctrl => {
      const svgCtrl = svgElement.querySelector(`#${ctrl.id}`);
      if (!svgCtrl) return;

      if (ctrl.tipo === 'hold') {
        svgCtrl.classList.add('hw-highlight-hold');
      } else if (ctrl.tipo === 'turn') {
        svgCtrl.classList.add('hw-highlight-turn', 'hw-rotate-anim');
      } else {
        svgCtrl.classList.add('hw-highlight-press');
      }
    });

    // Actualizar pantalla LCD simulada dentro del dibujo SVG
    const svgLcdHeader = svgElement.querySelector('#svg-lcd-header');
    const svgLcdText = svgElement.querySelector('#svg-lcd-text');
    if (svgLcdHeader && svgLcdText) {
      svgLcdHeader.textContent = shortcut.lcdHeader || 'JAM: 01   T1 [SYNTH]';
      svgLcdText.textContent = shortcut.lcdText ? shortcut.lcdText.split('\n')[0] : 'READY';
    }
  }

  function renderShortcutDetail(s) {
    const comboBadgesHtml = s.controles.map((c, i) => {
      let keyClass = 'key-press';
      let iconPrefix = '👆 ';
      if (c.tipo === 'hold') {
        keyClass = 'key-hold';
        iconPrefix = '✊ Mantener: ';
      } else if (c.tipo === 'turn') {
        keyClass = 'key-turn';
        iconPrefix = '🔄 ';
      }
      const sep = i < s.controles.length - 1 ? '<span class="key-separator">+</span>' : '';
      return `<span class="sim-key-badge ${keyClass}">${iconPrefix}${c.label}</span>${sep}`;
    }).join('');

    const stepsHtml = s.pasos.map((p, i) => `
      <div class="sim-step-row">
        <span class="sim-step-num">${i + 1}</span>
        <span>${p}</span>
      </div>
    `).join('');

    inspectorCardEl.innerHTML = `
      <div class="sim-detail-header">
        <div class="sim-detail-icon">${s.icon}</div>
        <div class="sim-detail-title-group">
          <span class="sim-detail-badge ${s.badgeClass}">${s.catNombre}</span>
          <h3 class="sim-detail-title">${s.titulo}</h3>
        </div>
      </div>

      <div class="sim-combo-box">
        <span class="sim-combo-label">Combinación de Controles Físicos:</span>
        <div class="sim-combo-keys">
          ${comboBadgesHtml}
        </div>
      </div>

      <div class="sim-steps-box">
        <span class="sim-combo-label">Cómo ejecutarlo:</span>
        ${stepsHtml}
      </div>

      <div class="sim-tip-box">
        <strong>💡 Consejo Pro:</strong> ${s.tip}
      </div>

      <div class="sim-lcd-box">
        <div class="sim-lcd-header">
          <span>${s.lcdHeader}</span>
          <span>LCD PREVIEW (320x170)</span>
        </div>
        <div style="white-space: pre-line; line-height: 1.4; color: #a4f7ff;">${s.lcdText}</div>
      </div>
    `;
  }

  function showHardwareInspector(controlId) {
    clearHardwareHighlights();

    const clickedEl = svgElement.querySelector(`#${controlId}`);
    if (clickedEl) {
      clickedEl.classList.add('hw-highlight-press');
    }

    let info = HARDWARE_CONTROL_INFO[controlId];
    if (!info && controlId.startsWith('hw-pad-')) {
      const padNum = controlId.replace('hw-pad-', '');
      info = {
        nombre: `Pad de Matriz #${padNum}`,
        subtitulo: 'Pad Táctil de Silicona con Detección de Fuerza (Peak-Hold 800 Hz)',
        icono: '🟧',
        acciones: [
          { tipo: 'Tocar a mano', desc: `Dispara la muestra de audio asignada al Pad ${padNum} o la nota musical con Velocity dinámico.` },
          { tipo: 'Sostener + ENC 1', desc: 'Abre el Chop Studio en pantalla para recortar la onda de audio de este pad.' },
          { tipo: 'Sostener + REC', desc: 'Borra instantáneamente todas las notas asociadas a este pad en el compás activo.' },
          { tipo: 'En Secuenciador', desc: `Activa o desactiva el paso de ritmo número ${padNum} del compás.` }
        ]
      };
    }

    if (!info) return;

    const accionesHtml = info.acciones.map(a => `
      <div class="sim-step-row" style="margin-bottom: 8px;">
        <span class="sim-step-num" style="background: rgba(255, 145, 0, 0.2); border-color: var(--orange); color: var(--orange);">●</span>
        <div>
          <strong style="color: var(--cyan); font-size: 0.88rem;">${a.tipo}:</strong><br>
          <span style="font-size: 0.86rem; color: var(--text-main);">${a.desc}</span>
        </div>
      </div>
    `).join('');

    inspectorCardEl.innerHTML = `
      <div class="sim-detail-header">
        <div class="sim-detail-icon">${info.icono}</div>
        <div class="sim-detail-title-group">
          <span class="sim-detail-badge badge-mode-sys">Explorador de Hardware</span>
          <h3 class="sim-detail-title">${info.nombre}</h3>
          <span style="font-size: 0.82rem; color: var(--text-muted);">${info.subtitulo}</span>
        </div>
      </div>

      <div class="sim-steps-box" style="margin-top: 6px;">
        <span class="sim-combo-label">Funciones disponibles con este control:</span>
        ${accionesHtml}
      </div>

      <div class="sim-tip-box" style="border-left-color: var(--orange); background: rgba(255, 145, 0, 0.08); color: #ffd699;">
        <strong>💡 Modo Exploración:</strong> Haz clic en cualquier otro botón del dibujo o escribe en el buscador para ver sus combinaciones animadas.
      </div>
    `;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSimulator);
  } else {
    initSimulator();
  }
})();
