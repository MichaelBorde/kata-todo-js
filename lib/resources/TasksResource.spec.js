'use strict';

require('chai').should();
var TasksResource = require('./TasksResource');
var MockResponse = require('../test/MockResponse');
var FakeRepository = require('../test/FakeRepository');

describe('The tasks resource', function () {
  var resource;
  var repository;
  var response;

  beforeEach(function () {
    repository = new FakeRepository();
    resource = new TasksResource(repository);
    response = new MockResponse();
  });

  context('on get', function () {
    it('should respond with all tasks', function () {
      repository.add({id: '1', text: 'my task'});

      resource.doGet(null, response);

      response.jsonArg.should.deep.equal([{id: '1', text: 'my task'}])
    });
  });

  context('on post', function () {
    it('should add a new task', function () {
      var request = {body: {text: 'my new task'}};

      resource.doPost(request, response);

      repository.all().should.have.lengthOf(1);
      repository.all()[0].text.should.equal('my new task');
      response.statusArg.should.equal(201);
      response.endCalled.should.be.true;
    });
  });
});
