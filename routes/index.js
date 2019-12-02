var router = require('express').Router();

router.use('/api/upload', require('./api/upload'));
router.use('/api/submit', require('./api/submit'));
router.use('/api/results', require('./api/results'));
router.use('/api/schedule_send', require('./api/schedule'));
router.use('/api/get_student_sections', require('./api/student'));
router.use('/api/get_professor_sections', require('./api/professor'));
router.use('/api/redirect', require('./api/redirect'));

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

module.exports = router
