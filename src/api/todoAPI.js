import axios from "axios";

const baseURL = "http://localhost:5000";

export async function getAllTask() {
  try {
    const tasks = await axios.get(baseURL);
    return tasks;
  } catch (err) {
    console.log(err);
  }
}
