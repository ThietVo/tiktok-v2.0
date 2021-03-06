import { useEffect, useState } from "react";
import clsx from "clsx";
import { BsCloudUpload } from "react-icons/bs";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

import { storage } from "~/firebase";
import styles from "./Upload.module.scss";
import { uploadSelector, usersSelector } from '~/redux/selectors';
import { useDispatch, useSelector } from "react-redux";
import modalSlice from "~/redux/modalSlice";
import uploadSlice from "~/redux/uploadSlice";
import { createVideoApi } from "~/callApi/videosApi";
import Privacy from '~/components/Privacy';
import layoutSlice from "~/redux/layoutSlice";

function Upload() {
  const dispatch = useDispatch();
  const [video, setVideo] = useState();
  const [descriptionVideo, setDescriptionVideo] = useState("1");
  const { userLogged } = useSelector(usersSelector);
  const { hasPublic, hasComment, uploaded } = useSelector(uploadSelector);
  let urlFirebaseVideo = "";

  useEffect(() => {
    dispatch(layoutSlice.actions.setHasClassContainer(false));
    //cleanup
    return () => {
      video && URL.revokeObjectURL(video.preview);
    };
  }, [video]);

  useEffect(() => {
    if (uploaded) {
      setVideo();
      setDescriptionVideo("1");
      dispatch(uploadSlice.actions.setUploaded(false));
    }
  }, [uploaded]);

  const handleChangeInputVideo = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setVideo(file);
  };

  const handleCancelUpload = () => {
    if (video) {
      setVideo();
    }
    setDescriptionVideo("1");
  };

  const handleUploadVideo = () => {
    handleUploadVideoToFirebase(video, () => {
      handleUploadVideoToDatabase();
    });
    setDescriptionVideo("1");

    dispatch(modalSlice.actions.setModalUpload(true));
  };

  const handleUploadVideoToFirebase = (video, callback) => {
    if (!video) {
      return;
    }
    const randomName = uuidv4() + "-" + video.name;
    const storageRef = ref(storage, `videos/${userLogged.id}/${randomName}`);
    const uploadTask = uploadBytesResumable(storageRef, video);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        dispatch(uploadSlice.actions.setProgess(prog));
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          urlFirebaseVideo = downloadURL;

          callback();
        });
      }
    );
  };

  const handleUploadVideoToDatabase = () => {
    const data = {
      id: uuidv4(),
      url: urlFirebaseVideo,
      description: descriptionVideo,
      hasPublic: hasPublic,
      hasComment: hasComment,
      hastag: [],
      taguser: [],
      views: 0,
      shares: 0,
      userId: userLogged.id,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString()
    };
    createVideoApi(data);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2>T???i video l??n</h2>
        <h3>????ng video v??o t??i kho???n c???a b???n</h3>
      </div>
      <div className={styles.content}>
        <div className={styles.contentUpload}>
          {video ? (
            <video
              className={styles.contentUploadVideo}
              autoPlay
              controls
              loop
              muted
              playsInline
            >
              <source src={video.preview} type="video/mp4" />
            </video>
          ) : (
            <div>
              <input
                type="file"
                accept="video/*"
                className={styles.contentUploadInput}
                onChange={handleChangeInputVideo}
              ></input>
              <div className={styles.contentUploadDescription}>
                <BsCloudUpload
                  className={styles.contentUploadDescriptionIcon}
                />
                <span>Ch???n video ????? t???i l??n</span>
                <p>MP4 ho???c WebM</p>
                <p>????? ph??n gi???i 720x1280 tr??? l??n</p>
                <p>T???i ??a 10 ph??t</p>
                <p>??t h??n 2Gb</p>
              </div>
            </div>
          )}
        </div>
        <div className={styles.contentForm}>
          <div className={styles.contentFormGroup}>
            <p className={styles.contentFormGroupLable}>Ch?? th??ch</p>
            <input
              className={styles.contentFormGroupInput}
              placeholder="Nh???p m?? t??? video"
              maxLength="150"
              value={descriptionVideo}
              onChange={(e) => setDescriptionVideo(e.target.value)}
            ></input>
          </div>

          <div className={styles.contentFormPrivacy}>
            <Privacy />
          </div>

          <div className={styles.contentFormControl}>
            <button
              className={styles.contentFormControlCancel}
              onClick={handleCancelUpload}
            >
              H???y b???
            </button>
            <button
              className={clsx(styles.contentFormControlPost, {[styles.btnDisable]: video ? false : true})}
              onClick={handleUploadVideo}
            >
              ????ng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;