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
    };
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<null | Error>(null);
    const [data, setData] = useState<T | null>(null);
    const [enabled, setEnabled] = useState<boolean>(opts.isEnabled);
    const refetch = () => {
      setEnabled(true);
      setData(null);
      setError(null);
    };
    useEffect(() => {
      if (data && !enabled) {
        refetch();
      }
    }, [...opts.deps]);

    useEffect(() => {
      if (opts.refetchInterval) {
        const interval = setInterval(() => {
          refetch();
        }, opts.refetchInterval);
        return () => clearInterval(interval);
      }
    }, [opts.refetchInterval]);

    useEffect(() => {
      if (!enabled || isLoading || data || error) {
        return;
      }
      setIsLoading(true);
      promise()
        .then((res) => {
          setData(res);
          opts.onSuccess && opts.onSuccess(res);
        })
        .catch((err) => {
          setError(err);
          opts.onError && opts.onError(err);
        })
        .finally(() => {
          setIsLoading(false);
          if (!opts.retry) {
            setEnabled(false);
          }
        });
    }, [enabled, isLoading, promise, opts, data]);

    return {
      isLoading,
      refetch,
      setEnabled: (isQueryEnabled: boolean) => setEnabled(isQueryEnabled),
      isError: !!error,
      error: error,
      data: data
    };
  }
;
