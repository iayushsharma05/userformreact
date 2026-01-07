import { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import '../src/assets/index.css';



const Search = () => {
    const navigate = useNavigate();
    const [addusers, setUsers] = useState([]);
    let [searchUser, SetSearchUser] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [isError, setIsError] = useState();

    const getAllUsersNew = async (searched_user_name) => {
        try {
            const user_name = (searched_user_name || "").trim();

            const payload = user_name ? { user_name } : {};

            const res = await axios.post("/user/getallusersnew", payload);
            setUsers(Array.isArray(res.data) ? res.data : []);
            // console.table(addusers);
            //console.log(searchUser);
        } catch (error) {
            if(error && error.response.status === 401){
            navigate("/unauthorized")
            }
            console.log(error);
            setUsers([]);
        }
    }
    useEffect(() => {
        getAllUsersNew(searchUser);
    }, [searchUser])


    // if(error.response && error.response.status === 401){
    //             navigate("/unauthorized")
    //         }

    const onDeleteUser = async (id) => {


        const confirmDelete = window.confirm(
            "Are you sure you want to delete this User ?"
        );

        if (!confirmDelete) return; //Stop if user clicks Cancel
        window.scrollTo(0, 0);

        console.log("User Id For Delete :" + id);
        await axios.post('/user/deleteuserbyid', { userid: id })
            .then(response => {
                setConfirmation("User Deleted Success");
                console.log("User With " + id + " Deleted !");
                console.log(response);
                setIsError(false);
                getAllUsersNew(searchUser);
                SetSearchUser("");

            })
            .catch(error => {
                setConfirmation("Failed to Delete User. Please try again");
                console.log("Error ! User Not deleted" + error);
                setIsError(true);

            })
    }


    const [newupdateUser, setNewUpdate] = useState(null);
    const [copiedFname, setCopiedFname] = useState('');
    const [Updateconfirmation, setUpadteConfirmation] = useState("");
    const [isUpdateError, setIsUpadteError] = useState();


    const openEditForm = (user) => {

        window.scrollTo(0, 0);
        setNewUpdate({
            id: user._id,
            username: user.username,
            fname: user.fname,
            gender: user.gender,
            mail: user.mail,
            dob: user.dob,
            phone: user.phone,
        })
        setCopiedFname(user.fname);
    }

    const changeUpdateForm = (field, value) => {
        setNewUpdate(prev => ({ ...prev, [field]: value }))
    }


    const submitEditForm = async (e) => {
        e.preventDefault();
        if (!newupdateUser) {
            return;
        }
        try {

            const payload = {
                id: newupdateUser.id,
                username: newupdateUser.username,
                fname: newupdateUser.fname,
                gender: newupdateUser.gender,
                mail: newupdateUser.mail,
                phone: newupdateUser.phone,
                date: newupdateUser.dob
            }

            const res = await axios.post('/user/updateuser', payload);
            console.log(res.data);
            setNewUpdate(null);
            setUpadteConfirmation("User Updated Success");
            setIsUpadteError(false);
            getAllUsersNew(searchUser);


        } catch (error) {
            console.log("Failed To Update User" + error);
            setUpadteConfirmation("Error User Not Updated");
            setIsUpadteError(true);
        }


    }


    // new function - to be called when the user clicks on cancel form
    const cancelForm = () => {
        // empty the state
        setNewUpdate(null);
    }


    const toggleTheme = () => {
        document.body.classList.toggle("dark");

        // optional: save preference
        localStorage.setItem(
            "theme",
            document.body.classList.contains("dark") ? "dark" : "light")
    };

    const handleLogout = async () => {
        try {
            await axios.post(
                "/user/logout",
                {},
                { withCredentials: true }
            );
            setTimeout(() => {
                navigate("/logoutmessage");
            }, 1500);

        } catch (error) {
            console.log(error);
            }
        };



    let mybutton = document.getElementById("myBtn");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () { scrollFunction() };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }

    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }


    return (
        <div className="search">
            <h1 className="text-center">All Users</h1>
            <nav className="navbar justify-content-between  sticky-top" >
                <a className="navbar-brand">Manage Users</a>
                <form className="form">
                    <input className="form-control"
                        type="text"
                        value={searchUser}
                        onChange={(e) => SetSearchUser(e.target.value)}
                        placeholder="Search By username Here !"
                        size="21"
                        aria-label="Search" />
                </form>
                <NavLink className="btn btnnav " to="/searchuser">Show User</NavLink>
                <NavLink className="btn btnnav " to="/adduser"  disabled={location.pathname === "/adduser"} >Add User</NavLink>
                <NavLink className="btn btnnav " to="/login">Login</NavLink>
                <NavLink className="btn btnnav " to="/" >Signup</NavLink>
                <NavLink className="btn btnnav" onClick={handleLogout}> Logout</NavLink>
                <NavLink className="btntheme" onClick={toggleTheme}>🌙|☀️</NavLink>


            </nav>

            <div className="table-responsive-scroll">
                <div className="col-md-12 mb-1" >
                    {
                        confirmation && isError == true
                            ?
                            <p className="alert alert-danger text-center">{confirmation}
                            </p>
                            :
                            (confirmation && isError == false
                                ?
                                <p className="alert alert-success text-center">{confirmation}
                                </p>
                                :
                                null
                            )
                    }
                    {
                        Updateconfirmation && isUpdateError == true
                            ?
                            <p className="alert alert-danger text-center">{Updateconfirmation}
                            </p>
                            :
                            (Updateconfirmation && isUpdateError == false
                                ?
                                <p className="alert alert-success text-center">{Updateconfirmation}
                                </p>
                                :
                                null
                            )
                    }
                </div>
                <div className="col-md-12 mb-1">
                </div>
                {/* update form */}
                {
                    newupdateUser
                        ?
                        <div className="editform" >
                            <center>
                                <p>Update Form Username : <b> {copiedFname}</b></p>
                            </center>
                            <form onSubmit={() => submitEditForm()}>

                                <div className="form-row">

                                    <div className="form-group col-md-12">

                                        <label>Username:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            minLength="5" maxLength="18" pattern="[a-z0-9]+"
                                            value={newupdateUser.username}
                                            onChange={(e) => changeUpdateForm("username", e.target.value)}
                                        />
                                        <label>Full Name:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            minLength="3" maxLength="35" pattern="[A-Z a-z]+"
                                            value={newupdateUser.fname}
                                            onChange={(e) => changeUpdateForm("fname", e.target.value)}
                                            required
                                        />

                                    </div>
                                </div>

                                <div className="form-row ">
                                    <div className="form-group col-md-12">

                                        <label>Gender:</label>
                                        <select name="gender"
                                            className="form-select"
                                            value={newupdateUser.gender}
                                            onChange={(e) => changeUpdateForm("gender", e.target.value)}
                                            required
                                        >
                                            <option value="" >Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="prefer not to answer">Prefer not to answer</option>
                                        </select>

                                        <label>Email:</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            maxLength="30"
                                            value={newupdateUser.mail}
                                            onChange={(e) => changeUpdateForm("mail", e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-row ">
                                    <div className="form-group col-md-12">

                                        <label>Phone:</label>
                                        <input
                                            type="number"
                                            minLength="6" maxLength="10"
                                            onChange={(e) => changeUpdateForm("phone", e.target.value)}
                                            className="form-control"
                                            value={newupdateUser.phone}
                                            required
                                        />
                                    </div>

                                    <div className="form-group col-md-12">

                                        <label>Date of Birth :</label>
                                        <input
                                            type="text"
                                            onChange={(e) => changeUpdateForm("dob", e.target.value)}
                                            className="form-control"
                                            value={newupdateUser.dob}
                                            required
                                        />
                                    </div>
                                    &nbsp;
                                    <div className="form-group col-md-12">
                                        <button type="submit" className="btn btn-success" onClick={(e) => submitEditForm(e)}>Save Changes</button>&nbsp;
                                        <button type="button" className="btn btn-danger" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Cancel Form" onClick={() => cancelForm()} >Cancel</button>
                                    </div>
                                </div>
                            </form>

                        </div >
                        :
                        null
                }
                <button onClick={() => topFunction()} id="myBtn" title="Go to top">Top</button>
            <div className="table-container">
                <table className="table table-hover ">
                    <thead>
                        <tr>
                            <th scope="col">Sr No.</th>
                            <th scope="col">username</th>
                            <th scope="col">Delete</th>
                            <th scope="col">Update</th>
                            <th scope="col">Show Profile</th>

                        </tr>
                    </thead>
                    <tbody>
                        {(Array.isArray(addusers) ? addusers : []).map((user, index) => {
                            return (

                                <tr key={user._id} >
                                    <td scope="row" >{index + 1}</td>
                                    <td scope="row">{user.username}</td>
                                    <td scope="row"><button className="btn btn-danger btn-sm" onClick={() => onDeleteUser(user._id)}>Delete</button></td>
                                    <td scope="row"><button type="button" className="btn btn-dark btn-sm" onClick={() => openEditForm(user)}>Update</button></td>
                                    <td scope="row"><Link to={`/user/${user._id}`} className="btn btn-success btn-sm">View</Link></td></tr>
                            )
                        })
                        }
                    </tbody>
                </table>
            </div>
        </div>

            {addusers.length == [''] && searchUser !== '' && (
                <p className="text-center"><h4>Oops! No Results Found for : <b>{searchUser}</b> </h4> <i>Please Ensure that You Entered Exact Username...</i>  </p>
                
            )}
        </div >
    )
}
export default Search;
