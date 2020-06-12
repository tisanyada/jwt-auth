const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const multer = require('multer');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();

const keys = require('./config/keys');

// multer middleware
const { fileStorage, fileFilter } = require('./middlewares/fileuploadconfig');
// const fileStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads');
//     },
//     filename: (req, file, cb) => {
//         cb(null, new Date().toISOString() + '-' + file.originalname)
//     }
// });
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// };

// middlewares
app.use(helmet());
app.use(logger('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
// passport config
app.use(passport.initialize());
require('./config/passport')(passport);


const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');

app.use('/api/users', indexRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

app.use((req, res, next) => {
    res.json('route not found');
});




const port = process.env.PORT || 3000;
mongoose.connect(keys.mongoURI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        app.listen(port, () => {
            console.log('\nserver is running on port:    ', port);
            console.log('connected to database\n');
        });
    })
    .catch(err => console.log(err));


