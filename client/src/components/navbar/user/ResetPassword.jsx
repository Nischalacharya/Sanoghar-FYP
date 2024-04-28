import React, { useState } from "react";
import "./User.scss";
import { resetPassword } from "../../../function/User";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function ResetPassword() {
    const navigate = useNavigate();

    const [passwords, setPasswords] = useState({});
    const { id, token } = useParams();

    const resetPasswordHandler = async (e) => {
        e.preventDefault();
        if (passwords.password !== passwords.cpassword) return;
        const passwordPattern = /^(?=.*[!@#$%^&])[a-zA-Z0-9!@#$%^&*]{6,}$/;
        if (!passwordPattern.test(passwords.password)) {
            console.log("object");
            toast.error(
                "Password must be at least 6 characters long and contain at least one special character."
            );
            return;
        }

        const user = {
            _id: id,
            token,
            password: passwords.password,
        };
        const res = await resetPassword(user);
        toast.success("Password has been reset");
        navigate("/login");
    };

    return (
        <div className="reset-password">
            <form>
                <h1>Reset Password</h1>
                <label>Password</label>
                <input
                    type="text"
                    name="password"
                    id="password"
                    required="required"
                    onChange={(e) =>
                        setPasswords({
                            ...passwords,
                            [e.target.name]: e.target.value,
                        })
                    }
                />
                <label>Confirm Password</label>
                <input
                    type="text"
                    name="cpassword"
                    id="password"
                    required="required"
                    onChange={(e) =>
                        setPasswords({
                            ...passwords,
                            [e.target.name]: e.target.value,
                        })
                    }
                />
                <button onClick={(e) => resetPasswordHandler(e)}>
                    Reset Password
                </button>
            </form>
        </div>
    );
}

export default ResetPassword;
