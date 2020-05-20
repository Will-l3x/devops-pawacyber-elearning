import React from "react";
import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router";
import { createBrowserHistory } from "history";
import { HomeScreen } from "../views/home/HomeScreen";
import { AboutScreen } from "../views/about/AboutScreen";
import { AdminScreen } from "../views/admin/AdminScreen";
import { StudentScreen } from "../views/student/StudentScreen";
import { TeacherScreen } from "../views/teacher/TeacherScreen";
import { AdminTeacherManagementScreen } from "../views/admin/AdminTeacherManagementScreen";
import { SubscriptionScreen } from "../views/admin/SubscriptionScreen";
import { CourseListScreen } from "../views/admin/CourseListScreen";
import { CourseOutlineScreen } from "../components/CourseOutlineScreen";
import { ClassroomScreen } from "../components/classroom/ClassroomScreen";
import { SubjectContent } from "../views/student/SubjectContent";
import { StudentAssignments } from "../views/student/StudentAssignments";
import { TeacherTodoScreen } from "../views/teacher/TeacherTodoScreen";
import { AdminTodoScreen } from "../views/admin/AdminTodoScreen";
import { LoginScreen } from "../auth/LoginScreen";
import { TeacherMarkGradeScreen } from "../views/teacher/TeacherMarkGradeScreen";
import { TeacherMarkClassroomScreen } from "../views/teacher/TeacherMarkClassroomScreen";
import { StudentAssignmentScreen } from "../components/teacher-mark/StudentAssignmentScreen";
import { StudentTestScreen } from "../components/teacher-mark/StudentTestScreen";
import store from "../config/store"
import { RegisterScreen } from "../auth/RegisterScreen";

const history = createBrowserHistory();

const Main = () => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={HomeScreen} />

        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/register" component={RegisterScreen} />
        <Route exact path="/about" component={AboutScreen} />

        <Route exact path="/admin" component={AdminScreen} />
        <Route exact path="/admin-calendar" component={AdminTodoScreen} />
        <Route exact path="/courses" component={CourseListScreen} />
        <Route exact path="/course-outline" component={CourseOutlineScreen} />
        <Route
          exact
          path="/teacher-management"
          component={AdminTeacherManagementScreen}
        />
        <Route exact path="/subscriptions" component={SubscriptionScreen} />

        <Route exact path="/teacher" component={TeacherScreen} />
        <Route exact path="/teacher-mark" component={TeacherMarkGradeScreen} />
        <Route exact path="/teacher-calendar" component={TeacherTodoScreen} />
        <Route exact path="/classroom" component={ClassroomScreen} />
        <Route
          exact
          path="/classroom-mark"
          component={TeacherMarkClassroomScreen}
        />
        <Route
          exact
          path="/classroom-mark-test"
          component={StudentTestScreen}
        />
        <Route
          exact
          path="/classroom-mark-assignment"
          component={StudentAssignmentScreen}
        />

        <Route exact path="/student" component={StudentScreen} />
        <Route exact path="/subject-content" component={SubjectContent} />
        <Route
          exact
          path="/student-assignments"
          component={StudentAssignments}
        />
        <Route
          path="/*"
          component={() => <h1 style={{ color: "red" }}>NOT FOUND!!!</h1>}
        />
      </Switch>
    </Router>
  </Provider>
);

export default Main;
