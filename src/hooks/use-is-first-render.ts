import { useRef } from 'react';

/**
 * @description 한 번만 마운트 되었는지 체크해주는 hook
 * @return boolean
 */
export function useIsFirstRender(): boolean {
  const isFirst = useRef(true);

  if (isFirst.current) {
    isFirst.current = false;

    return true;
  }

  return isFirst.current;
}
