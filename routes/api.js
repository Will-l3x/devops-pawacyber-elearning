"use strict";
var express = require("express");
var router = express.Router();

//ref your contollers here
var _auth = require("../controllers/_auth.js");
var _media_server = require("../controllers/_media_server.js");
var _systemadmin = require("../controllers/_systemadmin.js");

let _teacher = require("../controllers/_teacher.js");
let _student = require("../controllers/_student.js");
let _schooladmin = require("../controllers/_schooladmin.js");
let _uploads = require("../controllers/_uploads.js");
let _storage = require("../controllers/_storage.js");
const _paymentDpo = require("../controllers/_paymentDpo.js");

router.use(_auth.checktoken);

////////////////////////auth/////////////////////////////////// all users
router.post("/login", _auth.login); //done
//router.post('/test', _auth.test);//done
router.put("/changepw", _auth.changepassword);
router.post("/register", _auth.register);
router.post('/verify', _auth.verifyacc);
router.get("/profile", _auth.profile);
router.put("/resetpassword", _auth.resetpassword);
router.put("/refreshotp", _auth.refreshotp);

//////////////////////systemadmin//////////////////////////////////////////////
router.get("/genders", _systemadmin.genders);
router.get("/roles", _systemadmin.roles);


router.get("/subscriptions", _systemadmin.subscriptions);
router.post("/add_subscription", _systemadmin.add_subscription);
router.delete("/del_subscription/:id", _systemadmin.del_subscription);
router.get("/subscription/:id", _systemadmin.subscription);
router.put("/update_subscription/:id", _systemadmin.update_subscription);
router.put("/subscribe", _systemadmin.subscribe);
router.put("/subscribestudent", _systemadmin.subscribestudent);
router.get("/subadmins", _systemadmin.subadmins);
router.get("/subadmin/:id", _systemadmin.subadmin);
router.delete("/del_subadmin/:id", _systemadmin.del_subadmin);
router.get("/schools", _systemadmin.schools);
router.get("/school/:id", _systemadmin.school);
router.post("/add_school", _systemadmin.add_school);
router.put("/update_school/:id", _systemadmin.update_school);
router.delete("/del_school/:id", _systemadmin.del_school);
router.get("/subscriptions", _systemadmin.subscriptions);
router.post("/add_subscription", _systemadmin.add_subscription);
router.delete("/del_subscription/:id", _systemadmin.del_subscription);
router.get("/subscription/:id", _systemadmin.subscription);
router.get("/update_subcription", _systemadmin.update_subscription);

router.get("/classes/all", _systemadmin.classes);
router.post("/post_payment_enrol", _systemadmin.post_payment_enrol);
//////////////////////mediaplayer//////////////////////////////////////////////
router.get("/playvideo", _media_server.playvideo);
router.post("/create_meeting", _media_server.create_meeting);
router.get("/get_meetings", _media_server.get_meetings);
router.get("/get_class_meetings/:id", _media_server.get_class_meetings);
router.get("/get_meeting/:id", _media_server.get_meeting);
router.put("/start_meeting/:id", _media_server.start_meeting);
router.put("/stop_meeting/:id", _media_server.stop_meeting);

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

router.get("/student/get_classes/:id", _student.getClasses);
router.get("/student/get_materials/:id", _student.getCourseMaterials);

router.get("/student/get_reminders/:id", _student.getReminders);

router.get("/student/get_assignments/:id", _student.getAssignments);
router.post("/student/new_submission", _student.newSubmission);

router.get("/student/active_packages/:id", _student.active_packages);
router.post("/student/classes_grade", _student.classes_grade);
router.post("/student/select_package_class", _student.select_package_class);

//////////////////////schooladmin//////////////////////////////////////////////

router.get("/schooladmin/teacher/:id", _schooladmin.teacher);
router.get("/schooladmin/teachers/:id", _schooladmin.teachers);
router.post("/schooladmin/add_teacher", _auth.register);
router.delete("/schooladmin/del_teacher/:id", _schooladmin.del_teacher);
router.put("/schooladmin/update_teacher", _schooladmin.update_teacher);

router.get("/schooladmin/student/:id", _schooladmin.student);
router.get("/schooladmin/students/:id", _schooladmin.students);
router.post("/schooladmin/add_student", _auth.register);
router.delete("/schooladmin/del_student/:id", _schooladmin.del_student);
router.put("/schooladmin/update_student", _schooladmin.update_student);

router.get("/schooladmin/get_class/:id", _schooladmin.get_class);
router.get("/schooladmin/get_classes/:id", _schooladmin.get_classes);
router.post("/schooladmin/add_class", _schooladmin.add_class);
router.delete("/schooladmin/del_class", _schooladmin.del_class);
router.put("/schooladmin/update_class", _schooladmin.update_class);

router.get("/schooladmin/packages", _schooladmin.get_packages);
// ---
router.get("/schooladmin/add_packages", _schooladmin.add_packages); // not production
// ---
router.post("/schooladmin/activate_package", _schooladmin.activate_package);
router.get("/schooladmin/active_packages/:id", _schooladmin.active_packages);

router.post("/schooladmin/add_shared_class_cover", _schooladmin.add_shared_class_cover);
router.get("/schooladmin/get_shared_classes_with_cover", _schooladmin.get_shared_classes_with_cover);

router.post("/schooladmin/shared_classes", _schooladmin.shared_classes);//by grade
router.post("/schooladmin/get_all_shared_classes", _schooladmin.all_shared_classes);
router.get("/schooladmin/shared_topics/:id", _schooladmin.shared_topics); //classid
router.post("/schooladmin/shared_materials", _schooladmin.shared_materials); //by topic & class
router.get("/schooladmin/shared_materials_topic/:id", _schooladmin.shared_materials_topic); //topicid
router.get("/schooladmin/shared_materials_class/:id", _schooladmin.shared_materials_class); //classid
router.post("/schooladmin/add_shared_class", _schooladmin.add_shared_class);
router.post("/schooladmin/add_shared_topic", _schooladmin.add_shared_topic);
router.post("/schooladmin/add_shared_material", _schooladmin.add_shared_material);

// ---
router.get("/schooladmin/add_syllabi/", _schooladmin.add_syllabi); // not production
// ---
router.get("/schooladmin/syllabus/:id", _schooladmin.syllabus);
router.get("/schooladmin/syllabi", _schooladmin.get_syllabi);
router.post("/schooladmin/add_syllabus", _schooladmin.add_syllabus);
router.delete("/schooladmin/del_syllabus", _schooladmin.del_syllabus);
router.put("/schooladmin/update_syllabus", _schooladmin.update_syllabus);

//////////////////////uploads//////////////////////////////////////////////

router.post("/upload/new", _storage.upload);
router.post("/upload/get", _storage.download);
router.post("/upload/multi", _storage.multiUpload);

//////////////////////////////DPO PAYMENTS/////////////////////////////////
router.post("/dpo/payment/createToken", _paymentDpo.createToken);

module.exports = router;
