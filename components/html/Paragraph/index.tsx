import React, { ReactNode } from 'react';
import classnames from 'classnames/bind';

import styles from './paragraph.module.scss';

const cx = classnames.bind(styles);


interface ParagraphProps {
    children: ReactNode;
    type?: string;
}

const Paragraph: React.FC<ParagraphProps> = ({ children, type }) => {
    let paragraphClasses = cx({
        paragraph: true,
        intro : type === 'intro',
        caption: type === 'caption',
    });
    return <p className={paragraphClasses}>{children}</p>;
}
export default Paragraph;