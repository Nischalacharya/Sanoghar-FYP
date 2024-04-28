import * as api from '../api/User'

export const GetUser = async () => {
    try {
        const { data } = await api.GetUser();
        return data
    } catch (error) {
        return (error.response.data)
    }
}

export const SignupUser = async (user) => {
    try {
        const { data } = await api.SignupUser(user);
        return data
    } catch (error) {
        return (error.response.data)
    }
}

export const LoginUser = async (user) => {
    try {
        const { data } = await api.LoginUser(user);
        return data
    } catch (error) {
        return (error.response.data)
    }
}

export const forgotPassword = async (user) => {
    try {
        const { data } = await api.ForgotPassword(user);
        return data
    } catch (error) {
        return (error.response.data)
    }
}

export const resetPassword = async (user) => {
    try {
        const { data } = await api.ResetPassword(user);
        return data
    } catch (error) {
        return (error.response.data)
    }
}

export const EditUser = async (user) => {
    try {
        const { data } = await api.editUser(user);
        return data
    } catch (error) {
        return (error.response.data)
    }
}

export const DeleteUser = async (userId) => {
    try {
        const { data } = await api.deleteUser(userId);
        return data
    } catch (error) {
        return (error.response.data)
    }
}

export const LogoutUser = async () => {
    try {
        const { data } = await api.logoutUser();
        return data
    } catch (error) {
        return (error.response.data)
    }
}