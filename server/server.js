const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const app = express();
const SECRET_KEY = "your_secret_key";
const USERS_FILE = path.join(__dirname, "users.json");
app.use(cors());
app.use(bodyParser.json());

const loadUsers = () => {
    try {
        if (!fs.existsSync(USERS_FILE)) return [];
        return JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
    } catch (error) {
        console.error("Error reading users file:", error);
        return [];
    }
};

const saveUsers = (users) => {
    try {
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    } catch (error) {
        console.error("Error saving users file:", error);
    }
};

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

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const users = loadUsers();

    if (users.find(user => user.email === email)) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        id: uuidv4(),
        name,
        email,
        password: hashedPassword
    };

    users.push(newUser);
    saveUsers(users);

    const token = jwt.sign({ id: newUser.id, email }, SECRET_KEY, { expiresIn: "24h" });

    res.json({ user: { id: newUser.id, name, email }, token });
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const users = loadUsers();

    const user = users.find(user => user.email === email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, email }, SECRET_KEY, { expiresIn: "24h" });

    res.json({ user: { id: user.id, name: user.name, email: user.email, img: user.img, reviews: user.reviews }, token });
});

app.get('/profile', (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        res.json({ id: decoded.id, email: decoded.email });
    } catch {
        res.status(401).json({ message: "Invalid Token" });
    }
});

app.get('/users/:id', (req, res) => {
    const users = loadUsers();
    const userId = req.params.id;

    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Возвращаем без пароля
    const { password, ...safeUser } = user;
    res.json(safeUser);
});


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads', 'avatars'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/update-profile', upload.single('avatar'), async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const users = loadUsers();

        const userIndex = users.findIndex((user) => user.id === decoded.id);

        if (userIndex === -1) return res.status(404).json({ message: 'User not found' });

        const user = users[userIndex];

        if (req.file) {
            const avatarPath = path.join('uploads', 'avatars', req.file.filename);
            user.img = avatarPath;
        }

        if (req.body.name && req.body.name !== "") {
            user.name = req.body.name;
        }

        if (req.body.email && req.body.email !== "") {
            user.email = req.body.email;
        }

        if (req.body.oldPassword && req.body.newPassword) {
            const user = users[userIndex];

            const isOldPasswordCorrect = await bcrypt.compare(req.body.oldPassword, user.password);
            if (!isOldPasswordCorrect) {
                return res.status(400).json({ message: "Old password is incorrect" });
            }

            const hashedNewPassword = await bcrypt.hash(req.body.newPassword, 10);
            user.password = hashedNewPassword;
        } else if (req.body.oldPassword || req.body.newPassword) {
            return res.status(400).json({ message: "Both old and new passwords are required" });
        }

        saveUsers(users);

        res.json({ user: { id: user.id, name: user.name, email: user.email, img: user.img } });
    } catch (error) {
        res.status(400).json({ message: 'Error updating profile', error });
    }
});

app.post('/delete-avatar', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const users = loadUsers();

        const userIndex = users.findIndex((user) => user.id === decoded.id);
        if (userIndex === -1) return res.status(404).json({ message: 'User not found' });

        const user = users[userIndex];

        if (user.img) {
            const avatarPath = path.join(__dirname, user.img);
            fs.unlink(avatarPath, (err) => {
                if (err) {
                    console.error(`Error deleting avatar: ${err}`);
                }
            });

            user.img = "";
            saveUsers(users);

            return res.json({ message: 'Avatar deleted successfully' });
        } else {
            return res.status(400).json({ message: 'No avatar to delete' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error deleting avatar', error });
    }
});


app.post('/add-hotel', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const { hotelId } = req.body;

        if (!hotelId) {
            return res.status(400).json({ message: 'Hotel ID is required' });
        }

        const users = loadUsers();
        const userIndex = users.findIndex(user => user.id === decoded.id);

        if (userIndex === -1) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = users[userIndex];

        if (!user.favoriteHotels) {
            user.favoriteHotels = [];
        }

        if (user.favoriteHotels.includes(hotelId)) {
            return res.status(400).json({ message: 'Hotel is already reserved' });
        }

        user.favoriteHotels.push(hotelId);

        saveUsers(users);

        return res.status(200).json({ message: 'Hotel added to favorites', favoriteHotels: user.favoriteHotels });
    } catch (error) {
        console.error('Error adding hotel:', error);
        return res.status(500).json({ message: 'Error adding hotel to favorites', error });
    }
});

app.get('/reserved-hotels', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const users = loadUsers();
        const userIndex = users.findIndex(user => user.id === decoded.id);
        
        if (userIndex === -1) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = users[userIndex];

        if (!user.favoriteHotels || user.favoriteHotels.length === 0) {
            return res.status(200).json({ message: 'No favorite hotels found', favoriteHotels: [] });
        }

        return res.status(200).json({ favoriteHotels: user.favoriteHotels });
    } catch (error) {
        console.error('Error fetching reserved hotels:', error);
        return res.status(500).json({ message: 'Error fetching reserved hotels', error });
    }
});

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
    const sort = req.query.sort;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 12;

    const data = loadData(lang);
    if (!data) {
        return res.status(500).json({ message: 'Ошибка загрузки данных' });
    }

    let hotels = data.hotels;

    if (sort === "rating") {
        hotels = hotels.sort((a, b) => a.hotel_rating - b.hotel_rating);
    } else if (sort === "-rating") {
        hotels = hotels.sort((a, b) => b.hotel_rating - a.hotel_rating);
    } else if (sort === "price") {
        hotels = hotels.sort((a, b) => a.price - b.price);
    } else if (sort === "-price") {
        hotels = hotels.sort((a, b) => b.price - a.price);
    }

    const total = hotels.length;
    const startIndex = (page - 1) * pageSize;
    const paginatedHotels = hotels.slice(startIndex, startIndex + pageSize);

    res.json({ hotels: paginatedHotels, total });
});

app.get("/hotel/:id", (req, res) => {
    const { id } = req.params;
    const { lang } = req.query;

    if (!lang) {
        return res.status(400).json({ error: "Language parameter is required" });
    }

    const hotelsData = loadData(lang);
    if (!hotelsData || !hotelsData.hotels) {
        return res.status(500).json({ error: "Data loading failed" });
    }

    const hotel = hotelsData.hotels.find(hotel => hotel.id === parseInt(id));

    if (!hotel) {
        return res.status(404).json({ error: "Hotel not found" });
    }

    res.json(hotel);
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
    const sort = req.query.sort;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 12;

    const data = loadData(lang);
    if (!data) {
        return res.status(500).json({ message: 'Ошибка загрузки данных для отелей по городу' });
    }

    let hotels = data.hotels.filter((hotel) => hotel.city === city);

    if (sort === "rating") {
        hotels = hotels.sort((a, b) => a.hotel_rating - b.hotel_rating);
    } else if (sort === "-rating") {
        hotels = hotels.sort((a, b) => b.hotel_rating - a.hotel_rating);
    } else if (sort === "price") {
        hotels = hotels.sort((a, b) => a.price - b.price);
    } else if (sort === "-price") {
        hotels = hotels.sort((a, b) => b.price - a.price);
    }

    const total = hotels.length;
    const startIndex = (page - 1) * pageSize;
    const paginatedHotels = hotels.slice(startIndex, startIndex + pageSize);

    res.json({ hotels: paginatedHotels, total });
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

app.post('/hotels/:id/reviews', (req, res) => {
  const hotelId = parseInt(req.params.id);
  const { review } = req.body;

  if (!review || typeof review !== 'object' || !review.userId || !review.id) {
    return res.status(400).json({ error: 'Review must include userId and id' });
  }

  // Отзыв, который попадет в базы с отелями
  const publicReview = {
    id: review.id,
    firstName: review.firstName,
    rating: review.rating,
    date: review.date,
    comment: review.comment
  };

  const addReviewToHotelData = (lang) => {
    const filePath = path.join(__dirname, `db${lang.toUpperCase()}.json`);
    if (!fs.existsSync(filePath)) throw new Error(`File for lang ${lang} not found`);

    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const hotel = data.hotels.find(h => h.id === hotelId);
    if (!hotel) throw new Error(`Hotel with id ${hotelId} not found in lang ${lang}`);

    if (!Array.isArray(hotel.reviews)) hotel.reviews = [];
    hotel.reviews.push(publicReview);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  };

  const addReviewToUser = (userId, reviewId) => {
    if (!fs.existsSync(USERS_FILE)) throw new Error(`Users file not found`);

    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error(`User with id ${userId} not found`);

    if (!Array.isArray(user.reviews)) user.reviews = [];
    if (!user.reviews.includes(reviewId)) user.reviews.push(reviewId);

    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  };

  try {
    addReviewToHotelData('en');
    addReviewToHotelData('ua');
    addReviewToUser(review.userId, review.id);

    res.status(200).json({ message: 'Review successfully saved to hotels and user' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});