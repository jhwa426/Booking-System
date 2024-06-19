import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookingScreen = () => {
    let { courtId = 'default' } = useParams();


    const [IsLoading, setIsLoading] = useState();
    const [error, setError] = useState();
    const [court, setCourt] = useState(false);

    useEffect(() => {

    }, [])

    if (!courtId) {
        return <div>No courtId provided</div>;
    }

    return (
        <div>

            <h1>Booking Screen</h1>
            <h1>ID : {courtId}</h1>
        </div>
    );
}

export default BookingScreen;
