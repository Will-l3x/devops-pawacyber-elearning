import React, { Component } from "react";
import axios from "axios";

const qs = require("qs");
//const token =  JSON.parse(localStorage.getItem("token"));
// const apiUrl = "http://localhost:3001/api";

export const ClassroomService = {
  get_all_classwork,
  post_new_classroom_material,
  delete_classwork,
  post_teacher_to_classroom,
  post_student_to_classroom,
  update_student_marks,
  upload_marked_classwork,
  get_all_test_folders,
  get_all_assignment_folders,
  get_all_test_files,
  get_all_assignment_files,
};

// classroom functions
async function get_all_classwork(id) {
  const token = await JSON.parse(localStorage.getItem("token"));
  var config = {
  
    baseURL: "https://pawacyberschool.net/api",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "https://pawacyberschool.net",
      "Access-Control-Allow-Credentials": true,
    },
  };

  try {
    let res = await axios.get(`/teacher/get_materials/${id}`, config);
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
async function get_all_test_folders(classroom_id) {
  const token = await JSON.parse(localStorage.getItem("token"));
  var config = {
  
    baseURL: "https://pawacyberschool.net/api",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "https://pawacyberschool.net",
      "Access-Control-Allow-Credentials": true,
    },
  };

  try {
    let res = await axios.get(
      `/classroom/get-all-test-folder/${classroom_id}`,
      config
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
}


async function get_all_assignment_folders(classroom_id) {
  const token = await JSON.parse(localStorage.getItem("token"));
  var config = {
  
    baseURL: "https://pawacyberschool.net/api",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "https://pawacyberschool.net",
      "Access-Control-Allow-Credentials": true,
    },
  };

  try {
    let res = await axios.get(
      `/classroom/get-all-assignment-folders/${classroom_id}`,
      config
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
async function get_all_test_files(classroom_id, test_id) {

  const token = await JSON.parse(localStorage.getItem("token"));
  var config = {
  
    baseURL: "https://pawacyberschool.net/api",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "https://pawacyberschool.net",
      "Access-Control-Allow-Credentials": true,
    },
  };

  try {
    let res = await axios.get(
      `/classroom/get-all-test-files/${classroom_id}/${test_id}`,
      config
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
async function get_all_assignment_files(classroom_id, assignment_id) {
  const token = await JSON.parse(localStorage.getItem("token"));
  var config = {
  
    baseURL: "https://pawacyberschool.net/api",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "https://pawacyberschool.net",
      "Access-Control-Allow-Credentials": true,
    },
  };

  try {
    let res = await axios.get(
      `/classroom/get-all-assignment-files/${classroom_id}/${assignment_id}`,
      config
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
async function post_new_classroom_material(data) {
  const token = await JSON.parse(localStorage.getItem("token"));
  var config = {
  
    baseURL: "https://pawacyberschool.net/api",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "https://pawacyberschool.net",
      "Access-Control-Allow-Credentials": true,
    },
  };

  try {
    let res = await axios.post(
      `/teacher/new_${data.type}`,
      qs.stringify(data),
      config
    );
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
async function delete_classwork(classroom_id, material_id) {
  const token = await JSON.parse(localStorage.getItem("token"));
  var config = {
  
    baseURL: "https://pawacyberschool.net/api",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "https://pawacyberschool.net",
      "Access-Control-Allow-Credentials": true,
    },
  };

  try {
    let res = await axios.delete(
      `/classroom/delete-classwork/${classroom_id}/${material_id}`,
      config
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
async function post_teacher_to_classroom(classroom_id, teacher_id, data) {
  const token = await JSON.parse(localStorage.getItem("token"));
  var config = {
  
    baseURL: "https://pawacyberschool.net/api",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "https://pawacyberschool.net",
      "Access-Control-Allow-Credentials": true,
    },
  };

  /** add teacher-id to classroom */
  try {
    let res = await axios.post(
      `/classroom/add-teacher/${classroom_id}/${teacher_id}`,
      qs.stringify(data),
      config
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
async function post_student_to_classroom(classroom_id, student_id, data) {
  const token = await JSON.parse(localStorage.getItem("token"));
  var config = {
  
    baseURL: "https://pawacyberschool.net/api",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "https://pawacyberschool.net",
      "Access-Control-Allow-Credentials": true,
    },
  };

  /** add student-id to classroom */
  try {
    let res = await axios.post(
      `/classroom/add-student/${classroom_id}/${student_id}`,
      qs.stringify(data),
      config
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
async function update_student_marks(classroom_id, student_id, data) {
  const token = await JSON.parse(localStorage.getItem("token"));
  var config = {
  
    baseURL: "https://pawacyberschool.net/api",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "https://pawacyberschool.net",
      "Access-Control-Allow-Credentials": true,
    },
  };

  try {
    let res = await axios.put(
      `/classroom/update-student-marks/${classroom_id}/${student_id}`,
      qs.stringify(data),
      config
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
async function upload_marked_classwork(classroom_id, classwork_id, data) {
  const token = await JSON.parse(localStorage.getItem("token"));
  var config = {
  
    baseURL: "https://pawacyberschool.net/api",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "https://pawacyberschool.net",
      "Access-Control-Allow-Credentials": true,
    },
  };

  try {
    let res = await axios.post(
      `/classroom/upload-marked-classwork/${classroom_id}/${classwork_id}`,
      qs.stringify(data),
      config
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
