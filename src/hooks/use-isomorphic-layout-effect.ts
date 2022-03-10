import { useEffect, useLayoutEffect } from 'react';

/**
 * @description window 객체 존재 여부에 따라 훅 실행
 * Gatsby는 빌드 중에는 브라우저 환경이 아닌 Node 환경에서 빌드를 하기에 이때, window 객체가 존재하지 않음
 */
export const useIsomorphicLayoutEffect =
  typeof window !== `undefined` ? useLayoutEffect : useEffect;
