import React, { useState, useLayoutEffect, useEffect } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, Modal, ScrollView, Alert, Image, TextInput } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import axios from 'axios';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
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
import wheelchairIcon from '../images/wheelchair.png';
import footIcon from '../images/Steps.jpg';
import carIcon from '../images/Car.jpg';
import DropIcon from '../Screens/DropIcon'; // Імпорт SVG
import DropShape from '../Screens/DropIcon'; // Імпорт SVG
const YOUR_OPENROUTESERVICE_API_KEY = '5b3ce3597851110001cf62489cbd10326296422b883343a69a585114';
const YOUR_MAPBOX_API_KEY = 'sk.eyJ1IjoidmlсZW5lc3MiLCJhIjoiY2x2dHN0a2tvMDkzMDJrbWp1eDluZ2xhbCJ9.sD5hhtymuNGcFiO6TRzO8A';

MapboxGL.setAccessToken(YOUR_MAPBOX_API_KEY);

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
  const [categoryButtonsVisible, setCategoryButtonsVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredMarkers, setFilteredMarkers] = useState<Location[]>(locations.features);
  const [searchStart, setSearchStart] = useState<string>('');
  const [searchEnd, setSearchEnd] = useState<string>('');
  const [mode, setMode] = useState<string>('wheelchair');
  const [canSelectPoints, setCanSelectPoints] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  const toggleCategory = (category: string) => {
    setSelectedCategories(prevCategories => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter(cat => cat !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };
  
  const filterMarkers = () => {
    if (selectedCategories.length === 0) {
      setFilteredMarkers(locations.features);
    } else {
      const markersForCategories = locations.features.filter((location) =>
        selectedCategories.includes(location.properties.category || '')
      );
      setFilteredMarkers(markersForCategories);
    }
  };
  useEffect(() => {
    filterMarkers();
  }, [selectedCategories]);

  useEffect(() => {
    filterMarkers();
  }, []);
  const getIconForCategory = (category: string | undefined) => {
    const iconMap: { [key: string]: any } = {
      museum: museumIcon,
      park: parkIcon,
      petrol_station: petrolStationIcon,
      pharmacy: pharmacyIcon,
      restaurant: restaurantIcon,
      hotel: hotelIcon,
      hospital: hospitalIcon,
      bank: BankIcon,
      postoffice: PostOfficeIcon,
      foodmarket: ShopIcon,
      electricshop: ElectricIcon,
      fuel: FuelStationIcon,
      entertaiment: EntertaimentIcon,
    };

    if (!category) {
      console.error('Category is undefined');
      return markerIcon;
    }

    const icon = iconMap[category];
    if (!icon) {
      console.error(`Icon not found for category: ${category}`);
      return markerIcon;
    }

    return icon;
  };

  const handleSelectPlace = (place: PlaceProperties) => {
    setSelectedPlace(place);
  };

  const onMapPress = (e: any) => {
    if (!canSelectPoints) {
    }
  
    const coordinates = e.geometry.coordinates.slice();
    const newCoordinates = {
      latitude: coordinates[1],
      longitude: coordinates[0],
    };
  
    if (!startCoordinates) {
      setStartCoordinates(newCoordinates);
    } else if (!endCoordinates) {
      setEndCoordinates(newCoordinates);
      setSearchVisible(true); // Відкриваємо вікно пошуку після вибору кінцевої точки
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

  const searchLocation = async (query: string) => {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${YOUR_MAPBOX_API_KEY}`
    );
    return response.data;
  };

  const handleSearch = async () => {
    try {
      const startResult = await searchLocation(searchStart);
      const endResult = await searchLocation(searchEnd);

      if (startResult.features.length > 0 && endResult.features.length > 0) {
        const start = startResult.features[0].geometry.coordinates;
        const end = endResult.features[0].geometry.coordinates;

        setStartCoordinates({ latitude: start[1], longitude: start[0] });
        setEndCoordinates({ latitude: end[1], longitude: end[0] });

        setSearchVisible(false); // Закриття вікна пошуку після створення маршруту
        createRoute(); // Створення маршруту після пошуку
      } else {
        Alert.alert('Не вдалося знайти місце. Будь ласка, спробуйте ще раз.');
      }
    } catch (error) {
      Alert.alert('Помилка при пошуку місць. Будь ласка, спробуйте ще раз.');
    }
  };

  const handleTransportModePress = (mode: string) => {
    setMode(mode);
    setCanSelectPoints(true);
    setSearchVisible(false); // Закриваємо вікно пошуку після вибору режиму
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#ffffff', '#e0f7fa']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.headerContainer}
      >
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
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setSearchVisible(false)}>
            <Icon name="close" size={20} color="#ccc" />
          </TouchableOpacity>
          <View style={styles.searchInputContainer}>
            <Icon name="circle-o" size={20} color="#50C0A1" />
            <TextInput
              style={styles.searchInput}
              placeholder="Your location"
              value={searchStart}
              onChangeText={setSearchStart}
            />
          </View>
          <View style={styles.searchInputContainer}>
            <Icon2 name="map-pin" size={20} color="#F24A72" />
            <TextInput
              style={styles.searchInput}
              placeholder="Destination"
              value={searchEnd}
              onChangeText={setSearchEnd}
            />
          </View>
          <View style={styles.transportButtons}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => handleTransportModePress('wheelchair')} style={styles.transportButton}>
                <Image source={wheelchairIcon} style={[styles.transportIcon, mode === 'wheelchair' && styles.selectedTransportIcon]} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleTransportModePress('foot')} style={styles.transportButton}>
                <Image source={footIcon} style={[styles.transportIcon, mode === 'foot' && styles.selectedTransportIcon]} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleTransportModePress('car')} style={styles.transportButton}>
                <Image source={carIcon} style={[styles.transportIcon, mode === 'car' && styles.selectedTransportIcon]} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.goButton} onPress={handleSearch}>
              <Text style={styles.goButtonText}>Go</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View style={styles.content}>
        <MapboxGL.MapView
          style={styles.map}
          zoomEnabled={true}
          rotateEnabled={true}
          onPress={onMapPress}
          styleURL='mapbox://styles/mapbox/streets-v11'>
          <MapboxGL.Camera
            zoomLevel={10}
            centerCoordinate={[24.029717, 49.842957]}
            pitch={0}
            animationMode={'flyTo'}
            animationDuration={6000}
          />
          {filteredMarkers.map((location, index) => (
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

        {categoryButtonsVisible && (
          <View style={styles.categoryButtonsWrapper}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={[styles.categoryButton, selectedCategories.includes('museum') ? styles.selectedCategoryButton : null]}
                onPress={() => toggleCategory('museum')}
              >
                <Image source={require('../images/Museum.jpg')} style={styles.categoryIcon} />
                <Text style={styles.categoryButtonText}>Музеї</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.categoryButton, selectedCategories.includes('postoffice') ? styles.selectedCategoryButton : null]}
                onPress={() => toggleCategory('postoffice')}
              >
                <Image source={require('../images/PostOfficee.webp')} style={styles.categoryIcon} />
                <Text style={styles.categoryButtonText}>Пошти</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.categoryButton, selectedCategories.includes('park') ? styles.selectedCategoryButton : null]}
                onPress={() => toggleCategory('park')}
              >
                <Image source={require('../images/park.jpg')} style={styles.categoryIcon} />
                <Text style={styles.categoryButtonText}>Парки</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.categoryButton, selectedCategories.includes('pharmacy') ? styles.selectedCategoryButton : null]}
                onPress={() => toggleCategory('pharmacy')}
              >
                <Image source={require('../images/Med.jpg')} style={styles.categoryIcon} />
                <Text style={styles.categoryButtonText}>Аптеки</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.categoryButton, selectedCategories.includes('restaurant') ? styles.selectedCategoryButton : null]}
                onPress={() => toggleCategory('restaurant')}
              >
                <Image source={require('../images/Restourants.jpg')} style={styles.categoryIcon} />
                <Text style={styles.categoryButtonText}>Ресторани</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.categoryButton, selectedCategories.includes('hotel') ? styles.selectedCategoryButton : null]}
                onPress={() => toggleCategory('hotel')}
              >
                <Image source={require('../images/hotel+.jpg')} style={styles.categoryIcon} />
                <Text style={styles.categoryButtonText}>Готелі</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.categoryButton, selectedCategories.includes('bank') ? styles.selectedCategoryButton : null]}
                onPress={() => toggleCategory('bank')}
              >
                <Image source={require('../images/Money.jpg')} style={styles.categoryIcon} />
                <Text style={styles.categoryButtonText}>Банки</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.categoryButton, selectedCategories.includes('foodmarket') ? styles.selectedCategoryButton : null]}
                onPress={() => toggleCategory('foodmarket')}
              >
                <Image source={require('../images/Shop.jpg')} style={styles.categoryIcon} />
                <Text style={styles.categoryButtonText}>Продуктові магазини</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.categoryButton, selectedCategories.includes('electricshop') ? styles.selectedCategoryButton : null]}
                onPress={() => toggleCategory('electricshop')}
              >
                <Image source={require('../images/Telephone.jpg')} style={styles.categoryIcon} />
                <Text style={styles.categoryButtonText}>Магазини електроніки</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.categoryButton, selectedCategories.includes('hospital') ? styles.selectedCategoryButton : null]}
                onPress={() => toggleCategory('hospital')}
              >
                <Image source={hospitalIcon} style={styles.categoryIcon} />
                <Text style={styles.categoryButtonText}>Лікарні</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.categoryButton, selectedCategories.includes('fuel') ? styles.selectedCategoryButton : null]}
                onPress={() => toggleCategory('fuel')}
              >
                <Image source={require('../images/Gasstation.jpg')} style={styles.categoryIcon} />
                <Text style={styles.categoryButtonText}>Заправки</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.categoryButton, selectedCategories.includes('entertaiment') ? styles.selectedCategoryButton : null]}
                onPress={() => toggleCategory('entertaiment')}
              >
                <Image source={EntertaimentIcon} style={styles.categoryIcon} />
                <Text style={styles.categoryButtonText}>Розваги</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}

        <TouchableOpacity style={styles.floatingButton} onPress={() => setCategoryButtonsVisible(!categoryButtonsVisible)}>
          <Icon5 name="arrowright" size={25} color="#50C0A1" />
        </TouchableOpacity>
      </View>

      <View style={styles.dock}>
        <TouchableOpacity style={styles.button} onPress={createRoute}>
          <Icon2 name="bookmark" size={25} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.dropButton} onPress={() => setSearchVisible(!searchVisible)}>
          <LinearGradient
            colors={['#328F70', '#58EDCA']}
            start={{ x: 0.5, y: 1 }} // Починаємо з середини знизу
              end={{ x: 0.5, y: 0 }} // Закінчуємо зверху
            style={styles.drop}
          >
            <Icon name="search" size={25} color="#fff" style={styles.iconInsideDrop} />
          </LinearGradient>
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
