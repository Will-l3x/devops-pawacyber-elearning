import axios from "axios";
const qs = require("qs");
const token = JSON.parse(localStorage.getItem("token"));
// const apiUrl = "http://localhost:3001/api";

var config = {
  baseURL: "https://cybers.azurewebsites.net/api/teacher",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Bearer ${token}`,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
};
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
  get_all_students,
};

async function post_material(data) {
  try {
    let res = await axios.post(`/new_material`, qs.stringify(data), config);
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

async function post_assignment(data) {
  try {
    let res = await axios.post(`/new_assignment`, qs.stringify(data), config);
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

async function post_file(data) {
  try {
    let res = await axios.post(
      `https://cybers.azurewebsites.net/api/upload/new`,
      qs.stringify(data),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

async function get_materials(id) {
  //by class id
  try {
    let res = await axios.get(`/get_materials/${id}`, config);
    return res.data.data.materials;
  } catch (err) {
    console.error(err);
  }
}

async function get_submissions(id) {
  //by Assingment ID
  try {
    let res = await axios.get(`/get_submissions/${id}`, config);
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

// classroom
async function get_assignments(course_id) {
  try {
    let res = await axios.get(`/get_assignment/${course_id}`, config);

    return res.data.data;
  } catch (err) {
    console.error(err);
  }
}

// get all courses the teacher teaches
async function get_all_courses(teacherid) {
  try {
    let res = await axios.get(`/get_classes/${teacherid}`, config);

    return res.data.data;
  } catch (err) {
    console.error(err);
  }
}

async function enrol_student(data) {
  try {
    let res = await axios.post(`/enrol_student`, qs.stringify(data), config);
    return res;
  } catch (err) {
    console.error(err);
  }
}

//Getting by class ID
async function get_all_students(id) {
  try {
    let res = await axios.get(`/get_students/${id}`, config);
    return res.data.data.students;
  } catch (err) {
    console.error(err);
  }
}

async function get_teacher_pending_classwork(teacher_id, classroom_id) {
  try {
    let res = await axios.get(
      `/teacher/get-all-pending/${teacher_id}/${classroom_id}`,
      config
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

async function get_teacher_unmarked_classwork(teacher_id, classroom_id) {
  try {
    let res = await axios.get(
      `/teacher/get-all-unmarked/${teacher_id}/${classroom_id}`,
      config
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
