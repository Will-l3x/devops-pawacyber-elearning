"use strict";
var express = require("express");
var router = express.Router();

//ref your contollers here
var _auth = require("../controllers/_auth.js");

let _teacher = require("../controllers/_teacher.js");
let _student = require("../controllers/_student.js");
let _uploads = require("../controllers/_uploads.js");

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

router.post("/teacher/new_msg", _teacher.newMsg);
router.get("/teacher/get_msgs/:id", _teacher.getMsgs);

router.get("/teacher/get_classes/:id", _teacher.getClasses);
router.get("/teacher/get_students/:id", _teacher.getStudents);
router.get("/teacher/get_submissions/:id", _teacher.getSubmissions);
//////////////////////student//////////////////////////////////////////////
router.post("/student/new_msg", _student.newMsg);
router.get("/student/get_msgs/:id", _student.getMsgs);
//////////////////////uploads//////////////////////////////////////////////
router.post("/upload/new", _uploads.upload);

module.exports = router;
