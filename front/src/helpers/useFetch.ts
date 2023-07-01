import { useEffect, useState, useCallback } from 'react'; // dodaj useCallback
import axios from 'axios';
import { formatError } from './errorUtils';
import { baseUrl } from '../const/baseUrl';

export const useFetch = (url: string, query?: string) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = query ? await axios.get(baseUrl + url + query) : await axios.get(baseUrl + url);
            setData(res.data);
        } catch (err) {
            setError(err);
            formatError(err);
        } finally {
            setLoading(false);
        }
    }, [url, query]);
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
};
