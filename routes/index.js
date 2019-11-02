var express = require('express');
var router = express.Router();
const database = require('../model/database.js')

async function connect_to_db() {
  console.log('Starting application');
  try {
    console.log('Initializing database module');
    await database.initialize();
  } catch (err) {
    console.error(err);
    process.exit(1); // Non-zero failure code
  }
}

connect_to_db();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
