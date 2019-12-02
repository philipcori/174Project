var router = require('express').Router();
const nodemailer = require('nodemailer')
const cron = require('node-cron')
const connection = require('../../model/database.js');

var emailDistributionDate = ''
var surveyExpirationDate = ''

router.post('/', function(req, res) {
	emailDistributionDate = req.body.send_date
	surveyExpirationDate = req.body.end_date
	res.sendStatus(200)
});

cron.schedule('0 0 3 * * *', () => {
	console.log('checking to start survey period')
	date = getDate()
	if (date.localeCompare(emailDistributionDate) == 0) {
		distributeEmails()
		updateSectionsActivity(true)
	}
})

cron.schedule('0 15 3 * * *', () => {
	console.log('checking to end survey period')
	date = getDate()
	if (date.localeCompare(surveyExpirationDate) == 0) {
		updateSectionsActivity(false)
	}
})

function updateSectionsActivity(activity) {
	connection.query(
		'UPDATE Section SET survey_period_active = ?', 
		activity,
		(err, result) => {
			if (err) console.error(err)
			else {
				if (activity)
					console.log('Sections now active for surveying')
				else
					console.log('Sections now non-active for surveying')
			}
		}
	)
}

function distributeEmails() {
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
		  user: 'engineeringlabsurvey',
		  pass: '174Project'
		}
	});
	connection.query(
		'SELECT student_email FROM Student', 
		(err, results) => {
			if (err) console.log(err)
			else {
				for (key in results) {
					let mailOptions = {
						from: 'engineeringlabsurvey@gmail.com',
						to: results[key].student_email,
						subject: 'Engineering Lab Evaluations',
						text: 'Please follow the link to fill out your engineering lab evaluation surveys: https://coen174-eles-frontend.herokuapp.com/'
					};
					transporter.sendMail(mailOptions, function(error, info){
						if (error) {
							  console.error(error)
						} else {
							  console.log(`Email sent to ${mailOptions.to}`)
						}
					});
				}
			}
		}
	)
}

function getDate() {
	var dateObj = new Date();
	var month = dateObj.getUTCMonth() + 1; //months from 1-12
	month = month.toString()
	month = month.length == 1 ? `0${month}` : month
	var day = dateObj.getUTCDate();
	day = day.toString()
	day = day.length == 1 ? `0${day}` : day
	var year = dateObj.getUTCFullYear();
	return month + "/" + day + "/" + year;
}

module.exports = router