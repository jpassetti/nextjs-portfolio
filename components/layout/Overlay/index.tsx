import React, { ReactNode } from 'react';
import styles from './overlay.module.scss';

interface OverlayProps {
  children: ReactNode;
}

const Overlay: React.FC<OverlayProps> = ({ children }) => {
  return (
    <div className={styles.overlay}>
      {children}
    </div>
  );
}

export default Overlay;
