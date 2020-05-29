import axios from "axios";

const apiUrl = "http://cybers.azurewebsites.net/api/teacher";
// const apiUrl = "http://localhost:3001/api/teacher";

export const TeacherService = {
  get_all_courses,
  get_teacher_pending_classwork,
  get_teacher_unmarked_classwork,

  enrol_student,
  get_all_students
};

// classroom
async function get_all_courses(teacher_id) {
  try {
    /* 
    let res = await axios({
      url: `${apiUrl}/patients`,
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });*/
    console.log("teacher service")
    return [
      {
        courseId: 1,
        courseName: "Mathematics",
        numberOfTopics: 5,
        courseCode: 1234,
      },
    ];
    //return res.data;
  } catch (err) {
    console.error(err);
  }
}



async function enrol_student(data) {
  try {
    let res = await axios({
      url: `${apiUrl}/enrol_student`,
      method: "post",
      data,
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

//Getting by class ID
async function get_all_students(id) {
  try {
    let res = await axios({
      url: `${apiUrl}/get_students/${id}`, 
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data.data.students;
  } catch (err) {
    console.error(err);
  }
}








async function get_teacher_pending_classwork(teacher_id, classroom_id) {
  try {
    let res = await axios({
      url: `${apiUrl}/teacher/get-all-pending/${teacher_id}/${classroom_id}`,
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
async function get_teacher_unmarked_classwork(teacher_id, classroom_id) {
  try {
    let res = await axios({
      url: `${apiUrl}/teacher/get-all-unmarked/${teacher_id}/${classroom_id}`,
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
