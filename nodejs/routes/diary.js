// REQUIRE APP AND GENERAL FUNCTIONS
const app = require('../server');
const ObjectId = require('mongodb').ObjectID;
var getUserCookie = require('./functions/getUserCookie');
var manageDates = require('./functions/manageDates');

// ROUTES

var UserCalendar = require('../schemas/userCalendarSchema');


app.get('/getDiaryData', function (req, res) {
    // let idCookie = getUserCookie("id", req);
    let idCookie = ObjectId("5e35bb98dff2f9031414ba03");
    
    UserCalendar.find({ UserId: ObjectId(idCookie)}, function(err1, diaryData) {
        if(err1) throw err1;
        res.json({ "diaryData": diaryData});
    });
})
