const express = require('express');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors')



const app = express();
app.use(cors());
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
    // console.log()
    res.send(req)
})


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
