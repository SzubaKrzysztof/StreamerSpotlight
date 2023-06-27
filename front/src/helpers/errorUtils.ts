export function formatError(error: any): string {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return `Error: ${error.response.status} - ${error.response.data}`;
    } else if (error.request) {
        // The request was made but no response was received
        return `Error: No response received. ${error.message}`;
    } else {
        // Something happened in setting up the request that triggered an Error
        return `Error: ${error.message}`;
    }
}
