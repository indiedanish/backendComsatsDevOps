const express = require('express');
const router = express.Router();

const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

const TeacherProjectController = require('../../controllers/TeacherControllers/TeacherProjectController');
const CommitteeEvaluationController = require('../../controllers/TeacherControllers/CommitteeEvaluationController');
const SupervisorEvaluationController = require('../../controllers/TeacherControllers/SupervisorEvaluationController');


const CommitteeAssignedProjectsController = require('../../controllers/TeacherControllers/CommitteeAssignedProjectsController');

// Project Management
router.post('/project', verifyRoles(ROLES_LIST.Supervisor), TeacherProjectController.addProject)
router.put('/project',verifyRoles(ROLES_LIST.Supervisor, ROLES_LIST.Committee), TeacherProjectController.updateProject)
router.delete('/project',verifyRoles(ROLES_LIST.Supervisor, ROLES_LIST.Committee), TeacherProjectController.deleteProject)
router.get('/project',verifyRoles(ROLES_LIST.Supervisor, ROLES_LIST.Committee ), TeacherProjectController.getProject)
router.get('/allProject',verifyRoles(ROLES_LIST.Supervisor, ROLES_LIST.Committee ), TeacherProjectController.getAllProject)
  
// Evaluations
router.get('/getSupervisorRubrics', SupervisorEvaluationController.getSupervisorRubrics)
router.get('/getCommitteeRubrics', CommitteeEvaluationController.getCommitteeRubrics)

router.post('/SupervisorEvaluation', SupervisorEvaluationController.AddSupervisorEvaluation)
router.post('/CommitteeEvaluation', CommitteeEvaluationController.AddCommitteeEvaluation)

// View AssignedGroups

router.get('/getAssignedGroup', CommitteeAssignedProjectsController.getOneGroup); 
router.get('/getAllAssignedGroup', CommitteeAssignedProjectsController.getAllGroup); 



module.exports = router;