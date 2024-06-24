import React, { ReactNode } from 'react';
import Showcase from '../../page/Showcase';

interface WrapperProps {
    children: ReactNode;
    includeShowcase?: boolean;
}

const Wrapper: React.FC<WrapperProps> = ({ 
    children,
    includeShowcase = true
}) => {
    return <div>
        {includeShowcase && 
            <Showcase />
        }
        {children}
    </div>;
}
export default Wrapper;