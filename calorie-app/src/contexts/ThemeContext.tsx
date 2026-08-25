import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

type ThemeColors = {
  background: string;
  card: string;
  surface: string;
  text: string;
  secondaryText: string;
  primary: string;
  border: string;
};

const lightColors: ThemeColors = {
  background: '#F7FAFC',
  card: '#FFFFFF',
  surface: '#E8F4FF',
  text: '#102A43',
  secondaryText: '#627D98',
  primary: '#1787D4',
  border: '#E5EEF5',
};

const darkColors: ThemeColors = {
  background: '#0F1720',
  card: '#17212B',
  surface: '#22313F',
  text: '#F1F5F9',
  secondaryText: '#94A3B8',
  primary: '#45A8E8',
  border: '#2D3B48',
};

type ThemeContextType = {
  isDark: boolean;
  colors: ThemeColors;
  toggleTheme: () => void;
};

const ThemeContext =
  createContext<ThemeContextType | undefined>(
    undefined
  );

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({
  children,
}: ThemeProviderProps) {
  const [isDark, setIsDark] =
    useState(false);

  const colors = isDark
    ? darkColors
    : lightColors;

  const toggleTheme = () => {
    setIsDark((current) => !current);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        colors,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context =
    useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'useTheme debe utilizarse dentro de ThemeProvider'
    );
  }

  return context;
}