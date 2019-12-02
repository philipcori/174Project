var router = require('express').Router();
const connection = require('../../model/database.js');

router.post('/', (req, res) => {
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