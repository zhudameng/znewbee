"use strict";

var _database = require("./database");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const db = new _database.Database({
  dialect: 'sqlite',
  dialectModule: require('sqlite3'),
  storage: ':memory:'
});

_asyncToGenerator(function* () {
  const User = db.collection({
    name: 'users',
    fields: [{
      type: 'string',
      name: 'name'
    }]
  });
  const Post = db.collection({
    name: 'posts',
    fields: [{
      type: 'string',
      name: 'title'
    }, {
      type: 'belongsTo',
      name: 'user'
    }]
  });
  yield db.sync();
  const repository = User.repository;
  yield repository.createMany({
    records: [{
      name: 'u1',
      posts: [{
        title: 'u1t1'
      }]
    }, {
      name: 'u2',
      posts: [{
        title: 'u2t1'
      }]
    }, {
      name: 'u3',
      posts: [{
        title: 'u3t1'
      }]
    }]
  });
  const Model = User.model;
  const user = yield Model.findOne({
    subQuery: false,
    where: {
      '$posts.title$': 'u1t1'
    },
    include: {
      association: 'posts',
      attributes: []
    },
    attributes: {
      include: []
    }
  });
  console.log(user.toJSON());
})();