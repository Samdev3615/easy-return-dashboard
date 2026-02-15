import { useState, useEffect } from 'react';
import devlogData from '../data/devlog.json';

const STORAGE_KEY = 'easy-return-last-seen-update';
const CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes

export function useUpdateChecker() {
  const [hasUpdate, setHasUpdate] = useState(false);
  const currentUpdate = devlogData.lastUpdate;

  const checkForUpdates = () => {
    const lastSeenUpdate = localStorage.getItem(STORAGE_KEY);

    if (!lastSeenUpdate) {
      // First visit
      localStorage.setItem(STORAGE_KEY, currentUpdate);
      return;
    }

    if (lastSeenUpdate !== currentUpdate) {
      setHasUpdate(true);
    }
  };

  const markAsRead = () => {
    localStorage.setItem(STORAGE_KEY, currentUpdate);
    setHasUpdate(false);
  };

  const refresh = () => {
    markAsRead();
    window.location.reload();
  };

  useEffect(() => {
    // Check on mount
    checkForUpdates();

    // Check periodically
    const interval = setInterval(checkForUpdates, CHECK_INTERVAL);

    // Check when tab becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkForUpdates();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return {
    hasUpdate,
    refresh,
    dismissUpdate: markAsRead,
  };
}
