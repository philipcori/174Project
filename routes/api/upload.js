/**
 * Description: API handlder and functions that enable the Excel Registration Data upload functionality
 */

var router = require('express').Router();
const connection = require('../../model/database.js');
const multer = require('multer');
const uploadService = multer({ storage: multer.memoryStorage() });
const xlsx = require('node-xlsx');

/**
 * Description: Handler that inserts registration data in database if user is an admin
 * Parameters: Request in JSON format:
 * {
 * 		uploadedFile : .xlsx file
 * 		adminEmail : "aanderhub@scu.edu"
 * }
 * Returns: 200 status if successful, 403 status if user is not an admin
 * Constraint: File must be file type of .xlsx in correct format
 */
router.post('/', uploadService.single('uploadedFile'), (req, res) => {
    var fileBuffer = req.file.buffer
    let email = req.body.adminEmail
    connection.query(
        'SELECT * FROM Admin WHERE admin_email = ?',
        email,
        (err, result) => {
            if (err) console.error(err)
            else {
                if (result.length > 0) {
                    if(upload(fileBuffer) == -1) {
                    	res.sendStatus(415);
                    }
                    res.sendStatus(200)
                } else {
                    res.sendStatus(403)
                }
            }
        }
    )
})

/**
 * Description: Parses the Registration Data excel file
 * Parameters: fileBuffer (byte array)
 * Returns: None
 */
function upload(fileBuffer) {
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
		data[i][classNbrColumn] ? classNbrs.push(data[i][classNbrColumn]) : return -1;
		data[i][subjectColumn] ? subjects.push(data[i][subjectColumn]) : ;
		data[i][catalogNumberColumn] ? catalogNumbers.push(data[i][catalogNumberColumn]) : return -1;
		data[i][courseTitleColumn] ? courseTitles.push(data[i][courseTitleColumn]) : return -1;
		data[i][instructorEmailColumn] ? instructorEmails.push(data[i][instructorEmailColumn]) : return -1;
		data[i][instructorNameColumn] ? instructorNames.push(data[i][instructorNameColumn]) : return -1;
    	data[i][studentIdColumn] ? studentIds.push(data[i][studentIdColumn]) : return -1;
    	data[i][studentEmailColumn] ? studentEmails.push(data[i][studentEmailColumn]) : return -1;
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
}

/**
 * Description: Inserts excel data into database
 * Parameters: excelData (object in format defined in upload())
 * Returns: None
 */
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