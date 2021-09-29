import { useDarkMode } from 'context/darkMode';
import React from 'react';

const Index = () => {
  const { darkMode } = useDarkMode();
  return (
    <div className={`flex h-full bg-gray-${darkMode ? '900' : '50'}`}>
      Contenido Landing Concesionario
    </div>
  );
};

export default Index;
