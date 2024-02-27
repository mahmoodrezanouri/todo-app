export  const parseErrorMessage = (responseData: any): string => {
    if (responseData && typeof responseData === 'object') {
        const errorMessages: string[] = [];

        for (const prop in responseData) {
            if (Array.isArray(responseData[prop])) {
                errorMessages.push(responseData[prop].join('<br />'));
            }
        }

        return errorMessages.join('<br />');
    }
    return '';
};