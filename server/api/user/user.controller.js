const User = require('./user.model');
const Plant = require('./plant.model');

function show(){
    console.log('test');
}

async function showPlants(req,res,next){
    console.log(req.params);
    let plantsTest = await Plant.find({});
    console.log(plantsTest);
    let plants = await Plant.find({'user':req.params.id});
    console.log(plants);
    res.json(plants);
}

module.exports = {
    show,
    showPlants
};
