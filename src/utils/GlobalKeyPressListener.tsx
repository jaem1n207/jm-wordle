import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

import type { unionKey } from '@/types/key';

export interface GlobalKeypressListenerProps {
  keyCode: unionKey;
  handler(event: KeyboardEvent): void;
  keyEvent?: KeyEvent;
}

type KeyEvent = 'keydown' | 'keyup';

export function GlobalKeypressListener({
  keyCode,
  handler,
  keyEvent = `keyup`,
}: GlobalKeypressListenerProps) {
  const tracked = useRef({ handler, keyCode });

  useLayoutEffect(() => {
    tracked.current = { handler, keyCode };
  }, [handler, keyCode]);

  const handleKeyEvent = useCallback((event: KeyboardEvent) => {
    // eslint-disable-next-line no-shadow
    const { handler, keyCode } = tracked.current;
    if (event.keyCode === keyCode) {
      handler(event);
    }
  }, []);

  useEffect(() => {
    document.addEventListener(keyEvent, handleKeyEvent);
    return () => {
      document.removeEventListener(keyEvent, handleKeyEvent);
    };
  }, [keyEvent, handleKeyEvent]);

  return null;
}
