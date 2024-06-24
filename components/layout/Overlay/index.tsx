import styles from './overlay.module.scss';

const Overlay = ({ children }) => {
    return (
        <div className={styles.overlay}>
            {children}
        </div>
    );
}

export default Overlay;
