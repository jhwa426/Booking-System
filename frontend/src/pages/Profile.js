import "./Profile.css";
import React, { useEffect, useState } from 'react'
import Loader from "../components/Loader/Loader";
import Error from "../components/Error/Error";

import axios from "axios";
import Swal from 'sweetalert2'
import { Tabs, Divider, Flex, Tag } from 'antd';



const { TabPane } = Tabs;

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
                <Tabs defaultActiveKey="2">
                    <TabPane tab="My Profile" key="1">
                        <h1>My Profile</h1>
                        <hr />
                        <h1>Name: {user.name}</h1>
                        <h1>Email: {user.email}</h1>
                        {user.isAdmin ? <h1>Admin status : <Tag color="green">Administrator</Tag></h1> : <h1><Tag color="blue">Booking.Football Member</Tag></h1>}
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
                //// Localhost
                // const response = await axios.post("/api/bookings/getBookingsByUserId", { userId: user._id });

                //// Backend URL
                // const response = await axios.post("https://booking-system-backend-ee3i.onrender.com/api/bookings/getBookingsByUserId", { userId: user._id });

                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/bookings/getBookingsByUserId`, { userId: user._id });

                setBookings(response.data.reverse()); // Reverse the array here for now need to fix descending order later
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
                setError(error);
            }
        }
        fetchData();
    }, []);

    async function cancelBooking(bookingId, courtId) {
        try {
            setIsLoading(true);
            //// Localhost
            // const response = await axios.post("/api/bookings/cancelBooking/", { bookingId, courtId });

            //// Backend URL
            // const response = await axios.post("https://booking-system-backend-ee3i.onrender.com/api/bookings/cancelBooking/", { bookingId, courtId });

            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/bookings/cancelBooking/`, { bookingId, courtId });

            console.log(response.data);

            Swal.fire({
                title: 'Successful',
                text: 'Your court has been successfully cancelled!',
                icon: 'success',
                confirmButtonText: 'Close'
            }).then(response => {
                window.location.reload();
            });
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Error in cancel',
                icon: 'error',
                confirmButtonText: 'Close'
            })
            console.error('Error booking court:', error.response.data);
        }
    }

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
                                    <p><b>Booking ID</b> : {booking._id}</p>
                                    <p><b>TransactionId ID</b> : {booking.transactionId}</p>
                                    <p><b>Court Name</b> : {booking.court}</p>
                                    <p><b>Booking Date and Time</b> : {booking.startDate} to {booking.endDate}</p>
                                    <p><b>Max Players</b> : {booking.maxPlayers} people</p>
                                    <p><b>Paid Amount</b> : ${booking.totalAmount}</p>
                                    <p><b>Booking Status</b> : {booking.status === "Booked" ? <Tag color="blue">CONFIRMED</Tag> : (<Tag color="red">CANCELLED</Tag>)}</p>
                                    <div className="text-right">
                                        {booking.status !== "Cancelled" && (
                                            <button
                                                className="btn btn-primary cancel-btn"
                                                onClick={() => { cancelBooking(booking._id, booking.courtId) }}
                                            >Cancel booking
                                            </button>
                                        )}
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