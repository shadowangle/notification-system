var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var MongoClient = require('mongodb').MongoClient;
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('users');

var service = {};

service.authenticate = authenticate;
service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;


module.exports = service;

function authenticate(username, password) {
    var deferred = Q.defer();

    db.users.findOne({ username: username }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user && bcrypt.compareSync(password, user.hash)) {
            // authentication successful
            deferred.resolve({
                    _id: user._id,
                    username: user.username,
                    height: user.height,
                    weight: user.weight,
                    gender: user.gender,
                    contactNumber : user.contactNumber,
                    contactName : user.contactName,
                    age : user.age,
                    phoneNumber: user.phoneNumber,
                    mail: user.mail,
                    fitbitInfor :user.fitbitInfor,
                    googleapis : user.googleapis,
                    Status:user.Status,
                token: jwt.sign({ sub: user._id }, config.secret)
            });
        } else {
            // authentication failed
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getAll() {
    var deferred = Q.defer();

    db.users.find().toArray(function (err, users) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return users (without hashed passwords)
        users = _.map(users, function (user) {
            return _.omit(user, 'hash');
        });

        deferred.resolve(users);
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user) {
            // return user (without hashed password)
            deferred.resolve({
                _id: user._id,
                username: user.username,
                height: user.height,
                weight: user.weight,
                gender: user.gender,
                contactNumber : user.contactNumber,
                contactName : user.contactName,
                age : user.age,
                phoneNumber: user.phoneNumber,
                mail: user.mail,
                fitbitInfor :user.fitbitInfor,
                googleapis : user.googleapis,
                Status:user.Status,
            token: jwt.sign({ sub: user._id }, config.secret)
        });
    
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function create(userParam) {
    var deferred = Q.defer();

    // validation
    db.users.findOne(
        { username: userParam.username },
        function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (user) {
                // username already exists
                deferred.reject('Username "' + userParam.username + '" is already taken');
            } else {
                createUser();
            }
        });

    function createUser() {
        // set user object to userParam without the cleartext password
        var user = _.omit(userParam, 'password');
        const url =  "mongodb://localhost:27017/Login-fitbit";
        // add hashed password to user object
        user.hash = bcrypt.hashSync(userParam.password, 10);

        db.users.insert(
            user,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
            MongoClient.connect(url, function( err, db) {  
                if (err) throw err;
                var myquery = { username: userParam.username};
                 var newvalues = { $set: {  fitbitInfor : []} };
                  //.json["activities-heart-intraday"].dataset 
                db.collection("users").updateOne(myquery, newvalues, function(err, res) {
                  if (err) throw err;
                  console.log("1 document create");
                  db.close();
                });
              });
    }

    return deferred.promise;
}

function update(_id, userParam) {
    var deferred = Q.defer();
    
        db.users.findById(_id, function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);
            console.log("1");
    
            if (user) {
                // return user (without hashed password)
                
                updateUser();
                deferred.resolve({
                    _id: user._id,
                    username: user.username,
                    height: user.height,
                    weight: user.weight,
                    gender: user.gender,
                    contactNumber : user.contactNumber,
                    contactName : user.contactName,
                    age : user.age,
                    phoneNumber: user.phoneNumber,
                    mail: user.mail,
                    fitbitInfor :user.fitbitInfor,
                    googleapis : user.googleapis,
                    Status:user.Status,
                token: jwt.sign({ sub: user._id }, config.secret)
            });
                console.log("Update user successful");
            } else {
                // user not found
                console.log(deferred.resolve());
                deferred.resolve();
            }
        });
        // fields to update

    function updateUser() {
        
        var set = {

           mail : userParam.mail,
           Status : userParam.Status
        };

        // update password if it was entered
        if (userParam.password) {
            set.hash = bcrypt.hashSync(userParam.password, 10);
        }

        db.users.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set  },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);
                
                deferred.resolve();
                console.log("finish")
            });
    }
    console.log(deferred.promise)
    return deferred.promise;
}



function _delete(_id) {
    var deferred = Q.defer();

    db.users.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}