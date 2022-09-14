const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/student', authController.StudentLogin);
router.post('/teacher', authController.TeacherLogin);

module.exports = router;