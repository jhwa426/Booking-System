import React, { useEffect, useState } from 'react'
import { Tabs, Tag } from 'antd';
import "./Admin.css";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import Swal from 'sweetalert2'

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
                <h1 className="admin-text">Booking.Football Management</h1>
                <Tabs defaultActiveKey="3">
                    <TabPane tab="Users" key="1">
                        <Users />
                    </TabPane>
                    <TabPane tab="Booking" key="2">
                        <Bookings />
                    </TabPane>
                    <TabPane tab="Courts" key="3">
                        <Courts />
                    </TabPane>
                    <TabPane tab="Add Court" key="4">
                        <AddCourt />
                    </TabPane>
                    <TabPane tab="Update Court" key="5">
                        <UpdateCourt />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
}

export default Admin;



//// Admin - Users key="1"
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
                setIsLoading(false);
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
                    <table className="table table-bordered table-dark user-table">
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
                                                <td data-label>{user._id}</td>
                                                <td data-label>{user.name}</td>
                                                <td data-label>{user.email}</td>
                                                <td data-label>{user.isAdmin ? <h1><Tag color="green">Administrator</Tag></h1> : <h1><Tag color="blue">Booking.Football Member</Tag></h1>}</td>
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
        </div >
    );
}



//// Admin - Bookings key="2"
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
                setIsLoading(false);
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
                    <table className="table table-bordered table-dark booking-table">
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
                                                <td data-label>{booking._id}</td>
                                                <td data-label>{booking.transactionId}</td>
                                                <td data-label>{booking.userId}</td>
                                                <td data-label>{booking.court}</td>
                                                <td data-label>{booking.startDate} to {booking.endDate}</td>
                                                <td data-label>${booking.totalAmount}</td>
                                                <td data-label>{booking.status === "Booked" ? <Tag color="blue">CONFIRMED</Tag> : (<Tag color="red">CANCELLED</Tag>)}</td>
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



//// Admin - Courts key="3"
export function Courts() {
    const [courts, setCourts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/courts/getAllCourts`);
                setCourts(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
                setError(error);
            }
        }
        fetchData();
    }, [])


    // Admin - Delete the current Court
    async function deleteCourt(id) {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/courts/deleteCourt/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            Swal.fire({
                title: 'Successful',
                text: 'Court has been successfully deleted!',
                icon: 'success',
                confirmButtonText: 'Close'
            }).then(response => {
                window.location.href = "/admin";
            });

            const message = await response.text();
            console.log(message);

            setCourts(courts.filter(court => court._id !== id));
        } catch (error) {
            console.error('There was a problem with the fetch operation: ' + error.message);

            Swal.fire({
                title: 'Error',
                text: 'There was a problem deleting the court: ' + error.message,
                icon: 'error',
                confirmButtonText: 'Close'
            })
        }
    }


    return (
        <div className="row">
            <div className="col-md">
                {isLoading ? <h1 className="text-header"><Loader /></h1> : (courts.length <= 0 ? <h1 className="text-header">There is no court</h1> : <h1 className="text-header"> {courts.length} Courts Loaded </h1>)}
                <div div className="table-responsive" >
                    <table className="table table-bordered table-dark court-table">
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Court ID</th>
                                <th>Court Name</th>
                                <th>Court Type</th>
                                <th>Court Amount</th>
                                <th>Court Location</th>
                                <th>Current Booking</th>
                                <th>Max Players</th>
                                <th>Court Management</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (<h1>All Courts Loading...<Loader /></h1>) : (
                                courts.length > 0 ? (
                                    <>
                                        {courts.map((court, index) => (
                                            <tr key={index}>
                                                <td data-label>{currentUser._id}</td>
                                                <td data-label>{court._id}</td>
                                                <td data-label>{court.name}</td>
                                                <td data-label>{court.type}</td>
                                                <td data-label>{court.price}</td>
                                                <td data-label>{court.location}</td>
                                                <td data-label>{court.currentBookings.length} booked</td>
                                                <td data-label>{court.maxPlayers}</td>
                                                <td data-label><button className="btn btn-primary delete-btn" onClick={() => deleteCourt(court._id)}>Delete Court</button></td>
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



//// Admin - Add Court key="4"
export function AddCourt() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [maxPlayers, setMaxPlayers] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState("");

    const [description, setDescription] = useState("");
    const [imgURL1, setImgURL1] = useState("");
    const [imgURL2, setImgURL2] = useState("");
    const [imgURL3, setImgURL3] = useState("");

    async function addCourt() {
        if (!name || !location || !maxPlayers || !price || !type || !description || !imgURL1 || !imgURL2 || !imgURL3) {
            Swal.fire({
                title: 'Error',
                text: 'All fields must be filled!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        const newCourt = {
            name,
            location,
            maxPlayers: parseInt(maxPlayers),
            price: parseInt(price),
            type,
            description,
            imgURLs: [imgURL1, imgURL2, imgURL3],
        }

        try {
            setIsLoading(true);
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/courts/addCourt`, newCourt);
            const addedCourt = response.data;
            setIsLoading(false);

            Swal.fire({
                title: 'Successful',
                text: 'New Court has been successfully added!',
                icon: 'success',
                confirmButtonText: 'Close'
            }).then(response => {
                window.location.href = "/home";
            });

            setName("");
            setLocation("");
            setMaxPlayers("");
            setPrice("");
            setType("");
            setDescription("");

            setImgURL1("");
            setImgURL2("");
            setImgURL3("");

        } catch (error) {
            setIsLoading(false);
            console.log("Error:", error.response ? error.response.data : error.message);
            setError(error);
        }
    }


    return (
        <div className="row add-court-content">
            <div className="col-md-5">
                <input type="text" className="form-control add-court-form" placeholder="Court Name" value={name} onChange={(e) => { setName(e.target.value) }} />
                <input type="text" className="form-control add-court-form" placeholder="Location" value={location} onChange={(e) => { setLocation(e.target.value) }} />
                <input type="number" className="form-control add-court-form" placeholder="Max Players" value={maxPlayers} onChange={(e) => { setMaxPlayers(e.target.value) }} />
                <input type="number" className="form-control add-court-form" placeholder="Price" value={price} onChange={(e) => { setPrice(e.target.value) }} />
                <input type="text" className="form-control add-court-form" placeholder="Type" value={type} onChange={(e) => { setType(e.target.value) }} />
            </div>

            <div className="col-md-5">
                <input type="text" className="form-control add-court-form" placeholder="Description" value={description} onChange={(e) => { setDescription(e.target.value) }} />
                <input type="text" className="form-control add-court-form" placeholder="Image URL 1" value={imgURL1} onChange={(e) => { setImgURL1(e.target.value) }} />
                <input type="text" className="form-control add-court-form" placeholder="Image URL 2" value={imgURL2} onChange={(e) => { setImgURL2(e.target.value) }} />
                <input type="text" className="form-control add-court-form" placeholder="Image URL 3" value={imgURL3} onChange={(e) => { setImgURL3(e.target.value) }} />
                <div className="text-right">
                    <button className="btn btn-primary add-btn" onClick={addCourt}>Add Court</button>
                </div>
            </div>
        </div>
    );
}



//// Admin - Update Court key="5"
export function UpdateCourt() {
    const [courtId, setCourtId] = useState("");
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [maxPlayers, setMaxPlayers] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState("");

    const [description, setDescription] = useState("");
    const [imgURL1, setImgURL1] = useState("");
    const [imgURL2, setImgURL2] = useState("");
    const [imgURL3, setImgURL3] = useState("");

    useEffect(() => {
        Swal.fire({
            title: 'IMPORTANT',
            text: 'Please make sure the court ID!',
            icon: 'info',
            confirmButtonText: 'OK'
        });
    }, [])

    async function updateCourt(id) {
        if (!courtId || !name || !location || !maxPlayers || !price || !type || !description || !imgURL1 || !imgURL2 || !imgURL3) {
            Swal.fire({
                title: 'Error',
                text: 'All fields must be filled!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        const updateCourt = {
            courtId,
            name,
            location,
            maxPlayers: parseInt(maxPlayers),
            price: parseInt(price),
            type,
            description,
            imgURLs: [imgURL1, imgURL2, imgURL3],
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/courts/updateCourt/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateCourt)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            Swal.fire({
                title: 'Successful',
                text: 'Court has been successfully updated!',
                icon: 'success',
                confirmButtonText: 'Close'
            }).then(response => {
                window.location.href = "/admin";
            });

            setCourtId("");
            setName("");
            setLocation("");
            setMaxPlayers("");
            setPrice("");

            setType("");
            setDescription("");
            setImgURL1("");
            setImgURL2("");
            setImgURL3("");

            const updatedCourt = await response.json();


        } catch (error) {
            console.error('There was a problem with the fetch operation: ' + error.message);

            Swal.fire({
                title: 'Error',
                text: 'Please check the court ID! There was a problem updating the court.',
                icon: 'error',
                confirmButtonText: 'Close'
            }).then(response => {
                window.location.href = "/admin";
            });

        }
    }


    return (
        <div className="row update-court-content">
            <div className="col-md-5">
                <input type="text" className="form-control update-court-form" placeholder="Court ID" value={courtId} onChange={(e) => { setCourtId(e.target.value) }} />
                <input type="text" className="form-control update-court-form" placeholder="Court Name" value={name} onChange={(e) => { setName(e.target.value) }} />
                <input type="text" className="form-control update-court-form" placeholder="Location" value={location} onChange={(e) => { setLocation(e.target.value) }} />
                <input type="number" className="form-control update-court-form" placeholder="Max Players" value={maxPlayers} onChange={(e) => { setMaxPlayers(e.target.value) }} />
                <input type="number" className="form-control update-court-form" placeholder="Price" value={price} onChange={(e) => { setPrice(e.target.value) }} />
            </div>

            <div className="col-md-5">
                <input type="text" className="form-control update-court-form" placeholder="Type" value={type} onChange={(e) => { setType(e.target.value) }} />
                <input type="text" className="form-control update-court-form" placeholder="Description" value={description} onChange={(e) => { setDescription(e.target.value) }} />
                <input type="text" className="form-control update-court-form" placeholder="Image URL 1" value={imgURL1} onChange={(e) => { setImgURL1(e.target.value) }} />
                <input type="text" className="form-control update-court-form" placeholder="Image URL 2" value={imgURL2} onChange={(e) => { setImgURL2(e.target.value) }} />
                <input type="text" className="form-control update-court-form" placeholder="Image URL 3" value={imgURL3} onChange={(e) => { setImgURL3(e.target.value) }} />
                <div className="text-right">
                    <button className="btn btn-primary update-btn" onClick={() => updateCourt(courtId)}>Update Court</button>
                </div>
            </div>
        </div>
    )
}