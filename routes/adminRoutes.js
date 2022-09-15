const express = require('express');
const router = express.Router();
const registerController = require('../controllers/adminController');

router.post('/student', registerController.addNewStudent);
router.post('/teacher', registerController.addNewTeacher);

router.put('/student', registerController.addNewStudent);
router.put('/teacher', registerController.addNewTeacher);

router.delete('/student', registerController.addNewStudent);
router.delete('/teacher', registerController.addNewTeacher);

router.get('/getAllStudents', registerController.addNewStudent);
router.get('/getAllTeachers', registerController.addNewTeacher);


module.exports = router;