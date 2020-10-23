const mongoose = require('mongoose');

const connectDB = () => {
    const conn =   mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

    console.log(`MongoDB Connected. `.cyan.underline.bold);
}

module.exports = connectDB;