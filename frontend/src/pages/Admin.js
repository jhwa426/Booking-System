import React, { useEffect, useState } from 'react'
import { Tabs, Tag } from 'antd';
import "./Admin.css";
import axios from "axios";
import Loader from "../components/Loader/Loader";

const { TabPane } = Tabs;

const Admin = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    useEffect(() => {
        if (!user.isAdmin) {
            window.location.href = "/home"
        }
    }, [])



    return (
        <div className="mt-3 mtl-3 mr-3 bs">
            <div className="admin-section">
                <h1 className="admin-text">Admin Panel</h1>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Booking" key="1">
                        <Bookings />
                    </TabPane>
                    <TabPane tab="Courts" key="2">
                        <Courts />
                    </TabPane>
                    <TabPane tab="Add Court" key="3">
                        <h1>TEST</h1>
                    </TabPane>
                    <TabPane tab="Users" key="4">
                        <Users />
                    </TabPane>
                </Tabs>
            </div>
        </div >
    );
}

export default Admin;



//// Admin - Bookings
export function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/bookings/getAllBookings`);
                setBookings(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(true);
                setError(error);
            }
        }
        fetchData();
    }, [])

    return (
        <div className="row">
            <div className="col-md">
                {isLoading ? <h1 className="text-header"><Loader /></h1> : (bookings.length <= 0 ? <h1 className="text-header">There is no booking</h1> : <h1 className="text-header"> {bookings.length} Bookings Loaded </h1>)}
                <div div className="table-responsive" >
                    <table className="table table-bordered table-dark ">
                        <thead>
                            <tr>
                                <th>Booking ID</th>
                                <th>Transaction ID</th>
                                <th>User ID</th>
                                <th>Court Name</th>
                                <th>Date and Time</th>
                                <th>Paid Amount</th>
                                <th>Booking Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (<h1>All Bookings Loading...<Loader /></h1>) : (
                                bookings.length > 0 ? (
                                    <>
                                        {bookings.map((booking, index) => (
                                            <tr key={index}>
                                                <td>{booking._id}</td>
                                                <td>{booking.transactionId}</td>
                                                <td>{booking.userId}</td>
                                                <td>{booking.court}</td>
                                                <td>{booking.startDate} to {booking.endDate}</td>
                                                <td>${booking.totalAmount}</td>
                                                <td>{booking.status === "Booked" ? <Tag color="blue">CONFIRMED</Tag> : (<Tag color="red">CANCELLED</Tag>)}</td>
                                                <hr />
                                            </tr>
                                        ))}
                                    </>
                                ) : (<h1>No Data Loaded</h1>)
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}



//// Admin - Courts
export function Courts() {
    const [courts, setCourts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/courts/getAllCourts`);
                setCourts(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(true);
                setError(error);
            }
        }
        fetchData();
    }, [])

    return (
        <div className="row">
            <div className="col-md">
                {isLoading ? <h1 className="text-header"><Loader /></h1> : (courts.length <= 0 ? <h1 className="text-header">There is no court</h1> : <h1 className="text-header"> {courts.length} Courts Loaded </h1>)}
                <div div className="table-responsive" >
                    <table className="table table-bordered table-dark ">
                        <thead>
                            <tr>
                                <th>Court ID</th>
                                <th>Court Name</th>
                                <th>Court Type</th>
                                <th>Court Amount</th>
                                <th>Court Location</th>
                                <th>Current Booking</th>
                                <th>Max Players</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (<h1>All Courts Loading...<Loader /></h1>) : (
                                courts.length > 0 ? (
                                    <>
                                        {courts.map((court, index) => (
                                            <tr key={index}>
                                                <td>{court._id}</td>
                                                <td>{court.name}</td>
                                                <td>{court.type}</td>
                                                <td>{court.price}</td>
                                                <td>{court.location}</td>
                                                <td>{court.currentBookings.length} booked</td>
                                                <td>{court.maxPlayers}</td>
                                                <hr />
                                            </tr>
                                        ))}
                                    </>
                                ) : (<h1>No Data Load</h1>)
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}


//// Admin - Users
export function Users() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/getAllUsers`);
                setUsers(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(true);
                setError(error);
            }
        }
        fetchData();
    }, [])

    return (
        <div className="row">
            <div className="col-md">
                {isLoading ? <h1 className="text-header"><Loader /></h1> : (users.length <= 0 ? <h1 className="text-header">There is no user</h1> : <h1 className="text-header"> {users.length} Users Loaded </h1>)}
                <div div className="table-responsive" >
                    <table className="table table-bordered table-dark ">
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>User Name</th>
                                <th>User Email</th>
                                <th>User Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (<h1>All Users Loading...<Loader /></h1>) : (
                                users.length > 0 ? (
                                    <>
                                        {users.map((user, index) => (
                                            <tr key={index}>
                                                <td>{user._id}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.isAdmin ? <h1><Tag color="green">Administrator</Tag></h1> : <h1><Tag color="blue">Booking.Football Member</Tag></h1>}</td>
                                                <hr />
                                            </tr>
                                        ))}
                                    </>
                                ) : (<h1>No Data Load</h1>)
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}