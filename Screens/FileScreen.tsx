import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  Files: undefined;
};

const FilesScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Files Screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FilesScreen;
