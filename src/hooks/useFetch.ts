import { useEffect, useState } from "react";

type Options = {
  retry?: boolean;
  isEnabled: boolean;
}
export const useFetch = <T>(promise: () => Promise<T>, options: Options = { isEnabled: true, retry: false }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<null | Error>(null);
    const [data, setData] = useState<T | null>(null);
    const [enabled, setEnabled] = useState<boolean>(options.isEnabled);

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
          if (!options.retry) {
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
