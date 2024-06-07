// TeardropButton.tsx
import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

interface TeardropButtonProps {
  title: string;
  onPress?: () => void;
}

const TeardropButtonContainer = styled(TouchableOpacity)`
  background-color: #6200ea;
  width: 70px;
  height: 90px;
  border-radius: 50px 55px 50px 55px;
  position: relative;
  align-items: center;
  justify-content: center;
`;

const TeardropButtonText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const TeardropButtonShape = styled.View`
  position: absolute;
  bottom: -10px;
  width: 0;
  height: 0;
  border-left-width: 29px;
  border-left-color: transparent;
  border-right-width: 29px;
  border-right-color: transparent;
  border-top-width: 25px;
  border-top-color: #6200ea;
`;

const TeardropButton: React.FC<TeardropButtonProps> = ({ title, onPress }) => {
  return (
    <TeardropButtonContainer onPress={onPress}>
      <TeardropButtonText>{title}</TeardropButtonText>
      <TeardropButtonShape />
    </TeardropButtonContainer>
  );
};

export default TeardropButton;
