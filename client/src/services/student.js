import axios from "axios";

const qs = require("qs");

export const StudentService = {
  get_all_courses,
  get_course_downloadables,
  get_course_video_resources,
  get_student_pending_classwork,
  get_student_marked_classwork,
  get_student_all_classwork,
  download,
  deleteResource,
  submit_assignment,
};

async function submit_assignment(data) {
  const token = await JSON.parse(localStorage.getItem("token"));
  var config = {
    baseURL: "https://pawacyberschool.net/api/student",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "https://pawacyberschool.net",
      "Access-Control-Allow-Credentials": true,
    },
  };
  try {
    let res = await axios.post(`/new_submission`, qs.stringify(data), config);
    return res.data;
  } catch (err) {
    console.error(err);
    return err;
  }
}

async function download(data) {
  const token = await JSON.parse(localStorage.getItem("token"));
  try {
    let res = await axios.post(
      `https://pawacyberschool.net/api/upload/get`,
      qs.stringify(data),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        responseType: "blob",
      }
    );
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function deleteResource(data) {
  const token = await JSON.parse(localStorage.getItem("token"));
  var config = {
    baseURL: "https://pawacyberschool.net/api/student",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "https://pawacyberschool.net",
      "Access-Control-Allow-Credentials": true,
    },
  };
  try {
    let res = await axios.delete(
      `https://pawacyberschool.net/api/upload/delete`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: data,
      }
    );

    return res.data;
  } catch (err) {
    console.error(err);
    return err;
  }
}

// // Student Course Resources Services
async function get_all_courses(student_id) {
  const token = await JSON.parse(localStorage.getItem("token"));
  var config = {
    baseURL: "https://pawacyberschool.net/api/student",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "https://pawacyberschool.net",
      "Access-Control-Allow-Credentials": true,
    },
  };
  try {
    let res = await axios.get(`/get_classes/${student_id}`, config);
    return res.data.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function get_course_downloadables(course_id) {
  const token = await JSON.parse(localStorage.getItem("token"));
  var config = {
    baseURL: "https://pawacyberschool.net/api/student",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "https://pawacyberschool.net",
      "Access-Control-Allow-Credentials": true,
    },
  };
  try {
    let res = await axios.get(`/get_materials/${course_id}`, config);
    return res.data.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function get_course_video_resources(course_id) {
  const token = await JSON.parse(localStorage.getItem("token"));
  var config = {
    baseURL: "https://pawacyberschool.net/api/student",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "https://pawacyberschool.net",
      "Access-Control-Allow-Credentials": true,
    },
  };
  try {
    let res = await axios.get(`/get_videos/${course_id}`, config);
    return res.data;
  } catch (err) {
    console.error(err);

    return [];

    // return [{
    //   id: 1,
    //   title: "Check Connection...",
    //   videoLink: ""
    // }, ];
  }
}

//per course
async function get_student_all_classwork(course_id) {
  const token = await JSON.parse(localStorage.getItem("token"));
  var config = {
    baseURL: "https://pawacyberschool.net/api/student",
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

// get pending assignments all undone
async function get_student_pending_classwork(student_id) {
  const token = await JSON.parse(localStorage.getItem("token"));
  var config = {
    baseURL: "https://pawacyberschool.net/api/student",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "https://pawacyberschool.net",
      "Access-Control-Allow-Credentials": true,
    },
  };
  try {
    let res = await axios(`/get_pending_assignments/${student_id}`, config);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

//all graded assigments
async function get_student_marked_classwork(student_id) {
  const token = await JSON.parse(localStorage.getItem("token"));
  var config = {
    baseURL: "https://pawacyberschool.net/api/student",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "https://pawacyberschool.net",
      "Access-Control-Allow-Credentials": true,
    },
  };
  try {
    let res = await axios(`/student/get-all-marked/${student_id}`, config);
    return res.data;
  } catch (err) {
    console.error(err);

    return [];
  }
}
