import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { io } from 'socket.io-client';
import moment from 'moment';
import getEnvVars from '../../../environment';

const TimeDisplay = () => {
  const { apiUrl } = getEnvVars();
  const [response, setResponse] = useState<Date | null>(null);

  useEffect(() => {
    const socket = io(apiUrl);
    socket.on('FromAPI', (data: Date) => {
      setResponse(data);
    });
    return () => { socket.disconnect(); };
  }, []);

  if (!response) {
    return null;
  }
  return (
    <View>
      <Text>
        {`its ${moment(response).format('MMMM Do YYYY, h:mm:ss a')}`}
      </Text>
    </View>
  );
};

export default TimeDisplay;
