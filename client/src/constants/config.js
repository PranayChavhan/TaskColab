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
    getUsers: { url: '/auth/users', method: 'GET', contentType: 'application/json' },
    userSignup: { url: '/auth/register', method: 'POST', contentType: 'application/json' },
    userLogin: { url: '/auth/login', method: 'POST', contentType: 'application/json' },
    verifyOtp: { url: '/auth/verifyotp', method: 'POST', contentType: 'application/json' },
    forgotPass: { url: '/auth/forgotPassword', method: 'POST', contentType: 'application/json' },
    resetPassword: { url: '/auth/resetpassword', method: 'POST' },
    addProject: { url: '/project/add-project', method: 'POST', contentType: 'multipart/form-data' },
    getProjects: { url: '/project/get-projects', method: 'GET', contentType: 'application/json' },
    getProjectDetails: { url: '/project/get-project/:id', method: 'GET', contentType: 'application/json', params: true },
    addMember: { url: '/project/add-member', method: 'POST', contentType: 'application/json' }

}