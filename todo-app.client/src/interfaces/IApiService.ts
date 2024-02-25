export interface IApiService {
    get: <T>(url: string, params?: object) => Promise<{ data: T, totalPages: number }>;
    post: <T>(url: string, data?: object) => Promise<T>;
}