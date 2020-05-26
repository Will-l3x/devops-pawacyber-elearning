import React, { Component } from "react";
import { connect } from "react-redux";
//import PropTypes from "prop-types";
import { navClick } from "../../actions/navlink";
import { course_data } from "../../actions/student";
import TeacherActions from "../../actions/teacher"
import store from "../../config/store";
import { Redirect } from "react-router";
import folderIcon from "../../assets/images/icon/folder.svg";

//import M from "materialize-css";

export class TeacherFolderCard extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      count: -1,
    };
    this.dashClick.bind(this);
  }

  user = {};
  
  componentDidMount() {
    this.user= JSON.parse(localStorage.getItem("user"));
    TeacherActions.get_all_courses(this.user.username);
   
  }

  dashClick = () => {
    this.setState({
      redirect: true,
    });
  };

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/classroom-mark" />;
    }
    return store.getState().teacher.courses.map((course, i) => (
      <div key={i} className="col s12 m4 l3 padding-5px">
        <div className="folder-container">
          <div
            onClick={this.dashClick}
            className="folder cursor-pointer center-align"
          >
            <div className=" left folder-icon">
              <img src={folderIcon} className="icon" alt="folder" />
            </div>
            <div className="center-align left folder-name">
              <h6>{course.courseName}</h6>
            </div>
          </div>
        </div>
      </div>
    ));
  }
}

const mapStateToProps = (state) => ({
  link: state.dashLink.link,
  courses: state.teacher.courses,
});

const mapDispatchToProps = Object.assign(
  {
    navClick,
    course_data,
  },
  TeacherActions
);

export default connect(mapStateToProps, mapDispatchToProps)(TeacherFolderCard);
