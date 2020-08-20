import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import SideBar from "../../components/SideBar";
import SubjectDescrip from "../../components/student-components/SubjectDescrip";
import ShowAllAssignments from "../../components/student-components/showAllAssignments";
import store from "../../config/store";
import Footer from "../../components/footer";
import Header from "../../components/header";
import VideoPriview from "../../components/student-components/VideoPreview";

import {StudentService} from '../../services/student';

// Receives subject code and Name only from main screen and retrieves from endpoint the topics of that.
class SubjectContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
    };
  }

  componentDidMount() {
    this.videoresources();
  }

  videoresources(){
    const course = store.getState().student.course.course;
      
    if (course === undefined || (course.name === "" || course.name === undefined) ) {
      return <Redirect to="/student" />;
    }
    
    StudentService.get_course_video_resources(course.courseId)
    .then((response) => {
      this.setState({ topics: response })
    });

  }

  videoSelected = false;
  showAssignments = false
  videoAddress = "";
  previewTitle = "";

  selectedTopic(title, video) {
    this.videoAddress = video;
    this.previewTitle = title;
    this.videoSelected = true;
  }

  showAss(){
    this.videoSelected = false;
    this.showAssignments = true;
    this.previewTitle = "DOWNLOAD ASSIGNMENTS"
  }

  showResources(){
    this.videoSelected = false;
    this.showAssignments = false;
    this.previewTitle = "LIBRARY RESOURCES"
  }
  

  render() {
    const course = store.getState().student.course.course;
    if (course === undefined || (course.name === "" || course.name === undefined) ) {
      return <Redirect to="/student" />;

    }
    return (
      <div>
        <header id="header" className="page-topbar">
          <Header />
        </header>
        <main id="main">
          {" "}
          <div className="wrapper">
              <SideBar/>
            
            <section id="content">
              <div className="container">
                <div style={{ marginTop: "15px" }}>
                  <div id="card-widgets">
                    <div className="row">
                      <div className="col s12 m2 l3">
                        <div className="column">
                        <ul className="task-card collection with-header">
                            <li className={`collection-header ${course.color} `} >
                              <p className="task-card-title">
                                {course.name} Resources
                              </p>
                            </li>
                            <li className="collection-item dismissable">
                            <label htmlFor="task1">
                                  Course Library Resources
                                  <Link to="#" onClick={() => this.showResources()} className="secondary-content">
                                    <span style={{ fontSize: "11px" }}>
                                      View
                                    </span>
                                  </Link>
                                </label>
                          </li>
                          <li
                               
                                className="collection-item dismissable"
                              >
                            <label htmlFor="task1">
                                  All Assingments
                                  <Link to="#" onClick={() => this.showAss()} className="secondary-content">
                                    <span style={{ fontSize: "11px" }}>
                                      View
                                    </span>
                                  </Link>
                                </label>
                          </li>
                          </ul>
                          <ul className="task-card collection with-header">
                            <li
                              className={`collection-header ${course.color} `}
                            >
                              <p className="task-card-title">
                                {course.name} VIDEOS
                              </p>
                            </li>
                            {/* {this.state.topics.map((topic, i) => ( */}
                              <li
                                
                                className="collection-item dismissable"
                              >
                                <label htmlFor="task1">
                                  {/* {course.name} */}
                                  Structure & Function of the Heart
                     
                                  <Link
                                    to="#"
                                    onClick={() => this.selectedTopic('Structure & Function of the Heart', 'https://r1---sn-woc7lne7.c.drive.google.com/videoplayback?expire=1597972860&ei=POk-X-q8CZ3g-AWKroHwBA&ip=77.246.53.53&cp=QVNOWUpfUVhUQVhOOk1aRUxfMGIzS1BkYXlweXFtbHNZNmpqOTlNTzZnVTUxYVFpZjgtOUg1X0g&id=7f2c517ecda54bde&itag=18&source=webdrive&requiressl=yes&mh=MW&mm=32&mn=sn-woc7lne7&ms=su&mv=u&mvi=1&pl=24&sc=yes&ttl=transient&susc=dr&driveid=1ko-KWECa9Bi2t_BjFnx4GvZWEJtVJNZB&app=texmex&mime=video/mp4&vprv=1&prv=1&dur=348.322&lmt=1597949010917408&mt=1597958156&sparams=expire,ei,ip,cp,id,itag,source,requiressl,ttl,susc,driveid,app,mime,vprv,prv,dur,lmt&sig=AOq0QJ8wRAIgM9dwtcCDdoIgHlO1ad4FIBb0xNxP97pUuURylUZvYG0CIA0QDYX1J8UUI_ZzY8c7mHAiI5_6_Z43crwHCKaQfr1i&lsparams=mh,mm,mn,ms,mv,mvi,pl,sc&lsig=AG3C_xAwRAIgaGI977xarJ2WXCUpwDmGz2C0atOUldmVOBik2lTs898CIDSYR1u3VB4lcg3uo4gRuEodeQiz01_ZNqG9cWzI9DI8&cpn=kshUMSz8MAMMZIco&c=WEB_EMBEDDED_PLAYER&cver=20200820')}
                                    className="secondary-content"
                                  >
                                    <span style={{ fontSize: "11px" }}>
                                      Watch
                                    </span>
                                  </Link>
                                </label>
                              </li>
                            {/* ))} */}
                          </ul>
                        </div>
                      </div>
                      <div className="col s12 m13 l9">
                        <div className="task-card collection with-header">
                          <div className="collection-header teal">
                            <p
                              className="task-card-title"
                              style={{ color: "white" }}
                            >
                              {this.videoSelected
                                ? this.previewTitle
                                : this.showAssignments? this.previewTitle:"LIBRARY RESOURCES"}
                            </p>
                          </div>
                          {this.videoSelected ? (
                            
                              <VideoPriview videoLink={this.videoAddress}>
                           </VideoPriview>
                            
                          ) : this.showAssignments?(
                            <div
                              className="row mt-1"
                              style={{
                                paddingLeft: "10px",
                                paddingRight: "10px",
                              }}
                            >
                              <ShowAllAssignments
                                content={course.courseId}
                              ></ShowAllAssignments>
                            </div>
                          ):(
                            <div
                              className="row mt-1"
                              style={{
                                paddingLeft: "10px",
                                paddingRight: "10px",
                              }}
                            >
                              <SubjectDescrip
                                content={course.courseId}
                              ></SubjectDescrip>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        <footer className="footer page-footer gradient-45deg-light-blue-cyan">
          <Footer />
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, null)(SubjectContent);
