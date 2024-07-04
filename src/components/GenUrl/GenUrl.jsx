import {React, useState} from 'react'
import axios from 'axios'
import GetData from '../GetData'


function GenUrl() {
    const [getUrl, setUrl] = useState()

    const urlHandler=async()=>{
        const res = await axios.get("http://45.77.70.32:80/generate-url")
        setUrl(res.data['url'])
    }
  return (
    <div>
        <div>
            <h1>
                Generate Your Url
            </h1>
            <button onClick={urlHandler}>Generate</button>
            <div>
                <p>{getUrl}</p>
            </div>
        </div>       
        <GetData /> 
    </div>
  )
}

export default GenUrl