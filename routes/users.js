var express = require('express');
var router = express.Router();
const { db } = require('../db');


// create table Users:
GET('/create', () => db.users.create());

// add some initial records:
GET('/init', () => db.users.init());

// remove all records from the table:
GET('/empty', () => db.users.empty());

// drop the table:
GET('/drop', () => db.users.drop());

// add a new user, if it doesn't exist yet, and return the object:
GET('/add/:name', req => {
    return db.task('add-user', async t => {
        const user = await t.users.findByName(req.params.name);
        return user || t.users.add(req.params.name);
    });
});

// find a user by id:
GET('/find/:id', req => db.users.findById(req.params.id));

// remove a user by id:
GET('/remove/:id', req => db.users.remove(req.params.id));

// get all users:
GET('/all', () => db.users.all());

// count all users:
GET('/total', () => db.users.total());

// Generic GET handler;
function GET(url, handler) {
  router.get(url, async (req, res) => {
    try {
      const data = await handler(req);
      res.json({
        success: true,
        data
      });
    } catch (error) {
      res.json({
        success: false,
        error: error.message || error
      });
    }
  });
}

module.exports = router;
