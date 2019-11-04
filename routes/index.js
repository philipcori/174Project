var express = require('express');
var router = express.Router();
const connection = require('../model/database.js');
const multer = require('multer');
var uploadService = multer({ storage: multer.memoryStorage() });
const xlsx = require('node-xlsx');

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
	var instructorEmails = []
	var instructorNames = []
    var studentIds = []
	var studentEmails = []
    var data = obj[0].data
    for(var i = 1; i < data.length; i++) {
		if (!data[i][classNbrColumn]) break
    	classNbrs.push(data[i][classNbrColumn]);
		instructorEmails.push(data[i][instructorEmailColumn])
		instructorNames.push(data[i][instructorNameColumn])
    	studentIds.push(data[i][studentIdColumn])
    	studentEmails.push(data[i][studentEmailColumn])
    }
    var excelData = {
    	'classNbrs': classNbrs,
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
    'INSERT INTO Survey (section_id, q_1a, q_1b, q_1c, q_1d, q_1e, q_1f, q_2a, q_2b, q_2c, q_2d, q_2e, q_2f, q_2g, q_3a, q_3b, q_3c, q_3d, q_4a, q_4b, q_4c, q_5a) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', 
      [body.section_id, body.q_1a, body.q_1b, body.q_1c, body.q_1d, body.q_1e, body.q_1f,
      body.q_2a, body.q_2b, body.q_2c, body.q_2d,	body.q_2e, body.q_2f, body.q_2g,
      body.q_3a, body.q_3b, body.q_3c, body.q_3d,
      body.q_4a, body.q_4b,	body.q_4c, 
      body.q_5a],
      (err,result) => {
        if(err) res.send(err);
        else res.sendStatus(200);
      });
});

/* test json for /submit
{
	"section_id": "123456",	
	"q_1a": "1",
	"q_1b": "2",
	"q_1c": "3",
	"q_1d": "4",
	"q_1e": "Good",
	"q_1f": "Bad",
	"q_2a": "5",
	"q_2b": "4",
	"q_2c": "3",
	"q_2d": "2",
	"q_2e": "1",
	"q_2f": "0",
	"q_2g": "Great",
	"q_3a": "1",
	"q_3b": "2",
	"q_3c": "3",
	"q_3d": "Fabulous",
	"q_4a": "4",
	"q_4b": "5",
	"q_4c": "4",
	"q_5a": "Superb"
}
*/

router.get('/results', function(req, res, next) {
  const section_id = '83624';
  connection.query(
    'SELECT * FROM Survey WHERE section_id = ?',
    [section_id],
    (err, result) => {
      if(err) res.send(err);
      else res.send(result);
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
			'INSERT INTO Section VALUES (?, ?)',
			[sectionId, instructorEmail],
			(err, res) => {
				if(err) console.log(err.sqlMessage)
				else console.log("Successfully inserted into Section")
			}
		)
		connection.query(
			'INSERT INTO Attends VALUES (?, ?)',
			[sectionId, studentId],
			(err, res) => {
				if(err) console.log(err.sqlMessage)
				else console.log("Successfully inserted into Attends")
			}
		)
	}	
}

module.exports = router;