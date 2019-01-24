const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const User = require('./models/user');

const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5c4a1c8dca70a75460a7d83e')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb://shop1:fmz9yrAxPDxSR2h@cluster0-shard-00-00-tvcny.mongodb.net:27017,cluster0-shard-00-01-tvcny.mongodb.net:27017,cluster0-shard-00-02-tvcny.mongodb.net:27017/shop?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true')
  .then(result => {
    User.findOne()
      .then(user => {
        if (!user) { 
          const user = new User({
            name: 'Den',
            email: 'den@tut.by',
            cart: {
              items: []
            }
          });
          user.save();
        }
      });

    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });