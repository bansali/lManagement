var express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const indexRouter = express.Router();
indexRouter.use(bodyParser.json());



indexRouter.route('/').get(function(req,res,next){
    res.render('src/index.html');
});
module.exports = indexRouter;