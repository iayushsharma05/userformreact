import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const UserProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios
            .post("/user/showuserbyid", { userid: id })
            .then(res => setUser(res.data))
            .catch(err => console.log(err));
    }, [id]);

    const formatDOB = (dob) => {
        if (!dob) return "N/A";
        return new Date(dob).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    if (!user) {
        return <h4 className="text-center">User Not Found</h4>;
    }

    return (
        <div className="Profile">
            <h1 className="text-center">User Profile</h1>
            <Navbar/>
        <div className="profile-container">
            <div className="profile-card">

                <div className="profile-header">
                    <div className="avatar">
                        {user.fname.charAt(0).toUpperCase()}
                    </div>
                    <h3>{user.fname}</h3>
                    <p className="username">@{user.username}</p>
                </div>

                <div className="profile-body">
                    <div className="info-row">
                        <span>Email</span>
                        <span>{user.mail}</span>
                    </div>
                    <div className="info-row">
                        <span>Gender</span>
                        <span>{user.gender}</span>
                    </div>
                    <div className="info-row">
                        <span>Phone</span>
                        <span>{user.phone}</span>
                    </div>
                    <div className="info-row">
                        <span>Born On </span>
                        <span>{formatDOB(user.dob)}</span>
                    </div>
                </div>

                <div className="profile-actions">
                    <Link to="/searchuser" className="btn btn-outline-dark btnback">
                        ← Back to Users
                    </Link>
                </div>

            </div>
        </div>
    </div>
    );
};



export default UserProfile;
