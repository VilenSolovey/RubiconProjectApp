// Styles.ts
import { StyleSheet, ImageStyle, ViewStyle, TextStyle } from 'react-native';

interface Styles {
  main_button: ViewStyle;
  container: ViewStyle;
  headerContainer: ViewStyle;
  logoContainer: ViewStyle;
  logoImage: ImageStyle;
  settingsButton: ViewStyle;
  headerTextAndAccountContainer: ViewStyle;
  headerText: TextStyle;
  searchSection: ViewStyle;
  input: ViewStyle;
  button: ViewStyle;
  verticalLine: ViewStyle;
  buttonText: TextStyle;
  content: ViewStyle;
  map: ViewStyle;
  markerImage: ImageStyle;
  dock: ViewStyle;
  modalView: ViewStyle;
  modalTitle: TextStyle;
  modalText: TextStyle;
  buttonClose: ViewStyle;
  searchSectionContainer: ViewStyle;
  transportButtons: ViewStyle;
  transportButton: ViewStyle;
  goButton: ViewStyle;
  closeButton: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  logoImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  settingsButton: {
    marginRight: 15,
    marginLeft: 2,
    width: 40,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  headerTextAndAccountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#008080',
    marginLeft: 40,
  },
  verticalLine: { // Доданий новий стиль
    height: '100%',
    width: 1,
    backgroundColor: '#000',
    marginHorizontal: 10,
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
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonText: {
    color: '#000',
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
  markerImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 499,
    right: 340,
    width: 40,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    color: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  dock: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
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
  main_button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchSectionContainer: {
    flexDirection: 'column',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
  },
  transportButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  transportButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goButton: {
    width: 100,
    height: 40,
    backgroundColor: '#00bcd4',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});


export default styles;
