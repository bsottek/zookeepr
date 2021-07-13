const express = require('express');
const { animals } = require('./data/animals');
const PORT = process.env.PORT || 3001;

const app = express();

function filterByQuery(query, animalsArray){
    let personalityTraitsArray = [];

    let filteredResults = animalsArray;
    if (query.personalityTraits){
        // Save personalityTraits as a dedicated array even if it's just a single string value
        if(typeof query.personalityTraits === 'string'){
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        //Loop through each trait
        personalityTraitsArray.forEach(trait => {
            //Check each trait against each animal, returning a new array of all animals 
            //with that trait. Once that's been done for all traits, the array only contains 
            //those that match all query traits.
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    if(query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species){
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
}

app.get('/api/animals', (req,res) => {
    let results = animals;
    if (req.query){
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.listen(PORT, () => {
    console.log(`API now on port ${PORT}`);
});