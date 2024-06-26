require('dotenv').config();
const connectDB = require('./db/database');
const app = require("./server");
connectDB();
const PORT = process.env.PORT || 3000;

app.use(require("./routes/menu.routes"));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
