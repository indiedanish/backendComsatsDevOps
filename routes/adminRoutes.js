const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/student', adminController.addNewStudent);
router.post('/teacher', adminController.addNewTeacher);

router.put('/student', adminController.updateStudent);
router.put('/teacher', adminController.updateTeacher);

router.delete('/student', adminController.deleteStudent);
router.delete('/teacher', adminController.deleteTeacher);

router.get('/getAllStudents', adminController.getAllStudents);
router.get('/getAllTeachers', adminController.getAllTeachers);

router.get('/getStudent', adminController.getStudent);
router.get('/getTeacher', adminController.getTeacher);


module.exports = router;