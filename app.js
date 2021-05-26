const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');


const app = express();



//middleware
app.use(express.static('public'));
app.use(express.json());
//app.use(express.urlencoded( { extended: true} ));
app.use(morgan('dev'));
app.use(cookieParser());


app.set('view engine', 'ejs');

//connected mongodb
const dbURI = 'mongodb+srv://node2:katasandi889@nodeexample.9hya4.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true,
     useFindAndModify: false, 
     useCreateIndex: true})
.then((result) => app.listen(3000))
.catch((err) => {
    console.log(err);
})


//routes
app.get('*', checkUser);
app.get('/',(req, res) => res.render('home'));

app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));

app.use(authRoutes);

