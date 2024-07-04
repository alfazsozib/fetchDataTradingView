const express = require('express');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors')
const axios = require("axios");


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 80;

// Storage for generated URLs
const urls = new Set();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/generate-url', (req, res) => {
    let uniqueId;
    do {
        uniqueId = uuidv4().replace(/-/g, '');
    } while (urls.has(uniqueId));
    urls.add(uniqueId);
    const uniqueUrl = `http://45.77.70.32:${port}/${uniqueId}`;
    res.json({ url: uniqueUrl });
});

//  middleware to parse plain text bodies
app.use((req, res, next) => {
    if (req.is('text/plain')) {
        let data = '';
        req.setEncoding('utf8');
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            req.body = data;
            next();
        });
    } else {
        next();
    }
});


app.post('/get-alert/:param', (req, res) => {
    // const param = req.params.param; 
    // console.log('Received dynamic parameter:', param);
    // if (req.is('text/plain')) {
    //     console.log('Received plain text:', req.body);
    //     res.json({
    //         parameter: param,
    //         body: req.body
    //     }); 
    // } else {
    //     res.status(415).send('Unsupported Media Type');
    // }

    const param = req.params.param; 
    console.log('Received dynamic parameter:', param);
    if (req.is('text/plain')) {
        console.log('Received plain text:', req.body);
        // Sending data to frontend
        axios.get(`http://45.77.70.32:3007/update-data`, {
            params: {
                parameter: param,
                body: req.body
            }
        }).then(response => {
            console.log('Data sent to React frontend:', response.data);
        }).catch(error => {
            console.error('Error sending data to React frontend:', error);
        });

        res.json({
            parameter: param,
            body: req.body
        }); 
    } else {
        res.status(415).send('Unsupported Media Type');
    }
});



app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
