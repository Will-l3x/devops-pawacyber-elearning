import axios from "axios";
const qs = require("qs");
const token = JSON.parse(localStorage.getItem("token"));
// const apiUrl = "http://localhost:3001/api";

var config = {
  baseURL: "https://cybers.azurewebsites.net/api/schooladmin",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Bearer ${token}`,
    "Access-Control-Allow-Origin": "https://cybers.azurewebsites.net",
    "Access-Control-Allow-Credentials": true,
  },
};

export const SchoolService = {
  post_new_teachers,
  update_teacher,
  delete_teacher,
  get_teacher,
  get_all_teachers,
  get_all_students,
  update_student,
  delete_student,
  post_new_course,
  update_course,
  delete_course,
  get_courses,
};

// Create Courses
// let teacherid = req.body.teacherid;
// let classname = req.body.classname;
// let createdby = req.body.createdby;
// let status = req.body.status;
// let grade = req.body.grade;
// let schoolid = req.body.schoolid;
async function post_new_course(data) {
  try {
    let res = await axios.post(`/add_class`, qs.stringify(data), config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

async function update_course(data) {
  try {
    let res = await axios.put(`/update_class`, qs.stringify(data), config);
    return res.data;
  } catch (err) {
    console.log(err.data);
  }
}
async function delete_course(id) {
  try {
    let res = await axios.delete(`/del_class/${id}`, config);
    return res;
  } catch (err) {
    console.log(err.message);
  }
}

async function get_courses(id) {
  try {
    if (id === undefined) {
      return [];
    }
    let res = await axios.get(`/get_classes/${id}`, config);
    return res.data.data.classes;
  } catch (err) {
    console.log(err);
  }
}

// teacher functions by schoolid
async function get_all_teachers(id) {
  try {
    let res = await axios.get(`/teachers/${id}`, config);
    return res.data.data.teachers;
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function get_teacher(id) {
  try {
    let res = await axios.get(`/teacher/${id}`, config);
    return res.data.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function update_teacher(data) {
  try {
    let res = await axios.put(`/update_teacher`, qs.stringify(data), config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
async function delete_teacher(id) {
  try {
    let res = await axios.delete(`/del_teacher/${id}`, config);
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function post_new_teachers(data) {
  try {
    let res = await axios.post(`/add_teacher`, qs.stringify(data), config);
    return res.data;
  } catch (err) {
    console.log("cant link teacher to school");
    console.log(err);
  }
}

// student functions
async function get_all_students(id) {
  try {
    let res = await axios.get(`/students/${id}`, config);
    return res.data.data.students;
  } catch (err) {
    console.log(err);
  }
}

async function update_student(data) {
  try {
    let res = await axios.put(`/update_student`, qs.stringify(data), config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
async function delete_student(id) {
  try {
    let res = await axios.delete(`/del_student/${id}`, config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export default SchoolService;
