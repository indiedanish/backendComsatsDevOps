const express = require('express');
const router = express.Router();
const TeacherProjectController = require('../../controllers/TeacherControllers/TeacherProjectController');
const StudentProjectController = require('../../controllers/StudentControllers/StudentProjectController');
const RequirementController = require('../../controllers/StudentControllers/requirementController');4
const StudentEvaluationController = require('../../controllers/StudentControllers/StudentEvaluationController');


const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');


// View Projects
router.get('/project', verifyRoles(ROLES_LIST.TeamMember, ROLES_LIST.TeamLead), TeacherProjectController.getProject)
router.get('/allProject', verifyRoles(ROLES_LIST.TeamMember, ROLES_LIST.TeamLead), TeacherProjectController.getAllProject)

// Team Management
router.put('/teamMember', verifyRoles(ROLES_LIST.TeamLead), StudentProjectController.addTeamMember)
router.put('/updateRole', verifyRoles(ROLES_LIST.TeamLead), StudentProjectController.updateRole)
router.put('/deleteTeamMember', verifyRoles(ROLES_LIST.TeamLead), StudentProjectController.deleteTeamMember)

// Requirements 
router.post('/requirement', verifyRoles( ROLES_LIST.TeamLead ), RequirementController.addRequirement)

router.put('/requirementLead', verifyRoles( ROLES_LIST.TeamLead ), RequirementController.updateRequirementLead)
router.put('/requirementMember', verifyRoles( ROLES_LIST.TeamMember ), RequirementController.updateRequirementMember)

router.delete('/requirement', verifyRoles( ROLES_LIST.TeamLead ), RequirementController.deleteRequirement)
router.get('/getRequirement', verifyRoles(  ROLES_LIST.TeamMember ), RequirementController.getRequirement)
router.get('/getAllRequirement', verifyRoles( ROLES_LIST.TeamLead, ROLES_LIST.TeamMember ), RequirementController.getAllRequirement)

//Post, Delete and View Comments in Requirement
router.put('/addRequirementComments', verifyRoles( ROLES_LIST.TeamLead, ROLES_LIST.TeamMember ), RequirementController.addRequirementComments)
router.put('/deleteRequirementComments', verifyRoles( ROLES_LIST.TeamLead, ROLES_LIST.TeamMember ), RequirementController.deleteRequirementComments)
router.get('/getRequirementComments', verifyRoles( ROLES_LIST.TeamLead, ROLES_LIST.TeamMember ), RequirementController.getRequirementComments)

//Testing routes jitnay bhi hoon gaay


// Evaluation
router.get('/getEvaluation', StudentEvaluationController.getEvaluation)



// Backlogs
// Notification Post, Join Email/Request
// According to evalution or requirements 
// View report will be considered as evalution


module.exports = router;