import React, { Component } from "react";
import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router";
import { createBrowserHistory } from "history";

/** Screens */
import { HomeScreen } from "./views/home/HomeScreen";
import { AboutScreen } from "./views/about/AboutScreen";
import { AdminScreen } from "./views/admin/AdminScreen";
import { StudentScreen } from "./views/student/StudentScreen";
import { TeacherScreen } from "./views/teacher/TeacherScreen";
import { AdminTeacherManagementScreen } from "./views/admin/AdminTeacherManagementScreen";
import { SubscriptionScreen } from "./views/admin/SubscriptionScreen";
import { CourseListScreen } from "./views/admin/CourseListScreen";
import { CourseOutlineScreen } from "./components/CourseOutlineScreen";
import { ClassroomScreen } from "./components/classroom/ClassroomScreen";
import { SubjectContent } from "./views/student/SubjectContent";
import { StudentAssignments } from "./views/student/StudentAssignments";
import { TeacherTodoScreen } from "./views/teacher/TeacherTodoScreen";
import { AdminTodoScreen } from "./views/admin/AdminTodoScreen";
import { LoginScreen } from "./auth/LoginScreen";
import { TeacherMarkGradeScreen } from "./views/teacher/TeacherMarkGradeScreen";
import { TeacherMarkClassroomScreen } from "./views/teacher/TeacherMarkClassroomScreen";
import { StudentAssignmentScreen } from "./components/teacher-mark/StudentAssignmentScreen";
import { StudentTestScreen } from "./components/teacher-mark/StudentTestScreen";
import { RegisterScreen } from "./auth/RegisterScreen";


import $ from "jquery";
import "materialize-css/dist/css/materialize.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import "./assets/css/custom.css";
import M from "materialize-css";
import store from "./config/store";


const history = createBrowserHistory();

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

            <Route exact path="/login" component={LoginScreen} />
            <Route exact path="/register" component={RegisterScreen} />
            <Route exact path="/about" component={AboutScreen} />

            <Route exact path="/admin" component={AdminScreen} />
            <Route exact path="/admin-calendar" component={AdminTodoScreen} />
            <Route exact path="/courses" component={CourseListScreen} />
            <Route
              exact
              path="/course-outline"
              component={CourseOutlineScreen}
            />
            <Route
              exact
              path="/teacher-management"
              component={AdminTeacherManagementScreen}
            />
            <Route exact path="/subscriptions" component={SubscriptionScreen} />

            <Route exact path="/teacher" component={TeacherScreen} />
            <Route
              exact
              path="/teacher-mark"
              component={TeacherMarkGradeScreen}
            />
            <Route
              exact
              path="/teacher-calendar"
              component={TeacherTodoScreen}
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
  }
}

export default App;