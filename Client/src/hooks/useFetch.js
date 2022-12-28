import axios from 'axios';
import { useEffect, useState } from 'react';

export const useFetch = (url, params = {}, ignore = false) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (ignore) {
      setIsLoading(false);
      setIsError(false);
      setError(null);
      setData(null);
      return;
    }

    setIsLoading(true);
    let source = axios.CancelToken.source();

    const getData = async () => {
      try {
        const req = await axios.get(url, {
          cancelToken: source.token,
          params
        });

        const response = req.data;

        setData(response);
      } catch (err) {
        if (!err.code === 'ERR_CANCELLED' || err.response?.data?.status === 404 || err.response?.data?.status === 400) {
          setIsError(true);
          setError(err);
          return;
        }
      } finally {
        setIsLoading(false);
      }
    };
    getData();

    return () => {
      source.cancel();
    };
    // eslint-disable-next-line
  }, [url]);

  return { data, isLoading, isError, error };
};
