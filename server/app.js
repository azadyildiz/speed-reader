const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const methodOverride = require('method-override');

const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/file');

dotenv.config();

async function dbConnection() {
    try {
        await mongoose.connect(`${process.env.DB_HOST_AND_PORT}/${process.env.DB_NAME}`);
        console.log('Connected to mongoDB.');
    } catch (err) {
        console.log(err);
    }
}
dbConnection();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(methodOverride('_method'));

app.use(cors());
app.options('*', cors());



app.use('/auth', authRoutes);
app.use('/files', fileRoutes);

app.listen(port, () => {
    console.log(`Server running on ${port} port.`);
});