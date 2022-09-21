const express = require('express');
const router = express.Router();
const TeacherProjectController = require('../../controllers/TeacherControllers/TeacherProjectController');
const StudentProjectController = require('../../controllers/StudentControllers/StudentProjectController');

const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');



router.get('/project',verifyRoles(ROLES_LIST.TeamMember, ROLES_LIST.TeamLead ), TeacherProjectController.getProject)
router.get('/allProject',verifyRoles(ROLES_LIST.TeamMember, ROLES_LIST.TeamLead ), TeacherProjectController.getAllProject)


router.put('/teamMember', StudentProjectController.addTeamMember)
router.put('/updateRole', StudentProjectController.updateRole) 
router.put('/deleteTeamMember', StudentProjectController.deleteTeamMember)

// Requirements
// router.post('/requirement',verifyRoles( ROLES_LIST.TeamLead ), StudentProjectController.addTeamMember)
// router.put('/requirement',verifyRoles( ROLES_LIST.TeamLead ), StudentProjectController.updateRole) 
// router.delete('/requirement',verifyRoles( ROLES_LIST.TeamLead ), StudentProjectController.deleteTeamMember)

//Add Requirements L
//PUT reassign requirement to team member L
//Accept assigned requriment for team member M
//Change description of requirement L
//Add Comments L/M
//Add Files L/M
//View Requirements L/M
//View Comments L/M
//Delete Comments L/M
//View Files L/M
//Testing routes jitnay bhi hoon gaay


//


// Backlogs
// Notification Post, Join Email/Request
// According to evalution or requirements 
// View report will be considered as evalution


module.exports = router;