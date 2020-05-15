# devops

E-learning

#### Backend

_@tatembuva_

**System Admin**

**Teacher**

- [x] Enrol students for a course
  - Route post `+ /api/teacher/enrol_student`
  - [ ] sends email with enrolment details
  - [ ] link contained in email, completes class reg
- [x] Create and upload content
  - Route post `+ /api/teacher/newCourseMaterial`
  - Route get `+ /api/teacher/getCourseMaterial/:id`
  - Route get `+ /api/teacher/getCourseMaterials/:id`
- [ ] Conduct class online
  - Live stream ?
- [x] Able to create questionnaire, test & assignments
  - Route post `+ /api/teacher/newAssignment`
  - Route get `+ /api/teacher/getAssignment/:id`
  - Route get `+ /api/teacher/getAssignments/:id`
- [x] Able to broadcast reminders
  - Route post `+ /api/teacher/newReminder` (classid, teacherid, title, message, enddate(e.g 2020-05-15))
- [x] Able to take questions and answers ( chat timeline ? like a class channel(slack) ?)
  - Route post `+ /api/teacher/newMsg` (teacherid, studentid,to,from,title,message)
  - Route get `+ /api/teacher/getMsgs/:id`
- [ ] Able to send emails to students' attached emails
- [ ] Ability to download/upload
- [x] Ability to mark online
  - Route post `+ /api/teacher/markAssignment` (student_assignmentid, mark)
  - Route post `+ /api/teacher/commentAssignment` (student_assignmentid, comment)
- [ ] Ability to track students in online session
- [ ] Basic reporting

**Student**

- [ ] Students can get all enrolled subjects/courses
- [ ] Student can get all course material for a subject
- [ ] Student can get Past Exam Papers by class
- [ ] Exam Paper resources can contain memos, answers scripts
- [ ] Can get reminders for all registered classes
- [x] Student can post questions for teacher
  - Route post `+ /api/student/newMsg` (teacherid, studentid,to,from,title,message)
  - Route get `+ /api/student/getMsgs/:id`
