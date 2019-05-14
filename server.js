const express = require('express'); // importina express frameworka
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
const cors = require('cors');
const customerRoutes = require('./routes/api/customers') //importina routes is routes/api
const authRoutes = require('./routes/api/auth');
const eventRoutes = require('./routes/api/events');
const userRoutes = require('./routes/api/users');
const autoTextCompletion=require('./routes/api/autoTextCompletion');
const ticketRoutes = require('./routes/api/tickets');

const passport = require('passport');
const session = require('express-session');
// Tokiu nesamoniu zinot nereikia. Paimta is express docs. Ju reikia kad butu galima extractint data is formu
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));  // Kad butu galima i ta pati route siusti GET POST PUT ir DELETE requestus
app.use(morgan('dev')); //logger
//PASSPORT
require('./config/passport')(passport);

app.use(session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
);  
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/customers', customerRoutes);   // naudoja routes
app.use('/api/auth', authRoutes);   // naudoja routes
app.use('/api/events', eventRoutes);
app.use('/api/autoTextCompletion', autoTextCompletion);



app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes);


// Serveris
const port = 5000;
app.listen(port, () => `Server running on port ${port}`);