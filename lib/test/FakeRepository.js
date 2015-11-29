'use strict';

var _ = require('lodash');
var uuid = require('node-uuid');

function FakeRepository() {
  var self = this;
  self.add = add;
  self.all = all;

  var entities = [];

  function add(entity) {
    entity = _.merge({id: uuid.v4()}, entity);
    entities.push(entity);
  }

  function all() {
    return entities;
  }
}

module.exports = FakeRepository;
