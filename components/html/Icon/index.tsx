import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

library.add(faBars, faTimes);

const Icon = ({ icon }) => {
    return <FontAwesomeIcon icon={icon} />
}

export default Icon;

