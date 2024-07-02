import React, { useEffect, useState } from 'react'
import Courts from "../components/Courts/Courts";
import "./Home.css";
import Loader from "../components/Loader/Loader";
import Error from "../components/Error/Error";
import { DatePicker } from 'antd';

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(utc);
dayjs.extend(timezone);


const { RangePicker } = DatePicker;

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
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    // function filterByDate(date, dateString) {
    //     // date is an array of Moment.js objects representing the start and end dates,
    //     // dateString is an array of strings representing the formatted start and end dates.

    //     setStartDate(dateString[0]);
    //     setEndDate(dateString[1]);
    // }

    function SelectedTime(value, dateString) {
        setStartDate(dateString[0]);
        setEndDate(dateString[1]);
    }

    const disabledDate = (current) => {
        // Can not select days before yesterday and today
        return current && current < dayjs().tz('Pacific/Auckland').subtract(1, 'day').endOf('day');
    };

    function disabledHours() {
        let hours = [];
        for (let i = 0; i < 10; i++) {
            hours.push(i);
        }
        for (let i = 22; i < 24; i++) {
            hours.push(i);
        }
        return hours;
    }

    function disabledMinutes() {
        let minutes = [];
        for (let i = 1; i < 60; i++) {
            if (i % 30 !== 0) {
                minutes.push(i);
            }
        }
        return minutes;
    }


    return (
        <div className="container">

            <div className="row main-row mt-5">
                <div className="col-md-5">
                    {/* <RangePicker format="DD-MM-YYYY" onChange={filterByDate} /> */}

                    <RangePicker
                        disabledDate={disabledDate}
                        showTime={{
                            format: 'HH:mm',
                            hideDisabledOptions: true,
                            disabledHours: disabledHours,
                            disabledMinutes: disabledMinutes,
                        }}
                        format="DD-MM-YYYY HH:mm"
                        onChange={SelectedTime}
                    />

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