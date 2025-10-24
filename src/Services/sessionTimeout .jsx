import React, { useEffect, useRef } from 'react';
import { TouchableWithoutFeedback, Keyboard, View } from 'react-native';

export default function SessionTimeout({ children, onTimeout }) {
  const timeoutRef = useRef(null);

  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      // Acción cuando se vence el tiempo
      onTimeout();
    }, 20000); // Duración de 20 segundos según tu solicitud

    // Logging para depuración
    console.log('Timer reseteado. Timeout en 20 segundos.');
  };

  const handleUserInteraction = () => {
    resetTimer();
  };

  useEffect(() => {
    resetTimer();

    // Escucha interacciones del teclado
    const keyboardListener = Keyboard.addListener('keyboardDidShow', resetTimer);

    return () => {
      // Limpia el temporizador y el listener al desmontar
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      keyboardListener.remove();
    };
  }, []); // ¡FIX APLICADO AQUÍ! Array de dependencias vacío para ejecución única.

  return (
    // FIX APLICADO: Estructura View > TouchableWithoutFeedback para prevenir la filtración de texto en interacciones.
    <View style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={handleUserInteraction} onTouchStart={handleUserInteraction}>
        {/* Usamos un View para que TouchableWithoutFeedback herede el flex: 1 correctamente. */}
        <View style={{ flex: 1 }}>
          {children}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
