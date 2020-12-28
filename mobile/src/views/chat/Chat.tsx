import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList, KeyboardAvoidingView, Platform, Text, TouchableWithoutFeedback,
} from 'react-native';
import { io, Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import getEnvVars from '../../../environment';
import {
  ChatContainer, ChatMessage, Container, Input, InputContainer, MessageText, SendIcon,
} from './styles';
import { Message, MessageDto } from '../../shared/models/Message';
import 'react-native-get-random-values';

const Chat = () => {
  // eslint-disable-next-line max-len
  // const test = new Array(5).fill({ text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.', isForeign: true }); // TODO create debugger profile
  const { apiUrl } = getEnvVars();
  const socket = useRef<Socket>();
  const [newMessageText, setNewMessageText] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.current = io(apiUrl);
    socket.current.on('chat message', (message: MessageDto) => {
      setMessages((prevState) => [
        { ...message, isForeign: true },
        ...prevState,
      ]);
    });
    return () => { socket.current?.disconnect(); };
  }, []);

  const sendMessageHandler = () => {
    if (!newMessageText) {
      return;
    }

    const message: MessageDto = {
      id: uuidv4(),
      text: newMessageText,
    };

    socket.current?.emit('chat message', message);
    setMessages((prevState) => [
      { ...message, isForeign: false },
      ...prevState,
    ]);
    setNewMessageText('');
  };

  return (
    <Container>

      <ChatContainer>
        <FlatList
          inverted
          data={messages}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChatMessage $isForeign={item.isForeign}>
              <Text>
                <MessageText>
                  {item.text}
                </MessageText>
              </Text>
            </ChatMessage>

          )}
        />
      </ChatContainer>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <InputContainer>
          <Input
            multiline
            onChangeText={(text) => setNewMessageText(text)}
            value={newMessageText}
          />
          <TouchableWithoutFeedback onPress={() => sendMessageHandler()}>
            <SendIcon name="send-circle" size={40} color="#007AFF" />
          </TouchableWithoutFeedback>

        </InputContainer>
      </KeyboardAvoidingView>

    </Container>
  );
};

export default Chat;
