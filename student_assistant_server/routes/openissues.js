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


        var issue_raised_array =[];
        var issue_raised_array_final =[];

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

                // Loop for getting all issue raised in temp array
                for(var i=0; i<user.length;i++)
                {
                    //issue_raised_array.push(user[i].issues_raised);
                    for(var j=0; j<user[i].issues_raised.length;j++)
                    {
                        issue_raised_array_final.push(user[i].issues_raised[j]);
                    }
                }

                console.log(issue_raised_array_final);
                res.status(200).send({issue_raised_array_final});
            }
            else {
                res.status(400).send({"message":"Failed"});
            }
        });
    });
});

module.exports = router;