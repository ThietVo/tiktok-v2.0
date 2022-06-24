import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import commentSlice from '~/redux/commentSlice';
import Avatar from '~/components/Avatar';
import styles from './CommentItem.module.scss';
import { usersSelector, videosSelector } from '~/redux/selectors';
import modalSlice from '~/redux/modalSlice';
import { updateCommentApi } from '~/callApi/commentsApi';
import { calculateElapsedTime } from '~/assets/jsFunc';
import videosSlice from '~/redux/videosSlice';

function CommentItem({ userPostVideo, comment, replies, parentId }) {
    const { userLogged } = useSelector(usersSelector);
    const { commentsOfCurrentVideo } = useSelector(videosSelector);
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
        dispatch(modalSlice.actions.setModalDeleteComment(true));
        dispatch(commentSlice.actions.setCommentIdToDel(comment.id));
    };

    const handleLikeComment = () => {
        let data;
        if (isLike) {
            data = {
                likes: comment.likes && comment.likes.filter((id) => id !== userLogged.id),
            };
        } else {
            data = {
                likes: [...comment.likes, userLogged.id],
            };
        }

        updateCommentApi(comment.id, data);
        setIsLike(!isLike);
        dispatch(
            videosSlice.actions.setCommentsOfCurrentVideo(
                commentsOfCurrentVideo.map((element) => {
                    if (element.id === comment.id) {
                        return { ...comment, ...data };
                    }
                    return element;
                }),
            ),
        );
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
                        <span>{calculateElapsedTime(comment.createdAt)}</span>
                        <button onClick={handleReplyComment}>Trả lời</button>
                        {comment.userId === userLogged.id && <button onClick={handleDeleteComment}>Xóa</button>}
                    </div>
                </div>
                <div
                    className={styles.commentItemLike}
                    onClick={handleLikeComment}
                    style={isLike ? { color: '#fe2c55' } : { color: '#161823' }}
                >
                    <FaRegHeart className={styles.commentItemLikeIcon} />
                    <p className={styles.commentItemLikeText}>{comment.likes ? comment.likes.length : 0}</p>
                </div>
            </div>
            <div className={styles.commentItemReply}>
                {replies.length > 0 &&
                    replies.map((replyCmt) => {
                        return (
                            <CommentItem
                                key={replyCmt.id}
                                comment={replyCmt}
                                parentId={parentId}
                                replies={[]}
                            />
                        );
                    })}
            </div>
        </>
    );
}

CommentItem.propTypes = {
    userPostVideo: PropTypes.object,
    comment: PropTypes.object.isRequired,
    replies: PropTypes.array.isRequired,
    parentId: PropTypes.string.isRequired,
}

export default CommentItem;
