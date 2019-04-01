const db = require('./config/sequelize');
db.authenticate().then(() => console.log('database connected')).catch((err) => console.log(err))

const express = require('express'); // importina express frameworka
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');
const mysql = require('mysql');
const customerRoutes = require('./routes/api/customers') //importina routes is routes/api
const authRoutes = require('./routes/api/auth');

// Tokiu nesamoniu zinot nereikia. Paimta is express docs. Ju reikia kad butu galima extractint data is formu
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));  // Kad butu galima i ta pati route siusti GET POST PUT ir DELETE requestus






app.use('/api/customers', customerRoutes);   // naudoja routes
app.use('/api/auth', authRoutes);   // naudoja routes




// Serveris
const port = 5000;
app.listen(port, () => `Server running on port ${port}`);