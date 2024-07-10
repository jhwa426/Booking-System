import React, { useEffect, useState } from 'react'
import "./Home.css";
import Court from "../components/Court/Court";
import Loader from "../components/Loader/Loader";
import Error from "../components/Error/Error";
import { DatePicker } from 'antd';
import Swal from 'sweetalert2'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import moment from "moment";

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

    // Default
    // function SelectedTime(value, dateString) {
    //     setStartDate(dateString[0]);
    //     setEndDate(dateString[1]);

    //     console.log(dateString[0]); // 05-07-2024 10:00
    //     console.log(dateString[1]);
    // }


    // TEST 1
    function SelectedTime(value, dateString) {
        setStartDate(dateString[0]);
        setEndDate(dateString[1]);

        console.log(dateString[0]); // 05-07-2024 10:00
        console.log(dateString[1]);

        // Check if the selected time range is already booked
        const selectedStart = new Date(dateString[0]);
        const selectedEnd = new Date(dateString[1]);

        let availableCourts = [...courts];

        const startHours = selectedStart.getHours();
        const startMinutes = selectedStart.getMinutes().toString().padStart(2, '0');

        const endHours = selectedEnd.getHours();
        const endMinutes = selectedEnd.getMinutes().toString().padStart(2, '0');

        // console.log(startHours, startMinutes, endHours, endMinutes); // 18 '00' 20 '30'

        for (let court of courts) {
            for (let booking of court.currentBookings) {
                const bookingStart = new Date(booking.startDate);
                const bookingEnd = new Date(booking.endDate);

                // Check if the selected time range overlaps with the booking time range
                if ((selectedStart >= bookingStart && selectedStart <= bookingEnd) ||
                    (selectedEnd >= bookingStart && selectedEnd <= bookingEnd) ||
                    (selectedStart <= bookingStart && selectedEnd >= bookingEnd)) {
                    // alert(
                    //     `${court.name} is already booked between ${startHours}:${startMinutes} and ${endHours}:${endMinutes}. 
                    //     \nPlease select the other time.`
                    // );

                    Swal.fire({
                        title: 'Sorry!',
                        text: `${court.name} is already booked between ${startHours}:${startMinutes} and ${endHours}:${endMinutes}. 
                                \nPlease select the other time.`,
                        icon: 'error',
                        confirmButtonText: 'Close'
                    });

                    // Remove the court from the availableCourts array
                    availableCourts = availableCourts.filter(c => c._id !== court._id);
                }
            }
        }

        if (availableCourts.length === courts.length) {
            // alert("The selected time range is available for all courts.");

            Swal.fire({
                title: 'Success!',
                text: 'The selected time range is available for all courts.',
                icon: 'success',
                confirmButtonText: 'Continue'
            });
        }

        setCourts(availableCourts); // Update the state of the courts
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
                    {/* TEST */}
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
                ) : courts.length > 0 ? (
                    courts.map((court) => {
                        return <div className="col-md-9 mt-3">
                            <Court court={court} startDate={startDate} endDate={endDate} />
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