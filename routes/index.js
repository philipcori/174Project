var express = require('express');
var router = express.Router();
const connection = require('../model/database.js');
const multer = require('multer');
var uploadService = multer({ storage: multer.memoryStorage() });
const xlsx = require('node-xlsx');
const nodemailer = require('nodemailer')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// TODO: Asynchronously return response
router.post('/api/upload', uploadService.single('uploadedFile'), function(req, res) {
	var fileBuffer = req.file.buffer
	var obj = xlsx.parse(fileBuffer)
	// Get column indices
	var classNbrColumn
	var subjectColumn
	var catalogNumberColumn
	var courseTitleColumn
	var instructorEmailColumn
	var instructorNameColumn
    var studentIdColumn
    var studentEmailColumn
    var topRow = obj[0].data[0]
    for(var i in topRow) {
    	switch(topRow[i]) {
    		case 'Class Nbr':
    			classNbrColumn = i
				break
			case 'Subject':
				subjectColumn = i
				break
			case 'Catalog':
				catalogNumberColumn = i
				break
			case 'Title':
				courseTitleColumn = i
				break
    		case 'Instructor Email':
    			instructorEmailColumn = i
				break
			case 'Instructor':
				instructorNameColumn = i
				break
    		case 'Student ID':
    			studentIdColumn = i
    			break
    		case 'Student Email':
    			studentEmailColumn = i
				break
    		default:
    			continue
    	}
	}
    // Fill arrays with data from document
	var classNbrs = []
	var subjects = []
	var catalogNumbers = []
	var courseTitles = []
	var instructorEmails = []
	var instructorNames = []
    var studentIds = []
	var studentEmails = []
    var data = obj[0].data
    for(var i = 1; i < data.length; i++) {
		if (!data[i][classNbrColumn]) break
		classNbrs.push(data[i][classNbrColumn])
		subjects.push(data[i][subjectColumn])
		catalogNumbers.push(data[i][catalogNumberColumn])
		courseTitles.push(data[i][courseTitleColumn])
		instructorEmails.push(data[i][instructorEmailColumn])
		instructorNames.push(data[i][instructorNameColumn])
    	studentIds.push(data[i][studentIdColumn])
    	studentEmails.push(data[i][studentEmailColumn])
    }
    var excelData = {
		'classNbrs': classNbrs,
		'subjects': subjects,
		'catalogNbrs': catalogNumbers,
		'courseTitles': courseTitles,
		'instructorEmails': instructorEmails,
		'instructorNames': instructorNames,
    	'studentIds': studentIds,
    	'studentEmails': studentEmails
	}
	insertExcelDataIntoDB(excelData)
	res.sendStatus(200)
}) 

router.post('/api/submit', function(req, res) {
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
		'UPDATE Attends SET filled_out = TRUE WHERE section_id = ? AND student_id = ?',
		[body.section_id, body.student_id],
		(err, result) => {
			if(err) res.send(err)
			else res.sendStatus(200)
		}
	);
});

router.post('/api/results', function(req, res, next) {
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

router.post('/api/schedule', function(req, res) {
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
		  user: 'engineeringlabsurvey',
		  pass: '174Project'
		}
	});
	var mailOptions = {
		from: 'engineeringlabsurvey@gmail.com',
		to: 'pcori@scu.edu',
		subject: 'Sending Email using Node.js',
		text: 'Please follow the link to fill out your engineering lab evaluation surveys: http://localhost:4200/login'
	};
	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			  res.send(error)
		} else {
			  res.send('Email sent: ' + info.response)
		}
	});
});

router.post('/api/get_student_sections', (req, res) => {
	connection.query(
		'SELECT section_id, course_subject, catalog_num, course_title FROM Section WHERE section_id = \
(SELECT section_id FROM Attends WHERE filled_out = FALSE AND student_id = \
(SELECT student_id FROM Student WHERE student_email = ?))', 
		req.body.student_email, 
		(err, result) => {
			if (err) console.log(err)
			else res.send(result)
		}
	)
});

router.post('/api/get_professor_sections', (req, res) => {
	connection.query(
		'SELECT section_id, course_subject, catalog_num, course_title FROM Section WHERE professor_email = ?',
		req.body.prof_email,
		(err, result) => {
			if (err) console.log(err)
			else res.send(result)
		}
	)
});

// TODO: Use auth_token for Google API call to validate login... and get rid of callback hell
router.post('/api/redirect', (req, res) => {
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

function insertExcelDataIntoDB(excelData) {
	numRows = excelData.classNbrs.length
	var i
	for (i = 0; i < numRows; i++) {
		instructorEmail = excelData.instructorEmails[i]
		instructorName = excelData.instructorNames[i]
		sectionId = excelData.classNbrs[i]
		subject = excelData.subjects[i]
		catalogNbr = excelData.catalogNbrs[i]
		courseTitle = excelData.courseTitles[i]
		studentEmail = excelData.studentEmails[i]
		studentId = excelData.studentIds[i]
		connection.query(
			'INSERT INTO Professor VALUES (?, ?)',
			[instructorName, instructorEmail],
			(err, res) => {
				if(err) console.log(err.sqlMessage)
				else console.log("Successfully inserted into Professor")
			}
		)
		connection.query(
			'INSERT INTO Student VALUES (?, ?)',
			[studentId, studentEmail],
			(err, res) => {
				if(err) console.log(err.sqlMessage)
				else console.log("Successfully inserted into Student")
			}
		)
		connection.query(
			'INSERT INTO Section VALUES (?, ?, ?, ?, ?)',
			[sectionId, instructorEmail, subject, catalogNbr, courseTitle],
			(err, res) => {
				if(err) console.log(err.sqlMessage)
				else console.log("Successfully inserted into Section")
			}
		)
		connection.query(
			'INSERT INTO Attends VALUES (?, ?, ?)',
			[sectionId, studentId, false],
			(err, res) => {
				if(err) console.log(err.sqlMessage)
				else console.log("Successfully inserted into Attends")
			}
		)
	}	
}

module.exports = router;