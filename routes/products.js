var express = require('express');
var router = express.Router();
const { db } = require('../db');


// create table Products:
GET('/create', () => db.products.create());

// drop the table:
GET('/drop', () => db.products.drop());

// remove all products:
GET('/empty', () => db.products.empty());

// add a new user product, if it doesn't exist yet, and return the object:
GET('/add/:userId/:name', req => {
    return db.task('add-product', async t => {
        const product = await t.products.find(req.params);
        return product || t.products.add(req.params);
    });
});

// find a product by user id + product name id:
GET('/find/:userId/:name', req => db.products.find(req.params));

// remove a product by id:
GET('/remove/:id', req => db.products.remove(req.params.id));

// get all products:
GET('/all', () => db.products.all());

// count all products:
GET('/total', () => db.products.total());


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
