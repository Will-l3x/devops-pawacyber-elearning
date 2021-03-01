import axios from "axios";
const qs = require("qs");
const token = JSON.parse(localStorage.getItem("token"));

var config = {
    baseURL: "https://pawacyberschool.net/api/dpo/payment",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "https://pawacyberschool.net",
        "Access-Control-Allow-Credentials": true,
    },
};

export const PaymentService = {
    createToken
};

async function createToken(data) {
    
    try {
        let res = await axios.post(`/createToken`, qs.stringify(data), config);
        return res.data;
    } catch (err) {
        console.log("Failed to create transaction token");
        console.log(err);
    }
}

