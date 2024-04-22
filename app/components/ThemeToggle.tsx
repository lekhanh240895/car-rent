'use client';

import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button
      className="mt-16 rounded-md bg-black px-4 py-2 font-semibold text-white dark:bg-white dark:text-black"
      onClick={() => {
        setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
      }}
    >
      Change Theme
    </button>
  );
}
