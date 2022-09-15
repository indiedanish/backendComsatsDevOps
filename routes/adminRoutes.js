const express = require('express');
const router = express.Router();
const registerController = require('../controllers/adminController');

router.post('/student', registerController.addNewStudent);
router.post('/teacher', registerController.addNewTeacher);

router.put('/student', registerController.updateStudent);
router.put('/teacher', registerController.updateTeacher);

router.delete('/student', registerController.deleteStudent);
router.delete('/teacher', registerController.deleteTeacher);

router.get('/getAllStudents', registerController.getAllStudent);
router.get('/getAllTeachers', registerController.getAllTeacher); 

module.exports = router;