import { DependencyList, EffectCallback, useEffect } from 'react';
import { useIsFirstRender } from './use-is-first-render';

/**
 * @description deps가 업데이트되었을 때만 effect가 실행되도록 하는 hook (첫 마운트 때 실행 x)
 */
export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
  const isFirst = useIsFirstRender();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!isFirst) {
      return effect();
    }
  }, deps);
}
