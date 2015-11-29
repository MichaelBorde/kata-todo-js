'use strict';

function TasksResource(repository) {
  var self = this;
  self.doGet = doGet;
  self.doPost = doPost;

  function doGet(request, response) {
    response.json(repository.all());
  }

  function doPost(request, response) {
    repository.add(request.body);
    response.status(201).end();
  }
}

module.exports = TasksResource;
