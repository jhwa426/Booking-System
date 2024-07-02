import React from 'react'

const Error = ({ message }) => {
    return (
        <div>
            <div class="alert alert-danger" role="alert">
                {message}
            </div>
        </div>
    );
}

export default Error;