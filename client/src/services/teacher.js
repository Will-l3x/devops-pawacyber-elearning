import axios from "axios";
import { isEmpty } from "lodash";
const qs = require("qs");

// const apiUrl = "http://localhost:3001/api";


export const TeacherService = {
  get_all_courses,
  get_teacher_pending_classwork,
  get_teacher_unmarked_classwork,
  get_submissions,

  post_material,
  post_assignment,

  get_assignments,
  get_materials,
  enrol_student,
  get_all_students,
};

async function post_material(data) {
  const token = await  JSON.parse(localStorage.getItem("token"));
  var config = {
    baseURL: "https://pawacyberschool.net/api/teacher",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "https://pawacyberschool.net",
      "Access-Control-Allow-Credentials": true,
    },
  };
  try {
    let res = await axios.post(`/new_material`, qs.stringify(data), config);
    return res.data;
  } catch (err) {
    
    console.error(err);
    return [];
  }
}


async function post_assignment(data) {
  const token = await  JSON.parse(localStorage.getItem("token"));
  var config = {
    baseURL: "https://pawacyberschool.net/api/teacher",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "https://pawacyberschool.net",
      "Access-Control-Allow-Credentials": true,
    },
  };
  try {
    let res = await axios.post(`/new_assignment`, qs.stringify(data), config);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  
  }
}


async function get_materials(course_id) {
  const token = await  JSON.parse(localStorage.getItem("token"));
  var config = {
    baseURL: "https://pawacyberschool.net/api/teacher",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "https://pawacyberschool.net",
      "Access-Control-Allow-Credentials": true,
    },
  };
  //by class id
  try {
    let res = await axios.get(`/get_materials/${course_id}`, config);
    return res.data.data;
  } catch (err) {
    console.error(err);
    return [];
   
  }
}

// classroom
async function get_assignments(course_id) {
  const token = await  JSON.parse(localStorage.getItem("token"));
  var config = {
    baseURL: "https://pawacyberschool.net/api/teacher",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "https://pawacyberschool.net",
      "Access-Control-Allow-Credentials": true,
    },
  };
  try {
    let res = await axios.get(`/get_assignments/${course_id}`, config);
    return res.data.data;
  } catch (err) {
    console.error(err);
    return [];
    
  }
}


async function get_submissions(id) {
  const token = await  JSON.parse(localStorage.getItem("token"));
  var config = {
    baseURL: "https://pawacyberschool.net/api/teacher",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "https://pawacyberschool.net",
      "Access-Control-Allow-Credentials": true,
    },
  };
  //by Assingment ID
  try {
    let res = await axios.get(`/get_submissions/${id}`, config);
    return res.data;
  } catch (err) {
  
    console.error(err);
    return [];
  }
}


// get all courses the teacher teaches
async function get_all_courses(teacherid) {
  const token = await  JSON.parse(localStorage.getItem("token"));
  var config = {
    baseURL: "https://pawacyberschool.net/api/teacher",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "https://pawacyberschool.net",
      "Access-Control-Allow-Credentials": true,
    },
  };
  try {
    let res = await axios.get(`/get_classes/${teacherid}`, config);

    return res.data.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function enrol_student(data) {
  const token = await  JSON.parse(localStorage.getItem("token"));
  var config = {
    baseURL: "https://pawacyberschool.net/api/teacher",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "https://pawacyberschool.net",
      "Access-Control-Allow-Credentials": true,
    },
  };
  try {
    let res = await axios.post(`/enrol_student`, qs.stringify(data), config);
    return res;
  } catch (err) {
    console.error(err);
    return [];
  }
}


//Getting by class ID
async function get_all_students(id) {
  const token = await  JSON.parse(localStorage.getItem("token"));
  var config = {
    baseURL: "https://pawacyberschool.net/api/teacher",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "https://pawacyberschool.net",
      "Access-Control-Allow-Credentials": true,
    },
  };
  try {
    let res = await axios.get(`/get_students/${id}`, config);
 
      return res.data.data;
    
  } catch (err) {
    console.log('Error getting students '+ err);
    return [];
  }
}

async function get_teacher_pending_classwork(teacher_id, classroom_id) {
  const token = await  JSON.parse(localStorage.getItem("token"));
  var config = {
    baseURL: "https://pawacyberschool.net/api/teacher",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "https://pawacyberschool.net",
      "Access-Control-Allow-Credentials": true,
    },
  };
  try {
    let res = await axios.get(
      `/teacher/get-all-pending/${teacher_id}/${classroom_id}`,
      config
    );
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function get_teacher_unmarked_classwork(teacher_id, classroom_id) {
  const token = await  JSON.parse(localStorage.getItem("token"));
  var config = {
    baseURL: "https://pawacyberschool.net/api/teacher",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "https://pawacyberschool.net",
      "Access-Control-Allow-Credentials": true,
    },
  };
  try {
    let res = await axios.get(
      `/teacher/get-all-unmarked/${teacher_id}/${classroom_id}`,
      config
    );
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}
