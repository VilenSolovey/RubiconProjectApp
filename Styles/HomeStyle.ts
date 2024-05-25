import { StyleSheet, ImageStyle, ViewStyle, TextStyle } from 'react-native';

interface Styles {
  main_button: ViewStyle;
  container: ViewStyle;
  headerContainer: ViewStyle;
  companyLogo: ImageStyle;
  headerText: TextStyle;
  searchSection: ViewStyle;
  input: ViewStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  content: ViewStyle;
  map: ViewStyle;
  markerContainer: ViewStyle;
  marker: ViewStyle;
  defaultMarker: ViewStyle;
  startMarker: ViewStyle;
  endMarker: ViewStyle;
  dock: ViewStyle;
  buttonIcon: ImageStyle;
  modalView: ViewStyle;
  modalTitle: TextStyle;
  modalText: TextStyle;
  buttonClose: ViewStyle;
  markerImage: ImageStyle; // Додано тип для markerImage
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 10,
  },
  companyLogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  searchSection: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 10,
    flex: 1,
    marginRight: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#000000',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 25,
    height: 20,
    borderRadius: 15,
  },
  defaultMarker: {
    backgroundColor: 'blue',
  },
  startMarker: {
    backgroundColor: 'green',
  },
  endMarker: {
    backgroundColor: 'red',
  },
  dock: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  buttonIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonClose: {
    padding: 10,
    backgroundColor: '#000000',
    borderRadius: 5,
  },
  markerImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  main_button: {
    backgroundColor: '#111111', // Змінено на червоний
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    elevation: 4,
  }
});

export default styles;
