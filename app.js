const express = require('express');
// const apiController= require('./controller/apiController')
const viewController= require('./controller/viewController')

const app = express();
app.use(express.json())
// app.use('/api', apiController);
app.use(viewController)
app.use('/public', express.static('public'));

module.exports=app

