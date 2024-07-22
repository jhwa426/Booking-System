import React, { useEffect, useState } from 'react'
import "./Home.css";
import Court from "../components/Court/Court";
import Loader from "../components/Loader/Loader";
import { DatePicker } from 'antd';
import Swal from 'sweetalert2'

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);


const { RangePicker } = DatePicker;

const Home = () => {
    // State management
    const [courts, setCourts] = useState([]); // The original list of courts fetched from the API
    const [IsLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const [searchCourt, setSearchCourt] = useState("");
    const [typeCourt, setTypeCourt] = useState("all");

    const [filteredCourts, setFilteredCourts] = useState([]); // This is used to store the list of courts that match the search and type filters


    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                // const response = await fetch("/api/courts/getAllCourts");

                const response = await fetch(process.env.NODE_ENV === 'development' ? "http://localhost:3000" : "https://booking-system-backend-ee3i.onrender.com");
                const data = await response.json();

                setCourts(data);
                setFilteredCourts(data);
                setIsLoading(false);

            } catch (error) {
                setError(true);
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    function SelectedTime(value, dateString) {
        setStartDate(dateString[0]); // 05-07-2024 10:00
        setEndDate(dateString[1]);

        // Check if the selected time range is already booked
        const selectedStart = new Date(dateString[0]);
        const selectedEnd = new Date(dateString[1]);

        let availableCourts = [...courts];

        const startHours = selectedStart.getHours(); // 18
        const startMinutes = selectedStart.getMinutes().toString().padStart(2, '0'); // '00' 

        const endHours = selectedEnd.getHours(); // 20 
        const endMinutes = selectedEnd.getMinutes().toString().padStart(2, '0'); //'30'

        for (let court of courts) {
            for (let booking of court.currentBookings) {
                const bookingStart = new Date(booking.startDate);
                const bookingEnd = new Date(booking.endDate);

                // Check if the selected time range overlaps with the booking time range
                if ((selectedStart >= bookingStart && selectedStart <= bookingEnd) ||
                    (selectedEnd >= bookingStart && selectedEnd <= bookingEnd) ||
                    (selectedStart <= bookingStart && selectedEnd >= bookingEnd)) {

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
            Swal.fire({
                title: 'Confirmed',
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

    // Search
    function filterBySearch() {
        let availableCourts = [...courts];

        const filteredCourts = availableCourts.filter(
            (court) => court.name.toLowerCase().includes(searchCourt.toLowerCase())
        );

        setFilteredCourts(filteredCourts);
    }

    // Type
    function filterByType(event) {
        setTypeCourt(event);

        let availableCourts = [...courts];

        if (event !== "all") {
            const filteredCourts = availableCourts.filter(
                (court) => court.type.toLowerCase() === event.toLowerCase()
            );
            setFilteredCourts(filteredCourts);
        }
        else {
            setFilteredCourts(courts);
        }
    }


    return (
        <div className="container">
            <div className="row main-row mt-5 bs">
                <div className="col-md-4">
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

                <div className="col-md-5">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Courts"
                        value={searchCourt}
                        onChange={(event) => { setSearchCourt(event.target.value) }}
                        onKeyUp={filterBySearch}
                    />
                </div>

                <div className="col-md-2">
                    <select
                        value={typeCourt}
                        onChange={(event) => { filterByType(event.target.value) }}
                    >
                        <option value="all">All</option>
                        <option value="indoor">Indoor</option>
                        <option value="outdoor">Outdoor</option>
                    </select>
                </div>
            </div>

            <div className="row main-row mt-5">
                {IsLoading ? (
                    <h1 className="loading-text">Data Loading...<Loader /></h1>
                ) : (
                    filteredCourts.map((court, index) => {
                        return (
                            <div key={index} className="col-md-9 mt-3">
                                <Court court={court} startDate={startDate} endDate={endDate} />
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    );
}

export default Home;