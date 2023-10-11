import { useEffect, useState } from "react";

export const useFetch = <T>(promise: Promise<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      promise
        .then((res) => {
          setData(res)
        })
        .catch((err) => setError(err))
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [promise]);

  return {
    isLoading,
    isError: !!error,
    error: error,
    data: data
  };
};
