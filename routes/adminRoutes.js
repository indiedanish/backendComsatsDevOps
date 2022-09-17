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

router.post('/template', adminController.addTemplate); 
router.put('/template', adminController.updateTemplate); 
router.delete('/template', adminController.deleteTemplate); 
router.get('/getAllTemplate', adminController.getAllTemplate); 
router.get('/getTemplate', adminController.getTemplate); 


router.post('/announcement', adminController.addAnnouncement); 
router.put('/announcement', adminController.updateAnnouncement); 
router.delete('/announcement', adminController.deleteAnnouncement); 
router.get('/getAllAnnouncement', adminController.getAllAnnouncement); 
router.get('/getAnnouncement', adminController.getAnnouncement); 




module.exports = router;