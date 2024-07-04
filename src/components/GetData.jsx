import React, { useState, useEffect } from 'react';
import axios from 'axios';


function GetData() {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('/update-data')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

  return (
    <div>
            <h1>Received Data</h1>
            <p>Parameter: {data.parameter}</p>
            <p>Body: {data.body}</p>
        </div>
  )
}

export default GetData