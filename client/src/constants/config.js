// API NOTIFICATION MESSAGES
export const API_NOTIFICATION_MESSAGES = {
    loading: {
        title: "Loading...",
        message: "Data is being loaded. Please wait"
    },
    success: {
        title: "Success",
        message: "Data successfully loaded"
    },
    requestFailure: {
        title: "Error!",
        message: "An error occur while parsing request data"
    },
    responseFailure: {
        title: "Error!",
        message: "An error occur while fetching response from server. Please try again"
    },
    networkError: {
        title: "Error!",
        message: "Unable to connect to the server. Please check internet connectivity and try again."
    }
}


export const SERVICE_URLS = {
    userSignup: { url: '/auth/register', method: 'POST' },
    userLogin: { url: '/auth/login', method: 'POST' },
    verifyOtp: { url: '/auth/verifyotp', method: 'POST' },
    forgotPass: { url: '/auth/forgotPassword', method: 'POST' },
    resetPassword: { url: '/auth/resetpassword', method: 'POST' },
    addProject: { url: '/project/add-project', method: 'POST' },
    getProjects: { url: '/project/get-projects', method: 'GET' }
}