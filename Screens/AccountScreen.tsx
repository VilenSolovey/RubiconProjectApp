import React from 'react';
import { View, Button } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; // Переконайтесь, що шлях правильний

type Props = StackScreenProps<RootStackParamList, 'Account'>; // Використовуйте 'Account' тут

const AccountScreen = ({ navigation }: Props) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
};

export default AccountScreen;
