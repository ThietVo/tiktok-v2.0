import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import { getVideosOfUserInLikedVideosApi } from "~/callApi/videosApi";
import styles from "./NumLikes.module.scss";

function NumLikes({ userId }) {
    const [ numLikes, setNumLikes ] = useState(0);

    useEffect(() => {
        //Đếm số lượng like của userDetail
        getVideosOfUserInLikedVideosApi(userId).then(result => {
          let countLikes = 0;
          result.length > 0 && result.map(element => {
            if(element.likedVideos.length > 0){
              countLikes += element.likedVideos.length;
            }
          })
          setNumLikes(countLikes);
        })
      }, [userId]);
  return (
    <div className={styles.numLikes}>
        <strong className={styles.numLikesText}>{numLikes}</strong> Like
    </div>
  )
}

NumLikes.propTypes = {
  userId: PropTypes.string,
}

export default NumLikes