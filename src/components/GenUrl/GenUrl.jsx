import {React, useState} from 'react'
import axios from 'axios'


function GenUrl() {
    const [getUrl, setUrl] = useState()

    const urlHandler=async()=>{
        const res = await axios.get("http://localhost:3000/generate-url")
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
    </div>
  )
}

export default GenUrl