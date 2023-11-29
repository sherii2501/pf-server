const express = require('express')
const router = new express.Router()
const userController = require('../Controllers/userController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const projectController = require('../Controllers/projectController')
const multerConfig = require('../Middlewares/multerMiddleware')
// register API
router.post('/user/register',userController.register)
// login
router.post('/user/login',userController.login)
// add projects
router.post('/projects/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProjects)
// getuserprojects  token required
router.get('/user/all-projects',jwtMiddleware,projectController.allUserProjects)
// getallprojects token required
router.get('/projects/all',jwtMiddleware,projectController.getallProjects)
// gethomeprojects
router.get('/projects/home-projects',projectController.getHomeProjects)
// update all 
router.put('/projects/edit/:id',jwtMiddleware,multerConfig.single("projectImage"),projectController.editProjectController)
// delete project
router.delete('/projects/remove/:id',jwtMiddleware,projectController.deleteProjectController)
// updateuser
router.put('/user/edit',jwtMiddleware,multerConfig.single("profileImage"),userController.editUser)
// export router
module.exports = router