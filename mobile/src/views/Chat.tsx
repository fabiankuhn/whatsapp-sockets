import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { io, Socket } from 'socket.io-client';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import getEnvVars from '../../environment';
import { Message } from '../shared/models/Message';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#F5F6F7',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#E9E8E0',
  },
  chatWindow: {
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  message: {
    marginVertical: 5,
    maxWidth: '90%',
    padding: 10,
    borderRadius: 5,
  },
  root: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: 'flex-end',
  },
  input: {
    backgroundColor: 'white',
    borderColor: '#CFD0D1',
    borderWidth: 1,
    borderRadius: 15,
    flex: 1,
    marginBottom: 10,
    marginRight: 10,
    paddingTop: 6,
    paddingBottom: 6,
    paddingHorizontal: 10,
    fontFamily: 'Helvetica Neue',
    fontSize: 17,

  },

});

const Chat = () => {
  // eslint-disable-next-line max-len
  const test = new Array(5).fill({ message: 'teslneuirgh eirguh peiurg peu eleg uerogij peorug peo urghhst' }); // TODO delete
  const { apiUrl } = getEnvVars();
  const socket = useRef<Socket>();
  const [newMessage, setNewMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>(test);

  useEffect(() => {
    socket.current = io(apiUrl);
    socket.current.on('chat message', (message: string) => {
      setMessages((prevState) => [
        { isReceived: true, message },
        ...prevState,
      ]);
    });
    return () => { socket.current?.disconnect(); };
  }, []);

  const sendMessageHandler = (message: string) => {
    if (!message) {
      return;
    }
    socket.current?.emit('chat message', newMessage);
    setMessages((prevState) => [
      { isReceived: false, message: newMessage },
      ...prevState,
    ]);
    setNewMessage('');
  };

  return (
    <View style={styles.container}>

      <View style={styles.chatContainer}>
        <FlatList
          inverted
          contentContainerStyle={styles.chatWindow}
          data={messages}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={{
              ...styles.message,
              alignSelf: item.isReceived ? 'flex-start' : 'flex-end',
              backgroundColor: item.isReceived ? '#F5F6F7' : '#DAF8C5',
            }}
            >
              <Text>
                <Text style={{ fontFamily: 'Helvetica Neue', fontSize: 17 }}>
                  {item.message}
                </Text>
              </Text>
            </View>

          )}
        />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.root}>
          <TextInput
            multiline
            style={styles.input}
            onChangeText={(text) => setNewMessage(text)}
            value={newMessage}
          />
          <TouchableWithoutFeedback onPress={() => sendMessageHandler(newMessage)}>
            <MaterialCommunityIcons name="send-circle" size={40} color="#007AFF" style={{ marginBottom: 8 }} />
          </TouchableWithoutFeedback>

        </View>
      </KeyboardAvoidingView>

    </View>
  );
};

export default Chat;
