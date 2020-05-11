import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { navClick } from "../../actions/navlink";
import { Redirect } from "react-router";

class TeacherCourseCard extends Component {
  state = {
    redirect: false,
    count: -1,
  };
  dashClick = (dash) => {
    this.props.navClick(dash);
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
    return this.props.courses.map((course, i) => (
      <div key={course.courseId} className="col s12 m6 l4">
        <div
          className={`card ${this.colors(i)} min-height-100 white-text`}
          style={{ borderRadius: "5px", cursor: "pointer" }}
          onClick={() => this.dashClick("teacher")}
        >
          <div className="padding-4">
            <div className="col s7 m7">
              <div to="/teacher-classwork" className="">
                <i className="material-icons medium">school</i>
              </div>
              <p>{course.courseName}</p>
              <p>Students</p>
            </div>
            <div className="col s5 m5 right-align">
              <h5 className="mb-0">{course.courseCode}</h5>
              <p className="no-margin">Code</p>
              <p>4a</p>
              <p>26</p>
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
});

const mapDispatchToProps = {
  navClick,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherCourseCard);
