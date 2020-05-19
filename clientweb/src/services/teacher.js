import axios from 'axios';

const apiUrl = "http://loaclhost:3000/api";

export const TeacherService = {
  get_all_courses,
  get_teacher_pending_classwork,
  get_teacher_unmarked_classwork
};

// classroom
async function get_all_courses(teacher_id) {
   try {
    let res = await axios({
      url: `${apiUrl}/teacher/get-all-courses/${teacher_id}`,
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json"
      }
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
async function get_teacher_pending_classwork(teacher_id, classroom_id) {
  try {
    let res = await axios({
      url: `${apiUrl}/teacher/get-all-pending/${teacher_id}/${classroom_id}`,
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json"
      }
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
async function get_teacher_unmarked_classwork(teacher_id, classroom_id) {
  try {
    let res = await axios({
      url: `${apiUrl}/teacher/get-all-unmarked/${teacher_id}/${classroom_id}`,
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json"
      }
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
