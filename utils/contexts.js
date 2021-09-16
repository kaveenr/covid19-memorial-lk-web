import { createContext } from "react";

const ThemeContext = createContext(isDark ? 'dark' : 'light');

export default ThemeContext;