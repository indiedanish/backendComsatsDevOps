const express = require('express');
const router = express.Router();

const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

const TeacherProjectController = require('../../controllers/TeacherControllers/TeacherProjectController');
const EvaluationController = require('../../controllers/TeacherControllers/TeacherEvaluationController');

// Project Management
router.post('/project', verifyRoles(ROLES_LIST.Supervisor), TeacherProjectController.addProject)
router.put('/project',verifyRoles(ROLES_LIST.Supervisor, ROLES_LIST.Committee), TeacherProjectController.updateProject)
router.delete('/project',verifyRoles(ROLES_LIST.Supervisor, ROLES_LIST.Committee), TeacherProjectController.deleteProject)
router.get('/project',verifyRoles(ROLES_LIST.Supervisor, ROLES_LIST.Committee ), TeacherProjectController.getProject)
router.get('/allProject',verifyRoles(ROLES_LIST.Supervisor, ROLES_LIST.Committee ), TeacherProjectController.getAllProject)
  
// Evaluations
router.get('/getSupervisorRubrics', EvaluationController.getSupervisorRubrics)
router.get('/getCommitteeRubrics', EvaluationController.getCommitteeRubrics)

router.post('/SupervisorEvaluation', EvaluationController.AddSupervisorEvaluation)
router.post('/CommitteeEvaluation', EvaluationController.AddCommitteeEvaluation)



module.exports = router;