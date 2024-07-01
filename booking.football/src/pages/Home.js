import React, { useEffect, useState } from 'react'
import Courts from "../components/Courts/Courts";
import "./Home.css";
import Loader from "../components/Loader/Loader";
import Error from "../components/Error/Error";
// import axios from "axios";

const Home = () => {
    const [courts, setCourts] = useState([]);
    const [IsLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                const response = await fetch("/api/courts/getAllCourts");
                const data = await response.json();

                setCourts(data);
                setIsLoading(false);

            } catch (error) {
                setError(true);
                console.log(error);
                setIsLoading(false);
            }
        }

        fetchData();
    }, [])


    return (
        <div className="container">
            <div className="row main-row mt-5">
                {IsLoading ? (
                    <h1 className="loading-text">Data Loading...<Loader /></h1>
                ) : courts.length > 1 ? (
                    courts.map((court) => {
                        return <div className="col-md-9 mt-3">
                            <Courts court={court} />
                        </div>
                    })
                ) : (
                    <Error />
                )}
            </div>
        </div>
    );
}

export default Home;