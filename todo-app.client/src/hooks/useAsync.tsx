import { useState } from 'react';

type UseAsyncReturnType<T> = {
    loading: boolean;
    data: T | null;
    error: Error | null;
    execute: (...args: any[]) => Promise<T | void>;
};

const useAsync = <T,>(asyncFn: (...args: any[]) => Promise<T>): UseAsyncReturnType<T> => {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const execute = async (...args: any[]): Promise<T | void> => {
        try {
            setLoading(true);
            const result = await asyncFn(...args);
            setData(result);
            return result;
        } catch (error) {
            setError(error as Error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, data, error, execute };
};

export default useAsync;

