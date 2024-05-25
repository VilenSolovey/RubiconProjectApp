import React, { useState, useLayoutEffect } from 'react';
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, Image, Modal, ScrollView, Alert } from 'react-native';
import MapboxGl from '@rnmapbox/maps';
import axios from 'axios';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParamList } from '../types';
import locations from '../map.json'; 
import styles from '../Styles/HomeStyle'; // Імпорт стилів з того сраного файлу
import menuIcon from '../images/home.jpg'

const localImage = require('../images/marker.png');
const localImage2 = require('../images/m.png');
const companyLogo = require('../images/logo.png'); 

MapboxGl.setAccessToken('sk.eyJ1IjoidmlсZW5lc3MiLCJhIjoiY2x2dHN0a2tvMDkzMDJrbWp1eDluZ2xhbCJ9.sD5hhtymuNGcFiO6TRzO8A');
MapboxGl.setTelemetryEnabled(false);

type Props = {
  navigation: DrawerNavigationProp<RootStackParamList, 'Home'>;
};

interface MapboxFeature {
  type: string;
  properties: {
    place_name?: string;
    [key: string]: any;
  };
  geometry: {
    type: string;
    coordinates: number[];
  };
  id?: string;
}

interface MapboxResponse {
  features: MapboxFeature[];
}

const YOUR_OPENROUTESERVICE_API_KEY = '5b3ce3597851110001cf62489cbd10326296422b883343a69a585114';
const YOUR_MAPBOX_API_KEY = 'pk.eyJ1IjoiaHR3IiwiYSI6ImNsb3g0cDRiNzE3b2oybW5Y3c1dXZnMGgifQ.uzBJXce4teynZDoRu16e0Q';

export const fetchWheelchairRoute = async (startCoordinates: { latitude: number; longitude: number }, endCoordinates: { latitude: number; longitude: number }) => {
  const response = await axios.get(
    `https://api.openrouteservice.org/v2/directions/wheelchair?api_key=${YOUR_OPENROUTESERVICE_API_KEY}&start=${startCoordinates.longitude},${startCoordinates.latitude}&end=${endCoordinates.longitude},${endCoordinates.latitude}`
  );
  return response.data;
};

export const reverseGeocoding = async (longitude: number, latitude: number) => {
  const response = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${YOUR_MAPBOX_API_KEY}`
  );
  return response.data;
};

const geocodeLocation = async (search_location: string): Promise<MapboxFeature[]> => {
  const mapboxToken = YOUR_MAPBOX_API_KEY;
  try {
    const response = await axios.get<MapboxResponse>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(search_location)}.json?access_token=${mapboxToken}`);
    return response.data.features;
  } catch (error) {
    console.error('Geocoding error:', error);
    return [];
  }
};

const HomeScreen = ({ navigation }: Props) => {
  const [input, setInput] = useState('');
  const [selectedPlace, setSelectedPlace] = useState<MapboxFeature['properties'] | null>(null);
  const [startCoordinates, setStartCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
  const [endCoordinates, setEndCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
  const [route, setRoute] = useState<any>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleSelectPlace = (place: MapboxFeature['properties']) => {
    setSelectedPlace(place);
  };

  const handleSearch = async () => {
    const results = await geocodeLocation(input);
    console.log(results);
  };

  const onMapPress = (e: any) => {
    const { coordinates } = e.geometry;
    
    if (!startCoordinates) {
      setStartCoordinates({ latitude: coordinates[1], longitude: coordinates[0] });
      Alert.alert('Початкова точка обрана!');
    } else if (!endCoordinates) {
      setEndCoordinates({ latitude: coordinates[1], longitude: coordinates[0] });
      Alert.alert('Кінцева точка обрана!');
    }

    const tolerance = 0.001;
    const nearbyLocation = locations.features.find(location =>
      Math.abs(location.geometry.coordinates[0] - coordinates[0]) < tolerance &&
      Math.abs(location.geometry.coordinates[1] - coordinates[1]) < tolerance
    );

    if (nearbyLocation) {
      handleSelectPlace(nearbyLocation.properties);
    }
  };

  const createRoute = async () => {
    if (!startCoordinates) {
      Alert.alert('Будь ласка оберіть початкову точку!');
      return;
    }
    if (!endCoordinates) {
      Alert.alert('Будь ласка оберіть кінцеву точку!');
      return;
    }

    const data = await fetchWheelchairRoute(startCoordinates, endCoordinates);
    setRoute(data);
  };

  const resetRoute = () => {
    setStartCoordinates(null);
    setEndCoordinates(null);
    setRoute(null);
    Alert.alert('Маршрут скинутий!');
  };

  return (
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
        <MapboxGl.MapView
          style={styles.map}
          zoomEnabled={true}
          rotateEnabled={true}
          onPress={onMapPress}
          styleURL='mapbox://styles/mapbox/streets-v11'>
          <MapboxGl.Camera
            zoomLevel={15}
            centerCoordinate={[24.029717, 49.842957]}
            pitch={60}
            animationMode={'flyTo'}
            animationDuration={6000}
          />
          {locations.features.map((location, index) => (
            <MapboxGl.PointAnnotation
            key={`location-${index}`}
            id={`node/${location.id}`}
            coordinate={location.geometry.coordinates}
          >
          <Image source={localImage} style={styles.markerImage} />
          </MapboxGl.PointAnnotation>
          
          ))}
          {startCoordinates && (
            <MapboxGl.PointAnnotation
              id="start"
              coordinate={[startCoordinates.longitude, startCoordinates.latitude]}
            >
              <Image source={localImage2} style={styles.markerImage} />
            </MapboxGl.PointAnnotation>
          )}
          {endCoordinates && (
            <MapboxGl.PointAnnotation
              id="end"
              coordinate={[endCoordinates.longitude, endCoordinates.latitude]}
            >
              <Image source={localImage2} style={styles.markerImage} />
            </MapboxGl.PointAnnotation>
          )}
          {route && (
            <MapboxGl.ShapeSource id="routeSource" shape={route}>
              <MapboxGl.LineLayer id="routeFill"  />
            </MapboxGl.ShapeSource>
          )}
        </MapboxGl.MapView> 
      </View> 
      
      <View style={styles.dock}> 
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
          <Image source={require('../images/settings3.jpg')} style={styles.buttonIcon} /> 
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Image source={require('../images/home4.jpg')} style={styles.buttonIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Files')}>
          <Image source={require('../images/app2.jpg')} style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>

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
              {selectedPlace.name && <Text style={styles.modalText}>Назва закладу: {selectedPlace.name}</Text>}
              {selectedPlace.brand && <Text style={styles.modalText}>Бренд: {selectedPlace.brand}</Text>}
              {selectedPlace.wheelchair && <Text style={styles.modalText}>Wheelchair Accessible: {selectedPlace.wheelchair}</Text>}
              {selectedPlace.category && <Text style={styles.modalText}>Категорія: {selectedPlace.category}</Text>}
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
      <TouchableOpacity style={styles.main_button} onPress={createRoute}>
        <Text style={styles.buttonText}>Створити маршрут</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.main_button} onPress={resetRoute}>
        <Text style={styles.buttonText}>Скинути маршрут</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;
