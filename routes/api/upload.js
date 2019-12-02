var router = require('express').Router();
const connection = require('../../model/database.js');
const multer = require('multer');
const uploadService = multer({ storage: multer.memoryStorage() });
const xlsx = require('node-xlsx');


/**
 * API endpoint for Excel Registration Data upload
 * 
 */
router.post('/', uploadService.single('uploadedFile'), (req, res) => {
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


function insertExcelDataIntoDB(excelData) {
	let numRows = excelData.classNbrs.length
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
			'INSERT INTO Section VALUES (?, ?, ?, ?, ?, ?)',
			[sectionId, instructorEmail, subject, catalogNbr, courseTitle, false],
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