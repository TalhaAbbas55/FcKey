import React, {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import {Text, TouchableOpacity, View} from 'react-native';

function App(): React.JSX.Element {
  const [fcmValue, setFcmValue] = useState('');

  // Initialize Firebase
  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  }, []);

  // Function to retrieve the device token
  const getDeviceToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log('Device Token:', token);
      setFcmValue(token);
    } catch (error) {
      console.error('Error getting device token:', error);
    }
  };

  useEffect(() => {
    // Call the function to retrieve the device token
    getDeviceToken();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center'}}>
      <TouchableOpacity
        style={{padding: 10, backgroundColor: 'black', marginBottom: 30}}
        onPress={getDeviceToken}>
        <Text style={{color: 'white', textAlign: 'center'}}>Get FCM</Text>
      </TouchableOpacity>
      <Text style={{color: 'black', textAlign: 'center', fontSize: 26}}>
        {' '}
        {fcmValue ? fcmValue : 'FCM Token will appear here'}
      </Text>
    </View>
  );
}

export default App;
