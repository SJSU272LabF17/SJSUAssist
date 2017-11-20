let express = require('express');
let router = express.Router();
let mongo = require("./mongo");
let mongoURL = "mongodb://localhost:27017/student_assistant";

router.post('/currentissuelist', function (req, res, next) {
    console.log("inside Open Issues");
    //res.status(203).send({"message":"Session Expired. Please Login Again"});

    mongo.connect(mongoURL, function () {
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('users');
        console.log("inside the Open Issues");

        coll.aggregate([
            {$match: {'issues_raised.cat': "java"}},
            {
                $project:
                    {
                        issues_raised: {
                            $filter:
                                {
                                    input: '$issues_raised',
                                    as: 'issues_raised',
                                    cond: {$eq: ['$$issues_raised.cat', "java"]}
                                }
                        }
                    }
            }

        ], function (err, user) {
            console.log("inside call back of Open Issues" + user);
            if (user) {

                console.log(user);
                res.status(200).send({"message":"Success"});
            }
            else {
                res.status(400).send({"message":"Failed"});
            }
        });
    });
});

module.exports = router;