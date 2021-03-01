import React, { Component } from "react";
import { connect } from "react-redux";
import M from "materialize-css";
import Select from "react-select";
import { TeacherService } from "../services/teacher";
let options = [];

const user = JSON.parse(localStorage.getItem("user"));
if (user === null) {
  options = [];
} else {
  TeacherService.get_all_courses(user.userid)
    .then((response) => {
      const data = response === undefined ? [] : response;
      const courses = [];
      const del_courses = [];
      const students = [];

      for (const course of data) {
        if (course.status === "deleted") {
          del_courses.push(course);
        } else {
          courses.push(course);
        }
      }
      for (const course of courses) {
        TeacherService.get_all_students(course.classId)
          .then((response) => {
            if (response === undefined) {
              M.toast({
                html: "Could not fetch data. Please try after a moment.",
                classes: "red",
              });
            } else {
              for (const student of response) {
                student.value = student.studentId;
                student.label = student.firstname + " " + student.lastname;
                students.push(student);
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
      options = students;
    })
    .catch((error) => {
      console.log(error);
      options = [];
    });
}

class StudentOptions extends Component {
  constructor() {
    super();
    this.state = {
      options: [],
      selectedOption: null,
    };
    this.handleChange.bind(this);
  }
  componentDidMount() {
    M.AutoInit();
  }

  handleChange = (selectedOption) => {
    this.props.onSelectOption(selectedOption);
    this.setState({ selectedOption });
  };
  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        classNamePrefix="custom-options"
        className="form-input"
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
        required
      />
    );
  }
}

export default connect(null, null)(StudentOptions);
