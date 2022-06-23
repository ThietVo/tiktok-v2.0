import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './Avatar.module.scss';

function Avatar({ urlImg, avatarSmallS, avatarSmall, avatarSmallPlus, avatarMedium, avatarLarge, avatarExtraLarge }) {
    return (
        <>
            <img
                src={urlImg}
                alt=""
                className={clsx({
                    [styles.avatarSmallS]: avatarSmallS,
                    [styles.avatarSmall]: avatarSmall,
                    [styles.avatarSmallPlus]: avatarSmallPlus,
                    [styles.avatarMedium]: avatarMedium,
                    [styles.avatarLarge]: avatarLarge,
                    [styles.avatarExtraLarge]: avatarExtraLarge,
                })}
            />
        </>
    );
}

Avatar.propTypes = {
    urlImg: PropTypes.string,
    avatarSmallS: PropTypes.bool,
    avatarSmall: PropTypes.bool,
    avatarSmallPlus: PropTypes.bool,
    avatarMedium: PropTypes.bool,
    avatarLarge: PropTypes.bool,
    avatarExtraLarge: PropTypes.bool,
};

export default Avatar;
