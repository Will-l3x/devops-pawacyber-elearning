import axios from "axios";
const token = JSON.parse(localStorage.getItem("token"));
// const apiUrl = "http://localhost:3001/api";

var config = {
  baseURL: "https://cybers.azurewebsites.net/api/student",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Bearer ${token}`,
  },
  
};

export const StudentService = {
  get_all_courses,
  get_course_downloadables,
  get_course_video_resources,
  get_student_pending_classwork,
  get_student_marked_classwork,
  get_student_all_classwork,
};

// // Student Course Resources Services
async function get_all_courses(student_id) {
  try {
    let res = await axios.get(`/get_classes/${student_id}`, config);
    return res.data.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function get_course_downloadables(course_id) {
  try {
    let res = await axios.get(`/get_materials/${course_id}`, config);
    console.log(res.data.data);
    return res.data.data;
  } catch (err) {
    console.error(err);
    return [
      {
        resourceid: 1,
        materialname: "Check connection...",
        file: "null",
        dateadded: "15-05-2020",
      },
    ];
  }
}

async function get_course_video_resources(course_id) {
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
  try {
    let res = await axios.get(`/get_assignments/${course_id}`, config);
    return res.data.data;
  } catch (err) {
    console.error(err);
    return [
      {
        assignmentId: 3,
        classid: "Checking connection...",
        duedate: "null",
        score: "",
        assignmentname: "",
        file: "",
        assignmentStatus: "Submitted",
      },
    ];
  }
}

// get pending assignments all undone
async function get_student_pending_classwork(student_id) {
  try {
    let res = await axios(`/get_pending_assignments/${student_id}`, config);
    return res.data;
  } catch (err) {
    console.error(err);
    return [
      {
        assignmentId: 1,
        courseName: "Check connection...",
        dueDate: "null",
        score: "null",
        assignmentTitle: "null",
        assignmentLink: "null",
        assignmentStatus: "null",
      },
    ];
  }
}

//all graded assigments
async function get_student_marked_classwork(student_id) {
  try {
    let res = await axios(`/student/get-all-marked/${student_id}`, config);
    return res.data;
  } catch (err) {
    console.error(err);

    return [
      {
        assignmentId: 1,
        courseName: "Check connection...",
        dueDate: "null",
        score: null,
        assignmentTitle: "null",
        assignmentLink: "null",
        assignmentStatus: "Graded",
      },
    ];
  }
}
