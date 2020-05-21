import axios from 'axios';

const apiUrl = "http://localhost:3000/api";

export const AdminService = {
  get_all_courses,
  post_new_course,
  post_course_topic,
  delete_course,
  get_course_material,
  post_course_material,
  update_course_material,
  delete_course_topic,
  get_all_teachers,
  confirm_teacher,
  get_subscription_info,
  update_subscription_info,
};

// course functions
async function get_all_courses() {
   try {
    let res = await axios({
      url: `${apiUrl}/course/get-all-courses`,
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
async function post_new_course(data) {
  try {
    let res = await axios({
      url: `${apiUrl}/course/add-new-course`,
      method: "post",
      data,
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
async function get_course_material(course_id) {
  try {
    let res = await axios({
      url: `${apiUrl}/course/get-course-material/${course_id}`,
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
async function post_course_material(course_id, data) {
  try {
    let res = await axios({
      url: `${apiUrl}/course/add-course-material/${course_id}`,
      method: "post",
      data,
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
async function post_course_topic(course_id, data) {
  try {
    let res = await axios({
      url: `${apiUrl}/course/add-course-topic/${course_id}`,
      method: "post",
      data,
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
async function update_course_material(course_id, topic_id, data) {
  try {
    let res = await axios({
      url: `${apiUrl}/course/update-course-material/${course_id}/${topic_id}`,
      method: "put",
      data,
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
async function delete_course(course_id) {
  try {
    let res = await axios({
      url: `${apiUrl}/course/delete-course/${course_id}`,
      method: "delete",
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
async function delete_course_topic(course_id, topic_id) {
  try {
    let res = await axios({
      url: `${apiUrl}/course/delete-course-topic/${course_id}/${topic_id}`,
      method: "delete",
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
// teacher functions
async function get_all_teachers() {
  try {
    let res = await axios({
      url: `${apiUrl}/admin/get-all-teachers`,
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
async function confirm_teacher(teacher_id, data) {
  try {
    let res = await axios({
      url: `${apiUrl}/admin/confirm-teacher/${teacher_id}`,
      method: "put",
      data,
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
async function get_subscription_info() {
  try {
    let res = await axios({
      url: `${apiUrl}/admin/get-subscription-info`,
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
async function update_subscription_info(subscription_id, data) {
  try {
    let res = await axios({
      url: `${apiUrl}/admin/udpate-subscription-info/${subscription_id}`,
      method: "put",
      data,
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
