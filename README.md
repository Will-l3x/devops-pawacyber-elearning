# devops

E-learning

#### Backend

@WIlvanos Zhira

**System Admin**

**Teacher**

- [x] Enrol students for a course
  - Route post `+ /api/teacher/enrol_student`
  - [ ] sends email with enrolment details
  - [ ] link contained in email, completes class reg
- [x] Create and upload content
  - Route post `+ /api/teacher/new_material`
  - Route get `+ /api/teacher/get_material/:id` (materialId)
  - Route get `+ /api/teacher/get_materials/:id` (classId)
- [ ] Conduct class online
  - Live stream ?
- [x] Able to create questionnaire, test & assignments
  - Route post `+ /api/teacher/new_assignment`
  - Route get `+ /api/teacher/get_assignment/:id` (assignmentId)
  - Route get `+ /api/teacher/get_assignments/:id` (classId)
- [x] Able to broadcast reminders
  - Route post `+ /api/teacher/new_reminder` (classid, teacherid, title, message, enddate(e.g 2020-05-15))
- [x] Able to take questions and answers ( chat timeline ? like a class channel(slack) ?)
  - Route post `+ /api/teacher/new_msg` (teacherid, studentid,to,from,title,message)
  - Route get `+ /api/teacher/get_msgs/:id`
- [ ] Able to send emails to students' attached emails
- [x] Ability to download/upload
  - Route post `+ /api/teacher/new_material` `+ /api/teacher/new_assignment`
  - Route post `+ /api/upload/new` (uploadId, uploadType) `<input name="uploadFile"/>`
- [x] Ability to mark online
  - Route post `+ /api/teacher/mark_assignment` (student_assignmentid, mark)
  - Route post `+ /api/teacher/comment_assignment` (student_assignmentid, comment)
- [ ] Ability to track students in online session
- [ ] Basic reporting
- [x] Get all classes for a single teacher
  - Route get `+ /api/teacher/get_classes/:id` (teacherId)
- [x] Get all students in a class
  - Route get `+ /api/teacher/get_students/:id` (classId)
- [x] Get all submissions for an assignment
  - Route get `+ /api/teacher/get_submissions/:id` (assignmentId)

**Student**

- [x] Students can get all enrolled subjects/courses
  - Route get `+ /api/student/get_classes/:id` (studentId)
- [x] Student can get all course material for a subject
  - Route get `+ /api/student/get_materials/:id` (classid)
- [ ] Student can get Past Exam Papers by class
- [ ] Exam Paper resources can contain memos, answers scripts
- [x] Can get reminders for all registered classes
  - Route get `+ /api/student/get_reminders/:id` (studentid)
- [x] Student can post questions for teacher
  - Route post `+ /api/student/new_msg` (teacherid, studentid,to,from,title,message)
  - Route get `+ /api/student/get_msgs/:id`
- [x] Ability to download/upload assignments
  - Route post `+ /api/teacher/new_submission`
  - Route post `+ /api/upload/new` (uploadId, uploadType) `<input name="uploadFile"/>`
