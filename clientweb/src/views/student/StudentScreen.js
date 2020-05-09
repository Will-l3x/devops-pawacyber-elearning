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
            <div style={{marginLeft:'20px', marginRight:'20px', marginTop:'15px'}}>
            <StudyMaterialCard></StudyMaterialCard>
            </div>
            <div style={{ marginTop:'15px'}}>
            <div id="card-widgets">
              <div className="row">
                <div className="col s12 m4 l4">
                  <ul id="task-card" className="collection with-header">
                    <li className="collection-header teal accent-4">
                      <h5 className="task-card-title">Pending Assignments</h5>
                      <p className="task-card-title">Arranged by submission date</p>
                    </li>
                    <li className="collection-item dismissable">
                      <input type="checkbox" id="task1" />
                      <label htmlFor="task1">
                        Create Mobile App UI.
                        <Link to="" className="secondary-content">
                          <span className="ultra-small">Today</span>
                        </Link>
                      </label>
                      <span className="task-cat cyan">Mathematics</span>
                    </li>
                    <li className="collection-item dismissable">
                      <input type="checkbox" id="task2" />
                      <label htmlFor="task2">
                        Check the new API standerds.
                        <Link to="" className="secondary-content">
                          <span className="ultra-small">Monday</span>
                        </Link>
                      </label>
                      <span className="task-cat red accent-2">Computer Science</span>
                    </li>
                    <li className="collection-item dismissable">
                      <input
                        type="checkbox"
                        id="task3"
                        defaultChecked="defaultChecked"
                      />
                      <label htmlFor="task3">
                        Check the new Mockup of ABC.
                        <Link to="" className="secondary-content">
                          <span className="ultra-small">Wednesday</span>
                        </Link>
                      </label>
                      <span className="task-cat teal accent-4">Project</span>
                    </li>

                  </ul>
                </div>
                </div></div>
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
