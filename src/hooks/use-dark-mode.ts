import {
  useIsomorphicLayoutEffect,
  useLocalStorage,
  useMediaQuery,
  useUpdateEffect,
} from '@/hooks';

const COLOR_SCHEME_QUERY = `(prefers-color-scheme: dark)`;

interface UseDarkModeOutput {
  toggle: () => void;
}

/**
 * @description dark mode hook
 */
export function useDarkMode(defaultValue?: boolean): UseDarkModeOutput {
  const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY);
  const [isDarkMode, setDarkMode] = useLocalStorage<boolean>(
    `jm-wordle-theme`,
    defaultValue ?? isDarkOS ?? false,
  );

  // OS에서 다크모드를 선호하는지 확인합니다.
  useUpdateEffect(() => {
    setDarkMode(isDarkOS);
  }, [isDarkOS]);

  useIsomorphicLayoutEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add(`dark`);
    } else {
      document.documentElement.classList.remove(`dark`);
    }
  }, [isDarkMode]);

  return {
    toggle: () => setDarkMode((prev) => !prev),
  };
}
