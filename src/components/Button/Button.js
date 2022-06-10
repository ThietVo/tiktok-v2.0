import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Button.module.scss';

function Button({
    to,
    href,
    primary = false,
    outline = false,
    text = false,
    rounded = false,
    disabled = false,
    small = false,
    large = false,
    children,
    className,
    leftIcon,
    rightIcon,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    // Remove event listener when btn is disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = clsx(
        styles.wrapper,
        primary && styles.primary,
        outline && styles.outline,
        text && styles.text,
        disabled && styles.disabled,
        rounded && styles.rounded,
        small && styles.small,
        large && styles.large,
        {
            [className]: className,
        },
    );
    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
            <span className={styles.title}>{children}</span>
            {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
