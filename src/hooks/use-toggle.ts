import { useCallback, useState } from 'react';

/**
 * @description stateful value를 반환하고 이를 toggle하기 위한 메모화 된 함수 반환
 */
export function useToggle(initialValue: boolean) {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    toggle: useCallback(() => setValue((prev) => !prev), []),
    setTrue: useCallback(() => setValue(true), []),
    setFalse: useCallback(() => setValue(false), []),
  };
}
