const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI  } = require('@google/generative-ai');
require('dotenv').config();

// Import routes
const userRoutes = require('./routes/userRoute');
const lecturerRoutes = require('./routes/lecturerRoute');
const logRoutes = require('./routes/logRoute');
const faqRoutes = require('./routes/faqRoute');
const queryRoutes = require('./routes/queryRoute');

//Khởi tạo ứng dụng
const app = express();
const PORT = 5000;

const apiKey = process.env.CHATBOT_API_KEY;
const genAI = new GoogleGenerativeAI ({ apiKey });
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });


const allowedOrigins = ['http://localhost:3000', 'http://localhost:8081', 'http://localhost:8082'];

app.use(cors({
  origin: allowedOrigins, //Kết nối tới frontend
  methods: ['GET','POST','PUT','DELETE','OPTIONS'], //Các phương thức HTTP được phép
  credentials: true,
}));
// app.options('*',cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
      return res.status(400).json({ error: "Missing 'message' in request" });
  }

  try {
      const result = await model.generateContent(userMessage);
      const botResponse = result.response.text();
      res.json({ response: botResponse });
  } catch (error) {
      console.error("Error generating content:", error);
      res.status(500).json({ error: error.message });
  }
});

// Use routes
app.use(userRoutes);
app.use(lecturerRoutes);
app.use(logRoutes);
app.use(faqRoutes);
app.use(queryRoutes);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/supportchatbot')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Sample route
app.get('/', (req, res) => {
    res.send('Backend is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});