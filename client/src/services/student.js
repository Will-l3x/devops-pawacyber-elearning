import axios from "axios";

const apiUrl = "http://localhost:3001/api/student";

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
      url: `${apiUrl}/get_classes/${student_id}`,
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data.data;
  } catch (err) {
    console.error(err);
    return [{
      classId: 0,
      classname: "Check connection...",
      numberOfTopics: null,
      courseCode: null,
    },
  ];
  }
}

async function get_course_downloadables(course_id) {
  try {
    let res = await axios({
      url: `${apiUrl}/get_materials/${course_id}`,
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res.data.data)
    return res.data.data;

  } catch (err) {
    console.error(err);
    return [{
      resourceid: 1,
      materialname: "Check connection...",
      file: "null",
      dateadded: "15-05-2020"
    }, ];

  }
}

async function get_course_video_resources(course_id) {
  try {
    let res = await axios({
      url: `${apiUrl}/get-all-unmarked/${course_id}`,
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

async function get_student_all_classwork(course_id) {
  try {
    let res = await axios({
      url: `${apiUrl}/get_assignments/${course_id}`,
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


// Student class work services

async function get_student_pending_classwork(student_id) {
  try {
    let res = await axios({
      url: `${apiUrl}/get_assignments/${student_id}`,
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
      dueDate: "null",
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
      dueDate: "null",
      score: null,
      assignmentTitle: "null",
      assignmentLink: "null",
      assignmentStatus: "Graded",
    }, ];
  }
}

