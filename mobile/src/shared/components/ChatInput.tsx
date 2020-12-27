import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet, Text, TextInput, View,
} from 'react-native';
import { io, Socket } from 'socket.io-client';
import getEnvVars from '../../../environment';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    margin: 20,
    width: 100,
  },
});

const ChatInput = () => {
  const [chatMessage, setChatMessage] = useState<string>('');
  const { apiUrl } = getEnvVars();
  const socket = useRef<Socket>();

  useEffect(() => {
    socket.current = io(apiUrl);
    socket.current.on('chat message', (message: string) => {
      setChatMessage(message);
    });
    return () => { socket.current?.disconnect(); };
  }, []);

  const inputHandler = (text: string) => {
    socket.current?.emit('chat message', text);
  };

  return (
    <View>
      <Text>{chatMessage}</Text>
      <View style={styles.container}>
        <TextInput onChangeText={(text) => inputHandler(text)} style={styles.input} />
        {/* <Button title="send" onPress={() => null} /> */}
      </View>
    </View>
  );
};

export default ChatInput;
