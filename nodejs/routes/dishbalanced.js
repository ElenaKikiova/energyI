// REQUIRE APP AND GENERAL FUNCTIONS
var app = require('../server');
var getUserCookie = require('./functions/getUserCookie');
var manageDates = require('./functions/manageDates');

var Ingredient = require('../schemas/ingredientSchema');
var UserDish = require('../schemas/userDishSchema');
var UserCalendar = require('../schemas/userCalendarSchema');


var Recipes = require('../schemas/recipeSchema');
var Recipe = Recipes.Recipe;
var SharedRecipe = Recipes.SharedRecipe;

// ROUTES


app.get('/loadUserDishes', function (req, res) {
    var idCookie = getUserCookie("id", req);
    mongoose.connect(baseUrl, { useNewUrlParser: true }, function(err, db) {
        UserDish.find({UserId: idCookie}, function(err, userDishes) {
            if(err) throw err;
            res.json(userDishes);
        });
    });
})

app.post('/addMealToDiary', function(req, res){
    
    let mealData = req.body.data.mealData;

    console.log("a");

    console.log(mealData);

    UserCalendar.findOne({ UserId: idCookie, Date: mealData.Date}, function(err, todayRecord){
        if(err) throw err;

        // If first meal today
        if(todayRecord == null){
            let todayRecord = new UserCalendar({
                UserId: idCookie,
                Date: mealData.Date,
                Blocks: mealData.Date,
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
    var IngredientWeight = req.body.IngredientWeight;
    var idCookie = getUserCookie("id", req);

    console.log(DateSaved, Blocks, Ingredients, UserIngredients);

    var newRecipe = new Recipe({
        UserId: idCookie,
        Date: DateSaved,
        Name: RecipeName,
        Blocks: Blocks,
        Ingredients: Ingredients,
        UserIngredients: UserIngredients
    });

    mongoose.connect(baseUrl, { useNewUrlParser: true }, function(err, db) {
        newRecipe.save(function(err){ if(err) throw err});
        res.send();
    });


})
