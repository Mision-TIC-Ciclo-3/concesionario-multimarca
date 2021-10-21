import { useDarkMode } from 'context/darkMode';
import React from 'react';

const Index = () => {
  const { darkMode } = useDarkMode();
  return (
    <div className={`flex h-full bg-gray-${darkMode ? '900' : '50'}`}>
      <img
        alt='foto ferrari'
        src='https://bucket-de-prueba-daniel.s3.amazonaws.com/media-concesionario/ferrari.jpg'
      />
    </div>
  );
};

export default Index;
