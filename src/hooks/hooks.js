import { useState, useEffect } from "react";
import { API } from '../services/api-service';

function useFetch(method) {
    const token = localStorage.getItem('token');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchData() {
            setLoading(false);
            setError();
            console.log(token);
            const data = await API[method](token)
                .then(res => res.json())
                .catch(err => setError(err));
            setData(data);
            // setLoading(false);
        }
        fetchData();
    }, [method, token]);
    return [data, loading, error];
}
export { useFetch };