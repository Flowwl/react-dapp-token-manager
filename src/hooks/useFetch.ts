import { useEffect, useState } from "react";

export type FetchOptions<T, Err = Error> = {
  retry: boolean;
  isEnabled: boolean;
  deps: unknown[];
  refetchInterval?: number;
  onSuccess?: (data: T) => void
  onError?: (error: Err) => void
}
export const useFetch = <T, Err = Error>(promise: () => Promise<T>, options: Partial<FetchOptions<T, Err>> = {}) => {
  const opts: FetchOptions<T, Err> = {
    isEnabled: true,
    retry: false,
    deps: [],
    ...options
  }
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<null | Error>(null);
    const [data, setData] = useState<T | null>(null);
    const [enabled, setEnabled] = useState<boolean>(opts.isEnabled);

    useEffect(() => {
      if (data && !enabled) {
        setEnabled(true);
        setData(null);
      }
    }, [...opts.deps])

  useEffect(() => {
    if (opts.refetchInterval) {
      const interval = setInterval(() => {
        setEnabled(true);
        setData(null);
      }, opts.refetchInterval);
      return () => clearInterval(interval);
    }
  }, [opts.refetchInterval]);

    useEffect(() => {
      if (!enabled) {
        return;
      }
      if (isLoading) {
        return;
      }

      if (data) {
        return;
      }
      setIsLoading(true);
      promise()
        .then((res) => {
          setData(res);
          opts.onSuccess && opts.onSuccess(res);
        })
        .catch((err) => {
          setError(err)
          opts.onError && opts.onError(err);
        })
        .finally(() => {
          setIsLoading(false);
          if (!opts.retry) {
            setEnabled(false);
          }
        });
    }, [enabled, isLoading, promise, options.retry, data, opts]);

    return {
      isLoading,
      setEnabled: (isQueryEnabled: boolean) => setEnabled(isQueryEnabled),
      isError: !!error,
      error: error,
      data: data
    };
  }
;
