import { useEffect, useState } from 'react';

interface State<T> {
  data?: T;
  error?: Error;
}

export function useFetch<T = unknown>(
  url?: string,
  options?: RequestInit,
): State<T> {
  const initState: State<T> = {
    error: undefined,
    data: undefined,
  };

  const [state, setState] = useState<State<T>>(initState);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = (await response.json()) as T;
        setState({ error: undefined, data });
      } catch (error) {
        setState((prev) => ({
          error,
          data: prev.data,
        }));
      }
    };

    // eslint-disable-next-line no-void
    void fetchData();
  }, [url]);

  return state;
}
