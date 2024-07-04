import React, { useState, useEffect } from 'react';
import axios from 'axios';


function GetData() {
    const [data, setData] = useState(null);

    const getData = async() =>{
        axios.get('http://45.77.70.32:80/update-data')
        .then(response => {
            setData(response.data);
            console.log(response.data)
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    if (!data) {
        return <div>Loading...</div>;
    }

  return (
    <div>

            <h1>Received Data</h1>
            <button onClick={getData}>Get Data</button>
            <p>Parameter: {data.parameter}</p>
            <p>Body: {data.body}</p>
        </div>
  )
}

export default GetData