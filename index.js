const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))


const weatherRoute = require('./Api/server');


app.set('view engine', 'ejs');

app.use('/', weatherRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server starting at port ${PORT}`));
