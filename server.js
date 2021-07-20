const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const exp = require('constants');
const express = require('express');
const { animals } = require('./data/animals');
const PORT = process.env.PORT || 3001;

const app = express();

//make files in specified dir available as static resources
app.use(express.static('public'));
// parse incoming string or array data
app.use(express.urlencoded({ extended: true}));
// parse incoming JSON data
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`API now on port ${PORT}`);
});