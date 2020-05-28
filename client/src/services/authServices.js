import axios from "axios";

// const apiUrl = "http://cybers.azurewebsites.net/api";
const apiUrl = "http://localhost:3001/api";

export const AuthService = {
  register,
};

//Register New User
async function register(data) {
  try {

    let res = await axios({
      url: `${apiUrl}/register`,
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