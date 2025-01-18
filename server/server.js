const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const data = require('./db.json');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/destination', (req, res) => {
    res.json(data.destination);
});

app.get('/hotels', (req, res) => {
    res.json(data.hotels);
});

app.post('/hotels', (req, res) => {
    const { city } = req.body;
    const hotels = data.hotels.filter((hotel) => hotel.city === city);
    res.json(hotels);
});

app.get('/hotels/city/:city', (req, res) => {
    const { city } = req.params;
    const hotels = data.hotels.filter((hotel) => hotel.city === city);
    res.json(hotels);
});

app.get('/hotels/name/:name', (req, res) => {
    const { name } = req.params;
    const hotel = data.hotels.filter((hotel) => hotel.name === name);
    res.json(hotel);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});