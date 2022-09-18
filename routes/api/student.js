const express = require('express');
const router = express.Router();
const ProjectController = require('../../controllers/TeacherControllers/ProjectController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');



// router.get('/project',verifyRoles(ROLES_LIST.TeamMember, ROLES_LIST.TeamLead ), ProjectController.getProject)
// router.get('/allProject',verifyRoles(ROLES_LIST.TeamMember, ROLES_LIST.TeamLead ), ProjectController.getProject)


router.post('/teamMember',verifyRoles( ROLES_LIST.TeamLead ), ProjectController.addTeamMember)
router.post('/assignRole',verifyRoles( ROLES_LIST.TeamLead ), ProjectController.assignRole)
router.put('/assignRole',verifyRoles( ROLES_LIST.TeamLead ), ProjectController.updateRole) 
router.delete('/teamMember',verifyRoles( ROLES_LIST.TeamLead ), ProjectController.deleteTeamMember)



// Backlogs
// Notification Post, Join Email/Request
// According to evalution or requirements 
// View report will be considered as evalution



module.exports = router;