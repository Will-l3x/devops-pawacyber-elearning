import axios from "axios";

const apiUrl = "http://cybers.azurewebsites.net/api/teacher";
// const apiUrl = "http://localhost:3001/api/teacher";

export const TeacherService = {
  get_all_courses,
  get_teacher_pending_classwork,
  get_teacher_unmarked_classwork,
  get_submissions,

  post_material,
  post_assignment,
  post_file,

  get_assignments,

  get_materials,

  enrol_student,
  get_all_students
};


async function post_material(data) {
  try {
    let res = await axios({
      url: `${apiUrl}/new_material`,
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

async function post_assignment(data) {
  try {
    let res = await axios({
      url: `${apiUrl}/new_assignment`,
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

async function post_file(data) {
  try {
    let res = await axios({
      url: `http://cybers.azurewebsites.net/api/upload/new`,
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

async function get_materials(id) { //by class id
  try {
    let res = await axios({
      url: `${apiUrl}/get_materials/${id}`,
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data.data.materials;
  } catch (err) {
    console.error(err);
  }
}

async function get_submissions(id) { //by Assingment ID
  try {
    let res = await axios({
      url: `${apiUrl}/get_submissions/${id}`,
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

// classroom
async function get_assignments(course_id) {
  try {

    let res = await axios({
      url: `${apiUrl}/get_assignment/${course_id}`, //Get all assignments by courseid
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data.data;
  } catch (err) {
    console.error(err);
  }
}



// get all courses the teacher teaches
async function get_all_courses(teacherid) {
  try {
    let res = await axios({
      url: `${apiUrl}/get_classes/${teacherid}`,
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data.data;
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