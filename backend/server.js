// filepath: d:\DATN\supportchatbot\backend\server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI  } = require('@google/generative-ai');
const jwt = require('jsonwebtoken'); // Import JWT
const bcrypt = require('bcryptjs'); // Import bcrypt
const session = require('express-session');
require('dotenv').config();

// Import routes
const userRoutes = require('./routes/userRoute');
const lecturerRoutes = require('./routes/lecturerRoute');
const chatSessionRoutes = require('./routes/chatSessionRoute');
const chatMessageRoutes = require('./routes/chatMessageRoute');
const faqRoutes = require('./routes/faqRoute');
const notificationRoutes = require('./routes/notificationRoute');
const User = require('./models/user');
const chatRoutes = require('./routes/chatRoute');
const verifyToken = require('./middleware/authMiddleware'); // Import the middleware
const chatbotRoute = require('./routes/chatbotRoute'); // Import the chatbot route

//Khởi tạo ứng dụng
const app = express();
const PORT = 5000;


// const allowedOrigins = ['http://localhost:3000', 'http://localhost:8081', 'http://localhost:8082','exp://192.168.1.73:19000','*'];
// const allowedOrigins = ['*'];
// app.use(cors({
//   origin: allowedOrigins, //Kết nối tới frontend
//   methods: ['GET','POST','PUT','DELETE','OPTIONS'], //Các phương thức HTTP được phép
//   credentials: true,
// }));

app.use(cors({
  origin: function (origin, callback) {
    callback(null, origin); // Cho phép tất cả origin
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// app.options('*',cors());

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Admin Login Route
app.post('/admin/login', async (req, res) => {
        try {
            const { username, password } = req.body;

            // Find the user by username
            const user = await User.findOne({ username: username });

            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Check if the password is correct
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Check if the user has admin role (you might have a role field in your User model)
            if (user.role !== 'admin') {
                return res.status(403).json({ message: 'Unauthorized' });
            }

            // Generate JWT token
            const token = jwt.sign({ userId: user._id, role: user.role }, 'your-secret-key', { expiresIn: '1h' });

            res.status(200).json({ message: 'Admin logged in successfully', token: token });

        } catch (error) {
            console.error('Admin login failed:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });

app.use(session({
  secret: 'your-secret-key', // Replace with a strong secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true in production with HTTPS
}));

// Use routes
app.use(userRoutes);
app.use(lecturerRoutes);
app.use(chatMessageRoutes);
app.use(chatSessionRoutes);
app.use(faqRoutes);
app.use(notificationRoutes);
app.use(chatRoutes);
app.use(chatbotRoute); // Use the chatbot route
//mongodb+srv://xviruss2003:22112003@cluster0.8gm24q7.mongodb.net/
// MongoDB connection
mongoose.connect('mongodb+srv://xviruss2003:22112003@cluster0.8gm24q7.mongodb.net/supportchatbot')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Sample route
app.get('/', (req, res) => {
        res.send('Backend is running');
    });

app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });