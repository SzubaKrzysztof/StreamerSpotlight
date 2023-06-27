import { useEffect, useState } from 'react';
import { formatError } from './errorUtils';
import { baseUrl } from '../const/baseUrl';

export const useFetch = (url: string) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    const fetchData = async () => {
        try {
            const res = await fetch(`${baseUrl}` + `${url}`);
            const json = await res.json();
            setData(json);
        } catch (err) {
            setError(err);
            formatError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { data, loading, error };
};
