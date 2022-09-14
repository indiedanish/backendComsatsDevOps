const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

router.post('/student', registerController.addNewStudent);
router.post('/teacher', registerController.addNewTeacher);

module.exports = router;