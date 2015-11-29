'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var TasksResource = require('./resources/TasksResource');

function Server(dependencies) {
  this.start = start;

  function start() {
    var application = express();
    application.use(bodyParser.json());

    configureRoutes(application);

    var server = application.listen(3000, function () {
      console.log('Server running on port', server.address().port);
    });
  }

  function configureRoutes(application) {
    var tasksResource = new TasksResource(dependencies.taskRepository);
    application.get('/tasks', tasksResource.doGet);
    application.post('/tasks', tasksResource.doPost);
  }
}

module.exports = Server;
