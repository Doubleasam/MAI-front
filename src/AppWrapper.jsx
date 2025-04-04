import { useEffect } from 'react';
import useThemeStore from './Store/useThemeStore';
import App from './App';
function AppWrapper() {
  const { darkMode } = useThemeStore();

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [darkMode]);

  return <App />
}

export default AppWrapper;
