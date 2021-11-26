import React/* , { useState } */ from 'react';

import Car from "../Car";
import DisabledIcon from "../../assets/svgComponents/DisabledIcon";
const Usermodal = ({ open, user, setClose = () => null }) => {

  // const [open, setOpen] = useState(open)

  if (!open) return null;

  return (
    <div className="modal-base" onClick={setClose} >
      <div className="modal-container" onClick={(event) => event.stopPropagation()}>
        <a href='' className="close-button" onClick={setClose} >x</a>
        <h4 className="modal-title">{user?.nombre || 'Nombre Usuario'}</h4>
        <hr />
        <div className="modal-info">

          <div className='car-container'>  <Car car_color={user?.color || '#41dde1'} /></div>

          <div className='user-info'>
            <h5 className='placas'>{user?.placas || 'PLA-C4S-73'}</h5>
            {user?.special ?
              <DisabledIcon className='disabled' /> : null
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Usermodal;
