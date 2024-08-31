import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type Props = {
  message: string;
};

export function ListEmpty({message}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    textAlign: 'center',
    fontSize: 14,
    color: '#B0B0B0',
  },
});
