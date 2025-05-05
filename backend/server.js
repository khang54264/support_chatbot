const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

//Khởi tạo ứng dụng
const app = express();

const PORT = 5000;

const allowedOrigins = ['http://localhost:3000', 'http://localhost:8081', 'http://localhost:8082'];

app.use(cors({
  origin: allowedOrigins, //Kết nối tới frontend 
  methods: ['GET','POST','PUT','DELETE','OPTIONS'], //Các phương thức HTTP được phép
  credentials: true,
}));
app.options('*',cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

//Routes



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

