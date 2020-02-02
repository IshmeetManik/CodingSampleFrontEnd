export const uploadUrl = "http://localhost:8000/upload";
export const sumraizeUrl = "http://localhost:8000/summarize";
export const loginUrl = "http://localhost:3000/api/authenticate/login";
export const registerationUrl =
  "http://localhost:2000/api/authenticate/registration";
export const isUser = "http://localhost:2000/api/authenticate/isUser";
export const updateUserUrl =
  "http://localhost:3000/api/authenticate/updateUserEntity";
export const getAllUsersUrl = Organization => {
  return `http://localhost:3000/api/authenticate/getAllUser/${Organization}`;
};
export const deleteUserUrl = (organization, email) => {
  return `http://localhost:3000/api/authenticate/deleteUser/${organization}/${email}`;
};
