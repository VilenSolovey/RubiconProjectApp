import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

const ProfileSection: React.FC = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <FeatherIcon name="user" size={24} color="#000" />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>e-mail</Text>
      </View>
      <FeatherIcon name="chevron-right" size={24} color="#C6C6C6" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
});

export default ProfileSection;
