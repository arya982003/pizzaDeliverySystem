const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./route/userRoute');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/Pizza_management_system').then(()=>{
    console.log('connected to database');
}).catch((err)=>{
    console.log(err);
});

app.use(express.json());

// Routes

app.use('/api', userRoutes);

// Start the server

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
