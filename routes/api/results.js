var router = require('express').Router();
const connection = require('../../model/database.js');

router.post('/', (req, res) => {
  const section_id = req.body.section_id;
  connection.query(
    'SELECT * FROM Survey WHERE section_id = ?',
    section_id,
    (err, result) => {
      if(err) res.send(err);
      else res.send(result);
    }
  )
});

module.exports = router