"use strict";
var express = require("express");
var router = express.Router();

//ref your contollers here
var _auth = require("../controllers/_auth.js");

let _teacher = require("../controllers/_teacher.js");

////////////////////////auth/////////////////////////////////// all users
//router.post('/login', _auth.login);//done
//router.put('/changepw', _auth.changepassword);
//router.post('/register', _auth.register);
//router.post('/verify', _auth.verifyacc);
//router.get('/profile', _auth.profile);
//router.put('/resetpassword', _auth.resetpassword);

//////////////////////teacher//////////////////////////////////////////////
router.post("/teacher/enrol_student", _teacher.enrolStudent);

router.post("/teacher/new_material", _teacher.newCourseMaterial);
router.get("/teacher/get_material/:id", _teacher.getCourseMaterial);
router.get("/teacher/get_materials/:id", _teacher.getCourseMaterials);

router.post("/teacher/new_assignment", _teacher.newAssignment);
router.get("/teacher/get_assignment/:id", _teacher.getAssignment);
router.get("/teacher/get_assignments/:id", _teacher.getAssignments);

router.post("/teacher/new_reminder", _teacher.newReminder);

router.post("/teacher/mark_assignment", _teacher.markAssignment);
router.post("/teacher/comment_assignment", _teacher.commentAssignment);
//////////////////////student//////////////////////////////////////////////
//add your student endpoints here... well you get the gist

module.exports = router;
