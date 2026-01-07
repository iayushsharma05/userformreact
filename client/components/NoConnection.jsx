import { useEffect, useState } from "react";
import '../src/assets/index.css';


const NoInternetToast = () => {
  const [offline, setOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const goOffline = () => setOffline(true);
    const goOnline = () => setOffline(false);

    window.addEventListener("offline", goOffline);
    window.addEventListener("online", goOnline);

    return () => {
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online", goOnline);
    };
  }, []);

  if (!offline) return null;

  return (
    <div className="no-internet-toast">
      ⚠ No Internet !
    </div>
  );
};

export default NoInternetToast;
