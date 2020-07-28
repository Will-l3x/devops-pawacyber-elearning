import React, { Component } from "react";
import { connect } from "react-redux";
import DatatablePage from "../DatatablePage";
//import $ from "jquery";

class ClassroomStudentAssessment extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        columns: [
          {
            label: "Student Id",
            field: "id",
            sort: "asc",
            width: "15%",
          },
          {
            label: "Name",
            field: "name",
            sort: "asc",
            width: "20%",
          },
          {
            label: "Course",
            field: "course",
            sort: "asc",
            width: "20%",
          },
          {
            label: "Test/Exercise",
            field: "test",
            sort: "asc",
            width: "10%",
          },
          {
            label: "Assignment",
            field: "assignment",
            sort: "asc",
            width: "10%",
          },
          {
            label: "Avg",
            field: "avg",
            sort: "asc",
            width: "10%",
          },
          {
            label: "Grade",
            field: "grade",
            sort: "asc",
            width: "15%",
          },
        ],
        rows: [],
      },
    };
  }
  componentDidMount() {
    this.setState({
      data: {
        columns: [
          {
            label: "Student Id",
            field: "id",
            sort: "asc",
            width: "15%",
          },
          {
            label: "Name",
            field: "name",
            sort: "asc",
            width: "20%",
          },
          {
            label: "Course",
            field: "course",
            sort: "asc",
            width: "20%",
          },
          {
            label: "Test/Exercise",
            field: "test",
            sort: "asc",
            width: "10%",
          },
          {
            label: "Assignment",
            field: "assignment",
            sort: "asc",
            width: "10%",
          },
          {
            label: "Avg",
            field: "avg",
            sort: "asc",
            width: "10%",
          },
          {
            label: "Grade",
            field: "grade",
            sort: "asc",
            width: "15%",
          },
        ],
        rows: [
          {
            id: "student id 1",
            name: "Student Name",
            course: "coursename",
            test: "100",
            assignment: "100",
            avg: "100",
            grade: "Distinction",
          },
          {
            id: "student id 2",
            name: "Student Name",
            course: "coursename",
            test: "100",
            assignment: "100",
            avg: "100",
            grade: "Distinction",
          },
        ],
      },
    });
    /**
     *  TeacherService.get_course_classroom_students_assessment().then(
      (students) => {
        console.log(students);
        const rows = students;
        const data = this.state.data;
        data.rows = rows;

        this.setState({data})
      }
    );
     */
  }
  render() {
    return (
      <div
        id="task-card4"
        className="col l12"
        style={{ display: "none", marginTop: "4%" }}
      >
        <div className="card-stats z-depth-5 padding-3">
          <DatatablePage data={this.state.data} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassroomStudentAssessment);
