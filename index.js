const express = require('express')
const app = express()
const port = 3000;

const msg = `data: hello`;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/sse', (req, res) => {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("connection", "keep-alive");
    res.setHeader("Content-Type", "text/event-stream");


    setInterval(() => {
        // const data = JSON.stringify({ ticker: dataSource });
        res.write(`id: ${(new Date()).toLocaleTimeString()}\n data: ${msg}\n\n`);
      }, 1000);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})