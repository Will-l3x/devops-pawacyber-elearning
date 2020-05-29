import axios from "axios";

import blog_1 from "../assets/images/blog_1.jpg";
import blog_2 from "../assets/images/blog_2.jpg";
import blog_3 from "../assets/images/blog_3.jpg";
import blog_4 from "../assets/images/blog_4.jpg";
import blog_5 from "../assets/images/blog_5.jpg";
import blog_6 from "../assets/images/blog_6.jpg";

const qs = require('qs');

const apiUrl = "http://cybers.azurewebsites.net/api";
// const apiUrl = "http://localhost:3001/api";

export const AdminService = {
  post_new_school,
  get_all_schools,
  post_new_plan,
  get_subs_plans,
  subscribe_school,
  get_roles,
  post_new_role,

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

const pageArraySplit = (array, pagingOptions) => {
  const currentPageNumber = pagingOptions.currentPageNumber;
  const perPage = pagingOptions.perPage;
  const startingIndex = (currentPageNumber - 1) * perPage;
  const endingIndex = startingIndex + perPage;
  return array.slice(startingIndex, endingIndex);
};



//POST new School
async function post_new_school(data) {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  try {
    let res= await axios.post(`${apiUrl}/add_school`,qs.stringify(data),config);
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

// Get all schools
async function get_all_schools() {
  try {
    let res = await axios({
      url: `${apiUrl}/schools`,
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data.data.schools;
  } catch (err) {
    console.error(err);
    return [{
      schoolname: "Error Connecting",
      address: "null",
      contacts: "null",
      enrolmentkey: "null",
    }];
  }
}


//POST Subscription Plan
async function post_new_plan(data) {
  try {

    let res = await axios({
      url: `${apiUrl}/add_subscription`,
      method: "post",
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

async function get_subs_plans() {
  try {
    let res = await axios({
      url: `${apiUrl}/subscriptions`,
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.data.success) {
      return res.data.data.subscriptions;
    } else {
      return [{
        "subscriptionId": 1,
        "subscriptionname": "null",
        "subscriptiondesc": "null",
        "mingrade": 0,
        "maxgrade": 0,
        "price": 0
      }];
    }

  } catch (err) {
    console.error(err);
    return [{
      "subscriptionId": 0,
      "subscriptionname": "connection failed",
      "subscriptiondesc": "null",
      "mingrade": 0,
      "maxgrade": 0,
      "price": 0
    }, ];
  }
}

//Subscribe School
async function subscribe_school(data) {
  try {
    let res = await axios({
      url: `${apiUrl}/subscribe`,
      method: "post",
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


async function post_new_role(data) {
  try {

    let res = await axios({
      url: `${apiUrl}/add_role`,
      method: "post",
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

async function get_roles() {
  try {
    let res = await axios({
      url: `${apiUrl}/roles`,
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data.data.roles;
  } catch (err) {
    console.error(err);
  }
}





















// course functions
async function get_all_courses(currentPageNumber) {
  try {
    /**
     * 
     * let res = await axios({
       url: `${apiUrl}/course/get-all-courses`,
       method: "get",
       timeout: 8000,
       headers: {
         "Content-Type": "application/json",
       },
     });
     return res.data;
     * 
     * 
     */

    let res = {
      data: [{
          id: "1",
          title: "Course Name 1",
          subscribed: false,
          img: blog_1,
        },
        {
          id: "2",
          title: "Course Name 2",
          subscribed: false,
          img: blog_2,
        },
        {
          id: "3",
          title: "Course Name 3",
          subscribed: false,
          img: blog_3,
        },
        {
          id: "4",
          title: "Course Name 4",
          subscribed: false,
          img: blog_4,
        },
        {
          id: "5",
          title: "Course Name 5",
          subscribed: false,
          img: blog_5,
        },
        {
          id: "6",
          title: "Course Name 6",
          subscribed: false,
          img: blog_6,
        },
      ],
    };
    let pages = [];
    let perPage = 6;
    const totalPageCount = Math.ceil(res.data.length / perPage);

    for (var i = 1; i <= totalPageCount; i++) {
      pages.push(i);
    }
    const courses = pageArraySplit(res.data, {
      currentPageNumber,
      perPage,
    });
    return {
      courses,
      pages
    };
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
        "Content-Type": "application/json",
      },
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
        "Content-Type": "application/json",
      },
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
        "Content-Type": "application/json",
      },
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
        "Content-Type": "application/json",
      },
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
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
async function delete_course(course_id) {
  try {
    /**
     * 
     * 
     * let res = await axios({
       url: `${apiUrl}/course/delete-course/${course_id}`,
       method: "delete",
       timeout: 8000,
       headers: {
         "Content-Type": "application/json",
       },
     });
     * 
     *  return res.data;
     * 
      */
    console.log(course_id);
    return true
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
        "Content-Type": "application/json",
      },
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
        "Content-Type": "application/json",
      },
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
        "Content-Type": "application/json",
      },
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
        "Content-Type": "application/json",
      },
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
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}