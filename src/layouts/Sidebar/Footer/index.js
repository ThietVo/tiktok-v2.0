import { FaCopyright } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';


function Footer() {
    return (
        <div className={styles.sidebarFooter}>
            <div className={styles.sidebarFooterList}>
                <Link to="#" className={styles.sidebarFooterLink}>
                    Giới thiệu
                </Link>
                <Link to="#" className={styles.sidebarFooterLink}>
                    Bảng tin
                </Link>
                <Link to="#" className={styles.sidebarFooterLink}>
                    Liên Hệ
                </Link>
                <Link to="#" className={styles.sidebarFooterLink}>
                    Sự Nghiệp
                </Link>
                <Link to="#" className={styles.sidebarFooterLink}>
                    ByteDance
                </Link>
            </div>
            <div className={styles.sidebarFooterList}>
                <Link to="#" className={styles.sidebarFooterLink}>
                    TikTok for Good
                </Link>
                <Link to="#" className={styles.sidebarFooterLink}>
                    Quảng cáo
                </Link>
                <Link to="#" className={styles.sidebarFooterLink}>
                    Developers
                </Link>
                <Link to="#" className={styles.sidebarFooterLink}>
                    Transparency
                </Link>
                <Link to="#" className={styles.sidebarFooterLink}>
                    TikTok Rewards
                </Link>
            </div>
            <div className={styles.sidebarFooterList}>
                <Link to="#" className={styles.sidebarFooterLink}>
                    Trợ giúp
                </Link>
                <Link to="#" className={styles.sidebarFooterLink}>
                    An toàn
                </Link>
                <Link to="#" className={styles.sidebarFooterLink}>
                    Điều khoản
                </Link>
                <Link to="#" className={styles.sidebarFooterLink}>
                    Quyền riêng tư
                </Link>
                <Link to="#" className={styles.sidebarFooterLink}>
                    Creator Portal
                </Link>
                <Link to="#" className={styles.sidebarFooterLink}>
                    Hướng dẫn Cộng Đồng
                </Link>
            </div>

            <div className={styles.sidebarFooterMore}>
                <span className={styles.sidebarFooterMoreText}>Thêm</span>
                <div className={styles.sidebarFooterMoreRule}>
                    <Link to="#" className={styles.sidebarFooterMoreRuleLink}>
                        NGUYÊN TẮC THỰC THI PHÁP LUẬT CỦA TIKTOK
                    </Link>
                </div>
            </div>

            <span className={styles.sidebarFooterCopyRight}>
                <FaCopyright />
                2022 TikTok
            </span>
        </div>
    )
}

export default Footer;