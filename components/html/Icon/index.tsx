import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library, IconProp } from '@fortawesome/fontawesome-svg-core';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(faBars, faTimes);

interface IconProps {
  icon: IconProp;
}

const Icon: React.FC<IconProps> = ({ icon }) => {
  return <FontAwesomeIcon icon={icon} />;
};

export default Icon;
