const mongoose = require('mongoose');
require('dotenv').config()
const mongoURI = process.env.MONGO_URI

mongoose.connect(mongoURI)

const db = mongoose.connection;

db.on('connected', () => console.log('Mongodb database connected...'));

db.on('disconnected', () => console.log('Mongodb database disconnected'));

module.exports = db