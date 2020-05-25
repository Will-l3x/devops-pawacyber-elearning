import axios from "axios";

const apiUrl = "http://localhost:3001";

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
    let res = await axios({
      url: `${apiUrl}/student/get_classes/${student_id}`,
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return [{
      courseId: 1,
      courseName: "Check connection...",
      numberOfTopics: null,
      courseCode: null,
    },
  ];
  }
}

async function get_course_downloadables(course_id) {
  try {
    let res = await axios({
      url: `${apiUrl}/student/get_materials/${course_id}`,
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;

  } catch (err) {
    console.error(err);

    return [{
      resourceid: 1,
      resourceName: "Check connection...",
      resourceLink: "null",
      date: "15-05-2020"
    }, ];

  }
}

async function get_course_video_resources(course_id) {
  try {
    let res = await axios({
      url: `${apiUrl}/student/get-all-unmarked/${course_id}`,
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;

  } catch (err) {
    console.error(err);

    return [{
      id: 1,
      title: "Check Connection...",
      videoLink: ""
    }, ];

  }
}




// Student class work services

async function get_student_pending_classwork(student_id) {
  try {
    let res = await axios({
      url: `${apiUrl}/student/get-all-pending/${student_id}`,
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;

  } catch (err) {
    console.error(err);
    return [{
      assignmentId: 1,
      courseName: "Check connection...",
      dueDate: "13 May 2020",
      score: "null",
      assignmentTitle: "null",
      assignmentLink: "null",
      assignmentStatus: "null",
    }, ];
  }
}

async function get_student_marked_classwork(student_id) {
  try {
    let res = await axios({
      url: `${apiUrl}/student/get-all-marked/${student_id}`,
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
    
    return [{
      assignmentId: 1,
      courseName: "Check connection...",
      dueDate: "13 May 2020",
      score: null,
      assignmentTitle: "null",
      assignmentLink: "null",
      assignmentStatus: "Graded",
    }, ];
  }
}

async function get_student_all_classwork(student_id) {
  try {
    let res = await axios({
      url: `${apiUrl}/student/get-all-unmarked/${student_id}`,
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return [
    {
      assignmentId: 3,
      courseName: "Check connection...",
      dueDate: "13 May 2020",
      score: "",
      assignmentTitle: "",
      assignmentLink: "",
      assignmentStatus: "Submitted",
    },
  ];
  }
}