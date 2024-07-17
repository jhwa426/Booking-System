import React, { useState } from 'react';
import HashLoader from "react-spinners/ClipLoader";
import "./Loader.css";

const Loader = () => {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");

    return (
        <div className="sweet-loading">
            <HashLoader
                color="#000"
                loading={loading}
                size={80}
            />
        </div>
    );
}

export default Loader;
