import React, { useEffect, useState } from 'react'
import Courts from "../components/Courts/Courts";
import "./Home.css";
// import axios from "axios";

const Home = () => {
    const [courts, setCourts] = useState([]);
    const [IsLoading, setIsLoading] = useState();
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
                    <h1 className="loading-text">Data Loading...</h1>
                ) : error ? (
                    <h1 className="loading-text">Error</h1>
                ) : (
                    courts.map((court) => {
                        return <div className="col-md-9 mt-2">
                            <Courts court={court} />
                        </div>
                    })
                )}
            </div>
        </div>
    );
}

export default Home;