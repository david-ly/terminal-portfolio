import React, { useEffect, useState } from 'react';
import { Theme } from '../interfaces/theme';
import themes from '../../themes.json';
import config from '../../config.json';

export interface ThemeContextType {
  setTheme: (name: string) => string;
  theme: Theme;
}
const ThemeContext = React.createContext<ThemeContextType>(null);
export const useTheme = () => React.useContext(ThemeContext);

interface Props {
  children: React.ReactNode;
}
export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, _setTheme] = useState<Theme>(themes[0]);

  const setTheme = (name: string) => {
    const index = themes.findIndex((the) => the.name.toLowerCase() === name);
    if (index === -1) return notFound(name);

    _setTheme(themes[index]);
    localStorage.setItem('theme', name);

    return `Theme ${themes[index].name} set successfully!`;
  };

  useEffect(() => {
    const local_theme = localStorage.getItem('theme');
    setTheme(config.theme || local_theme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

function notFound(name: string) {
  return `Theme '${name}' not found. Try 'theme ls' to see the list of available themes.`;
}
