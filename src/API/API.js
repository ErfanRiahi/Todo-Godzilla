import axios from "axios";

// const baseURL = "https://todo-godzilla.onrender.com";
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
    const res = await axios.get(baseURL + "/members");
    return res;
  } catch (err) {
    console.log(err);
  }
}

export async function createMember(item) {
  try {
    const res = await axios.post(baseURL + "/members", item);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteMemberApi(id) {
  try {
    const res = await axios.delete(baseURL + "/members", {
      data: { id },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function editMemberApi(id, item) {
  try {
    const res = await axios.put(baseURL + "/members", { id, item });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
// ******************** Tasks ******************** //
export async function getAllTask() {
  try {
    const res = await axios.get(baseURL);
    return res;
  } catch (err) {
    console.log(err);
  }
}

export async function addTaskApi(task) {
  try {
    const res = await axios.post(baseURL, task);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function editTaskApi(id, task) {
  try {
    const res = await axios.put(baseURL, { id, task });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteTaskApi(id) {
  try {
    const res = await axios.delete(baseURL, { data: { id } });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

// ******************** Histories ******************** //
export async function getAllHistoriesApi() {
  try {
    const res = await axios.get(baseURL + "/history");
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function addToHistoryApi(history) {
  try {
    const res = await axios.post(baseURL + "/history", history);
    return res.data;
    ("");
  } catch (err) {
    console.log(err);
  }
}
