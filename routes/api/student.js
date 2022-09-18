const express = require('express');
const router = express.Router();
const ProjectController = require('../../controllers/TeacherControllers/ProjectController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');



// router.get('/project',verifyRoles(ROLES_LIST.TeamMember, ROLES_LIST.TeamLead ), ProjectController.getProject)
// router.get('/allProject',verifyRoles(ROLES_LIST.TeamMember, ROLES_LIST.TeamLead ), ProjectController.getProject)


   

module.exports = router;