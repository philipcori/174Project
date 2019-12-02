/**
 * Description: API handler for getting the type of user that logged in
*/

var router = require('express').Router();
const connection = require('../../model/database.js');

/**
 * Description: Returns one of four types of users: admin, professor, student, or invalid
 * Parameters: Request in JSON format:
 * {
	email: “aanderhub@scu.edu”
	access_token: “3rklwljg23ljtljsg...”
 * }
 * Response: JSON object in format:
 * {
 * 		type: “student”, “professor”, “admin”, or “invalid”
 * }
*/
router.post('/', (req, res) => {
	let email = req.body.email
	let resMsg = {
		'type': 'invalid'
	}
	connection.query(
		'SELECT admin_email FROM Admin WHERE admin_email = ?',
		email,
		(err, result) => {
			if (err) console.log(err)
			else if (result.length > 0) {
				resMsg.type = 'admin'
				res.send(resMsg)
			} else {
				connection.query(
					'SELECT professor_email FROM Professor WHERE professor_email = ?',
					email,
					(err, result) => {
						if (err) console.log(err)
						else if (result.length > 0) {
							resMsg.type = 'professor'
							res.send(resMsg)
						} else {
							connection.query(
								'SELECT student_email FROM Student WHERE student_email = ?',
								email,
								(err, result) => {
									console.log(email)
									if (err) console.log(err)
									else if (result.length > 0) {
										resMsg.type = 'student'
										res.send(resMsg)
									} else {
										res.send(resMsg)
									}
								}
							)
						}
					}
				)
			}
		}
	)
});

module.exports = router