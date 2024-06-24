import React, { ReactNode } from 'react';
import classnames from 'classnames/bind';

import styles from './container.module.scss';

const cx = classnames.bind(styles);

interface ContainerProps {
    children: ReactNode;
    type? : string;
}

const Container: React.FC<ContainerProps> = ({ 
    children, 
    type 
}) => {
    let containerClasses = cx({
        container : true,
        content : type === 'content',
        break : type === 'break'
    });
    return <div className={containerClasses}>{children}</div>;
}
export default Container;