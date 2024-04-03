import React, { useEffect, useRef } from 'react';

const ThreeDImage = ({ imageSrc }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !imageSrc) return;

    // Creamos un nuevo EngineContainer directamente aquí
    const engineContainer = new window.EngineContainer({
      apiToken: 'your-api-token',
      catalogueApiEndpoint: 'your-catalogue-api-endpoint',
      aiConfig: {
        // Configuración de IA si es necesaria
      },
      resourceManager: {
        // Configuración del administrador de recursos si es necesaria
      },
      unitOfMeasurement: 'your-unit-of-measurement',
      tenantId: 'tokenSigningKey',

      // imageSrc: imageSrc, // <- No es necesario pasar la imagen aquí
    });

    engineContainer.onEngineReady((engine) => {
      engine.executeCommand('load3DImage', { imageSrc: imageSrc });
    });

    engineContainer.setUserInteraction(true); // Permitir interacción del usuario

    // Renderizar el canvas del motor en el elemento DOM referenciado
    canvasRef.current.appendChild(engineContainer.renderCanvas());

    return () => {
      // Limpiar cualquier recurso al desmontar el componente
      engineContainer.dispose();
    };
  }, [imageSrc]);

  return <div ref={canvasRef} />;
};

export default ThreeDImage;
