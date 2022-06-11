import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import commentSlice from "../../redux/commentSlice";
import Avatar from "../Avatar";
import styles from "./CommentItem.module.scss";
import {
  commentSelector,
  usersSelector,
  // videoDetailSelector,
} from "../../redux/selectors";
import modalSlice from "../../redux/modalSlice";
import { updateCommentApi } from "../../callApi/commentsApi";

function CommentItem({ userPostVideo, comment, replies, parentId }) {
  const { userLogged } = useSelector(usersSelector);
  // const { user } = useSelector(videoDetailSelector);
  const { reload } = useSelector(commentSelector);
  const [isLike, setIsLike] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (comment.likes.length > 0 && comment.likes.includes(userLogged.id)) {
      setIsLike(true);
    }
  }, [comment]);

  const handleReplyComment = () => {
    dispatch(commentSlice.actions.setParentId(parentId));
    dispatch(commentSlice.actions.setReplyUsername(comment.username));
  };
  const handleDeleteComment = () => {
    dispatch(
      modalSlice.actions.setModalDeleteComment(true)
    );
    dispatch(commentSlice.actions.setCommentIdToDel(comment.id));
  };

  const handleLikeComment = () => {
    let data;
    if (isLike) {
      data = {
        likes:
          comment.likes && comment.likes.filter((id) => id !== userLogged.id),
      };
    } else {
      data = {
        likes: [...comment.likes, userLogged.id],
      };
    }

    updateCommentApi(comment.id, data);
    setIsLike(!isLike);
    dispatch(commentSlice.actions.setReload(!reload));
  };
  return (
    <>
      <div className={styles.commentItem}>
        <Avatar urlImg={comment.avatar} avatarSmallPlus />
        <div className={styles.commentItemContent}>
          <Link to="#" className={styles.commentItemContentUsername}>
            {comment.username}
          </Link>
          {userPostVideo && userPostVideo.id === comment.userId && (
            <span className={styles.commentItemContentAuthor}>Tác giả</span>
          )}
          <p className={styles.commentItemContentText}>{comment.content}</p>
          <div className={styles.commentItemContentSub}>
            <span>{`${new Date(comment.createdAt).getDate()} - ${
              new Date(comment.createdAt).getMonth() + 1
            }`}</span>
            <button onClick={handleReplyComment}>Trả lời</button>
            {comment.userId === userLogged.id && (
              <button onClick={handleDeleteComment}>Xóa</button>
            )}
          </div>
        </div>
        <div
          className={styles.commentItemLike}
          onClick={handleLikeComment}
          style={isLike ? { color: "#fe2c55" } : { color: "#161823" }}
        >
          <FaRegHeart className={styles.commentItemLikeIcon} />
          <p className={styles.commentItemLikeText}>
            {comment.likes ? comment.likes.length : 0}
          </p>
        </div>
      </div>
      <div className={styles.commentItemReply}>
        {replies.length > 0 &&
          replies.map((replyCmt) => {
            return (
              <CommentItem
                key={replyCmt.id}
                comment={replyCmt}
                parentId={comment.id}
                replies={[]}
              />
            );
          })}
      </div>
    </>
  );
}

export default CommentItem;
