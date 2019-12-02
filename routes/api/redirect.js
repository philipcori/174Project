var router = require('express').Router();
const connection = require('../../model/database.js');

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