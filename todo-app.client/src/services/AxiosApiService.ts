import axios, { AxiosError } from 'axios';
import { IApiService } from '../interfaces/IApiService';


const AxiosApiService: IApiService = {

    get: async <T>(url: string, data?: object): Promise<T> => {

        try {
        
            const response = await axios.get<T>(url, data);
            return response;
        
        }
        catch (error) {

            const axiosError = error as AxiosError;

            console.error('Axios Error:', axiosError.message);
            console.error('Axios Config:', axiosError.config);
            console.error('Axios Response Data:', axiosError.response?.data);
            throw new Error('Failed to fetch tasks');
        }

     
    },
    post: async <T>(url: string, data?: object): Promise<T> => {

        const response = await axios.post<T>(url, data);
        return response.data;
    },

};


export default AxiosApiService;