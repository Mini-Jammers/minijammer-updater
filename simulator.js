/**
 * =============================================================================
 * SIMULADOR INTERACTIVO DE ATAJOS Y HARDWARE - MINIJAMMER XXL V2.0
 * =============================================================================
 */

(function () {
  'use strict';

  // Base de datos dinámica de atajos y funciones del firmware V2.0
  const SHORTCUTS_DB = [
    // --- MODO CANCIÓN / ARRANGER ---
    {
      id: 'timeline-cursor',
      titulo: 'Mover Cursor en Línea de Tiempo',
      categoria: 'song',
      catNombre: 'Modo Canción',
      badgeClass: 'badge-mode-song',
      icon: '🎬',
      controles: [
        { id: 'hw-btn-rec', label: 'REC', tipo: 'hold' },
        { id: 'hw-enc-3', label: 'Girar ENC 3', tipo: 'turn' }
      ],
      lcdHeader: 'ARRANGER • SONG MODE',
      lcdText: 'STEP [ 04 / 16 ]  SCN 02  x02\n<< MOVING TIMELINE CURSOR >>',
      pasos: [
        'Mantén presionado el botón físico REC.',
        'Sin soltar REC, gira el Encoder 3 para desplazarte paso a paso por la canción.',
        'Al soltar REC, el cursor queda fijado en el paso seleccionado.'
      ],
      tip: 'Novedad v2.0: Este atajo previene desajustes accidentales al tocar los encoders durante una presentación en vivo.'
    },
    {
      id: 'timeline-repeats',
      titulo: 'Ajustar Repeticiones del Paso (x1 a x16)',
      categoria: 'song',
      catNombre: 'Modo Canción',
      badgeClass: 'badge-mode-song',
      icon: '🔁',
      controles: [
        { id: 'hw-btn-rec', label: 'REC', tipo: 'hold' },
        { id: 'hw-enc-4', label: 'Girar ENC 4', tipo: 'turn' }
      ],
      lcdHeader: 'ARRANGER • REPEATS',
      lcdText: 'STEP 04: REPEATS -> [ x04 ]\nPLAYBACK COUNT UPDATED',
      pasos: [
        'Mantén presionado el botón físico REC.',
        'Gira el Encoder 4 para subir o bajar el número de veces que se repite la escena del paso (1 a 16 veces).'
      ],
      tip: 'Los giros simples (sin REC) de los encoders 3 y 4 quedan completamente libres en esta vista.'
    },
    {
      id: 'song-track-nav',
      titulo: 'Cambiar de Pista en Vista Arranger',
      categoria: 'song',
      catNombre: 'Modo Canción',
      badgeClass: 'badge-mode-song',
      icon: '↔️',
      controles: [
        { id: 'hw-joy', label: 'Mover Joystick X', tipo: 'press' }
      ],
      lcdHeader: 'ARRANGER • TRACK SELECT',
      lcdText: 'SELECTED TRACK: [ T3 BASS ]\nVARIATION: PATTERN B',
      pasos: [
        'Empuja el Joystick a la izquierda o derecha.',
        'La pista activa (T1 a T8) cambiará inmediatamente para ver qué patrón tiene asignado en esa escena.'
      ],
      tip: 'El Joystick horizontal está 100% dedicado a la selección de pistas, sin interferir con la línea de tiempo.'
    },
    {
      id: 'song-trigger-scene',
      titulo: 'Disparar Escenas en Tiempo Real',
      categoria: 'song',
      catNombre: 'Modo Canción',
      badgeClass: 'badge-mode-song',
      icon: '⚡',
      controles: [
        { id: 'hw-pad-1', label: 'Tocar Pad (1 a 16)', tipo: 'press' }
      ],
      lcdHeader: 'LIVE SCENE LAUNCH',
      lcdText: 'TRIGGERING SCENE [ SCN 01 ]\nALL 8 TRACKS SYNCED',
      pasos: [
        'En la vista de patrones, pulsa cualquiera de los 16 pads para saltar directamente a esa escena.',
        'El MiniJammer sincronizará el cambio con el compás para transiciones limpias sin cortes.'
      ],
      tip: 'El indicador de escena activa se muestra en la esquina inferior izquierda con estética sobria en escala de grises.'
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
      lcdHeader: 'STUDIO • T1 SYNTH',
      lcdText: 'PAD 06 -> NOTE D4 (VEL: 118)\nVOX 1 ACTIVE • PEAK: -2.1 dB',
      pasos: [
        'Toca los pads de la matriz 4x4.',
        'En pistas de sintetizador disparan notas de la escala activa.',
        'En pistas de sampler disparan la muestra asociada al pad.'
      ],
      tip: 'El sensor de aceleración BMI160 muestrea a 800 Hz capturando la fuerza exacta (Velocity Dinámico) con curva racional acústica.'
    },
    {
      id: 'jam-main-params',
      titulo: 'Ajustar Parámetros Principales (P1 a P4)',
      categoria: 'jam',
      catNombre: 'Modo Jam / Estudio',
      badgeClass: 'badge-mode-jam',
      icon: '🎛️',
      controles: [
        { id: 'hw-enc-1', label: 'Girar ENC 1 (Cutoff)', tipo: 'turn' },
        { id: 'hw-enc-2', label: 'Girar ENC 2 (Reso)', tipo: 'turn' },
        { id: 'hw-enc-3', label: 'Girar ENC 3 (Attack)', tipo: 'turn' },
        { id: 'hw-enc-4', label: 'Girar ENC 4 (Decay)', tipo: 'turn' }
      ],
      lcdHeader: 'STUDIO • VCF PARAMS',
      lcdText: 'CUTOFF: 1.2 kHz   RESO: 42%\nATTACK: 12 ms     DECAY: 340 ms',
      pasos: [
        'Gira cualquiera de los 4 encoders para ajustar directamente los 4 parámetros visibles en pantalla.',
        'En síntesis modifican el filtro y envolvente; en sampler controlan punto de inicio, fin, pitch y volumen.'
      ],
      tip: 'Los cambios son instantáneos y procesados por el motor DSP en coma flotante a 44.1 kHz.'
    },
    {
      id: 'jam-shift-params',
      titulo: 'Parámetros Secundarios (Pan, Vol, FX)',
      categoria: 'jam',
      catNombre: 'Modo Jam / Estudio',
      badgeClass: 'badge-mode-jam',
      icon: '✨',
      controles: [
        { id: 'hw-btn-shift', label: 'SHIFT', tipo: 'hold' },
        { id: 'hw-enc-2', label: 'Girar ENC 1..4', tipo: 'turn' }
      ],
      lcdHeader: 'STUDIO • FX SENDS',
      lcdText: 'PAN: CENTER       VOL: +0.0 dB\nSEND 1 (REV): 25% SEND 2 (DEL): 10%',
      pasos: [
        'Mantén presionado el botón SHIFT.',
        'Gira los encoders para acceder a la segunda página de parámetros (Paneo, Envíos de Efectos o Sensibilidad).'
      ],
      tip: 'Al soltar SHIFT la pantalla regresa limpiamente a la vista de interpretación sin perder tus ajustes.'
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
        'Con la secuencia reproduciéndose (PLAY activo), presiona REC.',
        'Gira cualquier perilla mientras suena el compás.',
        'Los movimientos quedarán grabados en los 4 carriles de automatización por patrón.'
      ],
      tip: 'Puedes automatizar barridos de filtro, cambios de ataque o envíos de delay para dar vida orgánica a tu sonido.'
    },
    {
      id: 'jam-master-rec',
      titulo: 'Grabar Audio Master Directo a MicroSD',
      categoria: 'jam',
      catNombre: 'Modo Jam / Estudio',
      badgeClass: 'badge-mode-jam',
      icon: '🎙️',
      controles: [
        { id: 'hw-btn-shift', label: 'SHIFT', tipo: 'hold' },
        { id: 'hw-btn-rec', label: 'Presionar REC', tipo: 'press' }
      ],
      lcdHeader: 'MASTER AUDIO RECORDER',
      lcdText: 'FILE: /REC/JAM_001.WAV\nSTATUS: RECORDING (44.1kHz 16b)',
      pasos: [
        'Mantén presionado SHIFT y pulsa REC.',
        'Se iniciará una grabación estéreo WAV de alta fidelidad en la carpeta /REC de la MicroSD.',
        'Vuelve a pulsar SHIFT + REC para detener y cerrar el archivo.'
      ],
      tip: 'Graba tus sesiones en vivo completas con calidad de estudio sin necesidad de una interfaz de audio externa.'
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
        'Mantén presionado el pad que contiene la muestra que deseas editar.',
        'Haz clic (presiona hacia adentro) el Encoder 1.',
        'Se abrirá el editor visual con la forma de onda de audio para recortar con total precisión.'
      ],
      tip: 'Puedes extraer el fragmento directamente a la RAM o guardarlo en un nuevo pad.'
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
        'Sostén el pad de la pista que deseas limpiar.',
        'Presiona REC para vaciar instantáneamente las notas de ese patrón sin interrumpir la música.'
      ],
      tip: 'Muy útil para borrar y re-grabar ritmos sobre la marcha durante un set en directo.'
    },

    // --- SECUENCIADOR POR PASOS & POLIRRITMIA ---
    {
      id: 'seq-tie-notes',
      titulo: 'Crear Notas Ligadas / Sostenidas (TIEs)',
      categoria: 'seq',
      catNombre: 'Secuenciador',
      badgeClass: 'badge-mode-seq',
      icon: '🔗',
      controles: [
        { id: 'hw-pad-1', label: 'Paso Inicial', tipo: 'hold' },
        { id: 'hw-pad-4', label: 'Paso Final', tipo: 'press' }
      ],
      lcdHeader: 'STEP REC • TIE NOTE',
      lcdText: 'NOTE SUSTAIN: STEP 01 -> 04\nLENGTH: 4 STEPS TIED [====]',
      pasos: [
        'En modo de edición por pasos, mantén presionado el pad donde inicia la nota.',
        'Sin soltar el primero, pulsa el pad donde deseas que termine la nota sostenida.',
        'Los LEDs intermedios se iluminarán en ámbar continuo indicando que la nota se mantiene ligada.'
      ],
      tip: 'Inspirado en el flujo de trabajo del OP-XY para crear bajos sostenidos y acordes atmosféricos.'
    },
    {
      id: 'seq-track-length',
      titulo: 'Longitud de Compás / Polirritmia (1 a 16 Pasos)',
      categoria: 'seq',
      catNombre: 'Secuenciador',
      badgeClass: 'badge-mode-seq',
      icon: '📐',
      controles: [
        { id: 'hw-btn-del', label: 'COPY / DEL', tipo: 'hold' },
        { id: 'hw-btn-shift', label: 'SHIFT', tipo: 'hold' },
        { id: 'hw-enc-4', label: 'Girar ENC 4', tipo: 'turn' }
      ],
      lcdHeader: 'POLYRHYTHM • TRACK LEN',
      lcdText: 'T1 LENGTH: [ 12 / 16 STEPS ]\nPOLYMETER: 3/4 AGAINST 4/4',
      pasos: [
        'Mantén presionados los botones COPY (DEL) y SHIFT simultáneamente.',
        'Gira el Encoder 4 para ajustar la longitud de compás de la pista activa entre 1 y 16 pasos.',
        'Cada pista puede tener una longitud diferente, permitiendo polirritmias complejas.'
      ],
      tip: 'Prueba poner el bombo en 16 pasos y una melodía en 7 pasos para crear patrones generativos que nunca se repiten igual.'
    },
    {
      id: 'seq-swing',
      titulo: 'Ajustar Swing y Algoritmos de Groove',
      categoria: 'seq',
      catNombre: 'Secuenciador',
      badgeClass: 'badge-mode-seq',
      icon: '🥁',
      controles: [
        { id: 'hw-enc-3', label: 'Girar ENC 3', tipo: 'turn' }
      ],
      lcdHeader: 'GROOVE • SHUFFLE',
      lcdText: 'SWING: 62%   ALGO: [ DILLA ]\nMICRO-TIMING DELAY APPLIED',
      pasos: [
        'En la vista de secuenciador, gira el Encoder 3 para variar el porcentaje de swing (50% a 75%).',
        'Incluye 5 algoritmos seleccionables: 1/16, 1/8 Shuffle, Push, Quintuplet y Double.'
      ],
      tip: 'El algoritmo Quintuplet emula el estilo rítmico arrastrado de J Dilla y la MPC clásica.'
    },

    // --- SISTEMA & CONFIGURACIÓN ---
    {
      id: 'sys-master-menu',
      titulo: 'Acceso Rápido al Menú Master Bus',
      categoria: 'sys',
      catNombre: 'Sistema & Hardware',
      badgeClass: 'badge-mode-sys',
      icon: '⚙️',
      controles: [
        { id: 'hw-btn-shift', label: 'SHIFT', tipo: 'hold' },
        { id: 'hw-joy', label: 'Clic en Joystick', tipo: 'press' }
      ],
      lcdHeader: 'MASTER BUS • EQ & GAIN',
      lcdText: 'BASS: +2.0 dB     TREBLE: +1.5 dB\nMIC GAIN: +12dB   DC BLOCK: ON',
      pasos: [
        'Mantén presionado SHIFT y presiona hacia adentro el botón central del Joystick.',
        'Se abrirá instantáneamente el menú flotante con los 10 parámetros del procesador Master (Graves, Agudos, Ganancias de entradas, Bloqueador DC y Limitador).'
      ],
      tip: 'Puedes calibrar el volumen del altavoz interno, audífonos o ganancia de línea sin salir de tu sesión.'
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
        'Mueve el Joystick a los lados para cambiar entre pestañas al estilo Sony a6000.',
        'Mueve el Joystick hacia abajo para entrar al contenido y editar los parámetros de esa categoría.'
      ],
      tip: 'Presiona SHIFT para retroceder un nivel o salir del menú de sistema en cualquier momento.'
    },
    {
      id: 'sys-save-preset',
      titulo: 'Guardar Preset de Sonido a MicroSD',
      categoria: 'sys',
      catNombre: 'Sistema & Hardware',
      badgeClass: 'badge-mode-sys',
      icon: '💾',
      controles: [
        { id: 'hw-btn-del', label: 'COPY (DEL)', tipo: 'hold' },
        { id: 'hw-enc-1', label: 'Clic en ENC 1', tipo: 'press' }
      ],
      lcdHeader: 'PRESET MANAGER • SAVE',
      lcdText: 'NAME: [ ACID_BASS_01 ]\nSAVED TO: /PRESETS/SYNTH/',
      pasos: [
        'Mantén presionado el botón COPY (DEL) y pulsa el Encoder 1.',
        'Se abrirá la ventana de nomenclatura donde puedes asignar nombre con los encoders y guardar tu sonido en la tarjeta.'
      ],
      tip: 'El MiniJammer XXL incluye 36 presets ROM de fábrica además del almacenamiento ilimitado en tu tarjeta SD.'
    },

    // --- REPRODUCTOR & EXPLORADOR SD ---
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
        'Se abrirá el explorador de canciones de la tarjeta MicroSD para seleccionar y cargar el archivo WAV que quieras reproducir.'
      ],
      tip: 'Usa los botones PLAY y STOP para escuchar una muestra rápida antes de cargar la canción completa.'
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
        'En el modo Reproductor de Radio FM, gira el Encoder 1 para sintonizar en pasos de 0.1 MHz.',
        'La pantalla muestra la barra de intensidad de señal RSSI en tiempo real.'
      ],
      tip: '¡Puedes samplear audio directamente de la radio en vivo al Sampler interno con la opción de entrada RESA!'
    }
  ];

  // Mapeo detallado de funciones por control físico individual
  const HARDWARE_CONTROL_INFO = {
    'hw-btn-shift': {
      nombre: 'Botón SHIFT',
      subtitulo: 'Modificador Global de Segundo Nivel',
      icono: '⚡',
      acciones: [
        { tipo: 'Pulsación Corta / Escape', desc: 'Cancela diálogos emergentes, cierra menús y vuelve a la vista anterior.' },
        { tipo: 'SHIFT + Encoders (1..4)', desc: 'Accede a la página secundaria de parámetros (Paneo, Envíos FX, Modulaciones).' },
        { tipo: 'SHIFT + REC', desc: 'Inicia o detiene la grabación de audio Master en formato WAV estéreo a la MicroSD.' },
        { tipo: 'SHIFT + Clic Joystick', desc: 'Abre el menú flotante del Master Bus (Ecualizador, Ganancias y Limitador).' }
      ]
    },
    'hw-btn-rec': {
      nombre: 'Botón REC',
      subtitulo: 'Grabación y Modificador Secundario',
      icono: '🔴',
      acciones: [
        { tipo: 'REC en Reproducción', desc: 'Graba Parameter Locks (automatización de perillas) en vivo sobre el patrón activo.' },
        { tipo: 'REC + Encoder 3', desc: 'Mueve el cursor de la línea de tiempo en el Modo Canción (Song Arranger).' },
        { tipo: 'REC + Encoder 4', desc: 'Ajusta el número de repeticiones (x1..x16) de la escena seleccionada en la canción.' },
        { tipo: 'Sostener Pad + REC', desc: 'Borra instantáneamente todas las notas grabadas de la pista o patrón seleccionado.' }
      ]
    },
    'hw-btn-play': {
      nombre: 'Botón PLAY / PAUSE',
      subtitulo: 'Control de Transporte Principal',
      icono: '▶️',
      acciones: [
        { tipo: 'Pulsación Simple', desc: 'Inicia o pausa la reproducción del secuenciador o del reproductor MicroSD.' },
        { tipo: 'En Explorador de Archivos', desc: 'Activa la preescucha instantánea del archivo de audio resaltado.' }
      ]
    },
    'hw-btn-stop': {
      nombre: 'Botón STOP',
      subtitulo: 'Detención y Retorno',
      icono: '⏹️',
      acciones: [
        { tipo: 'Pulsación Simple', desc: 'Detiene la reproducción y regresa el cabezal de lectura al inicio del compás.' },
        { tipo: 'En Explorador de Archivos', desc: 'Corta inmediatamente cualquier audio que esté en preescucha.' }
      ]
    },
    'hw-btn-del': {
      nombre: 'Botón COPY / DEL / SYS',
      subtitulo: 'Gestión de Sistema y Edición',
      icono: '📋',
      acciones: [
        { tipo: 'Pulsación Larga', desc: 'Accede a las opciones de borrado y utilidades del sistema.' },
        { tipo: 'COPY + Clic ENC 1', desc: 'Abre el diálogo para guardar el parche de sonido activo como nuevo preset en SD.' },
        { tipo: 'COPY + SHIFT + ENC 4', desc: 'Ajusta la longitud de compás por pista (1 a 16 pasos) para polirritmias.' }
      ]
    },
    'hw-enc-1': {
      nombre: 'Rotary Encoder 1',
      subtitulo: 'Parámetro 1 / Navegación',
      icono: '🎛️',
      acciones: [
        { tipo: 'Giro Simple', desc: 'Controla el Parámetro 1 de la pista (Frecuencia de Corte VCF en sintes / Start en samples).' },
        { tipo: 'Clic (Push)', desc: 'Sosteniendo un pad, abre Chop Studio para editar la muestra de audio.' },
        { tipo: 'En Menú UI', desc: 'Alterna instantáneamente el idioma del sistema entre Español e Inglés.' }
      ]
    },
    'hw-enc-2': {
      nombre: 'Rotary Encoder 2',
      subtitulo: 'Parámetro 2 / Resonancia',
      icono: '🎛️',
      acciones: [
        { tipo: 'Giro Simple', desc: 'Controla el Parámetro 2 (Resonancia VCF / Loop End en samples / Estilo de Onda).' },
        { tipo: 'Con SHIFT', desc: 'Controla el balance de Paneo Estéreo (L50..Center..R50) de la pista activa.' }
      ]
    },
    'hw-enc-3': {
      nombre: 'Rotary Encoder 3',
      subtitulo: 'Parámetro 3 / Navegación Protegida',
      icono: '🎛️',
      acciones: [
        { tipo: 'Giro Simple', desc: 'Controla el Parámetro 3 (Attack / Pitch). En vista de canción está libre para evitar errores.' },
        { tipo: 'REC + Giro', desc: 'Desplaza el cursor de la línea de tiempo en el Modo Canción (Song Arranger).' },
        { tipo: 'En Menú Secuenciador', desc: 'Ajusta el porcentaje de Swing y los 5 algoritmos de Groove (Shuffle, Dilla, etc.).' }
      ]
    },
    'hw-enc-4': {
      nombre: 'Rotary Encoder 4',
      subtitulo: 'Parámetro 4 / Repeticiones',
      icono: '🎛️',
      acciones: [
        { tipo: 'Giro Simple', desc: 'Controla el Parámetro 4 (Decay / Release / Volumen del pad).' },
        { tipo: 'REC + Giro', desc: 'Modifica las repeticiones del bloque de canción (x1 a x16).' },
        { tipo: 'COPY + SHIFT + Giro', desc: 'Modifica la longitud del compás por pista (Track Length para polirritmias).' }
      ]
    },
    'hw-joy': {
      nombre: 'Joystick Analógico',
      subtitulo: 'Efecto Hall Dual X/Y + Clic Central',
      icono: '🕹️',
      acciones: [
        { tipo: 'Movimiento X (Horizontal)', desc: 'Cambia de pestaña en menús del sistema y selecciona pistas en vista Arranger.' },
        { tipo: 'Movimiento Y (Vertical)', desc: 'Desplaza listas de archivos, presets y parámetros.' },
        { tipo: 'Clic Sostenido (2 seg)', desc: 'Carga la canción o audio seleccionado al reproductor MicroSD.' },
        { tipo: 'SHIFT + Clic', desc: 'Abre el menú emergente del Master Bus con ecualización y limitador.' }
      ]
    },
    'hw-touchstrip': {
      nombre: 'Touchstrip Táctil',
      subtitulo: 'Sensor Capacitivo de 5 Segmentos',
      icono: '⚡',
      acciones: [
        { tipo: 'Deslizamiento', desc: 'Modulación de pitch bend o envío de efectos asignable en síntesis.' },
        { tipo: 'En Modo GamePad', desc: 'Conmuta instantáneamente entre los 5 perfiles: MEDIA, GAMEPAD, PC WASD y CUSTOM.' }
      ]
    }
  };

  // Referencias DOM
  let searchInput, clearBtn, filterBtns, quickListEl;
  let inspectorCardEl, svgElement;
  let currentActiveCategory = 'all';
  let currentSelectedShortcut = null;

  // Inicialización
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

    // 4. Render inicial con el primer atajo destacado (el nuevo de v2.0)
    renderQuickList('', 'all');
    selectShortcutById('timeline-cursor');
  }

  // Interacción directa sobre el dibujo SVG
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

  // Renderizar la lista de resultados de atajos
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

  // Seleccionar atajo por objeto
  function selectShortcut(shortcut) {
    currentSelectedShortcut = shortcut;
    clearHardwareHighlights();
    animateShortcutOnSvg(shortcut);
    renderShortcutDetail(shortcut);
  }

  // Seleccionar atajo por ID
  function selectShortcutById(id) {
    const found = SHORTCUTS_DB.find(s => s.id === id);
    if (found) {
      selectShortcut(found);
      const matchedCard = quickListEl.querySelector(`.sim-item-card`);
      if (matchedCard) matchedCard.classList.add('selected');
    }
  }

  // Limpiar animaciones de hardware en el SVG
  function clearHardwareHighlights() {
    const all = svgElement.querySelectorAll('.hw-interactive');
    all.forEach(el => {
      el.classList.remove('hw-highlight-hold', 'hw-highlight-press', 'hw-highlight-turn', 'hw-rotate-anim');
      // Restaurar opacidades/filtros base
      el.style.filter = '';
    });
  }

  // Animar los botones del SVG correspondientes al atajo
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

    // Actualizar pantalla LCD simulada dentro del SVG
    const svgLcdHeader = svgElement.querySelector('#svg-lcd-header');
    const svgLcdText = svgElement.querySelector('#svg-lcd-text');
    if (svgLcdHeader && svgLcdText) {
      svgLcdHeader.textContent = shortcut.lcdHeader || 'MINIJAMMER XXL V2.0';
      svgLcdText.textContent = shortcut.lcdText ? shortcut.lcdText.split('\n')[0] : 'READY';
    }
  }

  // Renderizar la tarjeta del Inspector de Detalle para un atajo
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
          <span>LCD PREVIEW</span>
        </div>
        <div style="white-space: pre-line; line-height: 1.4; color: #a4f7ff;">${s.lcdText}</div>
      </div>
    `;
  }

  // Mostrar información cuando el usuario hace clic directo en un botón del dibujo
  function showHardwareInspector(controlId) {
    clearHardwareHighlights();

    // Iluminar el botón clickeado
    const clickedEl = svgElement.querySelector(`#${controlId}`);
    if (clickedEl) {
      clickedEl.classList.add('hw-highlight-press');
    }

    // Buscar si es un pad numérico (hw-pad-1 .. hw-pad-16)
    let info = HARDWARE_CONTROL_INFO[controlId];
    if (!info && controlId.startsWith('hw-pad-')) {
      const padNum = controlId.replace('hw-pad-', '');
      info = {
        nombre: `Pad de Matriz #${padNum}`,
        subtitulo: 'Pads de Silicona con Acelerometría Peak-Hold (800 Hz)',
        icono: '🟩',
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
        <strong>💡 Modo Exploración:</strong> Haz clic en cualquier otro control del dibujo o escribe una función en el buscador superior para ver cómo se ejecuta.
      </div>
    `;
  }

  // Inicializar al cargar el DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSimulator);
  } else {
    initSimulator();
  }
})();
