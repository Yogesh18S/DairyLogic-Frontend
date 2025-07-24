// Utility function to extract error messages from Axios errors
export const getErrorMessage = (error) => {
    if (error.response) {
      // Server responded with a non-2xx status code
      return error.response.data.message || error.response.data.error || 'Something went wrong. Please try again later.';
    } else if (error.request) {
      // The request was made but no response was received
      return 'No response from server. Please check your internet connection.';
    } else {
      // Something else went wrong (request setup)
      return 'An unexpected error occurred.';
    }
  };