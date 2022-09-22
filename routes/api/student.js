const express = require('express');
const router = express.Router();
const TeacherProjectController = require('../../controllers/TeacherControllers/TeacherProjectController');
const StudentProjectController = require('../../controllers/StudentControllers/StudentProjectController');
const RequirementController = require('../../controllers/StudentControllers/requirementController');

const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');



router.get('/project', verifyRoles(ROLES_LIST.TeamMember, ROLES_LIST.TeamLead), TeacherProjectController.getProject)
router.get('/allProject', verifyRoles(ROLES_LIST.TeamMember, ROLES_LIST.TeamLead), TeacherProjectController.getAllProject)


router.put('/teamMember', verifyRoles(ROLES_LIST.TeamLead), StudentProjectController.addTeamMember)
router.put('/updateRole', verifyRoles(ROLES_LIST.TeamLead), StudentProjectController.updateRole)
router.put('/deleteTeamMember', verifyRoles(ROLES_LIST.TeamLead), StudentProjectController.deleteTeamMember)

// Requirements
router.post('/requirement', verifyRoles( ROLES_LIST.TeamLead ), RequirementController.addRequirement)

router.put('/requirementLead', verifyRoles( ROLES_LIST.TeamLead ), RequirementController.updateRequirementLead)
router.put('/requirementMember', verifyRoles( ROLES_LIST.TeamMember ), RequirementController.updateRequirementMember)

router.delete('/requirement', verifyRoles( ROLES_LIST.TeamLead ), RequirementController.deleteRequirement)
router.get('/getRequirement', verifyRoles( ROLES_LIST.TeamLead, ROLES_LIST.TeamMember ), RequirementController.getRequirement)
router.get('/getAllRequirement', verifyRoles( ROLES_LIST.TeamLead, ROLES_LIST.TeamMember ), RequirementController.getAllRequirement)



//Add Comments L/M
//View Comments L/M
//Delete Comments L/M
//Testing routes jitnay bhi hoon gaay


//


// Backlogs
// Notification Post, Join Email/Request
// According to evalution or requirements 
// View report will be considered as evalution


module.exports = router;