import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BiUser } from 'react-icons/bi';
import { AiOutlineLock } from 'react-icons/ai';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { BsChevronRight } from 'react-icons/bs';
import layoutSlice from '~/redux/layoutSlice';
import styles from './Settings.module.scss';
import Button from '~/components/Button';

function Settings() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(layoutSlice.actions.setHasClassContainer(true));
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapperSidebar}>
                <div className={styles.sidebar}>
                    <div className={styles.nav}>
                        <div className={styles.navItem}>
                            <BiUser className={styles.navItemIcon} />
                            <p className={styles.navItemText}>Quản lý tài khoản</p>
                        </div>
                        <div className={styles.navItem}>
                            <AiOutlineLock className={styles.navItemIcon} />
                            <p className={styles.navItemText}>Quyền riêng tư </p>
                        </div>
                        <div className={styles.navItem}>
                            <IoMdNotificationsOutline className={styles.navItemIcon} />
                            <p className={styles.navItemText}>Thông báo đẩy</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.contentItem}>
                    <div className={styles.header}>Quản lý tài khoản</div>
                    <div className={styles.subItem}>
                        <div className={styles.title}>Kiểm soát tài khoản</div>
                        <div className={styles.subTitle}>
                            <span>Xóa Tài khoản</span>
                            <div className={styles.subTitleRight}>Xóa</div>
                        </div>
                    </div>
                </div>
                <div className={styles.contentItem}>
                    <div className={styles.header}>Quyền riêng tư</div>
                    <div className={styles.subItem}>
                        <div className={styles.title}>Khám phá</div>
                        <div className={styles.subTitle}>
                            <span>Tài khoản riêng tư</span>
                            <label className={styles.switchBtn}>
                                <input type="checkbox" className={styles.switchBtnInput} />
                                <span className={styles.switchBtnSlider}></span>
                            </label>
                        </div>
                        <div className={styles.desc}>
                            Với tài khoản riêng tư, chỉ những người dùng được bạn phê duyệt mới có thể follow bạn và xem
                            các video của bạn. Những người follow hiện tại sẽ không bị ảnh hưởng.
                        </div>
                    </div>

                    <div className={styles.subItem}>
                        <div className={styles.subTitle}>
                            <span>Tài khoản bị chặn</span>
                        </div>
                        <BsChevronRight className={styles.subItemIcon} />
                    </div>

                    <div className={styles.subItem}>
                        <div className={styles.title}>Dữ liệu</div>
                        <div className={styles.subTitle}>Tải dữ liệu của bạn về</div>
                        <div className={styles.desc}>Lấy bản sao dữ liệu Tiktok cá nhân</div>
                        <BsChevronRight className={styles.subItemIcon} />
                    </div>
                </div>
                <div className={styles.contentItem}>
                    <div className={styles.header}>Thông báo đẩy</div>
                    <div className={styles.subItem}>
                        <div className={styles.title}>Thông báo trên máy tính để bàn</div>
                        <div className={styles.subTitle}>
                            <span>Cho phép trong trình duyệt</span>
                            <label className={styles.switchBtn}>
                                <input type="checkbox" className={styles.switchBtnInput} />
                                <span className={styles.switchBtnSlider}></span>
                            </label>
                        </div>
                        <div className={styles.desc}>
                            Luôn cập nhật các thông báo về lượt thích, bình luận, video mới nhất và nhiều điều khác trên
                            máy tính. Bạn có thể tắt thông báo bất cứ lúc nào.
                        </div>
                    </div>

                    <div className={styles.subItem}>
                        <div className={styles.title}>Tùy chọn của bạn</div>
                        <div className={styles.desc}>Tùy chọn của bạn sẽ được tự động đồng bộ với ứng dụng TikTok.</div>
                    </div>

                    <div className={styles.subItem}>
                        <div className={styles.subTitle}>Tương tác</div>
                        <div className={styles.desc}>Lượt thích, bình luận, follower mới, lượt nhắc đến</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
