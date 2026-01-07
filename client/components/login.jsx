import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";



const Login = () => {

    // const navigate = useNavigate();
    const navigate = useNavigate();
    const [Usermaillogin, setUsermaillogin] = useState("");
    const [Userpasswordlogin, setUserpasswordlogin] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [alertMsg, setAlertMsg] = useState("");
    const [alertType, setAlertType] = useState(""); // success | danger


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const resetform = () => {
        setUsermaillogin("");
        setUserpasswordlogin("");
    }

    const onUserLogin = (a) => {
        a.preventDefault();
        axios.post('/user/login', {
            usernameauth: Usermaillogin,  // email
            passwordauth: Userpasswordlogin
        })
            .then(response => {

                console.log("Login success", response.data);
                setUsermaillogin("");
                setUserpasswordlogin("");
                setAlertMsg("Login successful!");
                setAlertType("success");

                setTimeout(() => {
                    navigate("/searchuser");
                }, 500);
                


            })
            .catch(error => {
                console.log("Login failed", error.response.data);
                setAlertMsg(error.response.data.message);
                setAlertType("danger");

            });
    };

    return (
        <>
                    <h1 className="text-center">User Login</h1>
        <Navbar />  
        <br />
            <section className="bg-image">
                <div className="mask d-flex align-items-center h-100">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card main-container">
                                    <div className="card-body p-5">
                                        <h2 className="text-uppercase text-center mb-5 formtext">Login</h2>

                                        {alertMsg && (
                                            <div className={`alert alert-${alertType} text-center`}>
                                                {alertMsg}
                                            </div>
                                        )}



                                        <form onSubmit={onUserLogin}>


                                            <div data-mdb-input-init className="form-outline mb-8">
                                                <input type="text" id="form3Example2cg" className="form-control form-control-lg"
                                                    placeholder="Enter your Mail Id / Username"
                                                    title="Mail Should Write in Mail Format !"
                                                    required
                                                    value={Usermaillogin}
                                                    onChange={(a) => setUsermaillogin(a.target.value)}
                                                />
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-8">
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    id="form3Example4cg"
                                                    className="form-control form-control-lg"
                                                    placeholder="Enter your Create Your Password"
                                                    minLength="8" maxLength="16"
                                                    // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}"
                                                    // title="Password must contain at least one number, one uppercase and lowercase letter, and one special character, and be between 8 and 16 characters long."
                                                    required
                                                    value={Userpasswordlogin}
                                                    onChange={(a) => setUserpasswordlogin(a.target.value)}
                                                />
                                                <div className="password-container">
                                                    <button className="" type="button" onClick={togglePasswordVisibility} title="Show Both Passwords !" >
                                                        {showPassword ? 'Hide' : 'Show'}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-center">
                                                <button type="submit" className="btn btn-success" >Login</button>&nbsp;
                                                <button type="reset" onClick={resetform} className="btn btn-danger">Clear</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login;
