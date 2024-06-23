import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./BookingScreen.css";
import Loader from "../components/Loader/Loader";

const BookingScreen = () => {
    const { courtId } = useParams();

    const [IsLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    const [court, setCourt] = useState();

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

            {IsLoading ? (<h1 className="loading-text"><Loader /></h1>) : error ? (<h1>Error occurred!</h1>) : (
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
                                <p>From date : </p>
                                <p>To date : </p>
                                <p>Max Players : {court.maxPlayers} people</p>
                                <p>Description : {court.description}</p>
                            </b>
                        </div>

                        <div className="payment-section">
                            <b>
                                <h1>Amount</h1>
                                <hr />
                                <p>Total hours : </p>
                                <p>Per Hour : ${court.price}</p>
                                <p>Total Amount : </p>
                            </b>
                        </div>

                        <div className="btn-area">
                            <button className="btn btn-primary">Pay Now</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BookingScreen;
