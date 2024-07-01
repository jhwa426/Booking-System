import React from 'react'

const Success = ({ message }) => {
    return (
        <div>
            <div class="alert alert-success" role="alert">
                {message}
            </div>
        </div>
    );
}

export default Success; 