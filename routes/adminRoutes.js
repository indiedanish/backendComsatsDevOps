const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/student', adminController.addNewStudent);
router.post('/teacher', adminController.addNewTeacher);

router.put('/student', adminController.updateStudent);
router.put('/teacher', adminController.updateTeacher);

router.delete('/student', adminController.deleteStudent);
router.delete('/teacher', adminController.deleteTeacher);

router.get('/getStudent', adminController.getStudent);
router.get('/getTeacher', adminController.getTeacher);

router.get('/getAllStudents', adminController.getAllStudent);
router.get('/getAllTeachers', adminController.getAllTeacher); 

router.get('/getAllTemplate', adminController.getAllTeacher); 
router.get('/getTemplate', adminController.getAllTeacher); 
router.post('/template', adminController.getAllTeacher); 
router.put('/template', adminController.getAllTeacher); 
router.delete('/template', adminController.getAllTeacher); 




module.exports = router;