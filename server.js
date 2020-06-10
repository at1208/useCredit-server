const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();

const userRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transaction');

// db
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to DB'))
    .catch(err => {
        console.log(err);
    });


app.use(cors());

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api', userRoutes);
app.use('/api', transactionRoutes);


// port
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
