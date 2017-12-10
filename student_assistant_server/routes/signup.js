express = require('express');
var router = express.Router();
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/student_assistant";
var act = require('./activity');
var bcrypt = require('bcrypt');

/* GET Sign Up Page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/doSignUp', function(req, res, next){
    try {
        console.log("Inside do signup, req.body is:"+req.body);

        var salt = bcrypt.genSaltSync(10);

        let data = {
            _id : req.body.username,
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            username : req.body.username,
            hashpassword : bcrypt.hashSync(req.body.password, salt),
            studentid : req.body.StudentID,
            dateofbirth : req.body.DateOfBirth,
            gender:req.body.gender,

            skillset:[],
            issues_raised:[]
        };

        mongo.connect(mongoURL, function () {
            var usercollection = mongo.collection('users');
            usercollection.findOne({_id:data._id}, function(err, result) {
                if(err){
                    console.log(err);
                    throw err;
                }
                if(result!==null) {
                    if (result._id === data.username) {
                        console.log(result._id);
                        res.status(301).send({"message": "Already Exist"});
                    }
                    else {
                        console.log(result.username);
                        res.status(401).send({"message": "Error while Signing Up"});
                    }
                }
                else {
                    usercollection.insertOne(data, function (err, result1) {
                        console.log(result1);
                        console.log(result1.insertedCount);
                        if (result1.insertedCount === 1) {
                            console.log("Sign up successful");

                                act.insertIntoActivity(function (err, activityInserted) {
                                    if(err){
                                        console.log(err);
                                        res.status(301).json({message: "Signup Successful. Failed to add user activity"});
                                    }
                                    console.log(activityInserted);
                                    if(activityInserted){
                                        res.status(201).send({"message": "Signup Successful"});
                                    }
                                    else {
                                        console.log("Failed to add activity");
                                        // usercollection.deleteOne({_id: data.username},function (err, result3) {
                                        //     console.log(result3);
                                        //     userprofilecollection.deleteOne({_id:data.username}, function (err, result4) {
                                        //         console.log(result4);
                                        //         //delete directory here
                                        //         res.status(401).send({"message": "Signup Failed"});
                                        //     })
                                        // })
                                    }
                                },data.username, "signup");
                            // });
                        }
                    });
                }
            });
        });
    }
    catch (e){
        console.log(e);
        res.status(401).json({message: "Signup Failed"});
    }
});

// function createUserDirectory(user){
//     try {
//         if(fs.existsSync('dirname')){
//             var userdirpath="dirname" + user;
//             console.log(userdirpath);
//             var userPath = fs.mkdir(userdirpath);
//             console.log(userPath);
//         }
//         else{
//             console.log("dropboxstorage does not exist");
//         }
//     }
//     catch(e) {
//         throw e;
//     }
// }



module.exports = router;
