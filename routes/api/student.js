const express = require('express');
const router = express.Router();

const StudentProjectController = require('../../controllers/StudentControllers/StudentProjectController');
const TeamManagementController = require('../../controllers/StudentControllers/TeamManagementController');

const RequirementController = require('../../controllers/StudentControllers/requirementController');
const SprintController = require('../../controllers/StudentControllers/SprintController');
const DeliverablesController = require('../../controllers/StudentControllers/DeliverablesController');


const StudentEvaluationController = require('../../controllers/StudentControllers/StudentEvaluationController');
const CommitteeEvaluationController = require('../../controllers/TeacherControllers/CommitteeEvaluationController');
const SupervisorEvaluationController = require('../../controllers/TeacherControllers/SupervisorEvaluationController');


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

// Deliverables
router.post('/deliverable',  DeliverablesController.addDeliverable)
router.put('/deliverable',  DeliverablesController.updateDeliverable)
router.get('/getAllDeliverable',  DeliverablesController.getAllDeliverable)
router.get('/getDeliverable',  DeliverablesController.getDeliverable)
router.delete('/deliverable',  DeliverablesController.deleteDeliverable)





//updateDeliverable


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


// Evaluation
router.get('/getEvaluation', StudentEvaluationController.getEvaluation)



// Sprints Routes 
// (Create, View, Edit, Delete sprint) Organize meeting,View Backlogs, delete backlogs, set deadlines
router.get('/getSprint', SprintController.getSprint)
router.post('/addSprint', SprintController.addSprint)
router.put('/updateSprint', SprintController.updateSprint)
router.delete('/deleteSprint', SprintController.deleteSprint)



// Evaluations
router.post('/SupervisorEvaluation', SupervisorEvaluationController.AddSupervisorEvaluation)
router.get('/getSupervisorEvaluation', SupervisorEvaluationController.getSupervisorEvaluation)
router.get('/getAllSupervisorEvaluation', SupervisorEvaluationController.getAllSupervisorEvaluation)

router.post('/CommitteeEvaluation', CommitteeEvaluationController.AddCommitteeEvaluation)
router.get('/getCommitteeEvaluation', CommitteeEvaluationController.getCommitteeEvaluation)
router.get('/getAllCommitteeEvaluation', CommitteeEvaluationController.getAllCommitteeEvaluation)


// Backlogs
// Notification Post, Join Email/Request
// According to evalution or requirements 
// View report will be considered as evalution


module.exports = router;