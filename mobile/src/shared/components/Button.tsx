import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#74E3A7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    justifyContent: 'center',
  },
});

type Props = {
  onPress: () => void
  title: string
}

const Button = ({ onPress, title }: Props) => (
  <TouchableHighlight onPress={onPress} style={styles.button}>
    <Text>{title}</Text>
  </TouchableHighlight>
);

export default Button;
