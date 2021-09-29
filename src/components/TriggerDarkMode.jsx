import React from 'react';
import { useDarkMode } from 'context/darkMode';

const TriggerDarkMode = () => {
  const { darkMode, setDarkMode } = useDarkMode();
  return (
    <button
      onClick={() => {
        setDarkMode(!darkMode);
      }}
    >
      {darkMode ? 'Desactivar ' : 'Activar'} modo dark
    </button>
  );
};

export default TriggerDarkMode;
