const express = require('express');
const router = express.Router();
const TeacherProjectController = require('../../controllers/TeacherControllers/TeacherProjectController');
const StudentProjectController = require('../../controllers/StudentControllers/StudentProjectController');

const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');



router.get('/project',verifyRoles(ROLES_LIST.TeamMember, ROLES_LIST.TeamLead ), TeacherProjectController.getProject)
router.get('/allProject',verifyRoles(ROLES_LIST.TeamMember, ROLES_LIST.TeamLead ), TeacherProjectController.getAllProject)


router.post('/teamMember',verifyRoles( ROLES_LIST.TeamLead ), StudentProjectController.addTeamMember)
router.put('/updateRole',verifyRoles( ROLES_LIST.TeamLead ), StudentProjectController.updateRole) 
router.delete('/teamMember',verifyRoles( ROLES_LIST.TeamLead ), StudentProjectController.deleteTeamMember)



// Backlogs
// Notification Post, Join Email/Request
// According to evalution or requirements 
// View report will be considered as evalution



module.exports = router;