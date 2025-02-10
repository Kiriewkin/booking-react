const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const loadData = (lang) => {
    const filePath = path.join(__dirname, `db${lang.toUpperCase()}.json`);
    try {
        if (fs.existsSync(filePath)) {
            return JSON.parse(fs.readFileSync(filePath, 'utf8'));
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
};

app.get('/destination', (req, res) => {
    const lang = req.query.lang || 'en';
    const data = loadData(lang);
    if (data) {
        res.json(data.destination);
    } else {
        res.status(500).json({ message: 'Ошибка загрузки данных' });
    }
});

app.get('/hotels', (req, res) => {
    const lang = req.query.lang || 'en';
    const data = loadData(lang);
    if (data) {
        res.json(data.hotels)
    } else {
        res.status(500).json({ message: 'Ошибка загрузки данных' });
    }
});

app.post('/hotels', (req, res) => {
    const { city, lang } = req.body;
    const data = loadData(lang || 'en');
    if (data) {
        const hotels = data.hotels.filter((hotel) => hotel.city === city);
        res.json(hotels);
    } else {
        res.status(500).json({ message: 'Ошибка загрузки данных для отелей по городу' });
    }
});

app.get('/hotels/city/:city', (req, res) => {
    const { city } = req.params;
    const lang = req.query.lang || 'en';
    const data = loadData(lang);
    if (data) {
        const hotels = data.hotels.filter((hotel) => hotel.city === city);
        res.json(hotels);
    } else {
        res.status(500).json({ message: 'Ошибка загрузки данных для отелей по городу' });
    }
});

app.get('/hotels/name/:name', (req, res) => {
    const { name } = req.params;
    const lang = req.query.lang || 'en';
    const data = loadData(lang);
    if (data) {
        const hotel = data.hotels.filter((hotel) => hotel.name === name);
        res.json(hotel);
    } else {
        res.status(500).json({ message: 'Ошибка загрузки данных для отеля' });
    }
});

// app.post('/hotels', (req, res) => {
//     const { city } = req.body;
//     const hotels = data.hotels.filter((hotel) => hotel.city === city);
//     res.json(hotels);
// });

// app.get('/hotels/city/:city', (req, res) => {
//     const { city } = req.params;
//     const hotels = data.hotels.filter((hotel) => hotel.city === city);
//     res.json(hotels);
// });

// app.get('/hotels/name/:name', (req, res) => {
//     const { name } = req.params;
//     const hotel = data.hotels.filter((hotel) => hotel.name === name);
//     res.json(hotel);
// });

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});