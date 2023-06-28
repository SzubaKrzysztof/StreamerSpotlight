import { useEffect, useState } from 'react';
import axios from 'axios';
import { formatError } from './errorUtils';
import { baseUrl } from '../const/baseUrl';

export const useFetch = (url: string, query = {}) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    const fetchData = async () => {
        try {
            const res = await axios.get(baseUrl + url, { params: query });
            setData(res.data);
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
