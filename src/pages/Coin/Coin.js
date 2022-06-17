import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsCoin, BsChevronRight, BsCheck } from 'react-icons/bs';
import Avatar from '~/components/Avatar';
import layoutSlice from '~/redux/layoutSlice';
import { usersSelector } from '~/redux/selectors';
import styles from './Coin.module.scss';
import Button from '~/components/Button';

function Coin() {
    const dispatch = useDispatch();
    const { userLogged } = useSelector(usersSelector);

    useEffect(() => {
        dispatch(layoutSlice.actions.setHasClassContainer(true));
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h3>Nhận xu</h3>
                <h4>Xem lịch sử giao dịch</h4>
            </div>
            <div className={styles.profile}>
                <Avatar urlImg={userLogged.avatar} avatarSmallPlus />
                <div className={styles.name}>
                    <p className={styles.nameInfo}>{userLogged.tiktokid}</p>
                    <div className={styles.coinInfo}>
                        <BsCoin className={styles.coinIconMedium} />
                        <span>0</span>
                    </div>
                </div>
                <div className={styles.exchange}>
                    <div className={styles.exchangeTitle}>
                        <p className={styles.exchangeTitleText}>
                            Từ quà tặng LIVE: $0.00 (<BsCoin className={styles.coinIconSmall} />
                            0)
                        </p>
                    </div>
                    <div className={styles.exchangeSubTitle}>
                        <p className={styles.exchangeSubTitleText}>Quy đổi thu nhập thành điểm</p>
                        <BsChevronRight className={styles.exchangeSubTitleIcon} />
                    </div>
                </div>
            </div>
            <div className={styles.subHeader}>Mua điểm</div>
            <div className={styles.buyCoin}>
                <div className={styles.offer}>
                    <h2 className={styles.offerTitle}>Hưởng ưu đãi độc quyền trên web này!</h2>
                    <ul className={styles.offerList}>
                        <li className={styles.offerListItem}>
                            <div className={styles.offerListItemIcon}>
                                <BsCheck />
                            </div>
                            <span className={styles.offerListItemText}>Không có phí dịch vụ trong ứng dụng</span>
                        </li>
                        <li className={styles.offerListItem}>
                            <div className={styles.offerListItemIcon}>
                                <BsCheck />
                            </div>

                            <span className={styles.offerListItemText}>Số tiền tùy chỉnh</span>
                        </li>
                        <li className={styles.offerListItem}>
                            <div className={styles.offerListItemIcon}>
                                <BsCheck />
                            </div>
                            <span className={styles.offerListItemText}>Thêm nhiều phương thức thanh toán</span>
                        </li>
                    </ul>
                </div>
                <div className={styles.coinList}>
                    <div className={styles.coinListItem}>
                        <div className={styles.coinListItemNum}>
                            <BsCoin className={styles.coinIconLager} />
                            <span className={styles.coinListItemNumDisplay}>70</span>
                        </div>
                        <div className={styles.coinListItemText}>đ 19,100</div>
                    </div>
                    <div className={styles.coinListItem}>
                        <div className={styles.coinListItemNum}>
                            <BsCoin className={styles.coinIconLager} />
                            <span className={styles.coinListItemNumDisplay}>70</span>
                        </div>
                        <div className={styles.coinListItemText}>đ 19,100</div>
                    </div>
                    <div className={styles.coinListItem}>
                        <div className={styles.coinListItemNum}>
                            <BsCoin className={styles.coinIconLager} />
                            <span className={styles.coinListItemNumDisplay}>70</span>
                        </div>
                        <div className={styles.coinListItemText}>đ 19,100</div>
                    </div>
                    <div className={styles.coinListItem}>
                        <div className={styles.coinListItemNum}>
                            <BsCoin className={styles.coinIconLager} />
                            <span className={styles.coinListItemNumDisplay}>70</span>
                        </div>
                        <div className={styles.coinListItemText}>đ 19,100</div>
                    </div>
                    <div className={styles.coinListItem}>
                        <div className={styles.coinListItemNum}>
                            <BsCoin className={styles.coinIconLager} />
                            <span className={styles.coinListItemNumDisplay}>70</span>
                        </div>
                        <div className={styles.coinListItemText}>đ 19,100</div>
                    </div>
                    <div className={styles.coinListItem}>
                        <div className={styles.coinListItemNum}>
                            <BsCoin className={styles.coinIconLager} />
                            <span className={styles.coinListItemNumDisplay}>70</span>
                        </div>
                        <div className={styles.coinListItemText}>đ 19,100</div>
                    </div>
                    <div className={styles.coinListItem}>
                        <div className={styles.coinListItemNum}>
                            <BsCoin className={styles.coinIconLager} />
                            <span className={styles.coinListItemNumDisplay}>70</span>
                        </div>
                        <div className={styles.coinListItemText}>đ 19,100</div>
                    </div>
                    <div className={styles.coinListItem}>
                        <div className={styles.coinListItemNum}>
                            <BsCoin className={styles.coinIconLager} />
                            <span className={styles.coinListItemNumDisplay}>70</span>
                        </div>
                        <div className={styles.coinListItemText}>đ 19,100</div>
                    </div>
                </div>
            </div>
            <div className={styles.paymentMethods}>
                <span className={styles.paymentMethodsText}>Phương thức thanh toán</span>
                <img src="https://lf16-co.g-p-static.com/obj/pipo-sgcompliance/sky/visa_light_c558fb.svg" alt="" />
                <img
                    src="https://lf16-co.g-p-static.com/obj/pipo-sgcompliance/sky/mastercard_light_0883be.svg"
                    alt=""
                />
                <img src="https://lf16-co.g-p-static.com/obj/pipo-sg/sky/maestro_188b29.svg" alt="" />
                <img src="https://lf16-co.g-p-static.com/obj/pipo-sg/sky/diners_a3de24.svg" alt="" />
                <img src="https://lf16-co.g-p-static.com/obj/pipo-sg/sky/discover_5ec158.svg" alt="" />
                <img src="https://lf16-co.g-p-static.com/obj/pipo-sg/sky/card_american_express_v1_429e0f.svg" alt="" />
                <img src="https://lf16-co.g-p-static.com/obj/pipo-sgcompliance/sky/2c2p-border_2ec2d6.png" alt="" />
                <img src="https://lf16-co.g-p-static.com/obj/pipo-sgcompliance/sky/zalopay-icon_e8534b.svg" alt="" />
            </div>
            <div className={styles.total}>
                <span className={styles.totalText}>Tổng</span>
                <span className={styles.totalMoney}>₫ 19,100</span>
            </div>
            <Button primary large className={styles.buyBtn}>
                Mua ngay
            </Button>
        </div>
    );
}

export default Coin;
