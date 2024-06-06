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
  floatingButton: ViewStyle;
  categoryButtonsWrapper: ViewStyle;
  categoryButtonsContainer: ViewStyle;
  categoryButton: ViewStyle;
  selectedCategoryButton: ViewStyle;
  categoryButtonText: TextStyle;
  searchContainer: ViewStyle;
  searchInputContainer: ViewStyle;
  searchInput: TextStyle;
  transportIcon: ImageStyle;
  selectedTransportIcon: ImageStyle;
  categoryIcon: ImageStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    padding: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden', // це дозволить градієнту вийти за межі контейнера
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
    fontWeight: 'normal',
    color: '#116062',
    marginLeft: 25,
    letterSpacing: 10
  },
  verticalLine: {
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
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 4,
  },
  searchButton: {
    width: 50,
    height: 50,
    backgroundColor: '#50C0A1', // Зелений колір
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  circle: {
    width: 50,
    height: 50,
    backgroundColor: '#50C0A1',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 25,
    borderRightWidth: 25,
    borderBottomWidth: 25,
    
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#50C0A1',
    position: 'absolute',
    bottom: 15,
  },
  dropButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 45,
    top: -30
  },
  drop: {
    width: 67,
    height: 67,
    borderTopLeftRadius: 45,
    borderTopRightRadius:45,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    transform: [{ rotate: '45deg' }, { scaleY: 1.1 }, { scaleX: 1.1 }],
  },
  dropShape: {
    width: 70,
    height: 60, // збільшено висоту для закруглення низу
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    padding: 0, // прибрано padding
    backgroundColor: 'white', // додано білий фон
    borderRadius: 35, // додано закруглення для нижньої частини
  },
  dropIconWrapper: {
    position: 'relative',
    width: 50,
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconInsideDrop: {
    top: 16,
    left: 17,
    position: 'absolute',
    transform: [{ rotate: '-45deg' }],
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
    flex: 4,
    overflow: 'hidden', // дозволяє мапі вийти за межі контейнера
  },
  markerImage: {
    width: 32,
    height: 35,
    resizeMode: 'contain',
  },
  floatingButton: {
    position: 'absolute',
    top: 28,
    left: 14,
    width: 35,
    height: 35,
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
  dock: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#f8f8f8',
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
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 20,
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
    flexDirection: 'row',
    padding: 150,
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
  searchContainer: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    position: 'absolute',
    top: 150,
    left: 60,
    right: 10,
    zIndex: 8,
    alignItems: 'flex-end', // Додати цю лінію для вирівнювання хрестика
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 1,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  transportIcon: {
    width: 24,
    height: 25,
    resizeMode: 'contain',
  },
  goButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 8,
  },
  transportButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  categoryButtonsWrapper: {
    position: 'absolute',
    top: 30,
    left: 60, // Відступ справа від стрілочки
    flexDirection: 'row',
    zIndex: 1,
  },
  categoryButtonsContainer: {
    position: 'absolute',
    bottom: 500,
    right: 340,
    flexDirection: 'row',
    borderRadius: 10,
    padding: 50,
    zIndex: 1, // Ensure it appears above other elements
  },
  categoryIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 8, // Відступ між іконкою і текстом
  },
  categoryButton: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 11,
    marginRight: 11, // Spacing between buttons
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedCategoryButton: {
    backgroundColor: '#e0f7fa', // Highlight selected button
  },
  categoryButtonText: {
    fontSize: 15,
    color: '#000',
  },
  transportButton: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 10,
    marginRight: 25, // збільшена відстань між кнопками
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  goButton: {
    backgroundColor: '#00bcd4',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  selectedTransportIcon: undefined
});

export default styles;
