import React, { useEffect, useState } from 'react'
import Courts from "../components/Courts/Courts";
import "./Home.css";
import Loader from "../components/Loader/Loader";
import Error from "../components/Error/Error";
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;

const moment = require('moment');

// import axios from "axios";

const Home = () => {
    const [courts, setCourts] = useState([]);
    const [IsLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();


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
    }, []);

    function filterByDate(date, dateString) {
        // date is an array of Moment.js objects representing the start and end dates,
        // dateString is an array of strings representing the formatted start and end dates.

        // console.log(dateString[0]); // start date
        // console.log(dateString[1]); // end date

        setStartDate(dateString[0]);
        setEndDate(dateString[1]);
    }

    // const onOk = (value) => {
    //     console.log('onOk: ', value);
    // };

    return (
        <div className="container">

            <div className="row main-row mt-5">
                <div className="col-md-3">
                    <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />

                    {/* <Space direction="vertical" size={12}>
                        <RangePicker
                            showTime={{
                                format: 'HH:mm',
                            }}
                            format="YYYY-MM-DD HH:mm"
                            onChange={(value, dateString) => {
                                console.log('Selected Time: ', value);
                                console.log('Formatted Selected Time: ', dateString);
                            }}
                            onOk={onOk}
                        />
                    </Space> */}

                </div>
            </div>

            <div className="row main-row mt-5">
                {IsLoading ? (
                    <h1 className="loading-text">Data Loading...<Loader /></h1>
                ) : courts.length > 1 ? (
                    courts.map((court) => {
                        return <div className="col-md-9 mt-3">
                            <Courts court={court} startDate={startDate} endDate={endDate} />
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