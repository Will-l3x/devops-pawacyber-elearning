import axios from "axios";

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

};


const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

//POST new School
async function post_new_school(data) {
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
    let res= await axios.post(`${apiUrl}/add_subscription`,qs.stringify(data),config);
    console.log(res.data);
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