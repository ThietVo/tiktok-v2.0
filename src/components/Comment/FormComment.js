import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { createCommentApi } from "~/callApi/commentsApi";
import commentSlice from "~/redux/commentSlice";
import videosSlice from "~/redux/videosSlice";

import {
  commentSelector,
  usersSelector,
  videosSelector,
} from "../../redux/selectors";
import styles from "./FormComment.module.scss";

function FormComment() {
  const dispatch = useDispatch();
  const { userLogged } = useSelector(usersSelector);

  const { videosWithUsers, indexCurrentVideo, commentsOfCurrentVideo } = useSelector(videosSelector);
  const { parentId, replyUsername } = useSelector(commentSelector);
  const [comment, setComment] = useState('');
  const inputRef = useRef();

  const video = videosWithUsers[indexCurrentVideo];

  useEffect(() => {
    if (replyUsername) {
      inputRef.current.focus();
    }
  }, [replyUsername]);

  const handleClickBtn = () => {
    handleAddComment();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddComment();
    }
    if(e.key === 'Backspace' && comment === '') {
       dispatch(commentSlice.actions.setReplyUsername(null));
      dispatch(commentSlice.actions.setParentId(null));
    }
  };

  const handleAddComment = () => {
    if(comment){
      const data = {
        id: uuidv4(),
        content: comment,
        userId: userLogged.id,
        username: userLogged.username,
        avatar: userLogged.avatar,
        videoId: video.id,
        parentId: parentId,
        likes: [],
        createdAt: new Date().toString(),
        updatedAt: new Date().toString()
      };
  
      createCommentApi(data);
      dispatch(videosSlice.actions.setCommentsOfCurrentVideo([data, ...commentsOfCurrentVideo]));
      dispatch(commentSlice.actions.setParentId(null));
      dispatch(commentSlice.actions.setReplyUsername(null));
      setComment("");
    }
  };

  return (
    <div className={styles.formComment}>
      {replyUsername !== null && <div className={styles.formCommentReply}>Reply @{replyUsername}:</div>}
      <input
        ref={inputRef}
        value={comment}
        className={styles.formCommentInput}
        placeholder="Thêm bình luận..."
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className={styles.formCommentBtn} onClick={handleClickBtn}>
        Đăng
      </button>
    </div>
  );
}

export default FormComment;
