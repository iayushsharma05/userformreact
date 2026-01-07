import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import '../src/assets/index.css';
import Navbar from "./Navbar";


const Index = () => {

    const navigate = useNavigate();
    const [authusername, setauthusername] = useState("");
    const [authmail, setauthmail] = useState("");
    const [authphone, setauthphone] = useState("");
    const [authpassword, setauthpassword] = useState("");
    const [authcpassword, setauthcpassword] = useState("");
    const [existingmessage,setexistingmessage] = useState("");
    const [passwordMismatchError, setPasswordMismatchError] = useState(true);
    const [passwordMismatchMessage, setPasswordMismatchMessage] = useState("");
    const [authconfirmation, setauthconfirmation] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const onUserAuth = (e) => {
        e.preventDefault();

       
        if (authpassword == authcpassword) {
            axios.post('/user/signupuser', {
                usernameauth: authusername,
                mailauth: authmail,
                phoneauth: authphone,
                passwordauth: authpassword


            }).then(response => {
                setauthusername("");
                setauthmail("");
                setauthphone("");
                setauthpassword("");
                setauthcpassword("");
                setPasswordMismatchError(false);
                console.log(response);
                setauthconfirmation("Success to Register !");
                setPasswordMismatchMessage("");
                toast.success("Success to Register !");
                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            }).catch(error=> {
                setPasswordMismatchError(true);
                toast.error(error.response.data.message);
                setexistingmessage(error.response.data.message);
                setPasswordMismatchMessage("");
            });

        }
        else {
            setPasswordMismatchError(true);
            setPasswordMismatchMessage("Password Mismatched! Please enter Same password! ");
            setexistingmessage(" ");
            toast.error("Password Mismatched! Please enter Same password! ");
            setauthconfirmation("");
        }
    };

    const resetform = () =>{
        setauthusername("");
        setauthmail("");
        setauthphone("");
        setauthpassword("");
        setauthcpassword("");
        setauthconfirmation("");
        setexistingmessage("");
        setPasswordMismatchError(true);
    }

    return (
        <>
        
        <h1 className="text-center">User Register</h1>
        <Navbar/>
            <section className="mt-3 bg-image">
                <div className="mask d-flex align-items-center">
                    <div className="container">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card main-container">
                                    <div className="card-body p-5">
                                         <ToastContainer position="top-center"/>
                                        <h2 className="text-uppercase text-center mb-5 formtext">Create an account</h2>
                                        {
                                            passwordMismatchMessage == "" && authconfirmation == "" && existingmessage == ""
                                                ?
                                                null
                                                :
                                                (
                                                    passwordMismatchError == true
                                                        ?
                                                        <p className="alert alert-danger text-center p-0">{authconfirmation}{passwordMismatchMessage}{existingmessage}</p>
                                                        :
                                                        <p className="alert alert-success text-center  p-0">{authconfirmation}</p>
                                                )
                                        }
                                        <form onSubmit={onUserAuth}>

                                            <div data-mdb-input-init className="form-outline mb-8">
                                                <input type="text" id="form3Example1cg" className="form-control form-control-lg"
                                                    placeholder="Enter your Username"
                                                    minLength="2" maxLength="16"
                                                    pattern="[A-Za-z0-9_]{4,16}"
                                                    title="Username must be 4-16 characters long and contain only letters, numbers, or underscores."
                                                    required
                                                    value={authusername}
                                                    onChange={(e) => setauthusername(e.target.value)}
                                                />
                                            </div>


                                            <div data-mdb-input-init className="form-outline mb-8">
                                                <input type="email" id="form3Example2cg" className="form-control form-control-lg"
                                                    placeholder="Enter your Mail Id"
                                                    title="Mail Should Write in Mail Format !"
                                                    required
                                                    value={authmail}
                                                    onChange={(e) => setauthmail(e.target.value)}
                                                />
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-8">
                                                <input type="tel" id="form3Example3cg" className="form-control form-control-lg"
                                                    placeholder="Enter your Contact Number"
                                                    minLength="6" maxLength="10"
                                                    pattern="[6-9]\d{9}"
                                                    title="Enter Valid Phone Number !"
                                                    required
                                                    value={authphone}
                                                    onChange={(e) => setauthphone(e.target.value)}
                                                />
                                            </div>
                                                <div data-mdb-input-init className="form-outline mb-8">
                                                    <input id="form3Example4cg" className="form-control form-control-lg"
                                                        type={showPassword ? 'text' : 'password'}
                                                        placeholder="Enter your Create Your Password"
                                                        minLength="8" maxLength="16"
                                                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}"
                                                        title="Password must contain at least one number, one uppercase and lowercase letter, and one special character, and be between 8 and 16 characters long."
                                                        required
                                                        value={authpassword}
                                                        onChange={(e) => setauthpassword(e.target.value)}
                                                    />
                                                </div>

                                                <div data-mdb-input-init className="form-outline mb-8">
                                                    <input id="form3Example5cdg" className="form-control form-control-lg"
                                                        type={showPassword ? 'text' : 'password'}
                                                        placeholder="Enter your Confirm Password"
                                                        minLength="8" maxLength="16"
                                                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}"
                                                        title="Password must contain at least one number, one uppercase and lowercase letter, and one special character, and be between 8 and 16 characters long."
                                                        value={authcpassword}
                                                        onChange={(e) => setauthcpassword(e.target.value)}
                                                        required
                                                    />
                                                    <div className="password-container">
                                                    <button className="" type="button" onClick={togglePasswordVisibility} title="Show Both Passwords !" >
                                                        {showPassword ? 'Hide' : 'Show'}
                                                    </button>

                                                </div>
                                            </div>


                                            <div className="d-flex justify-content-center">
                                                <button type="submit" className="btn btn-success formsubmitbtn">Register</button>&nbsp;
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

export default Index