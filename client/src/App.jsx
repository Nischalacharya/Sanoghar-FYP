import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./components/home/Home";
import { ForgotPassword } from "./components/navbar/user/ForgotPassword";
import { Header } from "./components/navbar/Header";
import { Login } from "./components/navbar/user/Login";
import { Signup } from "./components/navbar/user/Signup";
import { HostelDetail } from "./components/hostel/HostelDetail";
import { Hostel } from "./components/hostel/Hostel";
import { Owner } from "./components/hostelowner/Owner";
import HostelMap from "./components/hostelMap/HostelMap";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import ResetPassword from "./components/navbar/user/ResetPassword";
import Admin from "./components/admin/Admin";
import { About } from "./components/home/About";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error from "./components/error/Error";
import UserProfile from "./components/Profile/UserProfile";
import OwnerProfile from "./components/Profile/OwnerProfile";
import { GetUser } from "./function/User";
import { useEffect } from "react";
import { setLogin } from "./redux/Index";
function App() {
    const storage = useSelector((state) => state);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const refreshUser = async () => {
        console.log(user);
        if (!user) return;
        const res = await GetUser();
        const loggedinUser = res.filter((u) => u.email === user.email);
        dispatch(setLogin({ user: loggedinUser[0] }));
        console.log(loggedinUser[0]);
    };
    useEffect(() => {
        refreshUser();
    }, []);
    return (
        <GoogleOAuthProvider clientId="1045489467062-clci15u88ajefk8pk827189rc8gn3usf.apps.googleusercontent.com">
            <div className={"app " + storage.theme}>
                <Router>
                    <Header />
                    <ToastContainer />
                    <div className="body">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route
                                path="/forgotpassword"
                                element={<ForgotPassword />}
                            />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/hostel" element={<Hostel />} />
                            <Route
                                path="/dashboard"
                                element={
                                    storage.user?.username &&
                                    storage.user?.isHostelOwner == "true" ? (
                                        <OwnerProfile />
                                    ) : (
                                        <UserProfile />
                                    )
                                }
                            />
                            <Route
                                path="/hostelowner"
                                element={
                                    storage?.user?.username &&
                                    storage?.user?.isHostelOwner == "true" ? (
                                        <Owner />
                                    ) : (
                                        <Error />
                                    )
                                }
                            />
                            <Route path="/map" element={<HostelMap />} />
                            <Route
                                path="/resetpassword/:id/:token"
                                element={<ResetPassword />}
                            />
                            <Route
                                path="/admin"
                                element={
                                    storage?.user?.username &&
                                    storage?.user?.isAdmin == "true" ? (
                                        <Admin />
                                    ) : (
                                        <Error />
                                    )
                                }
                            />
                            <Route
                                path="/hosteldetail"
                                element={<HostelDetail />}
                            />
                            <Route
                                path="/hosteldetail/:isPayment"
                                element={<HostelDetail />}
                            />
                            <Route path="/about" element={<About />} />
                            <Route path="*" element={<Error />} />
                        </Routes>
                    </div>
                </Router>
            </div>
        </GoogleOAuthProvider>
    );
}

export default App;
