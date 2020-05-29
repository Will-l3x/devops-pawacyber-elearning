import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Footer from "../../components/footer";
import Header from "../../components/header";

import {SchoolService} from '../../services/school';
import avatar from "../../assets/images/gallary/not_found.gif";

export class CourseSubscriptionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unsubscribe: false,
      courses:[]
    };
    this.handleUnsubscribe.bind(this);
  }
  handleUnsubscribe = () => {
    this.setState({ unsubscribe: true });
  };

  user = {};
 
  componentDidMount() {
    this.user= JSON.parse(localStorage.getItem("user"));
    this.getDashData();
  }

  getDashData(){
    SchoolService.get_courses('1') //Get by school id
    .then((response) => {
      if(response===undefined){
      }else{
        this.setState({ courses: response })
      }
    });
  }

  handleSubmit = (event) => {
    event.preventDefault()
    var data = {
        teacherid: event.target.teacherId.value,
        classname: event.target.courseName.value,
        enrolmentkey:"123ABC",
        status: "active",
        createdby: this.user.userid
        
    }
    SchoolService.post_new_course(data).then((response)=>{
        if(response === undefined){
          alert('Apologies. Course addition failed. Please contact admin');
        }else if(response.success === false){
          alert(response.message);
        }else{
          alert('successfully added');
          document.getElementById("sibs").reset();
          this.getDashData();
        }
    })
  }

  render() {
    return (
      <div>
        <header id="header" className="page-topbar">
          <Header />
        </header>
        <main id="main">
          {" "}
          <div className="wrapper">
            <SideBar />
            <div className="section" style={{ paddingBottom: 0 }}>
              <div style={{ position: "relative", zIndex: 50 }}>
                <nav
                  className="navbar nav-extended"
                  style={{
                    position: "fixed",

                    minHeight: 70,
                    transform: "translateY(-100%)",
                  }}
                >
                  <div className="nav-content">
                    <p
                      style={{ marginTop: "4%" }}
                      to="#"
                      className="brand-logo"
                    >
                      Courses Offered
                    </p>
                    <Link
                      to="#!"
                      className="dropdown-trigger waves-effect black-text right"
                      data-target="dropdown1"
                      style={{ marginTop: "3%", marginRight: "2%" }}
                    >
                      <i className="material-icons">settings</i>
                    </Link>
                    <ul
                      id="dropdown1"
                      className="dropdown-content"
                      style={{
                        minWidth: "200px",
                        whiteSpace: "nowrap",
                        opacity: 1,
                        display: "none",
                      }}
                    >
                      <li>
                        <Link
                          to="#"
                          data-target="modal1"
                          className="modal-trigger grey-text text-darken-2"
                        >
                          <i className="material-icons ">add_box</i>
                          Add Course
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>

              <section id="content">
                <div
                  id="overviews"
                  className="section wb"
                  
                >
                
        <div className="row">
          { this.state.courses.length!==0?this.state.courses.map((course, i) => (
            <div key={course.classId} className="col l3">
              <div className="card">
                <div className="card-content">
                  <Link
                    to="#"
                    className="card-title grey-text text-darken-4"
                    style={{ cursor: "unset" }}
                  >
                    {course.classname}
                  </Link>
                  <p>
                    {course.status}
                  </p>
                  <hr className="invis"></hr>
                  <p> 
                     Enrolment Key: {course.enrolmentkey} Teacher: {course.teacherid}
                    <i className="material-icons left">subscriptions</i>
                  </p>
                </div>
                <div className="card-action course-meta">
                  <ul>
                    <li>
                      <i className="fa fa-calendar" aria-hidden="true"></i>{course.createdon}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )):(<div className="row"><p style={{textAlign:"center", fontSize:"20px"}}>No Courses Found<br/> <img src={avatar} alt="Avatar"  style={{maxWidth: '100%',maxHeight: '150px'}}></img></p></div>)}
        </div>
                </div>
                <div id="modal1" className="modal">
                  <div className="modal-content">
                    <h4 className="header2">Add Course</h4>
                    <form onSubmit={this.handleSubmit} id="sibs">
                    <div className="row">
                      <div className="col s12">
                        <div className="row">
                          <div className="input-field col s6">
                            <input id="courseName" type="text" name="courseName" required></input>
                            <label htmlFor="courseName">Course Name</label>
                          </div>
                          <div className="input-field col s6">
                            <input type="text" id="teacherId" name="teacherId" required placeholder="Enter Teacher ID"></input>
                            <label htmlFor="teacherId">
                              Teacher ID
                            </label>
                          </div>
                        </div>
                        <div className="row">
                          <div className="input-field col s12">
                            <input type="text" id="short_descrip"></input>
                            <label htmlFor="short_descrip">
                              Course Description
                            </label>
                          </div>
                        </div>
                        <div className="row">
                          <div className="input-field col s12">
                            <button className="btn file-upload gradient-45deg-light-blue-cyan waves-effect waves-light right">
                              Submit
                              <i className="material-icons right">send</i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    </form>
                  </div>
                </div>
              </section>
            </div>
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

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseSubscriptionScreen);
