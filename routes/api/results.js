/**
 * Description: API handler for fetching results for a given lab section
*/

var router = require('express').Router();
const database = require('../../model/database.js');


/**
 * Description: Given a section id, returns the survey results for that section
 * Parameters: Request in JSON format:
 * {
 *    section_id : 87523
 * }
 * Returns: Response in JSON format:
 * [
    {
      student_email: string;
      auth_token: string;
      section_id: string;	
      q_1a: number;
      q_1b: number;
      q_1c: number;
      q_1d: number;
      q_1e: string;
      q_1f: string;
      q_2a: number;
      q_2b: number;
      q_2c: number;
      q_2d: number;
      q_2e: number;
      q_2f: string;
      q_3a: number;
      q_3b: number;
      q_3c: number;
      q_3d: string;
      q_4a: number;
      q_4b: number;
      q_4c: number;
      q_5a: string;
    }, ...
  ]
*/
router.post('/', (req, res) => {
  connection = database.getConnetion()
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