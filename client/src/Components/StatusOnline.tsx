import {Detector} from 'react-detect-offline';
import {AiOutlineGlobal} from 'react-icons/ai';

const StatusOnline = props => {
    return (
        <>
            <Detector
                render={({online}) => (
                    online ? props.children:
                    <div style={{position: "absolute", top: "40%", left:"45%", textAlign:"center"}}>
                            consol.log("offline");
                            <AiOutlineGlobal size={100} color="red" />
                            <h1>Offline</h1>
                    </div>
                )}
            />
        </>
    );
}

export default StatusOnline;