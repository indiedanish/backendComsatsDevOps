const express = require('express');
const router = express.Router();

const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

const TeacherProjectController = require('../../controllers/TeacherControllers/TeacherProjectController');

console.log("AliRouteNeww")

router.post('/project', TeacherProjectController.addProject)
router.put('/project',verifyRoles(ROLES_LIST.Supervisor, ROLES_LIST.Committee), TeacherProjectController.updateProject)
router.delete('/project',verifyRoles(ROLES_LIST.Supervisor, ROLES_LIST.Committee), TeacherProjectController.deleteProject)
router.get('/project',verifyRoles(ROLES_LIST.Supervisor, ROLES_LIST.Committee ), TeacherProjectController.getProject)
router.get('/allProject',verifyRoles(ROLES_LIST.Supervisor, ROLES_LIST.Committee ), TeacherProjectController.getAllProject)
console.log("Sad")


    



module.exports = router;