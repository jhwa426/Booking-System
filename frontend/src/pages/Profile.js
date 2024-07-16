import React, { useEffect, useState } from 'react'
import "./Profile.css";
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
        <div className="ml-3 mt-3">
            <Tabs defaultActiveKey="1">
                <TabPane tab="Profile" key="1">
                    <h1>My Profile</h1>
                    <br />
                    <h1>Name: {user.name}</h1>
                    <h1>Email: {user.email}</h1>
                    {user.isAdmin ? <h1>Admin status : Booking.Football administrator</h1> : <h1>Booking.Football Member</h1>}

                </TabPane>
                <TabPane tab="My Bookings" key="2">
                    <MyBookings />
                </TabPane>
            </Tabs>
        </div>
    );
}

export default Profile;


export const MyBookings = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("/api/bookings/getBookingsByUserId", { userId: user._id });
                setBookings(response.data.reverse()); // Reverse the array here for now need to fix descending order later
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [])

    return (
        <div className="col-md">
            <div className="payment-section">
                <h1>Current Bookings</h1>
                {bookings.map((booking, index) => (
                    <div key={index}>
                        <hr />
                        <p>Court Name : {booking.court}</p>
                        <p>Booking Date and Time : {booking.startDate} to {booking.endDate}</p>
                        <p>Max Players : {booking.maxPlayers} people</p>
                        <p>Paid Amount : ${booking.totalAmount}</p>
                        <p>Booking Status : {booking.status}</p>
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
}