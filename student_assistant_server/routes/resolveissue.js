let express = require('express');
let router = express.Router();
let mongo = require("./mongo");
let mongoURL = "mongodb://localhost:27017/student_assistant";

router.post('/resolveissue', function (req, res, next) {

    console.log("inside resolve Issues");
    res.status(200).send({message:"successful"});


});

module.exports = router;