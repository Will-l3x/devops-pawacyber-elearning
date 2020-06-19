import axios from "axios";

const apiUrl = "http://cybers.azurewebsites.net/api/schooladmin";
// const apiUrl = "http://localhost:3001/api/schooladmin";

export const SchoolService = {
  post_new_teachers,
  get_all_teachers,
  get_all_students,
  post_new_course,
  get_courses
};


// Create Courses

async function post_new_course(data) {
  try {
    let res = await axios({
      url: `${apiUrl}/add_class`,
      method: "post",
      data,
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res)
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

async function get_courses(id) {
  try {
    let res = await axios({
      url: `${apiUrl}/teacher/${id}`,
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data.data.classes;
  } catch (err) {
    console.error(err);
  }
}

// teacher functions by schoolid
async function get_all_teachers(id) { 
  try {
    let res = await axios({
      url: `${apiUrl}/teacher/${id}`,
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data.data.teacher;
  } catch (err) {
    console.error(err);
  }
}

async function post_new_teachers(data) {
  try {
    let res = await axios({
      url: `${apiUrl}/add_teacher`,
      method: "post",
      data,
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    console.log('cant link teacher to school')
    console.error(err);
  }
}

// student functions
async function get_all_students(id) {
  try {
    let res = await axios({
      url: `${apiUrl}/students/${id}`,
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

export default SchoolService;
