import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookingScreen = () => {
    const { courtId } = useParams();

    const [IsLoading, setIsLoading] = useState();
    const [error, setError] = useState();
    const [court, setCourt] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                const response = await axios.post("/api/courts/getCourtById", { courtId });

                if (!response.ok) {
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
        <div>
            <h1>Booking Screen</h1>
            {courtId ? <h1>ID: {courtId}</h1> : <div>No courtId provided</div>}
        </div>
    );
}

export default BookingScreen;


// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const BookingScreen = () => {
//     const { courtId } = useParams();

//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(false);
//     const [court, setCourt] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setIsLoading(true);

//                 const response = await axios.post("/api/courts/getCourtById", { courtId });

//                 if (response.status !== 200) {
//                     throw new Error('Network response was not OK');
//                 }

//                 setCourt(response.data);
//                 setIsLoading(false);
//             } catch (err) {
//                 setError(true);
//                 console.error(err);
//                 setIsLoading(false);
//             }
//         };

//         fetchData();
//     }, [courtId]);

//     return (
//         <div>
//             <h1>Booking Screen</h1>
//             {courtId ? <h1>ID: {courtId}</h1> : <div>No courtId provided</div>}
//             {error && <div>Error fetching court data</div>}
//             {/* Render court data here */}
//         </div>
//     );
// };

// export default BookingScreen;
