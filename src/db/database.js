const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI_local);
        console.log('MongoDB conectado a la base de datos');
    } catch (error) {
        console.error('Error al conectar a la base MongoDB:', error);
        process.exit(1);
    }
};
module.exports = connectDB;