import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";

import StudentCourseCard from '../../components/student-components/studentCourseCard';
import StudyMaterialCard from '../../components/student-components/StudyMaterialCard';

export class StudentScreen extends Component {

    state = {
        courses:[
            {
                courseId: 1,
                courseName:'CHISHONA',
                numberOfTopics:5,
                courseCode: 1234
            },
            {
                courseId:2,
                courseName:'MATHEMATICS',
                numberOfTopics:7,
                courseCode:123
            },
            {
                courseId:3,
                courseName:'ENGLISH',
                numberOfTopics:9,
                courseCode:1456
            },    
            {
                courseId:4,
                courseName:'PHYSICS',
                numberOfTopics:5,
                courseCode: 1098
                
            }
        ]
    }

  render() {
    return (
      <div className="wrapper">
        <aside id="left-sidebar-nav">
          <SideBar></SideBar>
          <Link to="" data-target="slide-out" className="sidebar-collapse waves-effect dropdown-trigger waves-block waves-light hide-on-large-only" >
            <i className="material-icons">format_indent_increase</i>
          </Link>
        </aside>

        <section id="content">
          <div className="container">
            <div id="card-stats">
              <div className="row mt-1">
              <p>Your Registered Subjects</p>
                <StudentCourseCard courses = {this.state.courses}></StudentCourseCard>
              </div>
              
            </div>
            <div style={{marginLeft:'20px', marginRight:'20px', marginTop:'10px'}}>
            <StudyMaterialCard></StudyMaterialCard>
            </div>
           
            
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(StudentScreen);
