import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import $ from "jquery";
import { navClick } from "../../actions/navlink";
import { course_data } from "../../actions/student";
import TeacherActions from "../../actions/teacher";
import { Redirect } from "react-router";

//import M from "materialize-css";

class TeacherCourseCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:
        JSON.parse(localStorage.getItem("user")) === null
          ? { roleid: 3 }
          : JSON.parse(localStorage.getItem("user")),
      redirect: false,
      count: -1,
    };
    this.get_all_courses.bind(this);
  }
  componentDidMount() {
    $(".progress").removeClass("display-none");
    this.get_all_courses();
  }
  get_all_courses = async () => {
    await this.props.get_all_courses(this.state.user.userid);
    $(".progress").addClass("display-none");
  };
  dashClick = (dash, course) => {
    this.props.navClick(dash);
    this.props.course_data({
      course,
    });
    this.setState({
      redirect: true,
    });
  };
  colors = (i) => {
    var colors = [
      "gradient-45deg-light-blue-cyan",
      "gradient-45deg-green-teal",
      "gradient-45deg-indigo-purple",
      "gradient-45deg-purple-amber",
    ];
    /* shuffle array
    colors.sort(function(){
      return .5 -Math.random();
    });
    */
    return colors[i % 5];
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/classroom" />;
    }
    return this.props.teacherState.courses.map((course, i) => (
      <div key={course.courseId} className="col s12 m6 l4 ">
        <div
          className={`card ${this.colors(i)} min-height-100 white-text`}
          style={{ borderRadius: "5px", cursor: "pointer" }}
          onClick={() => this.dashClick("teacher", course)}
        >
          <div className="padding-4 white-text">
            <div className="col s7 m7 sub-card">
              <div to="/teacher-classwork" className="">
                <i className="material-icons medium white-text">school</i>
              </div>
              <p className="white-text">{course.courseName}</p>
              <p className="white-text">Students</p>
            </div>
            <div className="col s5 m5 right-align">
              <h5 className="mb-0 white-text">{course.courseCode}</h5>
              <p className="no-margin white-text">Code</p>
              <p className="white-text">4a</p>
              <p className="white-text">26</p>
            </div>
          </div>
        </div>
      </div>
    ));
  }
}

TeacherCourseCard.propTypes = {
  navClick: PropTypes.func.isRequired,
  link: PropTypes.string,
};

const mapStateToProps = (state) => ({
  link: state.dashLink.link,
  teacherState: state.teacher,
});

const mapDispatchToProps = Object.assign(
  {
    navClick,
    course_data,
  },
  TeacherActions
);

export default connect(mapStateToProps, mapDispatchToProps)(TeacherCourseCard);
