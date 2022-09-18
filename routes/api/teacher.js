const express = require('express');
const router = express.Router();

const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

const ProjectController = require('../../controllers/TeacherControllers/TeacherProjectController');

router.post('/project',verifyRoles(ROLES_LIST.Supervisor, ROLES_LIST.Committee), ProjectController.addProject)
router.put('/project',verifyRoles(ROLES_LIST.Supervisor, ROLES_LIST.Committee), ProjectController.updateProject)
router.delete('/project',verifyRoles(ROLES_LIST.Supervisor, ROLES_LIST.Committee), ProjectController.deleteProject)
router.get('/project',verifyRoles(ROLES_LIST.Supervisor, ROLES_LIST.Committee ), ProjectController.getProject)
router.get('/allProject',verifyRoles(ROLES_LIST.Supervisor, ROLES_LIST.Committee ), ProjectController.getAllProject)


    



module.exports = router;