import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect';
import { useLocalStorage } from './use-local-storage';
import { useMediaQuery } from './use-media-query';
import { useUpdateEffect } from './use-update-effect';

const COLOR_SCHEME_QUERY = `(prefers-color-scheme: dark)`;

interface UseDarkModeOutput {
  toggle: () => void;
}

/**
 * @description dark mode 훅
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
