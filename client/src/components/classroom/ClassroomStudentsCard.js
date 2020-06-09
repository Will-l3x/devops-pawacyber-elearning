import React, { Component } from "react";
import { connect } from "react-redux";
import { ClassroomService } from "../../services/classroom";
import avatar from "../../assets/images/gallary/not_found.gif";
import $ from "jquery";
class ClassroomScreen extends Component {
  constructor() {
    super();
    this.state = {
      subjectId: "5ed4d101e487992f0c06f7e2",
      students: [],
      columns: [
        {
          label: "ID",
          field: "teacherId",
          sort: "asc",
          width: "20%",
        },
        {
          label: "Teacher Name",
          field: "firstname",
          sort: "asc",
          width: "30%",
        },
        {
          label: "Teacher Surname",
          field: "lastname",
          sort: "asc",
          width: "30%",
        },
        {
          label: "Date Joined",
          field: "datejoined",
          sort: "asc",
          width: "20%",
        },
      ],
      rows: [],
    };
    this.get_students.bind(this);
  }
  componentDidMount() {
    this.get_students();
    $(".custom-select.bs-select select").addClass("display-none");
    $(".col-sm-12.col-md-6").addClass("height-0");
    $(".dataTables_length.bs-select").addClass("translateY-10");
  }

  get_students = () => {
    ClassroomService.get_students(this.props.teacherState.course.courseId)
      .then((res) => {
        this.setState({
          students: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ students: [] });
      });
  };
  render() {
    return (
      <div>
        <ul
          id="task-card2"
          className="collection task-card"
          style={{ display: "none", marginTop: "3%" }}
        >
          {this.state.students.length < 1 ? (
            <div className="row">
              <p style={{ textAlign: "center", fontSize: "20px" }}>
                There Are No Students In This Class!
                <br />{" "}
                <img
                  src={avatar}
                  alt="Avatar"
                  style={{ maxWidth: "100%", maxHeight: "150px" }}
                ></img>
              </p>
            </div>
          ) : (
            this.state.students.map((st, i) => (
              <li key={i} className="collection-item avatar">
                <i className={`material-icons circle`}>person</i>
                <span className="title">
                  {st.firstname} {st.lastname}
                </span>
                <p style={{ marginLeft: 15 }}>
                  Id: {st.id}
                  <br />
                </p>
              </li>
            ))
          )}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  teacherState: state.teacher,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ClassroomScreen);
