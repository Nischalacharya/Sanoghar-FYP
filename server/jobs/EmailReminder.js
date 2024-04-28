import cron from "node-cron";
import Payment from "../model/Payment.js";
import { sendPaymentReminderEmail } from "../controller/Payment.js";

const emailRemainder = async () => {
    const today = new Date();

    const payments = await Payment.find();

    const SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 60 * 1000;

    payments.forEach((payment) => {
        // const payment = payments[0];

        const startDate = payment.startingDate;
        const endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + payment.duration);

        const interval = endDate.getTime() - today.getTime();

        // run only when there is less than 7 days for the payment to expire
        if (SEVEN_DAYS_IN_MS > interval) {
            // send email
            const DAYS_TO_EXPIRE = Math.floor(
                (interval * 7) / SEVEN_DAYS_IN_MS
            );

            sendPaymentReminderEmail({
                email: payment.email,
                name: "Customer",
                days: DAYS_TO_EXPIRE,
            });
        }
    });
};
const emailJob = cron.schedule("0 25 13 * * *", emailRemainder);

// 00 10 * * *
export default emailJob;

//66053133afa43409a4bdd87e
