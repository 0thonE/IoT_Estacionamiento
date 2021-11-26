import React, { useContext } from 'react';

import ParkingLot from '../../components/ParkingLot';
import { AuthContext } from "../../state/useAuth";
import app from "../../state/base";
import { useCollectionData } from 'react-firebase-hooks/firestore';

const firestore = app.firestore();

const Map = () => {
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
    const query = parkingRef.limit(25);
    const [parkins] = useCollectionData(query, { idField: 'id' });

    console.log(`parkingRef`, parkingRef)
    console.log(`query`, query)
    console.log(`parkins`, parkins)

    return (<div className="map-root">
        <div className="map">
            <ParkingLot parking_view={view} parkingSpots={parkins}/>
        </div>
    </div>);
}

export default Map;

