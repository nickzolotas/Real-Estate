import React, { useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMagnifyingGlass, faPlus, faHeart, faCircleUser } from '@fortawesome/free-solid-svg-icons';

import "./style/ComponentStyle.css"

const AddIcon = ({ onClick }) => {
  
  return (
    <div className="button" onClick={onClick}>
        {/* <FontAwesomeIcon icon={faPlus} className='btn'/> */}
    </div>
  );
};

export default HomeIcon;