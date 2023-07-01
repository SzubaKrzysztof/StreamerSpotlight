export function formatError(error: any): string {
    if (error.response) {

        return `Error: ${error.response.status} - ${error.response.data}`;
    } else if (error.request) {

        return `Error: No response received. ${error.message}`;
    } else {

        return `Error: ${error.message}`;
    }
}
