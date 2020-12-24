import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { io } from 'socket.io-client';

const TimeDisplay = () => {
  const ENDPOINT = 'http://127.0.0.1:4001';

  const [response, setResponse] = useState('');

  useEffect(() => {
    const socket = io(ENDPOINT);
    socket.on('FromAPI', (data: any) => {
      setResponse(data);
    });
    return () => { socket.disconnect(); };
  }, []);

  return (
    <View>
      <Text>
        Its
        {response}
      </Text>
    </View>
  );
};

export default TimeDisplay;
