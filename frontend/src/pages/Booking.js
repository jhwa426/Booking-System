import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Booking.css";
import Loader from "../components/Loader/Loader";
import Error from "../components/Error/Error";

import moment from 'moment';


const Booking = () => {
    const { courtId, startDate, endDate } = useParams();

    const [IsLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    const [court, setCourt] = useState();
    const [totalAmount, setTotalAmount] = useState(0);

    // Convert startDate and endDate to moment objects
    const start = moment(startDate, 'DD-MM-YYYY HH:mm');
    const end = moment(endDate, 'DD-MM-YYYY HH:mm');

    const startTime = moment(startDate, 'DD-MM-YYYY HH:mm').format('hh:mm A');
    const endTime = moment(endDate, 'DD-MM-YYYY HH:mm').format('hh:mm A');

    const totalHours = moment.duration(end.diff(start)).asHours();

    const displayDate = moment(startDate, 'DD-MM-YYYY HH:mm').format('dddd, DD-MM-YYYY, hh:mm A');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                const response = await axios.post("/api/courts/getCourtById", { courtId });

                if (response.status !== 200) {
                    throw new Error('Network response was not OK');
                }

                setCourt(response.data);
                setIsLoading(false);

                // Calculate totalAmount here after court is set
                const totalHours = moment.duration(end.diff(start)).asHours();
                setTotalAmount(totalHours * response.data.price); // <-- Add this line

            } catch (error) {
                setError(true);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [courtId]);

    return (
        <div className="m-5">
            {/* TEST */}
            {/* <h1>Booking Screen</h1> */}
            {/* {courtId ? <h1>ID: {courtId}</h1> : <div>No courtId provided</div>} */}

            {IsLoading ? (<h1 className="loading-text"><Loader /></h1>) : court ? (
                <div className="row payment-row">
                    <div className="col-md-5">
                        <h1>{court.name}</h1>
                        <hr />
                        <img src={court.imgURLs[1]} className="small-img" />
                        <p>Location : {court.location}</p>
                    </div>

                    <div className="col-md-5">
                        <div className="payment-section">
                            <h1>Booking Details</h1>
                            <hr />
                            <b>
                                <p>Date : {displayDate}</p>
                                <p>Play Time : {startTime} to {endTime}</p>
                                <p>Max Players : {court.maxPlayers} people</p>
                                <p>Description : {court.description}</p>
                            </b>
                        </div>

                        <div className="payment-section">
                            <b>
                                <h1>Amount</h1>
                                <hr />
                                <p>Total hours : {totalHours}</p>
                                <p>Per Hour : ${court.price}</p>
                                <p>Total Amount : ${totalAmount}</p>
                            </b>
                        </div>

                        <div className="btn-area">
                            <button className="btn btn-primary">Pay Now</button>
                        </div>
                    </div>
                </div>
            ) : (<Error />)}
        </div>
    );
}

export default Booking;