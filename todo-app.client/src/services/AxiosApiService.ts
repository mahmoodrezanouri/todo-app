import axios, { AxiosError } from 'axios';
import { IApiService } from '../interfaces/IApiService';
import { parseErrorMessage } from '../utils/utility';

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
    delete: async <T>(url: string, data?: object): Promise<T> => {
        try {
            const response = await axios.delete<T>(url, data);
            return response.data;
        } catch (error) {
            throwErrorMessage(error, 'Failed to delete task');
        }
    },
    put: async <T>(url: string, data?: object): Promise<T> => {
        try {
            const response = await axios.put<T>(url, data);
            return response.data;
        } catch (error) {
            throwErrorMessage(error, 'Failed to update task');
        }
    }

};
const throwErrorMessage = (error: any, defualtMessage: string): string => {
    
    const axiosError = error as AxiosError;
    defualtMessage = parseErrorMessage(axiosError.response?.data);

    throw new Error(defualtMessage);

};


export default AxiosApiService;
