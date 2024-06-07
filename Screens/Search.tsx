import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import styles from '../Styles/HomeStyle'; // Ваші стилі
import Icon from 'react-native-vector-icons/FontAwesome';

interface SearchSectionProps {
  onSearch: (start: string, end: string, type: string) => void;
  onClose: () => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onSearch, onClose }) => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [transportType, setTransportType] = useState('wheelchair');

  return (
    <View style={styles.searchSectionContainer}>
      <TextInput
        style={styles.input}
        placeholder="Your location"
        value={startLocation}
        onChangeText={setStartLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Destination"
        value={endLocation}
        onChangeText={setEndLocation}
      />
      <View style={styles.transportButtons}>
        <TouchableOpacity style={styles.transportButton} onPress={() => setTransportType('wheelchair')}>
          <Icon name="wheelchair" size={20} color={transportType === 'wheelchair' ? '#000' : '#ccc'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.transportButton} onPress={() => setTransportType('bike')}>
          <Icon name="bicycle" size={20} color={transportType === 'bike' ? '#000' : '#ccc'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.transportButton} onPress={() => setTransportType('car')}>
          <Icon name="car" size={20} color={transportType === 'car' ? '#000' : '#ccc'} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.goButton} onPress={() => onSearch(startLocation, endLocation, transportType)}>
        <Text style={styles.buttonText}>Go</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Icon name="times" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchSection;
