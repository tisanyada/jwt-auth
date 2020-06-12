const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();

const keys = require('./config/keys');

// middlewares
app.use(helmet());
app.use(logger('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// passport config
app.use(passport.initialize());
require('./config/passport')(passport);


const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');

app.use(indexRoutes);
app.use('/api/users', authRoutes);

app.use((req, res, next) => {
    res.json('route not found');
});




const port = process.env.PORT || 3300;
mongoose.connect(keys.mongoURI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        app.listen(port, () => {
            console.log('\nserver is running on port:    ', port);
            console.log('connected to database\n');
        });
    })
    .catch(err => console.log(err));


