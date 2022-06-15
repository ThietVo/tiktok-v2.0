import defaultUrl from "./defaultUrl";

export const createLikedVideosApi = (data) => {
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(`${defaultUrl}/likedVideos`, options)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
};

export const getLikesOfVideoApi = (videoId) => {
  return fetch(`${defaultUrl}/likedVideos?videoId=${videoId}`)
  .then((res) => res.json())
  .catch((err) => {
    console.log(err);
  });
}

export const getLikedVideosOfUser = (userId) => {
  return fetch(`${defaultUrl}/likedVideos?userId=${userId}&_sort=createdAt&_order=desc`)
  .then((res) => res.json())
  .catch((err) => {
    console.log(err);
  });
}

export const deleteLikedVideoApi = (id) => {
  let options = {
    method: "DELETE",
  };
  fetch(`${defaultUrl}/likedVideos/${id}`, options)
  .then((res) => res.json())
  .catch((err) => {
    console.log(err);
  });
}


