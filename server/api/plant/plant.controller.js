const Plant = require('./plant.model');

async function index(req, res, next){
    let plants = await Plant.find({});
    console.log(plants);
    res.json(plants);
}

module.exports = {
    index
};
