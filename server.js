const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const ToDoRoutes = require('./routes/ToDoRoutes');

app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api/todo', ToDoRoutes);


const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
})