const User = require('./user.model');
const Plant = require('../plant/plant.model');

async function show(){
    let user = await User.findById(req.params.id);
    res.json(user);
}

async function showPlants(req,res,next){
    try{
        let plants = await Plant.find({'user':req.params.id});
        res.json(plants);
    }catch(e){
        res.status(500).end();
    }
}

async function createAchievement(req,res,next){
    try{
        let user = await User.findById(req.params.id);
        if(user.achievements.indexOf(req.params.ach)===-1){
            user.achievements.push(req.params.ach);
            await user.save();
            res.status(200).send('achievement added!');
        }
        res.status(200).end();
    }catch(e){
        res.status(500).end('addition failed!');
    }
}

module.exports = {
    show,
    showPlants,
    createAchievement
};
