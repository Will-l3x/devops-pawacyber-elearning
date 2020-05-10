import React from "react";
import { Switch, Route } from "react-router-dom";
import {HomeScreen} from '../views/home/HomeScreen';
import {AboutScreen} from '../views/about/AboutScreen';
import {AdminScreen} from '../views/admin/AdminScreen';
import {StudentScreen} from '../views/student/StudentScreen';
import {TeacherScreen} from '../views/teacher/TeacherScreen';
import { AddCourseScreen } from "../views/admin/AddCourseScreen";
import { AddTeacherScreen } from "../views/admin/AddTeacherScreen";
import { SubscriptionScreen } from "../views/admin/SubscriptionScreen";
import { CourseListScreen } from "../views/admin/CourseListScreen";
import { CourseOutlineScreen } from "../components/CourseOutlineScreen";
import { TeacherClassworkScreen } from "../views/teacher/TeacherClassworkScreen";
import { TeacherStudentScreen } from "../views/teacher/TeacherStudentScreen";
import { ClassroomScreen } from "../components/ClassroomScreen";
import ClassroomStudentsScreen from "../components/ClassroomStudentsScreen";


const Main = () => (
    <Switch>
       <Route exact path="/" component={HomeScreen} />
       <Route exact path="/home" component={HomeScreen} />
       <Route exact path="/about" component={AboutScreen} />
       <Route exact path="/admin" component={AdminScreen} />
       <Route exact path="/add-course" component={AddCourseScreen} />
       <Route exact path="/courses" component={CourseListScreen} />
       <Route exact path="/course-outline" component={CourseOutlineScreen} />
       <Route exact path="/subscriptions" component={SubscriptionScreen} />
       <Route exact path="/add-teacher" component={AddTeacherScreen} />
       <Route exact path="/teacher" component={TeacherScreen} />
       <Route exact path="/teacher-classwork" component={TeacherClassworkScreen} />
       <Route exact path="/teacher-students" component={TeacherStudentScreen} />
       <Route exact path="/classroom" component={ClassroomScreen} />
       <Route exact path="/classroom-students" component={ClassroomStudentsScreen} />
       <Route exact path="/student" component={StudentScreen} />
    </Switch>
);

export default Main;
