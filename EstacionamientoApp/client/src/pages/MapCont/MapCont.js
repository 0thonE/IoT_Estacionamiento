import React, { useContext, useState, useEffect /* useCallback */ } from 'react';


import { AuthContext } from "../../state/useAuth";
import app from "../../state/base";
import { useCollectionData } from 'react-firebase-hooks/firestore';


import { Grid, Row, Column, Button, Dropdown } from 'carbon-components-react';
import { Content } from 'carbon-components-react/es/components/UIShell';


const firestore = app.firestore();



// let baseSpots = [
//   { id: 'C24-1', x: 40, y: 30, parkingState: 'empty', user: null },
//   { id: 'C24-2', x: 116, y: 30, parkingState: 'empty', user: null },
//   { id: 'C24-3', x: 193, y: 30, parkingState: 'empty', user: null },
//   { id: 'C24-4', x: 270, y: 30, parkingState: 'empty', user: null },
//   { id: 'C24-5', x: 347, y: 30, parkingState: 'empty', user: null },
// ];
let users = [
  {
    id: '131 20 173 12',
    email: "psanchez@iop.com",
    nombre: "Pedro Sánchez",
    placas: "JNL-FH0-65",
    special: true,
    color:'#29297D'
  },
  {
    id: '199 18 243 14',
    email: "jescal@iop.com",
    nombre: "Juan Escalante",
    placas: "JML-KPZ-05",
    special: false,
    color:'#2fbb3b'
  },
  {
    id: '244 186 238 89',
    email: "aimer@iop.com",
    nombre: "Aime Rodríguez",
    placas: "JML-SHP-37",
    special: false,
    color:'#da3aa4'
  },
];

const ParkingSpace = ({ parkingID, x = 40, y = 30, pState = 'empty', children, ...props }) => {
  const [currentUser, setUser] = useState(props.user);


  const assignHandler = async (e) => {
    e.preventDefault();
    await props.updateParking(parkingID, { user: currentUser, state: 'assigned' })
  }
  const useHandler = async (e) => {
    e.preventDefault();
    await props.updateParking(parkingID, { state: 'in_use' })
  }
  const emptyHandler = async (e) => {
    e.preventDefault();
    await props.updateParking(parkingID, { user: null, state: 'empty' })
    setUser(null)
  }



  return (

    <div className="user-selector" >
      <Dropdown
        style={{ zIndex: 10 }}
        id="inline"
        items={users}
        selectedItem={currentUser || props.user}
        itemToString={(item) => (item ? item.nombre : '')}
        onChange={({ selectedItem }) => {
          setUser(selectedItem)
        }}
      /><br />
      <Button
        disabled={pState === 'assigned'}
        onClick={assignHandler}>
        Assign
      </Button><br />
      <Button
        disabled={pState === 'in_use'}
        onClick={useHandler}>
        Use
      </Button><br />
      <Button
        onClick={emptyHandler}>
        Empty
      </Button><br />
    </div>
  )


}

const MapCont = () => {
  const { currentUser } = useContext(AuthContext);

  let email = currentUser?.multiFactor?.user?.email || '';

  let view = 'user';
  if (email?.includes('admin')) {
    view = 'admin';
  }
  if (email?.includes('stand')) {
    view = 'stand';
  }

  const parkingRef = firestore.collection('parkins');
  const [parkins] = useCollectionData(parkingRef, { idField: 'id' });

  const updateParking = async (id, update) => {
    await parkingRef.doc(id).update(update)

  }

  console.log(`parkingRef`, parkingRef)
  console.log(`parkins`, parkins)

  return (
    <Content>
      <Grid>
        <Row>
          {parkins && parkins.map((e, index) => (
            <Column lg={3}>
              <ParkingSpace x={e.x} y={e.y} parkingID={e.id} pState={e.state} user={e.user} updateParking={updateParking} />
            </Column>
          ))}
        </Row>
      </Grid>
    </Content>
  );
}

export default MapCont;

