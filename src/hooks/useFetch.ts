import { useEffect, useState } from "react";

export type FetchOptions<T> = {
  retry: boolean;
  isEnabled: boolean;
  deps: unknown[];
  onSuccess?: (data: T) => void
}
export const useFetch = <T>(promise: () => Promise<T>, options: Partial<FetchOptions<T>> = {}) => {
  const opts: FetchOptions<T> = {
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
        .catch((err) => setError(err))
        .finally(() => {
          setIsLoading(false);
          if (!opts.retry) {
            setEnabled(false);
          }
        });
    }, [enabled, isLoading, promise, options.retry]);

    return {
      isLoading,
      setEnabled: (isQueryEnabled: boolean) => setEnabled(isQueryEnabled),
      isError: !!error,
      error: error,
      data: data
    };
  }
;
