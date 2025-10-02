import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Banner } from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';

export default function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOffline(!state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Banner
      visible={isOffline}
      style={styles.banner}
      icon="wifi-off">
      Offline Mode - Use saved tips and codes
    </Banner>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#FEF3C7',
  },
});