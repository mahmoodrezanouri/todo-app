import axios, { AxiosError } from 'axios';
import { IApiService } from '../interfaces/IApiService';

const AxiosApiService: IApiService = {

    get: async <T>(url: string, params?: object): Promise<T> => {
        try {
            const response = await axios.get<T>(url, params );
            return response as T;

        } catch (error) {
           throwErrorMessage(error, 'Failed to fetch data');
        }
    },
    post: async <T>(url: string, data?: object): Promise<T> => {
        try {
            const response = await axios.post<T>(url, data);
            return response.data;
        } catch (error) {
            throwErrorMessage(error, 'Failed to add task');
        }
    },

};
const throwErrorMessage = (error: any, defualtMessage: string): string => {
    
    const axiosError = error as AxiosError;
    defualtMessage = parseErrorMessage(axiosError.response?.data);

    throw new Error(defualtMessage);

};

const parseErrorMessage = (responseData: any): string => {
    if (responseData && typeof responseData === 'object') {
        const errorMessages: string[] = [];

        for (const prop in responseData) {
            if (Array.isArray(responseData[prop])) {
                errorMessages.push(responseData[prop].join(' '));
            }
        }

        return errorMessages.join(' ');
    }
    return '';
};
export default AxiosApiService;
