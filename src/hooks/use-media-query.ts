import { useEffect, useState } from 'react';

/**
 * @description 주어진 미디어 쿼리 문자열의 분석 결과를 반환하는 hook
 */
export function useMediaQuery(query: string): boolean {
  // eslint-disable-next-line no-shadow
  const getMatches = (query: string): boolean => {
    // Gatsby는 빌드 중엔 window 객체가 없기에 방어 코드 작성
    if (typeof window !== `undefined`) {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  function handleChange() {
    setMatches(getMatches(query));
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    handleChange();

    matchMedia.addEventListener(`change`, handleChange);

    return () => {
      matchMedia.removeEventListener(`change`, handleChange);
    };
  }, [query]);

  return matches;
}
