const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const User = require('./models/User')
const jwt = require('jsonwebtoken');
const cors = require('cors')
require('dotenv').config();

const connectToMongo = async () => {
try {
    mongoose.set('strictQuery', false)
    mongoose.connect(process.env.MONGO_URL)
    console.log('Mongo connected')
}
catch(error) {
    console.log(error)
    process.exit()
}
}
module.exports = connectToMongo;
// mongoose.connect(process.env.MONGO_URL, (err) => {
//     if (err) throw err;
// });
const jwtSecret = process.env.JWT_SECRET;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}))
app.get('/test', (req, res) => {
    res.json('test ok');
});

app.get('/profile', (req, res) => {
    const {token} = req.cookies?.token;
    if (token) {
        jwt.verify(token, jwtSecret, {}, (err, userData) => {
        if (err) throw err;
        res.json(userData);
    });
    } else {
        res.status(401).json('no token');
    }
});
app.post('/register', async(req, res) => {
    const {username, password} = req.body;
    try {
        const createdUser = await User.create({username, password});
        jwt.sign({userId:createdUser._id, username}, jwtSecret, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token, {sameSite: "none", secure: true}).status(201).json({
            id: createdUser._id,
        });
    });
    } catch (err) {
        if (err) throw err;
        res.status(500).json('error');
    }
});
app.listen(4000);
