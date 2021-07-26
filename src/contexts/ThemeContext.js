import { createContext, useState } from "react";

export const ThemeContext = createContext();

function ThemeContextProvider(props) {
  const defaultTheme = {
    fontColor:     '#707070',
    background:    '#FFFFFF',
    accent:        '#000000',
    primary:       '#2196F3',
    primaryDarker: '#0D47A1',
    success:       '#4CAF50',
    warning:       '#FF9800',
    error:         '#F44336'
  }

  const [theme] = useState(defaultTheme);

  return (
    <ThemeContext.Provider value={{theme}}>
      { props.children }
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider;