import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./Court.css";

const Courts = ({ court }) => {
    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    return (
        <div className="row">

            <div className="col-md-4">
                <img src={court.imgURLs[0]} className="smallimg" />
            </div>

            <div className="col-md-7">

            </div>

            <h1>{court.name}</h1>
        </div>
    );
}

export default Courts;