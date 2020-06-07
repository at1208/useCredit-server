const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();

const userRoutes = require('./routes/user');
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



// app.all('/*', (req, res, next) => {
//       const allowedReferers = ['http://localhost:8000'];
//       if(allowedReferers.indexOf(req.headers.origin) !== -1){
//         res.header('Access-Control-Allow-Origin', req.headers.origin);
//       }else {
//         res.header('Access-Control-Allow-Origin', null);
//       }
//       res.header('Access-Control-Allow-Credentials', true);
//       res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//       res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type,token, Access-Control-Request-Method, Access-Control-Request-Headers');
//       if (req.method === 'OPTIONS') {
//         res.sendStatus(200);
//       } else {
//         next();
//       }
// });


app.use(cors());

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api', userRoutes);
app.use('/api', transactionRoutes);

// cors
// if (process.env.NODE_ENV === 'development') {
//     app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
// } else{
//     app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
// }


// port
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
