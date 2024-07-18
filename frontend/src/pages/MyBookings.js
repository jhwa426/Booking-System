import "./MyBookings.css";
import React, { useEffect, useState } from 'react'
import Loader from "../components/Loader/Loader";

import axios from "axios";
import Swal from 'sweetalert2'

const MyBookings = () => {
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
    }, []);

    async function cancelBooking(bookingId, courtId) {
        try {
            setIsLoading(true);
            const response = await axios.post("/api/bookings/cancelBooking/", { bookingId, courtId });
            console.log(response.data);

            Swal.fire({
                title: 'Successful',
                text: 'Your court has been successfully cancelled!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(response => {
                window.location.href = "/profile"
            });
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Error in cancel',
                icon: 'error',
                confirmButtonText: 'Close'
            })
            console.error('Error cancel court:', error.response.data);
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
                                    {/* TEST */}
                                    <p><b>Booking ID</b> : {booking._id}</p>
                                    <p><b>Court ID</b> : {booking.courtId}</p>
                                    {/* TEST */}
                                    <p><b>Booking ID</b> : {booking._id}</p>
                                    <p><b>Court Name</b> : {booking.court}</p>
                                    <p><b>Booking Date and Time</b> : {booking.startDate} to {booking.endDate}</p>
                                    <p><b>Max Players</b> : {booking.maxPlayers} people</p>
                                    <p><b>Paid Amount</b> : ${booking.totalAmount}</p>
                                    <p><b>Booking Status</b> : {booking.status === "Booked" ? "Confirmed" : "Cancelled"}</p>

                                    <div className="text-right">
                                        <button
                                            className="btn btn-primary cancel-btn"
                                            onClick={() => { cancelBooking(booking._id, booking.courtId) }}
                                        >Cancel booking</button>
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

export default MyBookings