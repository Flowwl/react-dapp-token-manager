import { useEffect, useState } from "react";

type Options = {
  retry: boolean;
  isEnabled: boolean;
  deps: unknown[];
}
export const useFetch = <T>(promise: () => Promise<T>, options: Partial<Options> = {}) => {
  const opts: Options = {
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
