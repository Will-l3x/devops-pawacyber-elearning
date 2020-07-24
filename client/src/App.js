import React, { Component } from "react";
import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router";
/** Screens */
import HomeScreen from "./views/home/HomeScreen";
import AboutScreen from "./views/about/AboutScreen";
import AdminScreen from "./views/admin/AdminScreen";
import StudentScreen from "./views/student/StudentScreen";
import TeacherScreen from "./views/teacher/TeacherScreen";
import SchoolManagement from "./views/admin/SchoolManagement";
import SubscriptionScreen from "./views/admin/SubscriptionScreen";
import CourseListScreen from "./views/admin/CourseListScreen";
import RolesScreen from "./views/admin/Roles";
import UploadMaterial from "./views/teacher/TeacherUploadMaterial";
import EnrolStudent from "./views/teacher/EnrolStudent";

import CourseOutlineScreen from "./components/CourseOutlineScreen";
import ClassroomScreen from "./components/classroom/ClassroomScreen";
import SubjectContent from "./views/student/SubjectContent";
import StudentAssignments from "./views/student/StudentAssignments";
import TeacherCalendarScreen from "./views/teacher/TeacherCalendarScreen";
import LoginScreen from "./auth/LoginScreen";
import RegisterSuccessScreen from "./auth/RegistrationSuccess";
import RegistrationCanceled from "./auth/RegistrationCanceled";
import TeacherMarkGradeScreen from "./views/teacher/TeacherMarkGradeScreen";
import TeacherMarkClassroomScreen from "./views/teacher/TeacherMarkClassroomScreen";
import StudentAssignmentScreen from "./components/teacher-mark/StudentAssignmentScreen";
import StudentTestScreen from "./components/teacher-mark/StudentTestScreen";
import RegisterScreen from "./auth/RegisterScreen";

import SchoolScreen from "./views/school/SchoolScreen";
import SchoolStudentManagementScreen from "./views/school/SchoolStudentManagementScreen";
import SchoolTeacherManagementScreen from "./views/school/SchoolTeacherManagementScreen";
import SchoolSubscribeScreen from "./views/school/SchoolSubscribeScreen";
import ClassesScreen from "./views/school/ClassesScreen";
import SchoolCalendarScreen from "./views/school/SchoolCalendarScreen";
import SchoolAddCourseScreen from "./views/school/SchoolAddCourseScreen";
import UploadContent from "./views/admin/UploadContent";
import SuccessStudentUpgrade from "./components/student-components/SuccessStudentUpgrade";

import PackagePayment from "./views/student/PackagePayment";
import UploadNewAssignment from "./views/teacher/TeacherAssignments";
import SubadminScreen from "./views/admin/SubadminScreen";
import LivePlayer from "./components/LivePlayer";

import $ from "jquery";
import "materialize-css/dist/css/materialize.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import "./assets/css/custom.css";
import M from "materialize-css";
import store from "./config/store";
import history from "./history";

class App extends Component {
  componentDidMount() {
    M.AutoInit();
    $(window).on("load", function () {
      setTimeout(function () {
        $("body").addClass("loaded");
      }, 200);
    });
    //var window_width = $(window).width();

    // Search class for focus
    $(".header-search-input")
      .focus(function () {
        $(this).parent("div").addClass("header-search-wrapper-focus");
      })
      .blur(function () {
        $(this).parent("div").removeClass("header-search-wrapper-focus");
      });

    // Check first if any of the task is checked
    $(".task-card li input:checkbox").each(function () {
      checkbox_check(this);
    });

    // Task check box
    $(".task-card li input:checkbox").change(function () {
      checkbox_check(this);
    });

    // Check Uncheck function
    function checkbox_check(el) {
      if (!$(el).is(":checked")) {
        $(el).next().css("text-decoration", "none"); // or addClass
      } else {
        $(el).next().css("text-decoration", "line-through"); //or addClass
      }
    }
    // Set checkbox on forms.html to indeterminate
    var indeterminateCheckbox = document.getElementById(
      "indeterminate-checkbox"
    );
    if (indeterminateCheckbox !== null)
      indeterminateCheckbox.indeterminate = true;

    var toggleFlowTextButton = $("#flow-toggle");
    toggleFlowTextButton.click(function () {
      $("#flow-text-demo")
        .children("p")
        .each(function () {
          $(this).toggleClass("flow-text");
        });
    });

    // Detect touch screen and enable scrollbar if necessary
    function is_touch_device() {
      try {
        document.createEvent("TouchEvent");
        return true;
      } catch (e) {
        return false;
      }
    }
    if (is_touch_device()) {
      $("#nav-mobile").css({
        overflow: "auto",
      });
    }
  }
  render() {
    return (
      <Provider store={store}>
        <div id="loader-wrapper">
          <div id="loader"></div>
          <div className="loader-section section-left"></div>
          <div className="loader-section section-right"></div>
        </div>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route exact path="/payment-confirmed" component={RegisterSuccessScreen} />
            <Route exact path="/canceled" component={RegistrationCanceled} />
            <Route exact path="/payment-upgrade" component={SuccessStudentUpgrade} />
           
            <Route exact path="/login" component={LoginScreen} />
            <Route exact path="/register" component={RegisterScreen} />
            <Route exact path="/about" component={AboutScreen} />

            <Route exact path="/admin" component={AdminScreen} />
            <Route exact path="/subadmins" component={SubadminScreen} />
            <Route exact path="/roles" component={RolesScreen} />
            <Route exact path="/package-selection" component={PackagePayment} />
            <Route exact path="/upload" component={UploadMaterial} />
            <Route exact path="/assignments" component={UploadNewAssignment} />
            <Route exact path="/courses" component={CourseListScreen} />
            <Route exact path="/content-upload" component={UploadContent} />
            <Route
              exact
              path="/course-outline"
              component={CourseOutlineScreen}
            />

            <Route
              exact
              path="/school-management"
              component={SchoolManagement}
            />

            <Route exact path="/subscriptions" component={SubscriptionScreen} />
            <Route exact path="/enrol-student" component={EnrolStudent} />

            <Route exact path="/teacher" component={TeacherScreen} />
            <Route
              exact
              path="/teacher-mark"
              component={TeacherMarkGradeScreen}
            />
            <Route
              exact
              path="/teacher-calendar"
              component={TeacherCalendarScreen}
            />
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

            <Route exact path="/video-player" component={LivePlayer} />

            <Route exact path="/subject-content" component={SubjectContent} />
            <Route
              exact
              path="/student-assignments"
              component={StudentAssignments}
            />
            <Route exact path="/school" component={SchoolScreen} />
            <Route
              exact
              path="/school-teacher-management"
              component={SchoolTeacherManagementScreen}
            />
            <Route
              exact
              path="/school-student-management"
              component={SchoolStudentManagementScreen}
            />
            <Route exact path="/school-classes" component={ClassesScreen} />
            <Route
              exact
              path="/school-subscribe"
              component={SchoolSubscribeScreen}
            />
            <Route
              exact
              path="/school-add-course"
              component={SchoolAddCourseScreen}
            />
            <Route
              exact
              path="/school-calendar"
              component={SchoolCalendarScreen}
            />

            <Route
              path="/*"
              component={() => <h1 style={{ color: "red" }}>NOT FOUND!!!</h1>}
            />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
