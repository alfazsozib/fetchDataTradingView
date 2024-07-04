const express = require('express');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors')



const app = express();
app.use(cors());
const port = 3007;

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
    const uniqueUrl = `http://localhost:${port}/${uniqueId}`;
    res.json({ url: uniqueUrl });
});

app.post("/get-alert",(req,res)=>{
    console.log(req.body)
})


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
