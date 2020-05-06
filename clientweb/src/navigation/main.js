import React from "react";
import { Switch, Route } from "react-router-dom";
import {HomeScreen} from '../views/home/HomeScreen';
import {AboutScreen} from '../views/about/AboutScreen';
import {AdminScreen} from '../views/admin/AdminScreen';
import {StudentScreen} from '../views/student/StudentScreen';
import {TeacherScreen} from '../views/teacher/TeacherScreen';


const Main = () => (
  <main>
    <Switch>
       <Route exact path="/" component={HomeScreen} />
       <Route exact path="/home" component={HomeScreen} />
       <Route exact path="/about" component={AboutScreen} />
       <Route exact path="/admin" component={AdminScreen} />
       <Route exact path="/teacher" component={TeacherScreen} />
       <Route exact path="/student" component={StudentScreen} />
    </Switch>
  </main>
);

export default Main;
