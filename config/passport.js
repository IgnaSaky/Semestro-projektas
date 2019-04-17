const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const mysql = require('mysql');
const dbconfig = require('../config/database');
const db = mysql.createConnection(dbconfig.connection);

module.exports = function(passport) {
    passport.use(
      new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        // Match user
        db.query('SELECT * FROM users WHERE email = ?', [email], (err, rows) =>{
            if (!rows) {
              console.log('Vartotojas su tokiu el. pašto adresu neegzistuoja');
              return done(null, false, { message: 'Vartotojas su tokiu el. pašto adresu neegzistuoja' });
            }
            bcrypt.compare(password, rows[0].password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                  console.log('Viskas OK');
                  console.log(rows[0]);
                  return done(null, rows[0]);
                } else {
                  console.log("blogas passwd");
                  return done(null, false, { message: 'Klaidingas slaptažodis' });
                }
            });
        });
      })
  );

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    /*User.findById(id, function(err, user) {
        done(err, user);
    });*/
    db.query('SELECT * FROM user WHERE id = ?',[id], (err, rows) => {
      if(!err && rows) {
        done(err,rows[0])
      }
    });
  });
};
