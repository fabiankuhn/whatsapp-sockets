import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { io } from 'socket.io-client';
import moment from 'moment';
import getEnvVars from '../../../environment';

const TimeDisplay = () => {
  const { apiUrl } = getEnvVars();
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    const socket = io(apiUrl);
    socket.on('dateTime', (dateResponse: Date) => {
      setDate(dateResponse);
    });
    return () => { socket.disconnect(); };
  }, []);

  if (!date) {
    return null;
  }
  return (
    <View>
      <Text>
        {`it's the ${moment(date).format('DD. MMMM YYYY, HH:mm:ss:SS')}`}
      </Text>
    </View>
  );
};

export default TimeDisplay;
