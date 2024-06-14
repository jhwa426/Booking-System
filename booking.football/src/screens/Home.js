import React, { useEffect, useState } from 'react'
// import axios from "axios";

const Home = () => {
    const [courts, setCourts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/courts/getAllCourts");
                const data = await response.json();
                setCourts(data);

                console.log(data);

            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [])


    return (
        <div>
            <h1>Homepage</h1>
            <h1>{courts.length}</h1>
        </div>
    );
}

export default Home;