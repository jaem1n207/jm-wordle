/* eslint-disable no-console */
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { useEventListener } from '@/hooks';

declare global {
  interface WindowEventMap {
    'local-storage': CustomEvent;
  }
}

type SetValue<T> = Dispatch<SetStateAction<T>>;

/**
 * @description 페이지 새로 고침 후에도 유지되도록 로컬 저장소로 상태를 유지하는 hook
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, SetValue<T>] {
  const readValue = useCallback((): T => {
    if (typeof window === `undefined`) {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (parseJSON(item) as T) : initialValue;
    } catch (error) {
      console.warn(
        `로컬스토리지에서 “${key}”를 읽어드리는 데 실패했어요:`,
        error,
      );
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue: SetValue<T> = useCallback(
    (value) => {
      if (typeof window === `undefined`) {
        console.warn(
          `클라이언트 환경이 아닐 때 로컬스토리지에 "${key}"을(를) 저장하려 해요`,
        );
      }

      try {
        const newValue = value instanceof Function ? value(storedValue) : value;

        window.localStorage.setItem(key, JSON.stringify(newValue));

        setStoredValue(newValue);

        window.dispatchEvent(new Event(`local-storage`));
      } catch (error) {
        console.warn(
          `로컬스토리지에 “${key}”를 등록하는 데 실패했어요:`,
          error,
        );
      }
    },
    [key, storedValue],
  );

  useEffect(() => {
    setStoredValue(readValue());
  }, []);

  const handleStorageChange = useCallback(() => {
    setStoredValue(readValue());
  }, [readValue]);

  useEventListener(`storage`, handleStorageChange);

  useEventListener(`local-storage`, handleStorageChange);

  return [storedValue, setValue];
}

function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === `undefined` ? undefined : JSON.parse(value ?? ``);
  } catch {
    console.log(`parsing error on`, { value });
    return undefined;
  }
}
