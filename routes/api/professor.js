/**
 * Description: API handler for getting the sections taught by a professor
*/

var router = require('express').Router();
const database = require('../../model/database.js');
/*
* Description: Handler that returns the sections taught be a given professor if survey period is in-active
* Parameters: JSON object in format:
	{
		prof_email: ”aanderhub@scu.edu”
	}
* Returns: Response sends JSON object in format:
	[
		{
			"section_id": 83747,
			"course_subject": "ENGR",
			"catalog_num": "   1L",
			"course_title": "Intro to Engineering Lab"
		}, 
		{
			"section_id": 83725,
			"course_subject": "COEN",
			"catalog_num": "   12",
			"course_title": "Data Structures"
		} ...
	]
*/
router.post('/', (req, res) => {
	connection = database.getConnetion()
	connection.query(
		'SELECT section_id, course_subject, catalog_num, course_title FROM Section WHERE professor_email = ? AND survey_period_active = ?',
		[req.body.prof_email, false],
		(err, result) => {
			if (err) console.log(err)
			else res.send(result)
		}
	)
});

module.exports = router