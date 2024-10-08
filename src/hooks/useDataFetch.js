import { useState, useEffect } from 'react';

const useDataFetch =(url) =>{
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const res = await fetch(url);
                if(!res.ok){
                    throw new Error('Network response not ok')
                }
                const result = await res.json();
                setData(result);
            } catch(error){
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [url]);

    return {data, loading, error}
}

export default useDataFetch;