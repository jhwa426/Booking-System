import React, { useState, CSSProperties } from 'react';
import HashLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const Loader = () => {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");

    return (
        <div className="sweet-loading">
            <HashLoader
                color="#000"
                loading={loading}
                css={override}
                size={80}
            />
        </div>
    );
}

export default Loader;
