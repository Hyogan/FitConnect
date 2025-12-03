import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";
import { DarkTheme, LightTheme } from "../theme/themes";

const ThemeContext = createContext({
  theme: LightTheme,
  toggleTheme: () => {},
});

export const ThemeProviderApp = ({ children }: any) => {
  const systemColor = Appearance.getColorScheme();
  const [theme, setTheme] = useState(
    systemColor === "dark" ? DarkTheme : LightTheme
  );

  const toggleTheme = () => {
    setTheme((prev) => (prev.dark ? LightTheme : DarkTheme));
  };

  // auto sync with system
  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme === "dark" ? DarkTheme : LightTheme);
    });
    return () => listener.remove();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeApp = () => useContext(ThemeContext);
