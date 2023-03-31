import axios from "axios";

const baseURL = "http://localhost:5000";

export async function getAllLanguages() {
  try {
    const res = await axios.get("https://restcountries.com/v3.1/all");
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

// ******************** Members ******************** //
export async function getAllMember() {
  try {
    const members = await axios.get(baseURL + "/members");
    return members;
  } catch (err) {
    console.log(err);
  }
}

export async function createMember() {
  try {
    const newMember = await axios.post(baseURL + "/members", item);
    return newMember;
  } catch (err) {
    console.log(err);
  }
}

// ******************** Tasks ******************** //
export async function getAllTask() {
  try {
    const tasks = await axios.get(baseURL);
    return tasks;
  } catch (err) {
    console.log(err);
  }
}
