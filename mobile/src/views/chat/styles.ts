// import styled from 'styled-components';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Platform, Text, TextInput, View,
} from 'react-native';
import styled from 'styled-components/native';

const Container = styled(View)`
  flex: 1;
  width: 100%;
  background-color: #F5F6F7;
`;

const ChatContainer = styled(View)`
  flex: 1;
  background-color: #E9E8E0;
  padding: 40px 20px 20px 20px;
`;

type ViewMessageProps = {
  $isForeign: boolean
}

const ChatMessage = styled(View)<ViewMessageProps>`
  margin: 5px 0;
  max-width: 90%;
  padding: 10px;
  border-radius: 5px;
  align-self: ${((props) => (props.$isForeign ? 'flex-start' : 'flex-end'))};
  background-color: ${((props) => (props.$isForeign ? '#F5F6F7' : '#DAF8C5'))};
`;

const MessageText = styled(Text)`
  font-family: ${Platform.select({ ios: 'Helvetica', android: 'Roboto', default: 'inherit' })};
  font-size: 17px;
`;

const InputContainer = styled(View)`
  flex-direction: row;
  margin: 10px 20px;
  align-items: flex-end;
`;

const Input = styled(TextInput)`
  font-family: ${Platform.select({ ios: 'Helvetica', android: 'Roboto', default: 'inherit' })};
  flex: 1;
  background-color: white;
  border-color: #CFD0D1;
  border-width: 1px;
  border-radius: 15px;
  margin-bottom: 10px;
  margin-right: 10px;
  padding: 6px 10px;
  font-size: 17px;
`;

const SendIcon = styled(MaterialCommunityIcons)`
  margin-bottom: 8px;
`;

export {
  Container, ChatContainer, SendIcon, ChatMessage, MessageText, InputContainer, Input,
};
