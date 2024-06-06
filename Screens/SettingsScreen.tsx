import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView, Text, TouchableOpacity, Switch, Image, Modal, TextInput, Button, Linking } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import profilePhoto from '../images/cogs.png';
import SvgComponent from '../SvgFiles/settings_svg';
import styles from '../Styles/SettingsStyle';
import RouteSVG from '../SvgFiles/route_svg';
import Icon from 'react-native-vector-icons/FontAwesome';

const MyIcon = () => (
  <Icon name="moon-o" size={30} color="#900" />
);

export default function Example() {
  const [form, setForm] = useState({
    darkMode: false,
    emailNotifications: false,
    pushNotifications: false,
  });
  const [bugReportVisible, setBugReportVisible] = useState(false);
  const [bugDescription, setBugDescription] = useState('');

  const handleContactUsPress = () => {
    Linking.openURL('mailto:rubicon.iot@gmail.com');
  };

  const handleAboutUsPress = () => {
    Linking.openURL('https://rubicon.com');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.profile}>
          <View style={styles.profileAvatarWrapper}>
            <Image
              alt="Profile Photo"
              source={profilePhoto}
              style={styles.profileAvatar} />
          </View>
          <View>
            <Text style={styles.profileName}>Settings</Text>
          </View>
        </View>
        <ScrollView>
          {/* Новий рядок для профілю */}
          <View style={styles.section}>
            <TouchableOpacity style={styles.profileRow}>
              <View style={[styles.profileRowIcon, { backgroundColor: '#fff' }]}>
                <FeatherIcon color="#111111" name="user" size={24} />
              </View>
              <View style={styles.profileRowTextContainer}>
                <Text style={styles.profileRowLabel}>Profile</Text>
                <Text style={styles.profileRowSubLabel}>e-mail</Text>
              </View>
              <View style={styles.rowSpacer} />
              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Базові налаштування</Text>
            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#111111' }]}>
                <Icon name="moon-o" size={30} color="#fff" />
              </View>
              <Text style={styles.rowLabel}>Темний режим</Text>
              <View style={styles.rowSpacer} />
              <Switch
                onValueChange={darkMode => setForm({ ...form, darkMode })}
                value={form.darkMode} />
            </View>
            <TouchableOpacity style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#fff' }]}>
                <RouteSVG width={20} height={20} fill="#111111" />
              </View>
              <Text style={styles.rowLabel}>Location</Text>
              <View style={styles.rowSpacer} />
              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>
            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#38C959' }]}>
                <FeatherIcon color="#fff" name="at-sign" size={20} />
              </View>
              <Text style={styles.rowLabel}>Email Notifications</Text>
              <View style={styles.rowSpacer} />
              <Switch
                onValueChange={emailNotifications => setForm({ ...form, emailNotifications })}
                value={form.emailNotifications} />
            </View>
            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#38C959' }]}>
                <FeatherIcon color="#fff" name="bell" size={20} />
              </View>
              <Text style={styles.rowLabel}>Push Notifications</Text>
              <View style={styles.rowSpacer} />
              <Switch
                onValueChange={pushNotifications => setForm({ ...form, pushNotifications })}
                value={form.pushNotifications} />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Resources</Text>
            <TouchableOpacity
              onPress={() => setBugReportVisible(true)}
              style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#8e8d91' }]}>
                <FeatherIcon color="#fff" name="flag" size={20} />
              </View>
              <Text style={styles.rowLabel}>Report Bug</Text>
              <View style={styles.rowSpacer} />
              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.row} onPress={handleContactUsPress}>
              <View style={[styles.rowIcon, { backgroundColor: '#007afe' }]}>
                <FeatherIcon color="#fff" name="mail" size={20} />
              </View>
              <Text style={styles.rowLabel}>Contact Us</Text>
              <View style={styles.rowSpacer} />
              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.row} onPress={handleAboutUsPress}>
              <View style={[styles.rowIcon, { backgroundColor: '#32c759' }]}>
                <FeatherIcon color="#fff" name="star" size={20} />
              </View>
              <Text style={styles.rowLabel}>About Us</Text>
              <View style={styles.rowSpacer} />
              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      {/* Модальне вікно для звітування про баги */}
      <Modal
        visible={bugReportVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setBugReportVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Report Bug</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Describe the bug..."
              multiline
              value={bugDescription}
              onChangeText={setBugDescription}
            />
            <Button title="Submit" onPress={() => {
              // Обробка звіту про баг
              console.log('Bug description:', bugDescription);
              setBugReportVisible(false);
            }} />
            <Button title="Cancel" onPress={() => setBugReportVisible(false)} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
