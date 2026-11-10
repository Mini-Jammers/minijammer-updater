@echo off
echo =======================================================
echo   MINIJAMMER XXL - GENERADOR DE BINARIOS WEB FLASHER
echo =======================================================
echo.

set PYTHON_EXE=%USERPROFILE%\.platformio\penv\Scripts\python.exe
set ESPTOOL_PY=%USERPROFILE%\.platformio\packages\tool-esptoolpy\esptool.py
set PIO_EXE=%USERPROFILE%\.platformio\penv\Scripts\pio.exe
set MAESTRO_DIR=..\minijammer_xxl_maestro
set ESCLAVO_DIR=..\minijammer_xxl_esclavo
set BOOT_APP0=%USERPROFILE%\.platformio\packages\framework-arduinoespressif32\tools\partitions\boot_app0.bin

if not exist "%PYTHON_EXE%" (
    echo [ERROR] No se encontro Python de PlatformIO en %PYTHON_EXE%
    pause
    exit /b 1
)

echo [1/4] Compilando firmware Maestro (ESP32-S3)...
"%PIO_EXE%" run -d "%MAESTRO_DIR%"
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Fallo la compilacion del Maestro.
    pause
    exit /b 1
)

echo.
echo [2/4] Unificando firmware Maestro para la Web...
"%PYTHON_EXE%" "%ESPTOOL_PY%" --chip esp32s3 merge_bin -o "%~dp0firmware_maestro.bin" --flash_mode dio --flash_size 16MB 0x0 "%MAESTRO_DIR%\.pio\build\esp32-s3-devkitc-1\bootloader.bin" 0x8000 "%MAESTRO_DIR%\.pio\build\esp32-s3-devkitc-1\partitions.bin" 0x10000 "%MAESTRO_DIR%\.pio\build\esp32-s3-devkitc-1\firmware.bin"
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Hubo un problema al unificar el binario del Maestro.
    pause
    exit /b 1
)

echo.
echo [3/4] Compilando firmware Esclavo (ESP32)...
"%PIO_EXE%" run -d "%ESCLAVO_DIR%"
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Fallo la compilacion del Esclavo.
    pause
    exit /b 1
)

echo.
echo [4/4] Unificando firmware Esclavo para la Web...
"%PYTHON_EXE%" "%ESPTOOL_PY%" --chip esp32 merge_bin -o "%~dp0firmware_esclavo.bin" --flash_mode dio --flash_size 4MB 0x1000 "%ESCLAVO_DIR%\.pio\build\esp32dev\bootloader.bin" 0x8000 "%ESCLAVO_DIR%\.pio\build\esp32dev\partitions.bin" 0xe000 "%BOOT_APP0%" 0x10000 "%ESCLAVO_DIR%\.pio\build\esp32dev\firmware.bin"
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Hubo un problema al unificar el binario del Esclavo.
    pause
    exit /b 1
)

echo.
echo [5/5] Generando paquete unificado para MicroSD (MINIJAMMER_UPDATE.BIN)...
"%PYTHON_EXE%" "%~dp0..\pack_firmware.py"
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Hubo un problema al empaquetar MINIJAMMER_UPDATE.BIN.
    pause
    exit /b 1
)

echo.
echo =======================================================
echo   [EXITO] Binarios generados correctamente:
echo   - %~dp0firmware_maestro.bin (Metodo 2: Web USB)
echo   - %~dp0firmware_esclavo.bin (Metodo 3: Rescate)
echo   - %~dp0MINIJAMMER_UPDATE.BIN (Metodo 1: MicroSD)
echo =======================================================
pause
