import Axios  from 'axios';
import {useEffect, useState} from 'react';

const NetworkStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
  
    useEffect(() => {
      const handleOnline = () => {
        setIsOnline(true);

        const failedItems = JSON.parse(localStorage.getItem('failedItems') || '');
        if(failedItems.length) {
          console.log("Calling api")
          const api = `http://localhost:3005/playlistLibrary/sync`;
          Axios.post(api, {items: failedItems})
          localStorage.setItem('failedItems', JSON.stringify([]))
        }

      };
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
        const response = await fetch('http://example.com');
        console.log(`Server reachable: ${response.status}`);
      } catch (error) {
        console.error('Server unreachable:', error);
      }
    };

    return (
      <div>
        <p>Network Status: {isOnline ? 'Online' : 'Offline'}</p>
        <button onClick={checkServerReachability}>Check Server Reachability</button>
      </div>
    );
}

export default NetworkStatus;