import axios from "axios";
import img from "../assets/images/blog_1.jpg";
const qs = require("qs");
const token = JSON.parse(localStorage.getItem("token"));
var config = {
  baseURL: "https://cybers.azurewebsites.net/api",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Bearer ${token}`,
  },
  
};

export const AdminService = {
  post_new_school,
  get_all_schools,
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
};

//POST new School
async function post_new_school(data) {
  try {
    let res = await axios.post(`add_school`, qs.stringify(data), config);
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

async function update_school(id, data) {
  try {
    let res = await axios.put(
      `update_school/${id}`,
      qs.stringify(data),
      config
    );
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

// Get all schools
async function get_all_schools() {
  try {
    let res = await axios.get(`/schools`, config);
    console.log(res);
    return res.data.data.schools;
  } catch (err) {
    console.error(err);
    return [
      {
        schoolname: "Error Connecting",
        address: "null",
        contacts: "null",
        enrolmentkey: "null",
      },
    ];
  }
}

// DELETE A SCHOOL
async function delete_school(id) {
  try {
    let res = await axios.delete(`del_school/${id}`, config);
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

// Subscription Plans
async function post_new_plan(data) {
  try {
    let res = await axios.post(`add_subscription`, qs.stringify(data), config);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

async function update_plan(id, data) {
  try {
    let res = await axios.put(
      `update_subscription/${id}`,
      qs.stringify(data),
      config
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

async function get_subs_plans() {
  try {
    let res = await axios.get(`subscriptions`, config);
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
  try {
    let res = await axios.delete(`del_subscription/${id}`, config);
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

//Subscribe School
async function subscribe_school(data) {
  try {
    let res = await axios.post(`subscribe`, qs.stringify(data), config);
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

//SUBADMINS
async function get_subadmins() {
  try {
    let res = await axios.get(`subadmins`, config);
    return res.data.data.subadmins;
  } catch (err) {
    console.error(err);
  }
}
async function get_subadmin(id) {
  try {
    let res = await axios.get(`subadmin/${id}`, config);
    return res.data.data;
  } catch (err) {
    console.error(err);
  }
}

//ROLES
async function post_new_role(data) {
  try {
    let res = await axios(`add_role`, qs.stringify(data), config);
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

async function update_roles(id, data) {
  try {
    let res = await axios.put(`update_role/${id}`, qs.stringify(data), config);
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

async function get_roles() {
  try {
    let res = await axios.get(`roles`, config);
    return res.data.data.roles;
  } catch (err) {
    console.error(err);
  }
}

async function delete_roles(id) {
  try {
    let res = await axios.delete(`del_role/${id}`, config);
    return res.data.data.roles;
  } catch (err) {
    console.error(err);
  }
}

//COURSE
async function post_new_course(data) {
  try {
    let res = await axios(
      `schooladmin/add_shared_class`,
      qs.stringify(data),
      config
    );
    return res;
  } catch (err) {
    console.error(err);
  }
}
async function get_courses() {
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
  try {
    let res = await axios.post(
      `https://cybers.azurewebsites.net/api/upload/new`,
      qs.stringify(data),
      config
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

async function post_new_topic(data) {
  try {
    let res = await axios.post(
      `schooladmin/add_shared_topic`,
      qs.stringify(data),
      config
    );
    return res;
  } catch (err) {
    console.error(err);
  }
}

async function get_topics(id) {
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
