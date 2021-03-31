import React, { Component } from "react";
import { Provider } from "react-redux";
// import { Router, Route, Switch } from "react-router";
import { HashRouter, Route } from "react-router-dom";
/** Screens */
import HomeScreen from "./views/home/HomeScreen";
import AboutScreen from "./views/about/AboutScreen";
import AdminScreen from "./views/admin/AdminScreen";
import StudentScreen from "./views/student/StudentScreen";
import TeacherScreen from "./views/teacher/TeacherScreen";
import TeacherSubjectContent from "./views/teacher/TeacherSubjectContent";
import SchoolManagement from "./views/admin/SchoolManagement";
import SubscriptionScreen from "./views/admin/SubscriptionScreen";
import RolesScreen from "./views/admin/Roles";
import UploadMaterial from "./views/teacher/TeacherUploadMaterial";
import EnrolStudent from "./views/teacher/EnrolStudent";
import ClassroomScreen from "./components/classroom/ClassroomScreen";
import SubjectContent from "./views/student/SubjectContent";
import StudentAssignments from "./views/student/StudentAssignments";
import TeacherAffiliateProgram from "./views/teacher/TeacherAffiliateProgram";
import LoginScreen from "./auth/LoginScreen";
import RegisterSuccessScreen from "./auth/RegistrationSuccess";
import RegistrationCanceled from "./auth/RegistrationCanceled";
import TeacherMarkClassroomScreen from "./views/teacher/TeacherMarkClassroomScreen";
import StudentSubmissionsScreen from "./components/teacher-mark/StudentSubmissionsScreen";
import RegisterScreen from "./auth/RegisterScreen";
import RegisterStudent from "./auth/RegisterStudent";

import SchoolScreen from "./views/school/SchoolScreen";
import SchoolStudentManagementScreen from "./views/school/SchoolStudentManagementScreen";
import SchoolTeacherManagementScreen from "./views/school/SchoolTeacherManagementScreen";
import ClassesScreen from "./views/school/ClassesScreen";
import SchoolCalendarScreen from "./views/school/SchoolCalendarScreen";
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

import "./assets/css/video-player.css";
import "./assets/css/profile.css";
import "./assets/css/loader.css";
import store from "./config/store";
//import history from "./history";
import Students from "./views/admin/Students";
import AllClasses from "./views/admin/Subjects";
import ProfileScreen from "./components/profile/ProfileScreen";
import TeacherStudents from "./views/teacher/TeacherStudents";
import RegisterAs from "./auth/RegisterAs";
import RegisterTeacher from "./auth/RegisterTeacher";
import RegisterLimitedTeacher from "./auth/RegisterLimitedTeacher";
import RegisterPremiumTeacher from "./auth/RegisterPremiumTeacher";
import TeacherRegistrationSuccess from "./auth/TeacherRegistrationSuccess";
import ProfileAccScreen from "./components/profile/ProfileAccScreen";
import FreeStudentAcc from "./components/student-components/FreeStudentAcc";
import StudentCoursework from "./views/student/StudentCoursework";
import StudentClassCoursework from "./views/student/StudentClassCoursework";

class App extends Component {
  componentDidMount() {
    M.AutoInit();

    // setInterval(() => {
    //   $("#ads_modal").removeClass("display-none");
    // }, 3000);

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
  handleAdClose = (event) => {
    event.preventDefault();
    $("#ads_modal").addClass("display-none");
  };
  render() {
    return (
      <Provider store={store}>
        <div id="ads_modal" className="display-none z-depth-5">
          <a
            href="#!"
            rel="noopener noreferrer"
            className="black-text right"
            onClick={this.handleAdClose}
          >
            <i className="material-icons">cancel</i>
          </a>
          <div className="ad-content padding-1">
            <h4 className="header2">Ad goes here</h4>
          </div>
        </div>

        <HashRouter>
          <Route exact path="/" component={HomeScreen} />
          <Route
            exact
            path="/payment-confirmed"
            component={RegisterSuccessScreen}
          />
          <Route
            exact
            path="/teacher-payment-confirmed"
            component={TeacherRegistrationSuccess}
          />
          <Route exact path="/canceled" component={RegistrationCanceled} />
          <Route
            exact
            path="/payment-canceled"
            component={RegistrationCanceled}
          />
          <Route
            exact
            path="/payment-upgrade"
            component={SuccessStudentUpgrade}
          />

          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/profile" component={ProfileScreen} />
          <Route exact path="/profile-acc" component={ProfileAccScreen} />
          <Route exact path="/all-students" component={Students} />
          <Route
            exact
            path="/register-premium-access-student/:referralId"
            component={RegisterScreen}
          /><Route
            exact
            path="/register-limited-access-student/:referralId"
            component={FreeStudentAcc}
          />
          <Route
            exact
            path="/register-premium-access-teacher/:referralId"
            component={RegisterPremiumTeacher}
          />
          <Route
            exact
            path="/register-limited-access-teacher/:referralId"
            component={RegisterLimitedTeacher}
          />
          
          <Route
            exact
            path="/try-free-student-account/:referralId"
            component={RegisterStudent}
          />
          <Route
            exact
            path="/try-free-teacher-account/:referralId"
            component={RegisterTeacher}
          />
          <Route exact path="/register-new-account/:referralId" component={RegisterAs} />

          <Route exact path="/about" component={AboutScreen} />

          <Route exact path="/all-subjects" component={AllClasses} />
          <Route exact path="/admin" component={AdminScreen} />
          <Route exact path="/subadmins" component={SubadminScreen} />
          <Route exact path="/roles" component={RolesScreen} />
          <Route exact path="/package-selection" component={PackagePayment} />
          <Route exact path="/upload" component={UploadMaterial} />
          <Route exact path="/assignments" component={UploadNewAssignment} />
          <Route exact path="/content-upload" component={UploadContent} />

          <Route exact path="/school-management" component={SchoolManagement} />

          <Route exact path="/subscriptions" component={SubscriptionScreen} />
          <Route exact path="/enrol-student" component={EnrolStudent} />
          <Route
            exact
            path="/teacher-subject-view"
            component={TeacherSubjectContent}
          />
          <Route exact path="/teacher" component={TeacherScreen} />
          <Route exact path="/affiliate-program" component={TeacherAffiliateProgram} />
          <Route exact path="/teacher-students" component={TeacherStudents} />
          <Route exact path="/classroom" component={ClassroomScreen} />
          <Route
            exact
            path="/classroom-mark"
            component={TeacherMarkClassroomScreen}
          />
          <Route
            exact
            path="/classroom-mark-test"
            component={StudentSubmissionsScreen}
          />

          <Route exact path="/student" component={StudentScreen} />
          <Route exact path="/coursework" component={StudentCoursework} />
          <Route exact path="/class-coursework" component={StudentClassCoursework} />

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
            path="/school-calendar"
            component={SchoolCalendarScreen}
          />
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
