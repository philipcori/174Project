/**
 * Description: API Handler for getting the sections a student attends
 */

var router = require('express').Router();
const database = require('../../model/database.js');

/**
 * Description: Handler that, given a student's email, returns their sections if the survey period is active
 * Parameters: Request in JSON format:
 * {
 * 		student_email : "aanderhub@scu.edu"
 * }
 * Returns: Response in JSON format:
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
		'SELECT section_id, course_subject, catalog_num, course_title FROM Section WHERE survey_period_active = ? AND section_id IN \
(SELECT section_id FROM Attends WHERE filled_out = FALSE AND student_id = \
(SELECT student_id FROM Student WHERE student_email = ?))', 
		[true, req.body.student_email], 
		(err, result) => {
			if (err) console.log(err)
			else res.send(result)
		}
	)
});

module.exports = router