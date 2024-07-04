const express = require('express');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors')



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

app.post("/get-alert",(req,res)=>{
    console.log(req)
    // Check the content type of the incoming request
    if (req.is('application/json')) {
        console.log('Received JSON:', req.body);
        res.json(req.body); // Send back the parsed JSON body as the response
    } else if (req.is('text/plain')) {
        console.log('Received plain text:', req.body);
        res.send(req.body); // Send back the plain text body as the response
    } else {
        res.status(415).send('Unsupported Media Type'); // If the content type is not supported
    }
})


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
