import axios from "axios";

const apiUrl = "https://cybers.azurewebsites.net/api/schooladmin";
// const apiUrl = "http://localhost:3001/api/schooladmin";

export const SchoolService = {
  post_new_teachers,
  update_teacher,
  delete_teacher,
  get_all_teachers,
  get_all_students,
  update_student,
  delete_student,
  post_new_course,
  update_course,
  delete_course,
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
async function update_course(data) {
  try {
    let res = await axios({
      url: `${apiUrl}/update_class`,
      method: "put",
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
async function delete_course(id) {
  try {
    let res = await axios({
      url: `${apiUrl}/del_class/${id}`,
      method: "delete",
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
      url: `${apiUrl}/teachers/${id}`,
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

async function update_teacher(data) {
  try {
    let res = await axios({
      url: `${apiUrl}/update_teacher`,
      method: "put",
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
async function delete_teacher(id) {
  try {
    let res = await axios({
      url: `${apiUrl}/del_teacher/${id}`,
      method: "delete",
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

async function update_student(data) {
  try {
    let res = await axios({
      url: `${apiUrl}/update_student`,
      method: "put",
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
async function delete_student(id) {
  try {
    let res = await axios({
      url: `${apiUrl}/del_student/${id}`,
      method: "delete",
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

export default SchoolService;
