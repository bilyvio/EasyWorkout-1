import React, { useState, useEffect } from 'react';
import {
  View, Text, Button, Dimensions
} from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { usePermissions } from 'expo-permissions';
import { useFocusEffect } from '@react-navigation/core';
import CameraControls from '../../components/cameraControls/CameraControls';
import VideoComponent from '../../components/VideoComponent/VideoComponent';

import styles from './styles';
import { ThemeContext } from '../../components/Context/theme-context';

const CameraContainer = ({ navigation }) => {
  const [permission, askForPermission] = usePermissions(Permissions.CAMERA, { ask: true });
  const DETAILS_NAVIGATION_TIMEOUT = 90000;
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isVideoActive, setIsVideoActive] = useState(true);
  const {
    theme, bgThemeColor, fontThemeColor, changeTheme
  } = React.useContext(ThemeContext);


  if (!permission || permission.status !== 'granted') {
    return (
      <View>
        <Text>Permission is not granted</Text>
        <Button title="Grant permission" onPress={askForPermission} />
      </View>
    );
  }

  return (
    <View style={styles.flexContainer}>
      <View style={{...styles.navBar, backgroundColor: bgThemeColor}}>
        <Text style={styles.sectionTitle}>
          Scan the simulator
        </Text>
      </View>
      {/*<Camera style={styles.flexContainer} type={type} />*/}
      {isVideoActive && <VideoComponent />}
      <CameraControls setType={setType} typeFromProps={type} navigation={navigation} />
    </View>
  );
};

export default CameraContainer;
