# devops

E-learning

#### Backend

_@tatembuva_

Currently on this branch I'll be using sqlite3 for dev, until I finish setting up docker and mssql on my mac...

**System Admin**

**Teacher**

- [x] Enrol students for a course
  - Route `+ /api/teacher/enrol_student`
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
- [ ] Able to broadcast reminders
- [ ] Able to take questions and answers ( chat timeline ? like a class channel(slack) ?)
- [ ] Able to send emails to students' attached emails
- [ ] Ability to download/upload
- [ ] Ability to mark online
- [ ] Ability to track students in online session
- [ ] Basic reporting

**Student**
