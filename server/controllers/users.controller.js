var config = require('config.json');
var express = require('express');
var router = express.Router();
var userService = require('services/user.service');
var email = require('emailjs/email');
var MongoClient = require('mongodb').MongoClient;
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, {
    native_parser: true
});
db.bind('users');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/:_id', getById);
router.put('/:_id', update);
router.delete('/:_id', _delete);
router.post('/sendmail', sendMail);

module.exports = router;

function authenticate(req, res) {
    userService.authenticate(req.body.username, req.body.password)
        .then(function (user) {
            if (user) {
                // authentication successful
                res.send(user);
            } else {
                // authentication failed
                res.status(400).send('Username or password is incorrect');
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function register(req, res) {
    userService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAll(req, res) {
    userService.getAll()
        .then(function (users) {
            res.send(users);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function sendMail(req, res) {
    const url = "mongodb://localhost:27017/Login-fitbit";
    for (var i = 0; i < req.body.fitbitInfor.length; i++) {

    }
    var sum = (req.body.fitbitInfor[req.body.fitbitInfor.length - 10].value + req.body.fitbitInfor[req.body.fitbitInfor.length - 9].value + req.body.fitbitInfor[req.body.fitbitInfor.length - 8].value + req.body.fitbitInfor[req.body.fitbitInfor.length - 7].value + req.body.fitbitInfor[req.body.fitbitInfor.length - 6].value) / 5
    var sum1 = (req.body.fitbitInfor[req.body.fitbitInfor.length - 5].value + req.body.fitbitInfor[req.body.fitbitInfor.length - 4].value + req.body.fitbitInfor[req.body.fitbitInfor.length - 3].value + req.body.fitbitInfor[req.body.fitbitInfor.length - 2].value + req.body.fitbitInfor[req.body.fitbitInfor.length - 1].value) / 5
    var check = (((sum1) - sum) / sum) * 100

    console.log(sum1)
    console.log(req.body.fitbitInfor[req.body.fitbitInfor.length - 1].time)

    console.log(sum1)
    console.log(req.body.fitbitInfor[req.body.fitbitInfor.length - 2].time)
    console.log(check)

    var server = email.server.connect({
        user: "shadowangle1222@gmail.com",
        password: "0892471456",
        host: "smtp.gmail.com",
        ssl: true,
        port: 465
    });

    ////Fever

    // if (req.body.Status = 'beeding'){  
    //     server.send({
    //         text: "Test send email",
    //         from: "ADmin fitbit",
    //         to: req.body.mail,
    //         subject: "PDN Warning : bleeding",
    //         attachment: [{
    //             data: "<html> Warning " + req.body.username + " may massive blood loss. We suggest that you may need to take him/her to hospital as soon as possible. heartrate = " + req.body.fitbitInfor[req.body.fitbitInfor.length - 1].value + "</html>",
    //             alternative: true
    //         }, ]
    //     }, function (err, message) {
    //         if (err)
    //             console.log(err);
    //         else
    //             res.json({
    //                 success: true,
    //                 msg: 'sent bleeding'
    //             });
    //     });
    // }
    if (check > 30) {
        console.log("fever")
        if (req.body.Status != 'fever') {
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var myquery = {
                    username: req.body.username
                };
                var newvalues = {
                    $set: {
                        Status: "fever"
                    }
                };
                db.collection("users").updateOne(myquery, newvalues, function (err, res) {
                    if (err) throw err;
                    console.log("UpdateStatus fever");
                    db.close();
                });
            });
            server.send({
                text: "Test send email",
                from: "ADmin fitbit",
                to: req.body.mail,
                subject: "PDN Warning : fever",
                attachment: [{
                    data: "<html> Warning " + req.body.username + " may have fever. You may need to take care him/her by take medicine and let him/her rest for awhile. heartrate = " + req.body.fitbitInfor[req.body.fitbitInfor.length - 1].value + "</html>",
                    alternative: true
                }, ]
            }, function (err, message) {
                if (err)
                    console.log(err);
                else
                    res.json({
                        success: true,
                        msg: 'sent fever'
                    });
            });
        } else {
            console.log("already fever")
        }
    }
    ///lack of water
    if (check > 20 && check < 30) {
        console.log("lack of water")
        if (req.body.Status != 'lackofwater') {
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var myquery = {
                    username: req.body.username
                };
                var newvalues = {
                    $set: {
                        Status: "lackofwater"
                    }
                };
                db.collection("users").updateOne(myquery, newvalues, function (err, res) {
                    if (err) throw err;
                    console.log("UpdateStatus lackofwater");
                    db.close();
                });
            });
            server.send({
                text: "Test send email",
                from: "ADmin fitbit",
                to: req.body.mail,
                subject: "PDN Warning : lack of water",
                attachment: [{
                    data: "<html> Warning " + req.body.username + " may lack of water. You may give an advice him/her to drink more water. heartrate = " + req.body.fitbitInfor[req.body.fitbitInfor.length - 1].value + "</html>",
                    alternative: true
                }, ]
            }, function (err, message) {
                if (err)
                    console.log(err);
                else
                    res.json({
                        success: true,
                        msg: 'sent lack of water'
                    });
            });
        } else {
            console.log("already lack of water")
        }
    }
    ///heart disease
    if (check < -35) {
        console.log("heart disease")
        if (req.body.Status != 'heartdisease') {
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var myquery = {
                    username: req.body.username
                };
                var newvalues = {
                    $set: {
                        Status: "heartdisease"
                    }
                };
                db.collection("users").updateOne(myquery, newvalues, function (err, res) {
                    if (err) throw err;
                    console.log("UpdateStatus heart disease");
                    db.close();
                });
            });
            server.send({
                text: "Test send email",
                from: "ADmin fitbit",
                to: req.body.mail,
                subject: "PDN Warning : heart disease",
                attachment: [{
                    data: "<html> Warning " + req.body.username + " may have heart disease. We suggest that you may need to take him/her to hospital as soon as possible. heartrate = " + req.body.fitbitInfor[req.body.fitbitInfor.length - 1].value + "</html>",
                    alternative: true
                }, ]
            }, function (err, message) {
                if (err)
                    console.log(err);
                else
                    res.json({
                        success: true,
                        msg: 'sent heart disease'
                    });
            });
        } else {
            console.log("already heart disease")
        }
    }
    ///bleeding
    if (req.body.fitbitInfor[req.body.fitbitInfor.length - 1].value > 140) {
        console.log("bleeding")
        if (req.body.Status != 'bleeding') {
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var myquery = {
                    username: req.body.username
                };
                var newvalues = {
                    $set: {
                        Status: "bleeding"
                    }
                };
                db.collection("users").updateOne(myquery, newvalues, function (err, res) {
                    if (err) throw err;
                    console.log("UpdateStatus bleeding");
                    db.close();
                });
            });
            server.send({
                text: "Test send email",
                from: "ADmin fitbit",
                to: req.body.mail,
                subject: "PDN Warning : bleeding",
                attachment: [{
                    data: "<html> Warning " + req.body.username + " may massive blood loss. We suggest that you may need to take him/her to hospital as soon as possible. heartrate = " + req.body.fitbitInfor[req.body.fitbitInfor.length - 1].value + "</html>",
                    alternative: true
                }, ]
            }, function (err, message) {
                if (err)
                    console.log(err);
                else
                    res.json({
                        success: true,
                        msg: 'sent bleeding'
                    });
            });
        } else {
            console.log("already bleeding")
        }
    } else {
        console.log("normal")
        console.log(req.body.Status)
        if (req.body.Status != 'normal') {
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var myquery = {
                    username: req.body.username
                };
                var newvalues = {
                    $set: {
                        Status: "normal"
                    }
                };
                db.collection("users").updateOne(myquery, newvalues, function (err, res) {
                    if (err) throw err;
                    console.log("UpdateStatus normal");
                    db.close();
                });
            });

        } else {
            console.log("already normal")
        }
    }
}


function getById(req, res) {
    userService.getById(req.user.sub)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    userService.update(req.params._id, req.body)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    userService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}