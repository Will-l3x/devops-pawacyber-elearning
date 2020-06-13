import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import folderIcon from "../../assets/images/icon/folder.svg";
import {TeacherService} from '../../services/teacher';
import { resolveContent } from "nodemailer/lib/shared";

export class TestFolderCard extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      to: "",
      classwork: [        
      //   {
      //   id: "2",
      //   title: "Test 1",
      //   type: "Test/Exercise",
      //   due: "18 May",
      //   posted: "18 May",
      // }, 
    ],
      courses:[]
    };
    this.handleFolderClick.bind(this);
  }

  componentDidMount() {
    this.user= JSON.parse(localStorage.getItem("user"));
    this.getDashData();
  }

  getDashData(){
    TeacherService.get_all_courses(this.user.userid)    // Get all courses by userid
    .then((response) => {
      this.setState({ courses: response })
      if(this.state.courses.length>0){
        this.courseId = this.state.courses[0].classId;
        TeacherService.get_assignments(this.courseId)   // Get all assignments by class id
        .then((response) => {
          this.setState({ classwork:  response })
        });
    }
    });
  }

  handleFolderClick = () => {
    this.setState({
      redirect: true,
    });
  };

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/classroom-mark-test" />;
    }

    return (
      <div id="task-card1" className="row" style={{ display: "block", marginTop: "4%" }}>
        {this.state.classwork.map((st, i) => (
          <div key={i} className="col s12 m4 l3 padding-5px">
            <div className="folder-container">
              <div onClick={this.handleFolderClick} className="folder cursor-pointer center-align">
                <div className=" left folder-icon">
                  <img src={folderIcon} className="icon" alt="folder" />
                </div>
                <div className="center-align left folder-name">
                  <h6>{st.assignmentname}</h6>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
    
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TestFolderCard);
