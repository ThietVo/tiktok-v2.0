import defaultUrl from "./defaultUrl";

export const createVideoApi = (data) => {
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(`${defaultUrl}/videos`, options)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
};

export const getVideosWithUsersApi = () => {
  return fetch(`${defaultUrl}/videos?_expand=user`)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
}

export const getVideoWithUserByVideoIdApi = (videoId) => {
  return fetch(`${defaultUrl}/videos?_expand=user&id=${videoId}`)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
}

export const getVideoWithUserByUserIdApi = (userId) => {
  return fetch(`${defaultUrl}/videos?_expand=user&userId=${userId}`)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
}

export const getVideosOfUserApi = (userId) => {
  return fetch(`${defaultUrl}/videos?_expand=user&userId=${userId}&_sort=createdAt&_order=desc`)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
}


export const getVideoApi = (videoId) => {
  return fetch(`${defaultUrl}/videos/${videoId}`)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
}

export const getVideosOfUserInLikedVideosApi = (userId) => {
  return fetch(`${defaultUrl}/videos?userId=${userId}&_embed=likedVideos`)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
}

export const updateVideoApi = (videoId, data) => {
  let options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(`${defaultUrl}/videos/${videoId}`, options)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
};

export const deleteVideoApi = (videoId) => {
  let options = {
    method: "DELETE",
  };
  fetch(`${defaultUrl}/videos/${videoId}`, options)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
};
