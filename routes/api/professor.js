var router = require('express').Router();
const connection = require('../../model/database.js');

router.post('/', (req, res) => {
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