import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { MdClose } from 'react-icons/md';
import { BsChevronDown, BsChevronUp, BsFillPlayFill } from 'react-icons/bs';
import { FaCheckCircle, FaMusic, FaLock } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from "react-router-dom";
import { FaCommentDots } from 'react-icons/fa';

import Avatar from '~/components/Avatar';
import styles from './ModalVideoDetail.module.scss';
import modalSlice from '~/redux/modalSlice';
import CommentLogin from '~/components/Comment/CommentLogin';
import CommentList from '~/components/Comment/CommentList';
import { commentSelector, usersSelector, videosSelector } from '~/redux/selectors';
import { getCommentOfVideoApi } from '~/callApi/commentsApi';
import FormComment from '~/components/Comment/FormComment';
import commentSlice from '~/redux/commentSlice';
import Heart from '~/components/Heart';
import uploadSlice from '~/redux/uploadSlice';
import videosSlice from '~/redux/videosSlice';
import UserCard from '~/components/UserCard';
import FollowButton from '~/components/Button/FollowButton';
import { calculateElapsedTime } from '~/assets/jsFunc';

function ModalVideoDetail() {
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const { userLogged } = useSelector(usersSelector);
    const { videosWithUsers, indexCurrentVideo, currentTimeVideo, volumeVideo } = useSelector(videosSelector);
    const { reload } = useSelector(commentSelector);
    const [comments, setComments] = useState([]);

    const [showPlayBtn, setShowPlayBtn] = useState(false);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);
    const [valueSliderVolume, setValueSliderVolume] = useState(50);

    const videoRef = useRef();

    const video = videosWithUsers[indexCurrentVideo];
    const user = videosWithUsers[indexCurrentVideo].user;

    const [style, setStyle] = useState({
        display: 'none',
        top: 30,
        left: 0,
    });

    let timerId = useRef();

    useEffect(() => {
        setShowPlayBtn(false);
        setValueSliderVolume(volumeVideo*100)

        videoRef.current.volume = volumeVideo;
    }, [indexCurrentVideo]);

    useEffect(() => {
        videoRef.current.addEventListener('loadedmetadata', function () {
            this.currentTime = currentTimeVideo;
        });
        //get comments and sort by createdAt desc
        getCommentOfVideoApi(video.id).then((data) => setComments(data));
    }, [reload, indexCurrentVideo, video.id]);

    const handleMouseEnter = () => {
        timerId.current = setTimeout(() => {
            setStyle({ ...style, display: 'block' });
        }, 1000);
    };
    const handleMouseLeave = () => {
        clearTimeout(timerId.current);

        setStyle({ ...style, display: 'none' });
    };

    const handleCloseBtn = () => {
        dispatch(modalSlice.actions.setModalVideoDetail(false));
        dispatch(
            commentSlice.actions.setComment({
                reload: false,
                parentId: null,
                replyUsername: null,
                commentIdToDel: null,
            }),
        );

        // navigate(-1);
    };
    //handle navigate to user detail page
    const handleUserDetail = () => {
        dispatch(modalSlice.actions.setModalVideoDetail(false));
    };
    //handle delete video
    const handleDeleteVideo = () => {
        dispatch(modalSlice.actions.setModalDeleteVideo(true));
    };

    const handleSetPrivacy = () => {
        dispatch(modalSlice.actions.setModalSetPrivacy(true));
        dispatch(uploadSlice.actions.setPublicVideo(video.hasPublic));
        dispatch(uploadSlice.actions.setHasCommentVideo(video.hasComment));
    };

    const handleNextVideo = () => {
        if (indexCurrentVideo < videosWithUsers.length - 1) {
            dispatch(videosSlice.actions.setIndexCurrentVideo(indexCurrentVideo + 1));
            dispatch(videosSlice.actions.setCurrentTimeVideo(0));
        }
    };
    const handlePrevVideo = () => {
        if (indexCurrentVideo > 0) {
            dispatch(videosSlice.actions.setIndexCurrentVideo(indexCurrentVideo - 1));
            dispatch(videosSlice.actions.setCurrentTimeVideo(0));
        }
    };

    const handleClickVideo = () => {
        if (!videoRef.current.paused) {
            videoRef.current.pause();
            setShowPlayBtn(true);
        } else {
            videoRef.current.play();
            setShowPlayBtn(false);
        }
    };

    const handleVolumeSlider = (e) => {
        setValueSliderVolume(+e.target.value);
        videoRef.current.volume = +e.target.value / 100;
    };

    const handleHoverVolumn = () => {
        setShowVolumeSlider(true);
    };

    const handleUnHoverVolumn = () => {
        setShowVolumeSlider(false);
    };

    const handleClickVolumeBtn = () => {
        if (videoRef.current.volume === 0) {
            videoRef.current.volume = 50 / 100;
            dispatch(videosSlice.actions.setVolumnVideo(0.5));
            setValueSliderVolume(50);
        } else {
            videoRef.current.volume = 0;
            dispatch(videosSlice.actions.setVolumnVideo(0));
            setValueSliderVolume(0);
        }
    };

    return (
        <div className={styles.modalVideoDetail}>
            <div className={styles.videoContainer}>
                <div className={styles.videoContainerVideo}>
                    <video ref={videoRef} key={video.url} autoPlay loop playsInline onClick={handleClickVideo}>
                        <source src={video.url} type="video/mp4" />
                    </video>
                </div>
                <div className={styles.videoContainerClose}>
                    <button className={styles.videoContainerBtn} onClick={handleCloseBtn}>
                        <MdClose className={styles.videoContainerBtnIcon} />
                    </button>
                </div>

                <div className={styles.videoContainerUp}>
                    {indexCurrentVideo > 0 && (
                        <button onClick={handlePrevVideo} className={styles.videoContainerBtn}>
                            <BsChevronUp className={styles.videoContainerBtnIcon} />
                        </button>
                    )}
                </div>
                <div className={styles.videoContainerDown}>
                    {indexCurrentVideo < videosWithUsers.length - 1 && (
                        <button onClick={handleNextVideo} className={styles.videoContainerBtn}>
                            <BsChevronDown className={styles.videoContainerBtnIcon} />
                        </button>
                    )}
                </div>

                {showPlayBtn && (
                    <div className={styles.playBtn} onClick={handleClickVideo}>
                        <BsFillPlayFill />
                    </div>
                )}

                <div className={styles.volume} onMouseEnter={handleHoverVolumn} onMouseLeave={handleUnHoverVolumn}>
                    <button className={styles.volumeBtn} onClick={handleClickVolumeBtn}>
                        {valueSliderVolume === 0 ? <HiVolumeOff /> : <HiVolumeUp />}
                    </button>

                    {showVolumeSlider && (
                        <div className={styles.volumeSlider}>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="10"
                                value={valueSliderVolume}
                                onChange={handleVolumeSlider}
                            ></input>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.contentContainerHeader}>
                    {/* avatar, tiktokid, username */}
                    <Link
                        to={`/@${user.tiktokid}`}
                        className={clsx('d-flex')}
                        onClick={handleUserDetail}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Avatar urlImg={user.avatar} avatarSmallPlus />

                        <div className={styles.contentContainerHeaderAuthor}>
                            <div className={clsx('d-flex')}>
                                <h3 className={styles.contentContainerHeaderAuthorTitle}>{user.tiktokid}</h3>
                                <FaCheckCircle className={clsx('checkIconSmall')} />
                            </div>
                            <div className={clsx('d-flex')}>
                                <h4 className={styles.contentContainerHeaderAuthorName}>{user.username}</h4>
                                <span className={styles.contentContainerHeaderAuthorName}>
                                    . {calculateElapsedTime(video.createdAt)}
                                </span>
                                {!video.hasPublic && (
                                    <div className={styles.contentContainerHeaderAuthorPrivate}>
                                        <FaLock className={styles.contentContainerHeaderAuthorPrivateIcon} />
                                        <span>Riêng tư</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Link>
                    {/* video description */}
                    <div className={styles.contentContainerHeaderDescription}>
                        <span>{video.description + ' '}</span>

                        {video.hastag.map((hashtag, index) => {
                            return (
                                <Link
                                    to={`#${hashtag}`}
                                    className={styles.contentContainerHeaderDescriptionHashtag}
                                    key={index}
                                >
                                    #{hashtag}
                                </Link>
                            );
                        })}
                    </div>
                    {/* Link music */}
                    <Link to="#" className={styles.contentContainerHeaderMusic}>
                        <FaMusic className={styles.contentContainerHeaderMusicIcon} />
                        Nhạc nền - {user.username}
                    </Link>
                    {/*actions like video and comment */}
                    <div className={styles.contentContainerHeaderAction}>
                        <div className={styles.contentContainerHeaderActionHeart}>
                            <Heart video={video} styleHeart={'heartSmall'} />
                        </div>
                        <div className={styles.contentContainerHeaderActionComment}>
                            <div className={styles.contentContainerHeaderActionCommentIcon}>
                                <FaCommentDots />
                            </div>
                            <span>{comments ? comments.length : 0}</span>
                        </div>
                    </div>
                    {/* Delete video, setting public video */}
                    {userLogged.id === user.id ? (
                        <div className={styles.contentContainerHeaderSetting}>
                            <BsThreeDots className={styles.contentContainerHeaderSettingIcon} />
                            <div className={styles.contentContainerHeaderSettingList}>
                                <div className={styles.contentContainerHeaderSettingItem} onClick={handleSetPrivacy}>
                                    Cài đặt quyền riêng tư
                                </div>
                                <div className={styles.contentContainerHeaderSettingItem} onClick={handleDeleteVideo}>
                                    Xóa
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.contentContainerHeaderSetting}>
                            <FollowButton user={user} />
                        </div>
                    )}

                    <UserCard style={style} user={user} />
                </div>
                <div className={styles.contentContainerBody}>
                    {video.hasComment ? (
                        <CommentList userPostVideo={user} comments={comments} />
                    ) : (
                        <div className={styles.contentContainerBodyNoComment}>Bình luận đã tắt.</div>
                    )}
                </div>
                {!userLogged.id ? <CommentLogin /> : video.hasComment ? <FormComment /> : ''}
            </div>
        </div>
    );
}

export default ModalVideoDetail;
