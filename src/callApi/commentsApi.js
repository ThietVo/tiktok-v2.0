import defaultUrl from './defaultUrl';

export const getCommentOfVideoApi = (videoId) => {
   return fetch(`${defaultUrl}/comments?videoId=${videoId}&_sort=createdAt&_order=desc`)
        .then(res => res.json())
        .catch(err => {
            console.log(err);
        })
}

export const createCommentApi = (data) => {
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    fetch(`${defaultUrl}/comments`, options)
        .then((res) => res.json())
        .catch((err) => {
            console.log(err);
    });
}

export const deleteCommentApi = (commentId) => {
    let options = {
        method: "DELETE",
    };
    fetch(`${defaultUrl}/comments/${commentId}`, options)
        .then((res) => res.json())
        .catch((err) => {
            console.log(err);
    });
}

export const deleteCommentByVideoIdApi = (videoId) => {
    let options = {
        method: "DELETE",
    };
    fetch(`${defaultUrl}/comments?videoId=${videoId}`, options)
        .then((res) => res.json())
        .catch((err) => {
            console.log(err);
    });
}

export const updateCommentApi = (commentId, data) => {
    let options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    fetch(`${defaultUrl}/comments/${commentId}`, options)
        .then((res) => res.json())
        .catch((err) => {
            console.log(err);
    });
}