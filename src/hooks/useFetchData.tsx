import { useEffect, useState } from "react";

export const useFetchData = <T,>(
  fetchFn: () => Promise<T[]>,
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        setLoading(true);
        const res = await fetchFn();
        if (isMounted) setData(res);
      } catch (err) {
        console.error(err);
        setError("Error cargando datos");
      } finally {
        setLoading(false);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [fetchFn]);

  return { data, loading, error, setData };
};
