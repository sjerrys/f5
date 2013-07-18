
/**
 * Form5 Node.js Express Skeleton
 * Based on https://github.com/madhums/nodejs-express-mongoose-demo
 */

var express = require('express'),
    http = require('http'),
    fs = require('fs'),
    passport = require('passport'),
    coffee = require('coffee-script'),
    less = require('less')

global.app = express()
global.mongoose = require('mongoose')

var env = process.env.NODE_ENV || 'development',
    config = require('./config/environment')[env],
    auth = require('./config/middlewares/authorization')
    
// Bootstrap database
console.log('Connecting to database at ' + config.db)
mongoose.connect(config.db)

// Bootstrap models
var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file) {
  require(models_path+'/'+file)
});

// bootstrap passport config
require('./config/passport')(passport, config)


// express settings
require('./config/express')(config, passport)

// Bootstrap routes
require('./config/routes')(passport, auth)

// Helper funtions
require('./app/helpers/general')()

// Start the app by listening on <port>
var port = process.env.PORT || 3000
http.createServer(app).listen(port, function(){
  console.log('Form5 Express app running on port '+port)
});