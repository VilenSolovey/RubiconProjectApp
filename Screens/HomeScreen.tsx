import React, { useState, useLayoutEffect } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, Modal, ScrollView, Alert, Image } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/EvilIcons';
import Icon5 from 'react-native-vector-icons/AntDesign';

import LinearGradient from 'react-native-linear-gradient';
import styles from '../Styles/HomeStyle';
import logo from '../images/rubicon-icon.png';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import markerIcon from '../images/marker.png';
import museumIcon from '../images/museum.png';
import parkIcon from '../images/park-location.png';
import petrolStationIcon from '../images/petrol-station.png';
import pharmacyIcon from '../images/pharmacy.png';
import restaurantIcon from '../images/restaurant.png';
import hotelIcon from '../images/hotel.png';
import hospitalIcon from '../images/hospital.png';
import BankIcon from '../images/money.png';
import PostOfficeIcon from '../images/post-office.png';
import ShopIcon from '../images/location.png';
import ElectricIcon from '../images/phone.png';
import FuelStationIcon from '../images/petrol-station.png';
import EntertaimentIcon from '../images/pin.png';

const YOUR_OPENROUTESERVICE_API_KEY = '5b3ce3597851110001cf62489cbd10326296422b883343a69a585114';
const YOUR_MAPBOX_API_KEY = 'sk.eyJ1IjoidmlсZW5lc3MiLCJhIjoiY2x2dHN0a2tvMDkzMDJrbWp1eDluZ2xhbCJ9.sD5hhtymuNGcFiO6TRzO8A';

MapboxGL.setAccessToken('sk.eyJ1IjoidmlсZW5lc3MiLCJhIjoiY2x2dHN0a2tvMDkzMDJrbWp1eDluZ2xhbCJ9.sD5hhtymuNGcFiO6TRzO8A');


interface PlaceProperties {
  "@id"?: string;
  category?: string;
  brand?: string;
  check_date?: string;
  cuisine?: string;
  indoor?: string;
  name?: string;
  opening_hours?: string;
  phone?: string;
  website?: string;
  wheelchair?: string;
}

interface Location {
  type: string;
  properties: PlaceProperties;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
}

interface Locations {
  type: string;
  features: Location[];
}

const locations: Locations = require('../map.json');

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

const getIconForCategory = (category: string | undefined) => {
  switch (category) {
    case 'museum':
      return museumIcon;
    case 'park':
      return parkIcon;
    case 'petrol_station':
      return petrolStationIcon;
    case 'pharmacy':
      return pharmacyIcon;
    case 'restaurant':
      return restaurantIcon;
    case 'hotel':
      return hotelIcon;
    case 'hospital':
      return hospitalIcon;
    case 'bank':
      return BankIcon;
    case 'postoffice':
      return PostOfficeIcon;
    case 'foodmarket':
      return ShopIcon;
    case 'electricshop':
      return ElectricIcon;
    case 'fuel':
      return FuelStationIcon;
    case 'entertaiment':
      return EntertaimentIcon;
    default:
      return markerIcon;
  }
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [selectedPlace, setSelectedPlace] = useState<PlaceProperties | null>(null);
  const [startCoordinates, setStartCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
  const [endCoordinates, setEndCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
  const [route, setRoute] = useState<any>(null);
  const [searchVisible, setSearchVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleSelectPlace = (place: PlaceProperties) => {
    setSelectedPlace(place);
  };

  const onMapPress = (e: any) => {
    const coordinates = e.geometry.coordinates;
    
    if (!startCoordinates) {
      setStartCoordinates({ latitude: coordinates[1], longitude: coordinates[0] });
      Alert.alert('Початкова точка обрана!');
    } else if (!endCoordinates) {
      setEndCoordinates({ latitude: coordinates[1], longitude: coordinates[0] });
      Alert.alert('Кінцева точка обрана!');
    }

    const tolerance = 0.001;
    const nearbyLocation = locations.features.find((location) =>
      Math.abs(location.geometry.coordinates[0] - coordinates[0]) < tolerance &&
      Math.abs(location.geometry.coordinates[1] - coordinates[1]) < tolerance
    );

    if (nearbyLocation) {
      handleSelectPlace(nearbyLocation.properties);
    }
  };

  const createRoute = async () => {
    if (!startCoordinates || !endCoordinates) {
      Alert.alert('Будь ласка оберіть точки маршруту!');
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
      <LinearGradient colors={['#e0f7fa', '#b2ebf2']} style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logoImage} />
        </View>
        <View style={styles.headerTextAndAccountContainer}>
          <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Settings')}>
            <Icon3 name="settings-outline" size={25} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Map</Text>
          <View style={styles.verticalLine} />
          <TouchableOpacity onPress={() => navigation.navigate('Account')}>
            <Icon4 name="user" size={45} color="#000" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      
      {searchVisible && (
        <SearchSection
          onSearch={handleSearch}
          onClose={() => setSearchVisible(false)}
        />
      )}

      <View style={styles.content}>
        <MapboxGL.MapView
          style={styles.map}
          zoomEnabled={true}
          rotateEnabled={true}
          onPress={onMapPress}
          styleURL='mapbox://styles/mapbox/streets-v11'>
          <MapboxGL.Camera
            zoomLevel={15}
            centerCoordinate={[24.029717, 49.842957]}
            pitch={60}
            animationMode={'flyTo'}
            animationDuration={6000}
          />
          {locations.features.map((location, index) => (
            <MapboxGL.PointAnnotation
              key={`location-${index}`}
              id={`node-${index}`}
              coordinate={location.geometry.coordinates}
            >
              <Image source={getIconForCategory(location.properties.category)} style={styles.markerImage} />
            </MapboxGL.PointAnnotation>
          ))}
          {startCoordinates && (
            <MapboxGL.PointAnnotation
              id="start"
              coordinate={[startCoordinates.longitude, startCoordinates.latitude]}
            >
              <Image source={require('../images/m.png')} style={styles.markerImage} />
            </MapboxGL.PointAnnotation>
          )}
          {endCoordinates && (
            <MapboxGL.PointAnnotation
              id="end"
              coordinate={[endCoordinates.longitude, endCoordinates.latitude]}
            >
              <Image source={require('../images/m.png')} style={styles.markerImage} />
            </MapboxGL.PointAnnotation>
          )}
          {route && (
            <MapboxGL.ShapeSource id="routeSource" shape={route}>
              <MapboxGL.LineLayer id="routeFill" style={{ lineColor: 'blue', lineWidth: 5 }} />
            </MapboxGL.ShapeSource>
          )}
        </MapboxGL.MapView>
        {/* Додаємо кнопку поверх карти */}
        <TouchableOpacity style={styles.floatingButton} onPress={() => {/* Дія нової кнопки */}}>
          <Icon5 name="arrowright" size={25} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.dock}>
        <TouchableOpacity style={styles.button} onPress={createRoute}>
          <Icon2 name="bookmark" size={25} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setSearchVisible(!searchVisible)}>
          <Icon name="search" size={25} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={resetRoute}>
          <Icon2 name="rotate-cw" size={25} color="#000" />
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
    </SafeAreaView>
  );
};

export default HomeScreen;
