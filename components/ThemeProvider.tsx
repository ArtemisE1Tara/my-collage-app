// app/components/ThemeProvider.tsx
'use client';

import { useState, useEffect } from 'react';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for the user's preferred theme
  useEffect(() => {
    const darkTheme = localStorage.getItem('theme') === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(darkTheme);
    document.documentElement.classList.toggle('dark', darkTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newTheme);
  };

  return (
    <div>
      <button onClick={toggleTheme} className="p-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded">
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      {children}
    </div>
  );
};
