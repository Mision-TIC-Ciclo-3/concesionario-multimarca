import { createContext, useContext } from 'react';

export const DarkModeContext = createContext(null);

export const useDarkMode = () => {
  return useContext(DarkModeContext);
};
