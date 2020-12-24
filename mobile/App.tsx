/* eslint-disable react/style-prop-object */
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import TimeDisplay from './src/shared/components/TimeDisplay';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App() {
  const [isTimeVisible, setIsTimeVisible] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Button
        title="View Time"
        onPress={() => setIsTimeVisible((prevState) => !prevState)}
      />
      {isTimeVisible && <TimeDisplay /> }
    </View>
  );
}
