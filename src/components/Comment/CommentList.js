import CommentItem from "./CommentItem";
import styles from "./CommentList.module.scss";

function CommentList({ userPostVideo, comments }) {

  //get reply_comments of a comment
  const getRepliesCmt = (commentId) => {
    return comments.filter((comment) => comment.parentId === commentId);
  };

  return (
    <div className={styles.commentList}>
      {comments &&
        comments.map((comment) => {
          return !comment.parentId  && (//truyen` comment khong co parentId = null
            <CommentItem
              key={comment.id}
              userPostVideo={userPostVideo}
              comment={comment}
              parentId={comment.id}
              replies={getRepliesCmt(comment.id)} 
            />
          )
        })}
    </div>
  );
}

export default CommentList;
