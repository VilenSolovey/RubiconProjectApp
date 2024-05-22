// Імпортую всі потрібні бібліотеки, модулі
import React, { useState, useLayoutEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Modal, ScrollView } from 'react-native';
import MapboxGl from '@rnmapbox/maps';
import axios from 'axios';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import locations from '/Users/vilen/RubiconProject/map.json'; 
import styles from '/Users/vilen/RubiconProject/Styles/HomeStyle';
import menuIcon from '/Users/vilen/RubiconProject/images/home.jpg'

// Імпортую зображення міток та логотипу, щоб потім їх розмістити
const localImage = require('/Users/vilen/RubiconProject/images/marker.png');
const companyLogo = require('/Users/vilen/RubiconProject/images/logo.png'); 

// Безпосередній імпорт токену щоб МапБокс працював
MapboxGl.setAccessToken('sk.eyJ1IjoidmlсZW5lc3MiLCJhIjoiY2x2dHN0a2tvMDkzMDJrbWp1eDluZ2xhbCJ9.sD5hhtymuNGcFiO6TRzO8A');
MapboxGl.setTelemetryEnabled(false);

// Корочше кажучи  цей рядок визначає тип Props, що включає властивості для екрану Home, які надаються React Navigation.
type Props = StackScreenProps<RootStackParamList, 'Home'>;

// Задаю типи того що приходять з файлу map.json
interface MapboxFeature {
  type: string;  // тип фічі, наприклад "Feature"
  properties: {
    place_name?: string;  // назва місця як строка, необов'язкова
    [key: string]: any;  // будь-які додаткові властивості як динамічні ключі
  };
  geometry: {
    type: string;  // Point 
    coordinates: number[];  // координати, як масив чисел
  };
  id?: string;  // id, як строка, для того щоб знати де розташовувати мітку
}

interface MapboxResponse {
  features: MapboxFeature[];
}

// Константа яка бере участь в тому щоб працювала карта МапБокс
const geocodeLocation = async (search_location: string): Promise<MapboxFeature[]> => {
  const mapboxToken = 'sk.eyJ1IjoidmlсZW5lc3MiLCJhIjoiY2x2dHN0a2tvMDkzMDJrbWp1eDluZ2xhbCJ9.sD5hhtymuNGcFiO6TRzO8A';
  try {
    const response = await axios.get<MapboxResponse>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(search_location)}.json?access_token=${mapboxToken}`);
    return response.data.features;
  } catch (error) {
    console.error('Geocoding error:', error);
    return [];
  }
};

// Короче це типу констатна основного екрану, тут багато чого задається 
const HomeScreen = ({ navigation }: Props) => {
const [input, setInput] = useState('');
const [selectedPlace, setSelectedPlace] = useState<MapboxFeature['properties'] | null>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

// А це як задає сам пошук який в інпуті йде
const handleSelectPlace = (place: MapboxFeature['properties']) => {
  setSelectedPlace(place);
};

// Короче вона типу шукає місця на основі того що написано в інпуті
const handleSearch = async () => {
  const results = await geocodeLocation(input);
  console.log(results);
};

// Бере участь в обчисленні чи нажата мітка
const onMapPress = (e: any) => {
  const { coordinates } = e.geometry;

// Збільшення толерантності координат
const tolerance = 0.001; // Більша толерантність - більша відстань реагування
const nearbyLocation = locations.features.find(location =>
  Math.abs(location.geometry.coordinates[0] - coordinates[0]) < tolerance &&
  Math.abs(location.geometry.coordinates[1] - coordinates[1]) < tolerance
);

if (nearbyLocation) {
  handleSelectPlace(nearbyLocation.properties);
}
};

  return (
    // Розміщення того що зверху: пошукового поля, кнопки пошуку.
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Image source={menuIcon} style={{ width: 30, height: 30 }} />
      </TouchableOpacity>
     

      <View style={styles.searchSection}>
        <TextInput
          style={styles.input}
          placeholder="Пошук закладу"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleSearch}
        />

        <TouchableOpacity style={styles.button} onPress={handleSearch}> 
          <Text style={styles.buttonText}>Пошук</Text> 
        </TouchableOpacity> 
      </View>
       
      <View style={styles.content}>
        <MapboxGl.MapView // Карта, стиль, повернення.
          style={styles.map}
          zoomEnabled={true}
          rotateEnabled={true}
          onPress={onMapPress}
          styleURL='mapbox://styles/mapbox/streets-v11'>

        <MapboxGl.Camera
          zoomLevel={15}
          centerCoordinate={[24.029717, 49.842957]} // Координати на яких, починається карта, та анімація далі
          pitch={60}
          animationMode={'flyTo'}
          animationDuration={6000}
          />

        {locations.features.map((location, index) => (
        <MapboxGl.PointAnnotation
          key={`location-${index}`}  // Ну це допомагає React ідентифікувати елементи при оновленні.
          id={`node/${location.id}`} // Розміщення всіх міток на основі файлу json
          coordinate={location.geometry.coordinates}
        >
          
        <TouchableOpacity onPress={() => handleSelectPlace(location.properties)}> 
          <Image
            source={localImage} // Мітки у вигляді png який у папці images
            style={styles.markerImage}
          />

        </TouchableOpacity>
            </MapboxGl.PointAnnotation>
          ))}
        </MapboxGl.MapView> 
      </View> 
      
      <View style={styles.dock}> 
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>  
          {/* Кнопка для навігації на екран налаштувань */}
          <Image source={require('/Users/vilen/RubiconProject/images/settings3.jpg')} style={styles.buttonIcon} /> 
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
           {/* Кнопка для навігації на екран домашній, хз нащо поки що */}
        <Image source={require('/Users/vilen/RubiconProject/images/home4.jpg')} style={styles.buttonIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Files')}>
           {/* Кнопка для навігації на екран файлів, не знаю ще що це */}
          <Image source={require('/Users/vilen/RubiconProject/images/app2.jpg')} style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>

       {/* Початок частини коду, для роботи того, що коли ти нажимаєш на мітку воно щось показує */}
      {selectedPlace && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={selectedPlace !== null}
          onRequestClose={() => setSelectedPlace(null)}
        >

          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Інформація про заклад</Text>
            <ScrollView>
              {/* Тут відображення полів, які я хочу бачити після нажимання */}
              {selectedPlace.name && <Text style={styles.modalText}>Name: {selectedPlace.name}</Text>}
              {selectedPlace.brand && <Text style={styles.modalText}>Brand: {selectedPlace.brand}</Text>}
              {selectedPlace.wheelchair && <Text style={styles.modalText}>Wheelchair Accessible: {selectedPlace.wheelchair}</Text>}
              {selectedPlace.category && <Text style={styles.modalText}>Категорія: {selectedPlace.category}</Text>}
              {/* Тут можна добавити інші поля якщо захочу */}
            </ScrollView>
            <TouchableOpacity
              style={styles.buttonClose}
              onPress={() => setSelectedPlace(null)}
            >
              <Text style={styles.buttonText}>Закрити</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};
export default HomeScreen;