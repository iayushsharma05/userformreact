import axios from "axios";
import { Error } from "mongoose";
import { useState } from "react";
import { Link } from "react-router-dom";
// import Search from "./search";

const Adduser = () => {

    const [formUsername, setFormUsername] = useState("");
    const [formFname, setFormFname] = useState("");
    const [formGender, setFormGender] = useState("");
    const [formMail, setFormMail] = useState("");
    const [formDate, setFormDate] = useState("");
    const [formPhone, setFormPhone] = useState("");

    const [confirmation, setConfirmation] = useState("");
    const [isError, setIsError] = useState(false);

    const formReset = () => {
        setFormUsername("");
            setFormFname("");
            setFormGender("");
            setFormMail("");
            setFormDate("");
            setFormPhone("");
    }

    const onUserSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3020/adduser', {
            username: formUsername,
            fname: formFname,
            gender: formGender,
            mail: formMail,
            dob: formDate,
            phone: formPhone
        }).then(response => {
            setIsError(false);
            console.log(response.data);
            setConfirmation("User Added Success");
            setFormUsername("");
            setFormFname("");
            setFormGender("");
            setFormMail("");
            setFormDate("");
            setFormPhone("");
            

        }).catch(error => {
            console.log(error);
            setIsError(true);
            setConfirmation("Failed to add User. Please try again.");

        });


        

    };

    return (
        <>
            <h1 className="text-center">User Form</h1>
            <nav className="navbar navbar-dark bg-dark justify-content-between sticky-top">
                <a className="navbar-brand">Add Users</a>
                <Link className="btn btn-primary" to="/searchuser">Show Users</Link>
            </nav>

            <div className="container" >

                <form onSubmit={onUserSubmit}  >

                    {/* Alert */}

                    <div className="form-row ">
                        <div className="col-md-12 mb-3">
                            {
                                confirmation && isError==true 
                                ?
                                    <p className="alert alert-danger text-center">{confirmation}</p>
                                :
                                (confirmation && isError==false 
                                    ?
                                    <p className="alert alert-success text-center">{confirmation}</p>
                                    : 
                                    null
                                )
                            }
                            {/* {confirmation && <p className="alert alert-success text-center">{confirmation}</p>} */}
                        </div>
                    </div>

                    {/* <!-- User Name --> */}
                    <div className="form-row">

                        <div className="col-md-12 mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" name="uname" id="username" placeholder="Enter your username" value={formUsername} onChange={(e) => setFormUsername(e.target.value)} required />
                        </div>

                        {/* <!-- Full Name --> */}
                        <div className="col-md-12 mb-3">
                            <label htmlFor="fullName" className="form-label">Full Name</label>
                            <input type="text" className="form-control" name="fname" id="fullName" placeholder="Enter your full name" value={formFname} onChange={(e) => setFormFname(e.target.value)} required />
                        </div>

                    </div>

                    <div className="form-row">

                        {/* gender */}
                        <div className="col-md-12 mb-3">
                            <label htmlFor="gender-select">Gender</label>
                            <select name="gender" onChange={(e) => setFormGender(e.target.value)} className="form-select" id="gender-select">
                                <option value="" >Select Gender</option>
                                <option value="male" onChange={(e) => setFormGender(e.target.value)} >Male</option>
                                <option value="female" onChange={(e) => setFormGender(e.target.value)}>Female</option>
                                <option value="prefer not to answer" onChange={(e) => setFormGender(e.target.value)}>Prefer not to answer</option>
                            </select>
                        </div>



                        {/* <!-- Email --> */}
                        <div className="col-md-12 mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" name="email" id="email" placeholder="name@example.com" value={formMail} onChange={(e) => setFormMail(e.target.value)} required />
                        </div>

                    </div>

                    <div className="form-row">

                        {/* <!-- Phone Number --> */}
                        <div className="col-md-12 mb-3">
                            <label htmlFor="phone" className="form-label">Phone Number</label>
                            <input type="tel" className="form-control" name="phone" id="phone" placeholder="Enter your phone number" value={formPhone} onChange={(e) => setFormPhone(e.target.value)} required />
                        </div>

                        {/* <!-- Date of Birth --> */}
                        <div className="col-md-12 mb-3">
                            <label htmlFor="dob" className="form-label">Date of Birth</label>
                            <input type="date" className="form-control" name="dob" id="dob" value={formDate} onChange={(e) => setFormDate(e.target.value)} required />
                        </div>

                    </div>

                    <div className="form-row">

                        {/* <!-- Submit Button --> */}
                        <div className="col-md-12 mb-3">
                            <input type="submit" value="Submit" className="btn btn-primary" />&nbsp;
                            <button type="button" className="btn btn-danger" onClick={() => formReset()}>Clear Form</button>
                        </div>
                    </div>
                </form>
            </div>
        </>

    )
}
export default Adduser;