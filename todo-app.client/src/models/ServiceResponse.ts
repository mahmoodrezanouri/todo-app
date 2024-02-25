interface ServiceResponse<T> {
    data?: T;      
    error?: Error; 
}

export default ServiceResponse;