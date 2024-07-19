require('dotenv').config();
const connectDB = require('./db/database');
const express = require('express');
const path = require('path');
const app = require("./server");
const cors=require("cors");
app.use(cors()); 
connectDB();
const PORT = 3000;

app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(require("./routes/menu.routes"));
app.use(require("./routes/mesero.routes"));
app.use(require("./routes/user.routes"))

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
