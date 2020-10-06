import axios from "axios";
import img from "../assets/images/blog_1.jpg";
const qs = require("qs");



export const AdminService = {
  get_all_classes,
  get_all_tags,
  get_course_tag,
  get_all_subjects_per_grade,
  subcribe_student,
  self_enrolment,

  findClassesForSchoolGrade,

  post_new_school,
  get_all_schools,
  get_school,
  post_new_plan,
  get_subs_plans,
  subscribe_school,
  get_roles,
  post_new_role,
  post_new_course,
  post_file,
  get_courses,
  post_new_topic,
  get_topics,
  update_school,
  update_plan,
  update_roles,
  delete_school,
  delete_roles,
  delete_plan,
  get_subadmin,
  get_subadmins,
  get_all_students,
  get_all_resources,
  get_all_teachers

};

async function get_course_tag(data) {
  const token = await JSON.parse(localStorage.getItem("token"));
  var config = {
    baseURL: "https://pawacyberschool.net/api/tags",

    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "https://pawacyberschool.net",
      "Access-Control-Allow-Credentials": true,
    },
  };
  try {
    let res = await axios.post(`/get_tags`, qs.stringify(data), config);
    if (res.data.success) {
      return res.data.data.material_tags;
    } else {
      return res.data;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function get_all_tags() {
  const token = await JSON.parse(localStorage.getItem("token"));
  var config = {
    baseURL: "https://pawacyberschool.net/api/tags",

    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "https://pawacyberschool.net",
      "Access-Control-Allow-Credentials": true,
    },
  };
  try {
    let res = await axios.get(`/all_tags`, config);
    return res.data.data.tags;
  } catch (err) {
    console.log(err);
  }
}

async function findClassesForSchoolGrade(data) {
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
    let res = await axios.post(`/get_school_grade_subjects`, qs.stringify(data), config);
    if (res.data.success) {
      return res.data;
    } else {
      return res.data;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function get_all_students() {
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
    let res = await axios.get(`/students`, config);
    return res.data.data.students;
  } catch (err) {
    console.log(err);
  }
}

async function get_all_teachers() {
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
    let res = await axios.get(`/teachers`, config);
    return res.data.data.teachers;
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function get_all_resources() {
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
    let res = await axios.get(`/materials`, config);
    return res.data.data.materials;
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function get_all_classes() {
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
    let res = await axios.get(`/classes/all`, config);
    if (res.data.success) {
      return res.data.data.classes;
    } else {
      return [];
    }
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function get_all_subjects_per_grade(data) {
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
    let res = await axios.post(`/classes/grade`, qs.stringify(data), config);
    console.log(res);
    if (res.data.success) {
      return res.data.data.classes;
    } else {
      return [];
    }
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function subcribe_student(data) {
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
    let res = await axios.put(`/subscribestudent`, qs.stringify(data), config);
    console.log(res);

    if (res.data.success) {
      return res.data;
    } else {
      return res.data;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function self_enrolment(data) {
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
    let res = await axios.post(`/post_payment_enrol`, qs.stringify(data), config);
    console.log(res);
    if (res.data.success) {
      return res.data;
    } else {
      return res.data;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}

//POST new School
async function post_new_school(data) {
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
    let res = await axios.post(`add_school`, qs.stringify(data), config);
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

async function update_school(id, data) {
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
      `update_school/${id}`,
      qs.stringify(data),
      config
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

// Get all schools
async function get_all_schools() {
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
    let res = await axios.get(`/schools`, config);
    return res.data.data.schools;
  } catch (err) {
    console.error(err);
    return [

    ];
  }
}
async function get_school(id) {
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
    let res = await axios.get(`/school/${id}`, config);
    return res.data.data;
  } catch (err) {
    console.error(err);
    return [

    ];
  }
}

// DELETE A SCHOOL
async function delete_school(id) {
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
    let res = await axios.delete(`/del_school/${id}`, config);
    return res;
  } catch (err) {
    console.error(err);
  }
}

// Subscription Plans
async function post_new_plan(data) {
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
    let res = await axios.post(`/add_subscription`, qs.stringify(data), config);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

async function update_plan(id, data) {
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
      `/update_subscription/${id}`,
      qs.stringify(data),
      config
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

async function get_subs_plans() {
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
    let res = await axios.get(`/subscriptions`, config);
    if (res.data.success) {
      return res.data.data.subscriptions;
    } else {
      return [];
    }
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function delete_plan(id) {
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
    console.log(id);
    let res = await axios.delete(`/del_subscription/${id}`, config);
    if (res.data.success) {
      return res.data;
    } else {
      return [];
    }
  } catch (err) {
    console.error(err);
    return [];
  }
}

//Subscribe School
async function subscribe_school(data) {
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
    let res = await axios.post(`/subscribe`, qs.stringify(data), config);
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

//SUBADMINS
async function get_subadmins() {
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
    let res = await axios.get(`/subadmins`, config);
    return res.data.data.subadmins;
  } catch (err) {
    console.error(err);
  }
}
async function get_subadmin(id) {
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
    let res = await axios.get(`/subadmin/${id}`, config);
    return res.data.data;
  } catch (err) {
    console.error(err);
  }
}

//ROLES
async function post_new_role(data) {
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
    let res = await axios(`/add_role`, qs.stringify(data), config);
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

async function update_roles(id, data) {
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
    let res = await axios.put(`/update_role/${id}`, qs.stringify(data), config);
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

async function get_roles() {
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
    let res = await axios.get(`/roles`, config);
    return res.data.data.roles;
  } catch (err) {
    console.error(err);
  }
}

async function delete_roles(id) {
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
    let res = await axios.delete(`/del_role/${id}`, config);
    return res.data.data.roles;
  } catch (err) {
    console.error(err);
  }
}

//COURSE
async function post_new_course(data) {
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
    let res = await axios(
      `/schooladmin/add_shared_class`,
      qs.stringify(data),
      config
    );
    return res;
  } catch (err) {
    console.error(err);
  }
}
async function get_courses() {
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
    /*
         let res = await axios.get(schooladmin/shared_class`, config);
         */
    let res = {
      data: [
        {
          name: "name",
          description: "...",
          img,
          grade: 0,
        },
      ],
    };
    return res;
  } catch (err) {
    console.error(err);
  }
}

async function post_file(data) {
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
      `https://pawacyberschool.net/api/upload/new`,
      qs.stringify(data),
      config
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

async function post_new_topic(data) {
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
      `/schooladmin/add_shared_topic`,
      qs.stringify(data),
      config
    );
    return res;
  } catch (err) {
    console.error(err);
  }
}

async function get_topics(id) {
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
    /* let res = await axios(.get`schooladmin/shared_class`, config)*/

    let res = {
      data: [
        {
          name: "name",
          description: "...",
          img,
          grade: 0,
        },
      ],
    };
    return res;
  } catch (err) {
    console.error(err);
  }
}
