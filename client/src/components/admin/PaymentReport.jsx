import React, { useEffect, useState } from 'react'
import './Admin.scss'
import { GetPayment } from '../../function/Payment';
function PaymentReport() {

    const [payments, setPayments] = useState([]);

    const fetchPayments = async () => {
        const res = await GetPayment();
        setPayments(res);
    }
    useEffect(() => {
        fetchPayments();
    }, [])

    return (
        <div className='payment-report'>
            <table className='table table-hover' >
                <tr className='manage-title'>
                    <th>Hostel Name</th>
                    <th>Owner Email</th>
                    <th>Check IN</th>
                    <th>Duration</th>
                    <th>Total Price(Rs.)</th>
                </tr>
                {
                    payments && payments.map(payment => (
                        <tr className='payment-info' key={payment._id} >
                            <td>{payment.hostel}</td>
                            <td>{payment.email}</td>
                            <td>{payment.startingDate.slice(0, 10)}</td>
                            <td>{payment.duration}</td>
                            <td>{payment.totalPrice}</td>
                        </tr>
                    ))
                }
            </table>
        </div>
    )
}

export default PaymentReport