// Service modules export business/app logic
// such as storing/managing tokens
// Service modules often depend on
// API modules for making AJAX requests to the server

import * as usersAPI from "./users-api";

export async function signUp(userData) {
  const token = await usersAPI.signUp(userData);
  localStorage.setItem("token", token);
  return getUser();
}

export async function login(credentials) {
  const token = await usersAPI.login(credentials);
  console.log(token);
  localStorage.setItem("token", token);
  console.log(getUser());
  return getUser();
}

export function logOut() {
  localStorage.removeItem("token");
}

export function getToken() {
  // getItem returns null if key doesn't exist
  const token = localStorage.getItem("token");
  if (!token) return null;
  const payload = JSON.parse(atob(token.split(".")[1]));
  // A JWT's exp property is expressed in seconds, not ms
  if (payload.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}

export async function checkToken() {
  return usersAPI.checkToken().then((dateStr) => new Date(dateStr));
}
