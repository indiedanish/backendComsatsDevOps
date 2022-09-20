const express = require('express');
const router = express.Router();
const stdTechCrudController = require('../controllers/AdminControllers/stdTechCrudController');
const tempplateController = require('../controllers/AdminControllers/templateController');
const announcementController = require('../controllers/AdminControllers/announcementController');
const rubricsController = require('../controllers/AdminControllers/rubricsController');
const committeeController = require('../controllers/AdminControllers/committeeController');


router.post('/student', stdTechCrudController.addNewStudent);
router.post('/teacher', stdTechCrudController.addNewTeacher);

router.put('/student', stdTechCrudController.updateStudent);
router.put('/teacher', stdTechCrudController.updateTeacher);

router.delete('/student', stdTechCrudController.deleteStudent);
router.delete('/teacher', stdTechCrudController.deleteTeacher);

router.get('/getStudent', stdTechCrudController.getStudent);
router.get('/getTeacher', stdTechCrudController.getTeacher);

router.get('/getAllStudents', stdTechCrudController.getAllStudent);
router.get('/getAllTeachers', stdTechCrudController.getAllTeacher); 

router.post('/template', tempplateController.addTemplate); 
router.put('/template', tempplateController.updateTemplate); 
router.delete('/template', tempplateController.deleteTemplate); 
router.get('/getAllTemplate', tempplateController.getAllTemplate); 
router.get('/getTemplate', tempplateController.getTemplate); 

router.post('/announcement', announcementController.addAnnouncement); 
router.put('/announcement', announcementController.updateAnnouncement); 
router.delete('/announcement', announcementController.deleteAnnouncement); 
router.get('/getAllAnnouncement', announcementController.getAllAnnouncement); 
router.get('/getAnnouncement', announcementController.getAnnouncement); 


//router.post('/supervisorRubrics', rubricsController.addCommitteeRubrics); 
// router.put('/supervisorRubrics', rubricsController.updateAnnouncement); 
// router.delete('/supervisorRubrics', rubricsController.deleteAnnouncement); 
// router.get('/getSupervisorRubrics', rubricsController.getAnnouncement); 
// router.get('/getAllsupervisorRubrics', rubricsController.getAnnouncement); 

 router.post('/committeeRubrics', rubricsController.addCommitteeRubrics); 
// router.put('/committeeRubrics', rubricsController.updateAnnouncement); 
// router.delete('/committeeRubrics', rubricsController.deleteAnnouncement); 
// router.get('/getCommitteeRubrics', rubricsController.getAnnouncement); 
// router.get('/getAllCommitteeRubrics', rubricsController.getAnnouncement); 


router.post('/committee', committeeController.addCommittee); 
router.put('/committee', committeeController.updateCommittee); 
router.delete('/committee', committeeController.deleteCommittee); 
router.get('/getCommittee', committeeController.getCommittee); 
router.get('/getAllCommittee', committeeController.getAllCommittee); 





module.exports = router;