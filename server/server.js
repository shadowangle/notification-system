require('rootpath')();
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var FitbitStrategy = require('./lib').FitbitOAuth2Strategy;
var GoogleStrategy = require( './lib2' ).Strategy;
var passport = require('passport');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');
var router = express.Router();
var userService = require('services/user.service');
var mongo = require('mongoskin');
var MongoClient = require('mongodb').MongoClient;
var db = mongo.db(config.connectionString, {
  native_parser: true
});
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var RedisStore       = require( 'connect-redis' )( session )
var util             = require( 'util' )
var GoogleStrategy = require( './lib2' ).Strategy;
// var readline = require('readline'); 
// var plus = google.plus('v1');
var prediction = require('@google-cloud/prediction');
var CronJob = require('cron').CronJob;
db.bind('users');

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser());
app.use(session({
  secret: 'keyboard cat'
}));


app.use(passport.initialize());
app.use(passport.session({
  resave: false,
  saveUninitialized: true
}));



var GOOGLE_CLIENT_ID      = "337252673817-3c1ltbmkd8tfv0uuh851rptau32mgdeo.apps.googleusercontent.com"
, GOOGLE_CLIENT_SECRET  = "7uP4Dgt-v8wSxGm6_xlj9fa0";


////////////////////////////////////////////////FITBIT API////////////////////////////////////////////////////////////

const url = "mongodb://localhost:27017/Login-fitbit";
const CLIENT_ID = '228PQV';
const CLIENT_SECRET = '5d610a9b2d2919f7d78f05b8c33c933a';

app.use(passport.initialize());
var fitbitStrategy = new FitbitStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  scope: ['activity', 'heartrate', 'location', 'profile'],
  callbackURL: "http://localhost:4000/auth/fitbit/callback"
}, function (accessToken, refreshToken, profile, heartrate, done) {

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var myquery = {
      username: 'shadowangle1'
    };
    var newvalues = {
      $set: {
        fitbitInfor: heartrate.json["activities-heart-intraday"].dataset
      }
    };
    //.json["activities-heart-intraday"].dataset 
    db.collection("users").updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();
    });
  });
  done(null, {
    profile: profile,
    heartrate: heartrate,
  });

});

passport.use(fitbitStrategy);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

var fitbitAuthenticate = passport.authenticate('fitbit', {
  successRedirect: 'http://localhost:3000/activity',
  failureRedirect: '/auth/fitbit/failure'
});

app.get('/auth/fitbit', fitbitAuthenticate);
app.get('/auth/fitbit/callback', fitbitAuthenticate);

app.get('/auth/fitbit/success', function(req, res, next) {
  res.send(req.user);
});


//////////////////////////////////////////////Google api/////////////////////////////////////////////////





new CronJob('2 * * * * *', function() {
  var predictionClient = prediction({
    projectId: 'predict-disease-notification',
    keyFilename: './key.json'
  });
  
  var model = predictionClient.model('symptom-identifier');
  
  //   // Train a model.
  //   model.train('english', 'Hello from your friends at Google!', function(err) {});
  



  var heartrate = [];
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection("users").findOne({}, function(err, result) {
      if (err) throw err;
      console.log(result.fitbitInfor.length)
      // for (i=0 ; i <result.fitbitInfor.length ; i++){
      //   var hr = result.fitbitInfor[i].value;
      //   heartrate.push(hr)
        
      // }
      // var hr = (result.fitbitInfor[result.fitbitInfor.length-1].value+result.fitbitInfor[result.fitbitInfor.length-2].value+result.fitbitInfor[result.fitbitInfor.length-3].value+result.fitbitInfor[result.fitbitInfor.length-4].value+result.fitbitInfor[result.fitbitInfor.length-5].value)/5;


      console.log(hr) 

      model.query(hr, function(err, results) {
        if (!err) {
          console.log(results)
          MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var myquery = {
              username: 'shadowangle1'
            };
            var newvalues = {
              $set: {
                googleapis: results
              }
            };
            //.json["activities-heart-intraday"].dataset 
            db.collection("users").updateOne(myquery, newvalues, function (err, res) {
              if (err) throw err;
              console.log("update heart rate");
              db.close();
            });
          });
          
        }
      });
      db.close();
    });
  });
  
  //   // Query a model.

  
  
}, null, true, 'America/Los_Angeles');



///////////////////////////////////////////////////////////////


// use JWT auth to secure the api, the token can be passed in the authorization header or querystring
app.use(expressJwt({
  secret: config.secret,
  getToken: function (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  }
}).unless({
  path: ['/users/authenticate', '/users/register']
}));

// routes
app.use('/users', require('./controllers/users.controller'));

// start server
var port = process.env.NODE_ENV === 'production' ? 80 : 4000;
var server = app.listen(port, function () {
  console.log('Server listening on port ' + port);
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}