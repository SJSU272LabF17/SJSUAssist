let express = require('express');
let router = express.Router();
let mongo = require("./mongo");
let mongoURL = "mongodb://localhost:27017/student_assistant";

let ObjectId = require('mongodb').ObjectID;
var nodemailer = require('nodemailer');

router.post('/resolveissue', function (req, res, next) {

    console.log("inside resolve Issues");
    console.log("req.body._id:"+req.body._id);



    // mongo.connect(mongoURL, function () {
    //
    //     console.log('Connected to mongo at: ' + mongoURL);
    //     var coll = mongo.collection('users');
    //     console.log("inside the resolve Issues - mongo");
    //
    //     coll.update({'issues_raised._id': req.body._id},
    //         {$push:
    //             {issues_resolved: {
    //                 "_id":req.body._id,
    //                 "topic":req.body.topic,
    //                 "issuecontent" : req.body.issuecontent,
    //                 "isopen" : "No"
    //
    //             }}},
    //             function (err, user) {
    //                     console.log("inside call back" + user);
    //                     if (user) {
    //
    //                         coll.update({'issues_raised._id': req.body._id},
    //                             {$pull:
    //                                 {issues_raised:{_id:req.body._id}}}
    //                                     ,function (err, user) {
    //
    //                                                 if(user){
    //                                                     res.status(200).send({message:"Success"});
    //                                                 }
    //                                                 else
    //                                                 {
    //                                                     res.status(400).send({message:"Failed"});
    //                                                 }
    //
    //
    //                                             })
    //
    //                               }
    //                     else {
    //                              res.status(400).send({message:"successful"});
    //
    //
    //                     }
    //         });
    //
    //
    //
    // });

    // Email Code- Jay Desai
    // adding node mailer code
    console.log("Inside the mail sending folder");
    // call kafka function here
    // pass req.query.val to kafka
    //var sendTo = req.body.session.username;


    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'aviralkum@gmail.com',
            pass: 'Dollar@123'
        }
    });
    var str = "http://localhost:8009";
    var result = str.link("http://localhost:8009");


    var mailOptions = {
        from: 'aviralkum@gmail.com',
        to:'janhudesai@gmail.com',
        subject: 'Regarding your open issue',
        text: '' + 'Help available for the below issue '+ "id:"+ req.body._id+"topic:" + req.body.topic+ "req.body.issuecontent"+req.body.issuecontent

    };


    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.status(400).send({message:"Success"});
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send({message:"Success"});
        }
    });


});

router.post('/comments', function (req, res, next) {

    console.log("inside Comments");
    console.log("req.body._id:"+req.body._id);


    mongo.connect(mongoURL, function () {

        var response;
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('Comments');
        console.log("inside the Comments - mongo");

        coll.aggregate([
                {$match: {'comments.id':ObjectId(req.body._id)}},
                {$project:
                    {comments:{$filter:
                        {
                            input:'$comments',
                            as:'comments',
                            cond:{$eq:['$$comments.id',ObjectId(req.body._id)]}
                        }}
                    }}
            ],

            function (err, user) {
                console.log("inside call back-- Comments " + user.id);
                console.log("inside call back-- Comments " + user);
                if (user) {

                    console.log("user.comments"+user);
                    console.log("user.length"+user.length);
                    response =user;
                    res.status(200).send({response});



                }
                else {
                    res.status(400).send({message:"Fail "});


                }
            });



    });


});

router.post('/addcomments', function (req, res, next) {

    console.log("inside Comments");
    console.log("req.body.newcomment:"+req.body.newcomment);
    console.log("req.body.id:"+req.body.id);


    mongo.connect(mongoURL, function () {

        var response;
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('Comments');
        console.log("inside the add Comments - mongo");

        coll.update({id: ObjectId(req.body.id)}, {
                $push: {
                    comments: {
                        id: ObjectId(req.body.id),
                        content:req.body.newcomment
                        ,
                        userid:req.session.username
                    }
                }
            },

            function (err, user) {
                if (user) {

                    res.status(200).send({message:"Success "});



                }
                else {
                    res.status(400).send({message:"Fail "});


                }
            });



    });


});

module.exports = router;