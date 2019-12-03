/*
* Description: API handler for scheduling survey period and distributing emails
*/

var router = require('express').Router();
const nodemailer = require('nodemailer')
const cron = require('node-cron')
const database = require('../../model/database.js');

var emailDistributionDate = ''
var surveyExpirationDate = ''

/**
* Description: Handler that sets the start and end dates of the survey completion period. Checks that sender is admin.
* Parameters: Request in JSON format:
{
	send_date: “MM/DD/YYYY”		
	end_date: “MM/DD/YYYY”
	adminEmail: "aanderhub@scu.edu"
}
* Returns: Response returns OK (200) status or invalid status (403)
*/

router.post('/', function(req, res) {
	var email = req.body.adminEmail
	connection = database.getConnetion()
    connection.query(
        'SELECT * FROM Admin WHERE admin_email = ?',
        email,
        (err, result) => {
            if (err) console.error(err)
            else {
                if (result.length > 0) {
                    emailDistributionDate = req.body.send_date
                    surveyExpirationDate = req.body.end_date
                    res.sendStatus(200)
                } else {
                    res.sendStatus(403)
                }
            }
        }
    )
});

/**
 * Description: Cron job that checks every day at 8AM to activate the survey period
 * Parameters: None
 * Return: None
 */
cron.schedule('0 25 23 * * *', () => {
	console.log('checking to start survey period')
	date = getDate()
	if (date.localeCompare(emailDistributionDate) == 0) {
		distributeEmails()
		updateSectionsActivity(true)
	}
})

/**
 * Description: Cron job that checks every day at 12AM to de-activate the survey period
 * Parameters: None
 * Return: None
 */
cron.schedule('0 30 23 * * *', () => {
	console.log('checking to end survey period')
	date = getDate()
	if (date.localeCompare(surveyExpirationDate) == 0) {
		updateSectionsActivity(false)
	}
})

/**
 * Description: Activates or deactivates Sections in the database
 * Parameters: activity (boolean)
 * Return: None
 */
function updateSectionsActivity(activity) {
	connection = database.getConnetion()
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

/**
 * Description: Distributes emails to all students to complete the lab evaluation surveys with link to website
 * Parameters: None
 * Return: None
 */
function distributeEmails() {
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
		  user: 'engineeringlabsurvey',
		  pass: '174Project'
		}
	});
	connection = database.getConnetion()
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

/**
 * Description: Gets today's date
 * Parameters: None
 * Return: String in format MM/DD/YYYY
 */
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