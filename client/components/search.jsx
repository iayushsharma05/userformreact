import { useEffect, useState, CSSProperties } from "react";
import axios from 'axios';
import { Await, Link } from "react-router-dom";



const Search = () => {

    const [addusers, setUsers] = useState([]);
    let [searchUser, SetSearchUser] = useState("");

    const [confirmation, setConfirmation] = useState("");
    const [isError, setIsError] = useState(false);


    const getAllUsersNew = async (searched_user_name) => {
        try {

            const user_name = (searched_user_name || "").trim();

            const payload = user_name ? { user_name } : {};

            const res = await axios.post("http://localhost:3020/getallusersnew", payload);

            setUsers(Array.isArray(res.data) ? res.data : []);
            //console.table(addusers);
            //console.log(searchUser);
        } catch (error) {
            console.log(error);
            setUsers([]);
        }
    }

    useEffect(() => {
        getAllUsersNew(searchUser);
    }, [searchUser])


    const onDeleteUser = async (id) => {
        console.log("User Id For Delete :" + id);
        await axios.post('http://localhost:3020/deleteuserbyid', { userid: id })
            .then(response => {
                setConfirmation("User Deleted Success");
                console.log("User With " + id + " Deleted !");
                console.log(response);
                getAllUsersNew(searchUser);
            })
            .catch(error => {
                setConfirmation("Failed to Delete User. Please try again.");
                console.log("Error ! User Not deleted" + error);
            })
    }

    const reloadPage = () =>{
        window.location.reload();
    }


    return (
        <div className="search">

            <h1 className="text-center">All Users</h1>

            <nav className="navbar navbar-dark bg-dark justify-content-between  sticky-top">
                <a className="navbar-brand">Manage Users</a>
                <Link className="btn btn-primary" to="/">Add User</Link>
                <form className="form">

                    <input className="form-control"
                        type="text"
                        value={searchUser}
                        onChange={(e) => SetSearchUser(e.target.value)}
                        placeholder="Enter user name"

                        aria-label="Search" />
                </form>
            </nav>



            <div className="table-responsive-scroll">
                <b>{"Results Found For: " + searchUser}</b>
                <div className="col-md-12 mb-3">
                    {
                        confirmation && isError == true
                            ?
                            <p className="alert alert-danger text-center">{confirmation}
                            </p>
                            :
                            (confirmation && isError == false
                                ?
                                <p className="alert alert-success text-center">{confirmation}&nbsp;&nbsp;
                                    <button  className="btn btn-success btn-sm" onClick={() => reloadPage()}>Refresh</button>
                                </p>
                                :
                                null
                            )
                    }
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr No.</th>
                            <th scope="col">username</th>
                            <th scope="col">Mail</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>


                        {(Array.isArray(addusers) ? addusers : []).map((user, index) => {

                            return (

                                <tr key={user._id} >
                                    <td>{index + 1}</td>
                                    <td>{user.username}</td>
                                    <td>{user.mail}</td>
                                    <td><button className="btn btn-danger btn-sm" onClick={() => onDeleteUser(user._id)}>Delete</button></td>
                                </tr>
                            )
                        })
                        }

                    </tbody>
                </table>
            </div>
        </div>



    )
}


export default Search;
