import React, { useEffect, useState } from 'react'
import "./Profile.css";
import Loader from "../components/Loader/Loader";
import Error from "../components/Error/Error";
import { Tabs } from 'antd';
import { TabPane } from "react-bootstrap";
import axios from "axios";

const Profile = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    useEffect(() => {
        if (!user) {
            window.location.href = "/login";
        }
    }, [])

    return (
        <div className="container">
            <div className="profile-section">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="My Profile" key="1">
                        <h1>My Profile</h1>
                        <hr />
                        <h1>Name: {user.name}</h1>
                        <h1>Email: {user.email}</h1>
                        {user.isAdmin ? <h1>Admin status : Booking.Football administrator</h1> : <h1>Booking.Football Member</h1>}
                        <hr />
                    </TabPane>
                    <TabPane tab="My Bookings" key="2">
                        <MyBookings />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
}

export default Profile;


export const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    const user = JSON.parse(localStorage.getItem("currentUser"));

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.post("/api/bookings/getBookingsByUserId", { userId: user._id });
                setBookings(response.data.reverse()); // Reverse the array here for now need to fix descending order later
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
                setError(error);
            }
        }
        fetchData();
    }, [])

    return (
        <div className="col-md">
            <div className="profile-section">
                {isLoading ? (<h1>Bookings Loading...<Loader /></h1>) : (
                    bookings.length > 0 ? (
                        <>
                            <h1>Current Bookings</h1>
                            {bookings.map((booking, index) => (
                                <div key={index}>
                                    <hr />
                                    <p><b>Court Name</b> : {booking.court}</p>
                                    <p><b>Booking Date and Time</b> : {booking.startDate} to {booking.endDate}</p>
                                    <p><b>Max Players</b> : {booking.maxPlayers} people</p>
                                    <p><b>Paid Amount</b> : ${booking.totalAmount}</p>
                                    <p><b>Booking Status</b> : {booking.status === "Booked" ? "Confirmed" : "Cancelled"}</p>

                                    <div className="text-right">
                                        <button className="btn btn-primary cancel-btn">Cancel booking</button>
                                    </div>

                                    <hr />
                                </div>
                            ))}
                        </>
                    ) : (<h1>You have no upcoming bookings</h1>)
                )}
            </div>
        </div>
    );
}