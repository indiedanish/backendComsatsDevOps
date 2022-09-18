const express = require('express');
const router = express.Router();

const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

const ProjectController = require('../../controllers/TeacherControllers/ProjectController');

// router.post('/project',verifyRoles(ROLES_LIST.Supervisor, ROLES_LIST.Committee), ProjectController.addProject)
// router.put('/project',verifyRoles(ROLES_LIST.Supervisor, ROLES_LIST.Committee), ProjectController.addProject)
// router.delete('/project',verifyRoles(ROLES_LIST.Supervisor, ROLES_LIST.Committee), ProjectController.addProject)
// router.get('/project',verifyRoles(ROLES_LIST.Supervisor, ROLES_LIST.Committee ), ProjectController.addProject)
// router.get('/allProject',verifyRoles(ROLES_LIST.Supervisor, ROLES_LIST.Committee ), ProjectController.addProject)


    



module.exports = router;