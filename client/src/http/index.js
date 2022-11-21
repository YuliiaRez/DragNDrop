import axios from "axios";

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const fetchUsers = async () => {
  const { data } = await $host.get("api/user");
  return data;
};

export const createUser = async (name) => {
  const { data } = await $host.post("api/user", { name });
  return data;
};
export const deleteUser = async (id) => {
  await $host.delete("api/user/" + id);
  return;
};
export const updateUser = async (id, name) => {
  await $host.put("api/user/" + id, { name });
  return "user updated";
};
