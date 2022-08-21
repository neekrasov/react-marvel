import {useState, useCallback} from 'react';

export const useHttp = () => {
    const [isLoaded, setLoadedStatus] = useState(true);
    const [isError, setErrorStatus] = useState(false);

    const request = useCallback(
                            async (url, 
                                    method ='GET', 
                                    body = null, 
                                    headers = {
                                        'Content-type': 'application/json'}
                                    ) => {
        try {
            setLoadedStatus(false);
            setErrorStatus(false);
            const response = await fetch(url, {method, body, headers});

            if (!response.ok)  throw new Error(`Not fetch, status code ${response.status}`)
            
            const data = await response.json();
            setLoadedStatus(true);

            return data;

        } catch (e) {
            setLoadedStatus(true);
            setErrorStatus(true);
            throw e;
        }
    }, [])

    const clearError = useCallback(() => setErrorStatus(false), [])

    return {isLoaded, isError, request, clearError}
}