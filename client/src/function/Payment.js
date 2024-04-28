import * as api from '../api/Payment';

export const GetPayment = async () => {
    try {
        const { data } = await api.GetPayment();
        return data
    } catch (error) {
        console.log(error)
    }
}

export const CreatePayment = async (payment) => {
    try {
        const { data } = await api.CreatePayment(payment)
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const GetPaymentByHostel = async (hostel) => {
    try {
        const { data } = await api.GetPaymentByHostel(hostel)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const VerifyPayment = async (payment) => {
    try {
        const { data } = await api.VerifyPayment(payment)
        return data
    } catch (error) {
        console.log(error)
    }
}