import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { course_data } from "../../actions/student";

class StudentCourseCard extends Component {
  constructor() {
    super();
    this.colors.bind(this);
  }
  colors = (i) => {
    var colors = [
      "gradient-45deg-light-blue-cyan",
      "gradient-45deg-red-pink",
      "gradient-45deg-green-teal",
      "gradient-45deg-amber-amber",
      "red",
      "teal accent-4",
    ];
    /* shuffle array
    colors.sort(function(){
      return .5 -Math.random();
    });
    */
    return colors[i % 5];
  };
  render() {
    return this.props.courses.map((course, i) => (
      <div key={i} className="col s12 m6 l3">
        <div className="col s12">
          <div
            className={`card ${this.colors(i)} white-text hovCard`}
            style={{ boxShadow: "100px", borderRadius: "5px" }}
          >
            <div className="col s11 m7  sub-card ">
              <p className="white-text```">{course.classname}</p>
            </div>
            <div
                className="col s1"
                style={{
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  position: "center",
                  paddingLeft: "40px",
                  paddingRight: "10px",
                }}
            >
              <Link
                to="/subject-content"
                onClick={() => {
                  this.props.course_data({course:{
                    name: course.classname,
                    courseId: course.classId,
                    color:this.colors(i)}
                  });
                }}
              >
                <i
                  className={`material-icons background-round mt-2 `}
                  style={{ padding: "10px", color: "white" }}
                >
                  link
                </i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    ));
  }
}

const mapStateToProps = (state) => ({
  course: state.student,
});

const mapDispatchToProps = {
  course_data,
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentCourseCard);
