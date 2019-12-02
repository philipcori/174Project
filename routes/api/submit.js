var router = require('express').Router();
const connection = require('../../model/database.js');

router.post('/', (req, res) => {
    const body = req.body;
    connection.query(
		'INSERT INTO Survey (section_id, q_1a, q_1b, q_1c, q_1d, q_1e, q_1f, \
q_2a, q_2b, q_2c, q_2d, q_2e, q_2f, q_3a, q_3b, q_3c, q_3d, q_4a, q_4b, q_4c, q_5a) \
VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', 
		[body.section_id, body.q_1a, body.q_1b, body.q_1c, body.q_1d, body.q_1e, body.q_1f,
		body.q_2a, body.q_2b, body.q_2c, body.q_2d, body.q_2e, body.q_2f,
		body.q_3a, body.q_3b, body.q_3c, body.q_3d,
		body.q_4a, body.q_4b,	body.q_4c, 
		body.q_5a],
		(err, result) => {
			if(err) res.send(err)
		}
	);
	connection.query(
		'UPDATE Attends SET filled_out = TRUE WHERE section_id = ? AND student_id = \
(SELECT student_id FROM Student WHERE student_email = ?)',
		[body.section_id, body.student_email],
		(err, result) => {
			if(err) res.send(err)
			else res.sendStatus(200)
		}
	);
});

module.exports = router