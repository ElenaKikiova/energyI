// REQUIRE APP AND GENERAL FUNCTIONS
const app = require('../server');
const ObjectId = require('mongodb').ObjectID;
let getUserCookie = require('./functions/getUserCookie');
let manageDates = require('./functions/manageDates');

// ROUTES

let UserCalendar = require('../schemas/userCalendarSchema');

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

app.get('/getDiaryData', function (req, res) {
    // let idCookie = getUserCookie("id", req);
    let idCookie = ObjectId("5e35bb98dff2f9031414ba03");
    
    UserCalendar.find({ UserId: ObjectId(idCookie)}, function(err1, diaryData) {
        if(err1) throw err1;
        res.json({ "diaryData": diaryData});
    });
})

app.post('/deleteFromDiary', async (req, res) => {
    // let idCookie = getUserCookie("id", req);
    let idCookie = ObjectId("5e35bb98dff2f9031414ba03");
    let mealIndex = req.body.data.mealIndex;
    let newBlocks = req.body.data.newBlocks;
    let date = new Date();
    let regex = new RegExp(".+(" + monthNames[date.getMonth()] + " " + manageDates.getDay(date) + " " + date.getFullYear() + ").+");
    console.log(mealIndex, date, newBlocks);

    let record = await UserCalendar.find({ UserId: ObjectId(idCookie), Details: { $ne: null } });

    console.log(record);
    if(record != null){
        if(record.err) throw err;
        else{
            for(let i = 0; i < record.length; i++){
                if(regex.test(record[i].Date) == false){
                    record[i].Details = undefined;
                    record[i].save();
                }
                else{
                    record[i].Details.splice(mealIndex, 1);
                    record[i].Blocks = newBlocks;
                    record[i].save();
                    res.send();
                }
            }
            
        }
    }

});