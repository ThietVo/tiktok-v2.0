import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { BsCoin, BsChevronRight, BsCheck } from 'react-icons/bs';
import Avatar from '~/components/Avatar';
import layoutSlice from '~/redux/layoutSlice';
import { usersSelector } from '~/redux/selectors';
import styles from './Coin.module.scss';
import Button from '~/components/Button';
import CoinItem from './CoinItem';
import { convertNumToThreeDigits } from '~/assets/jsFunc';

const coinList = [
    {
        numCoin: 70,
        price: 19100,
    },
    {
        numCoin: 350,
        price: 95500,
    },
    {
        numCoin: 700,
        price: 191000,
    },
    {
        numCoin: 1400,
        price: 382000,
    },
    {
        numCoin: 3500,
        price: 955000,
    },
    {
        numCoin: 7000,
        price: 1910000,
    },
    {
        numCoin: 17500,
        price: 4775000,
    },
];

function Coin() {
    const dispatch = useDispatch();
    const { userLogged } = useSelector(usersSelector);
    const [total, setTotal] = useState(0);
    const [active, setActive] = useState();
    const [custom, setCustom] = useState(false);
    const [customValue, setCustomValue] = useState(0);

    useEffect(() => {
        dispatch(layoutSlice.actions.setHasClassContainer(true));
    }, []);

    const handleClick = (item, index) => {
        setActive(index);
        setTotal(item.price);
        setCustom(false);
    };

    const handleCustom = () => {
        if(!custom){
            setCustom(true);
            setTotal(customValue*272);
            setActive(true);
        }
    };

    const handleChange = (e) => {
        setCustomValue(e.target.value);
        setTotal(e.target.value*272);
    }

    return (
        <div className={styles.coinPage}>
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
                        {coinList.map((item, index) => {
                            return (
                                <CoinItem
                                    key={index}
                                    item={item}
                                    index={index}
                                    onClick={() => handleClick(item, index)}
                                    isActive={active === index ? true : false}
                                />
                            );
                        })}
                        <div
                            className={clsx(styles.coinItem, { [styles.coinItemActive]: custom })}
                            onClick={handleCustom}
                        >
                            <div className={styles.coinItemNum}>
                                <BsCoin className={styles.coinIconLager} />
                                {!custom ? (
                                    <span className={styles.coinItemNumDisplay}>Tùy chỉnh</span>
                                ) : (
                                    <input
                                        type="number"
                                        pattern="[0-9]*"
                                        className={styles.coinItemNumInput}
                                        value={customValue}
                                        maxLength={8}
                                        onChange={handleChange}
                                    />
                                )}
                            </div>
                            <div className={styles.coinItemText}>{!custom ? 'Hỗ trợ số lượng lớn' : `đ ${convertNumToThreeDigits(customValue*272)}`}</div>
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
                    <img
                        src="https://lf16-co.g-p-static.com/obj/pipo-sg/sky/card_american_express_v1_429e0f.svg"
                        alt=""
                    />
                    <img src="https://lf16-co.g-p-static.com/obj/pipo-sgcompliance/sky/2c2p-border_2ec2d6.png" alt="" />
                    <img
                        src="https://lf16-co.g-p-static.com/obj/pipo-sgcompliance/sky/zalopay-icon_e8534b.svg"
                        alt=""
                    />
                </div>
                <div className={styles.total}>
                    <span className={styles.totalText}>Tổng</span>
                    <span className={styles.totalMoney}>₫ {convertNumToThreeDigits(total)}</span>
                </div>
                <Button primary large className={styles.buyBtn}>
                    Mua ngay
                </Button>
            </div>
        </div>
    );
}

export default Coin;
