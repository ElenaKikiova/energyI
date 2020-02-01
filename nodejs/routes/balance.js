// REQUIRE APP AND GENERAL FUNCTIONS
const app = require('../server');
const ObjectId = require('mongodb').ObjectID;
var getUserCookie = require('./functions/getUserCookie');
var manageDates = require('./functions/manageDates');

var Recipes = require('../schemas/recipeSchema');
var Recipe = Recipes.Recipe;
var SharedRecipe = Recipes.SharedRecipe;

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

// ROUTES

var Ingredient = require('../schemas/ingredientSchema');
var UserIngredient = require('../schemas/userIngredientSchema');
var UserCalendar = require('../schemas/userCalendarSchema');


app.get('/getProducts', function (req, res) {
    var type = req.params.type;
    var idCookie = getUserCookie("id", req);
    
    Ingredient.find({}, function(err1, defaultIngredients) {
        if(err1) throw err1;
        UserIngredient.find({UserId: idCookie}, function(err2, userIngredients) {
            if(err2) throw err2;
            res.json({ "defaultIngredients": defaultIngredients, "userIngredients": userIngredients});
        });
    });
})

app.post('/addMealToDiary', function(req, res){
    // let idCookie = getUserCookie("id", req);
    let idCookie = ObjectId("5e35bb98dff2f9031414ba03");
    let mealData = req.body.data;

    console.log(mealData);

    var date = new Date();
    var regex = new RegExp(".+(" + monthNames[date.getMonth()] + " " + manageDates.getDay(date) + " " + date.getFullYear() + ").+");

    UserCalendar.findOne({ UserId: idCookie, Date: {$regex: regex}}, function(err, todayRecord){
        if(err) throw err;

        // If first meal today
        if(todayRecord == null){
            let todayRecord = new UserCalendar({
                UserId: idCookie,
                Date: date,
                Blocks: mealData.Blocks,
                Details: [
                    {
                        "time": mealData.Time,
                        "blocks": mealData.Blocks
                    }
                ]
            });

            todayRecord.save(function(err){
                if(err) throw err;
            });
        }
        else{
            var NewBlocksValue = todayRecord.Blocks + mealData.Blocks;
            var NewDetails = todayRecord.Details;
            NewDetails.push({"time": mealData.Time, "blocks": mealData.Blocks});

            UserCalendar.updateOne(
                {_id: todayRecord.id},
                {
                    $set: {
                        Blocks: NewBlocksValue,
                        Details: NewDetails
                    }
                }, function(err){
                if(err) throw err;
            });
        }

        res.send();
    });
})

app.post('/saveRecipe', function(req, res){
    var RecipeName = req.body.Name;
    var DateSaved = manageDates.composeDate(new Date());
    var Blocks = parseFloat(req.body.Blocks);
    var Ingredients = req.body.Ingredients;
    var UserIngredients = req.body.UserIngredients;
    var UserDish = req.body.UserDish;
    var idCookie = getUserCookie("id", req);

    console.log(DateSaved, Blocks, Ingredients, UserIngredients, UserDish);

    var newRecipe = new Recipe({
        UserId: idCookie,
        Date: DateSaved,
        Name: RecipeName,
        Blocks: Blocks,
        Ingredients: Ingredients,
        UserIngredients: UserIngredients,
        UserDish: UserDish
    });

    
        newRecipe.save(function(err){ if(err) throw err});
        res.send();


})
