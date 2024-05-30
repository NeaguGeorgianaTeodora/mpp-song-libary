import Axios from 'axios';
import { AuthContext } from '../App.tsx';
import {useContext} from 'react';

const useRefreshToken = () => {

    const auth = useContext(AuthContext);

    const refresh = async() => {
        console.log("Access token from Context, refresh-page: ", auth.auth.RefreshToken)
        try{
            const response = await Axios.get('http://localhost:3005/refresh', {
                withCredentials: true // allows the server to set the cookie in the browser 
            });
            
            auth?.setAuth(prev =>{
                console.log('Previous Auth:', JSON.stringify(prev));
                console.log('Refresh Token:', response.data.accessToken);

                return{...prev, accsessToken: response.data.accessToken}
            });
            return response.data.accessToken; // so we can use it with the request that failed with the expired token
        }catch(err){
            console.log('Error in Refresh Token:', err);
        }
    }
    return refresh;
}

export default useRefreshToken;