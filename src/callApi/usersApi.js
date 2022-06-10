import defaultUrl from "./defaultUrl";

export const getUsersApi = () => {
  return fetch(`${defaultUrl}/users`)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
};

export const getUserApi = (userId) => {
  return fetch(`${defaultUrl}/users/${userId}`)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
};

export const getUsersWithVideosApi = () => {
  return fetch(`${defaultUrl}/users?_embed=videos`)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
};

export const getUserWithVideosApi = (userId) => {
  return fetch(`${defaultUrl}/users/${userId}?_embed=videos`)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
};

export const filterUsersByTiktokId = (tiktokId) => {
  return fetch(`${defaultUrl}/users?tiktokid=${tiktokId}`)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
};

export const createUserApi = (data) => {
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(`${defaultUrl}/users`, options)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
};

export const updateUserApi = (userId, data) => {
  let options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(`${defaultUrl}/users/${userId}`, options)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
};
