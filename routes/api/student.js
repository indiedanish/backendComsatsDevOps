const express = require('express');
const router = express.Router();
const StudentProjectController = require('../../controllers/StudentControllers/StudentProjectController');
const TeamManagementController = require('../../controllers/StudentControllers/TeamManagementController');

const RequirementController = require('../../controllers/StudentControllers/requirementController');4
const StudentEvaluationController = require('../../controllers/StudentControllers/StudentEvaluationController');
const SprintController = require('../../controllers/StudentControllers/SprintController');
const TestPlanController = require('../../controllers/StudentControllers/TestPlanController');


const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');


// View Projects
router.get('/project', verifyRoles(ROLES_LIST.TeamMember, ROLES_LIST.TeamLead), StudentProjectController.getProject)
router.get('/allProject', verifyRoles(ROLES_LIST.TeamMember, ROLES_LIST.TeamLead), StudentProjectController.getAllProject)
router.put('/project',verifyRoles(ROLES_LIST.TeamMember, ROLES_LIST.TeamLead), StudentProjectController.updateProject)

// Team Management
router.put('/teamMember', verifyRoles(ROLES_LIST.TeamLead), TeamManagementController.addTeamMember)
router.put('/updateRole', verifyRoles(ROLES_LIST.TeamLead), TeamManagementController.updateRole)
router.put('/deleteTeamMember', verifyRoles(ROLES_LIST.TeamLead), TeamManagementController.deleteTeamMember)

// Requirements 
router.post('/requirement',  RequirementController.addRequirement)
router.put('/requirementLead',  RequirementController.updateRequirementLead)
router.put('/requirementMember',  RequirementController.updateRequirementMember)
router.delete('/requirement', RequirementController.deleteRequirement)
router.get('/getRequirement', RequirementController.getRequirement)
router.get('/getAllRequirement', RequirementController.getAllRequirement)

//Post, Delete and View Comments in Requirement
router.put('/addRequirementComments', RequirementController.addRequirementComments)
router.put('/deleteRequirementComments', RequirementController.deleteRequirementComments)
router.get('/getRequirementComments',  RequirementController.getRequirementComments)

//Testing routes jitnay bhi hoon gaay
router.get('/getTestPlan', TestPlanController.getTestPlan)
router.post('/addTestPlan', TestPlanController.addTestPlan)
//router.put('/updateTestPlan', TestPlanController.updateTestPlan)
router.delete('/deleteTestPlan', TestPlanController.deleteTestPlan)


// Evaluation
router.get('/getEvaluation', StudentEvaluationController.getEvaluation)



// Sprints Routes 
// (Create, View, Edit, Delete sprint) Organize meeting,View Backlogs, delete backlogs, set deadlines
router.get('/getSprint', SprintController.getSprint)
router.post('/addSprint', SprintController.addSprint)
router.put('/updateSprint', SprintController.updateSprint)
router.delete('/deleteSprint', SprintController.deleteSprint)





// Backlogs
// Notification Post, Join Email/Request
// According to evalution or requirements 
// View report will be considered as evalution


module.exports = router;