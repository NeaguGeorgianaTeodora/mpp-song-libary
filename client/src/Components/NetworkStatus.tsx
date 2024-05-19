/*import {useEffect, useState} from 'react';

const NetworkStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [serverReachable, setServerReachable] = useState(true);
  
    useEffect(() => {
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);
  
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
  
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }, []);
  
    const checkServerReachability = async () => {
      try {
        const response = await fetch('http://localhost:3005/playlistLibrary1/');
        console.log(`Server reachable: ${response.status}`);
        setServerReachable(true);
      } catch (error) {
        console.error('Server unreachable:', error);
        setServerReachable(false);
      }
    };

    return (
      <div>
        <p>Network Status: {isOnline ? 'Online' : 'Offline'}</p>
        <button onClick={checkServerReachability}>Check Server Reachability</button>
        {serverReachable ? null : <p>Server is unreachable. Loading alternative content...</p>}
      </div>
    );
}

export default NetworkStatus;*/

import React, { useEffect, useState } from 'react';

const NetworkStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [serverReachable, setServerReachable] = useState(true);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const checkServerReachability = async () => {
        try {
            const response = await fetch('http://localhost:3005/playlistLibrary/');
            console.log(`Server reachable: ${response.status}`);
            setServerReachable(true);
            if (response.status !== 200) {
                setServerReachable(false);
            }
        } catch (error) {
            setServerReachable(false);
            console.error('Server unreachable:', error);
        }
    };

    console.log('Server Reachable:', serverReachable);

    return (
        <div>
            <button onClick={checkServerReachability}>Check Server Reachability</button>
            {!serverReachable && (
                <div>
                    <p>Server is unreachable. Loading alternative content...</p>
                </div>
            )}
        </div>
    );
}

export default NetworkStatus;
